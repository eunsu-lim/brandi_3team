import datetime

from flask      import (
    request, 
    jsonify, 
    Blueprint
)
from flask_request_validator  import(
    Param,
    PATH,
    GET,
    JSON,
    validate_params
)

from decorator            import login_required
from connection           import get_connection
from internal_code_sheet  import internal_code_sheet
from exceptions           import (
    NotFoundError,
    InvalidDataError,
    OutofStockError,
    PriceDoesNotMatchError,
    InvalidSalesQuantityError
)

def create_order_endpoints(order_service):
    order_bp = Blueprint('orders', __name__, url_prefix = '/orders')

    @order_bp.route('/status-updates', methods=['POST'])
    @validate_params(
        Param('order_status_id',JSON,int,required=True),
        Param('order_id',JSON,list,required=True)
    )
    @login_required
    def change_order_status(*args):
        """
        주문 상태를 변경합니다. 
        Args:
            order_id        : 주문 아이디,
            order_status_id : 주문상태 아이디,
        Returns:
            {'message':'SUCCESS','code':200}

        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        try:
            db_connection = get_connection()
            order_lists   = request.json
            print(order_lists,'request')
            for order in order_lists['order_id']:
                orders_dict   = {
                    "order_id": order,
                    "order_status_id" : order_lists['order_status_id']
                }
            orders_dict['account_id'] = request.account_id
            result = order_service.change_order_status(db_connection,orders_dict)
            if result:
                db_connection.commit()
                return jsonify(internal_code_sheet['S100']), (internal_code_sheet['S100']['code'])
        
        except NotFoundError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
        
        except InvalidDataError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
        
        except Exception as e:
            db_connection.rollback()
            return  jsonify({'error': f'{e}'}), 500

        finally:
            db_connection.close()

    @order_bp.route('/lists/<int:order_status_id>', methods=['GET'])
    @validate_params(
        Param('order_status_id',PATH,int,required=False),   #주문상태
        Param('searching_category',GET,str,required=False),  #검색어 종류
        Param('searching', GET,str,required=False),  #검색어
        Param('filter_ordering',GET,str,required=False),   #정렬기준 : 주문일순 or 주문일역순
        Param('filter_date_from',GET,str,required=False),  #주문일 시작
        Param('filter_date_to',GET,str,required=False),  #주문일 끝
        Param('offset',GET,int,required=False), #페이지네이션
        Param('limit',GET,int,required=False),  #페이지네이션
        Param('seller_attribute_id',GET,list,required=False),  #셀러속성
    )
    @login_required
    def get_order_lists(*args):
        """
        주문 리스트
        Args:
            order_status_id     : 주문 상태 아이디
            searching_category  : 검색항목
            searching           : 검색어
            filter_ordering     : 정렬기준
            filter_date_from    : 필터 시작날짜
            filter_date_to      : 필터 끝날짜
            offset              : 페이지네이션 시작
            limit               : 페이지네이션 끝
            seller_attribute_id : 셀러속성

        Returns:
            total_count : 주문 건수
            {'message':'SUCCESS','code':200}

        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        try:
            db_connection = get_connection()
            if args[4]:
                filter_date_from = datetime.datetime.strptime(args[4],'%Y-%m-%d')
            else:
                filter_date_from = ""
            if args[5]:
                filter_date_to   = datetime.datetime.strptime(args[5], '%Y-%m-%d')
            else:
                filter_date_to = ""

            filter_dict = {
                'order_status_id' : args[0],
                'searching_category' : args[1],
                'searching': args[2],
                'filter_ordering': args[3],
                'filter_date_from': filter_date_from,
                'filter_date_to': filter_date_to,
                'offset': args[6],
                'limit': args[7],
                'seller_attribute_id': args[8]
            }
            #filter_dict = {f'{key}':f'{value}' for (key, value) in filters.items() if value}
            print(filter_dict,'filter_dict')
            result = order_service.create_order_lists(db_connection, filter_dict)
            return jsonify(result),(internal_code_sheet['S100']['code'])
        
        except Exception as e:
            db_connection.rollback()
            return jsonify({'error': f'{e}'}), 500

        finally:
            db_connection.close()
    
    @order_bp.route('/make-orders/<int:product_id>', methods=['GET'])
    @validate_params(
        Param('product_id',PATH,int,required=True)
        )
    @login_required
    def get_product_options(*args):
        """
        주문 리스트
        Args:
            product_id     : 상품 아이디
        Returns:


        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.08(최지선) : 초기 생성
        """
        try:
            db_connection = get_connection()
            product = {
                'product_id' : args[0]
                 }
            product_options = order_service.get_product_option_lists(db_connection, product)
            return jsonify(product_options),200
        
        except OutofStockError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
        
        except Exception as e:
            db_connection.rollback()
            return jsonify({'error': f'{e}'}), 500

        finally:
            db_connection.close()
      
        
        
    @order_bp.route('/make-orders', methods=['POST'])
    @validate_params(
        #들어온 파라미터들을 유효성 검사
        #상품 주문정보
        Param('product_id',JSON,int,required=True),
        Param('color_id',JSON,int,required=True),
        Param('size_id',JSON,int,required=True),
        Param('quantity',JSON,int,required=True),
        Param('discount_status_id',JSON,int,required=True),
        Param('sales_price',JSON,int,required=True),
        Param('discount_price',JSON,int,required=True),
        Param('paid_total',JSON,int,required=True),
        #주문자 정보
        Param('customer_name',JSON,str,required=True),
        Param('phone_number',JSON,str,required=True),
        Param('postal_code',JSON,str,required=True),
        Param('address_1',JSON,str,required=True),
        Param('address_2',JSON,str,required=True),
    )
    @login_required
    def make_orders(*args):
        """
        새로운 주문을 생성합니다. 
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
        try:
            #db 접속
            db_connection = get_connection()
            #request 로 들어온 order_info 받기
            order_info = request.json
            seller_id  = request.seller_id
            result     = order_service.create_new_order(db_connection, order_info)

            #주문 성공
            if result == 'S100':
                db_connection.commit()
                return jsonify(internal_code_sheet[result]), (internal_code_sheet[result]['code'])
        
        except OutofStockError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
        
        except InvalidSalesQuantityError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])

        except PriceDoesNotMatchError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
       
        except Exception as e:
            db_connection.rollback()
            return jsonify({'error': f'{e}'}), 500
        
        finally:
            db_connection.close()

    return order_bp
