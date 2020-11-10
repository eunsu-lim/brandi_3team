import datetime

from flask     import request

from exceptions import (
    InvalidDataError,
    OutofStockError,
    PriceDoesNotMatchError,
    InvalidSalesQuantityError
)

class OrderService:
    def __init__(self, order_dao):
        self.order_dao = order_dao
    
    def change_order_status(self,db_connection, orders_dict):
        """
        주문 상태를 변경합니다.
        Args:
            order_id        : 주문 아이디,
            order_status_id : 주문상태 아이디,
        Returns:
            affected_orders_count : 상태 변경된 주문 리스트
        Authors:
            jisunn0130@gmail.com(최지선)
        History:
            2020.11.03(최지선) : 초기 생성
            2020.11.05(최지선) : 슬랙봇 삭제
        """
        updated_order_count = self.order_dao.update_order_status(db_connection, orders_dict)
        in_charge = request.account_id
        orders_dict['account_id'] = in_charge['account_id']
        self.order_dao.insert_order_history(db_connection, orders_dict)
        return updated_order_count
    
    def create_order_lists(self, db_connection, filter_dict):
        """
        주문 내역 리스트
        Args:
            filter_dict = {
                order_status_id     : 주문 상태 아이디
                searching_category  : 검색항목
                searching           : 검색어
                filter_ordering     : 정렬기준
                filter_date_from    : 필터 시작날짜
                filter_date_to      : 필터 끝날짜
                offset              : 페이지네이션 시작
                limit               : 페이지네이션 끝
                seller_attribute_id : 셀러속성
            }
            
        Returns:
            order_lists : 주문 리스트

        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        order_counts = self.order_dao.get_order_counts(db_connection, filter_dict)
        order_lists  = self.order_dao.get_orders(db_connection, filter_dict)
        return {"order_counts":order_counts, "order_lists":order_lists}
    
    def get_product_option_lists(self, db_connection, product):
        """
        상품 주문 시 컬러, 사이즈 옵션을 보내줍니다. 
        Args:
            product = {'product_id': 상품 아이디}  
        Returns:
            {
                "sizes": 사이즈 옵션, 
                "colors": 컬러 옵션
            }

        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.08(최지선) : 초기 생성
        """
  
        product_size_options = self.order_dao.get_product_size_options(db_connection, product)
        product_color_options = self.order_dao.get_product_color_options(db_connection, product)
        print(product_color_options)
        color_options = []
        for color_option in product_color_options:
            if color_option not in color_options:
                color_options.append(color_option)
        return {"sizes":product_size_options, "colors":color_options}


    def create_new_order(self, db_connection, order_info):
        """
        새로운 주문 정보를 저장합니다. 
        Args:
            product_id         : 상품 아이디
            color_id           : 컬러 아이디
            size_id            : 사이즈 아이디
            quantity           : 주문 수량
            discount_status_id : 할인여부 
            sales_price        : 판매가
            discount_price     : 할인가
            paid_total         : 총 결제금액
            customer_name      : 주문자 이름
            phone_number       : 핸드폰 번호 
            postal_code        : 우편번호
            address_1          : 도로명주소
            address_2          : 상세주소
        Returns:
            {'message':'SUCCESS','code':200}
            {'message':'PRICE_DOES_NOT_MATCH','code':400}
            {'message':'INVALID_REQUEST','client_message':'최소 구매수량을 확인하세요','code':400}
            {'message':'INVALID_REQUEST','client_message':'최대 구매수량을 확인하세요','code':400}
            
        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        #상품 옵션 정보 & 재고 확인 (컬러, 사이즈), 최소, 최대 구매수량 확인
        stock_available = self.order_dao.check_product_options(db_connection, order_info)
        sales_quantity  = self.order_dao.get_product_sales_quantity(db_connection, order_info)
        if int(order_info['quantity']) > stock_available['stock_quantity']:
            raise OutofStockError('S110')
        elif int(order_info['quantity']) > sales_quantity['max_sales_quantity']:
            raise InvalidSalesQuantityError('S113')
        elif int(order_info['quantity']) < sales_quantity['min_sales_quantity']:
            raise InvalidSalesQuantityError('S112')

        #주문번호 & 주문상세번호생성
        today = datetime.datetime.today().strftime('%Y%m%d')
        last_order_id = self.order_dao.get_order_id(db_connection)['id'] 
        order_number = today + str(last_order_id+1).zfill(5)
        detailed_order_number = 'B' + order_number
        order_info['order_number'] = order_number
        order_info['detailed_order_number'] = detailed_order_number
        
        #할인여부 확인
        discount_check = order_info['discount_status_id']
        if discount_check == 2:
            stored_retail_price = self.order_dao.get_product_price(db_connection,order_info)['price']
            stored_discount_rate = self.order_dao.get_product_price(db_connection,order_info)['discount_rate']
            discount_price = stored_retail_price - (stored_retail_price * stored_discount_rate)
            
            if order_info['discount_price'] != discount_price:
                raise PriceDoesNotMatchError('S111')
            elif order_info['paid_total'] != discount_price * order_info['quantity']:
                raise PriceDoesNotMatchError('S111')

        elif discount_check == 3:
            stored_retail_price = self.order_dao.get_product_price(db_connection,order_info)['price']
            if order_info['sales_price'] != stored_retail_price:
                raise PriceDoesNotMatchError('S111')
            elif order_info['paid_total'] != stored_retail_price * order_info['quantity']:
                raise PriceDoesNotMatchError('S111')

        #주문자 정보 저장
        shipment_id = self.order_dao.insert_shipment(db_connection, order_info)
        order_info['shipment_id'] = shipment_id
        
        new_order = self.order_dao.insert_order(db_connection, order_info)
        new_order_history = self.order_dao.get_order_info(db_connection, {'new_order':new_order})

        #새로 생성된 order 정보를 담은 order_history_info
        in_charge = request.account_id
        order_history_info = {
            'order_status_id' : new_order_history['order_status_id'],
            'order_id' : new_order_history['id'],
            'updated_at': new_order_history['created_at'],
            'account_id' : in_charge['account_id']
        }
        order_history = self.order_dao.insert_order_history(db_connection, order_history_info)
        updated_stocks = self.order_dao.update_product_stock_quantity(db_connection, order_info)

        return 'S100'

        
            



