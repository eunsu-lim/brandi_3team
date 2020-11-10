import pymysql

from exceptions    import (
    OutofStockError,
    NotFoundError
)

class OrderDao:
    def get_order_info(self, db_connection, new_order):
        """
        주문이 생성된 시점에 이력정보를 저장하기 위해 주문 기록을 조회합니다. 
        Args:
            new_order : 주문 아이디,
        Returns:
            order: 주문 아이디, 주문상태아이디, 생성일을 담은 주문 정보
        Authors:
            jisunn0130@gmail.com(최지선)
        History:
            2020.11.04(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            get_order_info_query = """
            SELECT id, order_status_id, created_at
            FROM orders
            WHERE id=%(new_order)s
            """
            cursor.execute(get_order_info_query, new_order)
            order = cursor.fetchone()
            if not order:
                raise NotFoundError('S000')
            return order
    
    def insert_order_history(self, db_connection, order_history_info):
        """
        새 주문이 생성된 시점 / 기존 주문이 변경되는 시점에 주문 상태 기록을 생성합니다. 
        Args:
            order_status_id : 변경할 주문 상태
            order_id : 주문 아이디
            updated_at: 주문 생성 시점
            account_id : 주문한 계정
        Returns:
            cursor.lastrowid : 변경된 주문기록에 대한 아이디
        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            insert_order_history_query = """
            INSERT INTO order_status_history (
                order_status_id,
                order_id,
                updated_at, 
                account_id
            ) VALUES (
                %(order_status_id)s,
                %(order_id)s,
                now(),
                %(account_id)s
            )
            """
            #order_id 가 여러 개
            if type(order_history_info['order_id']) == tuple:
                row_list = []
                for order in order_history_info['order_id']:
                    new_dict = {
                        "order_status_id" : order_history_info['order_status_id'],
                        'order_id' : order,
                        'account_id' : order_history_info['account_id']
                    }

                    cursor.execute(insert_order_history_query, new_dict)
                    row_list.append(cursor.lastrowid)
                if len(row_list) != len(order_history_info['order_id']):
                    raise NotFoundError('S000')
                return row_list

            # order_id 1 개
            else:
                cursor.execute(insert_order_history_query, order_history_info)
                if not cursor.lastrowid:
                    raise NotFoundError('S000')
                return cursor.lastrowid

    def update_order_status(self, db_connection, order_lists):
        """
        주문 상태를 변경합니다. 
        Args:
            order_id        : 주문 아이디,
            order_status_id : 주문상태 아이디,
        Returns:
            cursor.fetchall(): 상태 변경된 주문 리스트

        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            update_order_status_query = """ 
            UPDATE orders
            SET order_status_id = %(order_status_id)s
<<<<<<< HEAD
            WHERE id=%(order_id)s
=======
            WHERE id in %(order_id)s
>>>>>>> master
            """
            cursor.execute(update_order_status_query, order_lists)
            return cursor.rowcount
    
    def get_order_counts(self, db_connection, filter_dict):
        """
        조건에 맞는 주문 건수를 조회합니다. 
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
            order_counts : 주문 건수

        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.04(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            get_order_count_query = """
            SELECT
                count(orders.id) as count
            FROM orders
            INNER JOIN colors ON orders.color_id=colors.id
            INNER JOIN sizes ON orders.size_id=sizes.id
            INNER JOIN products ON orders.product_id = products.id
            INNER JOIN sellers ON products.seller_id = sellers.id
            INNER JOIN shipments ON orders.shipment_id = shipments.id
            INNER JOIN order_status_history ON orders.id = order_status_history.order_id
            WHERE orders.id >= 1
            """
            
            #주문상태
            if filter_dict.get('order_status_id', None):
                add_query = """
                AND orders.order_status_id=%(order_status_id)s
                """
                get_order_count_query += add_query
            
            if filter_dict['order_status_id'] in [2,3,4,5]:
                add_query = """
                AND order_status_history.order_status_id=%(order_status_id)s
                """
                get_order_count_query += add_query

            if filter_dict.get('searching_category', None):
                #주문번호
                if filter_dict['searching_category'] == '1': 
                    add_query = """
                    AND order_number = %(searching)s
                    """
                    get_order_count_query += add_query
                #주문상세번호
                elif filter_dict['searching_category'] == '2': 
                    add_query = """
                    AND detailed_order_number = %(searching)s
                    """
                    get_order_count_query += add_query
                #주문자명
                elif filter_dict['searching_category'] == '3': 
                    add_query = """
                    AND customer_name = %(searching)s
                    """
                    get_order_count_query+= add_query
                #핸드폰번호
                elif filter_dict['searching_category'] == '4': 
                    add_query = """
                    AND phone_number = %(searching)s
                    """
                    get_order_count_query += add_query
                #셀러명
                elif filter_dict['searching_category'] == '5': 
                    add_query = """
                    AND sellers.name_korean = %(searching)s
                    """
                    get_order_count_query += add_query
                #상품명
                elif filter_dict['searching_category'] == '6': 
                    add_query = """
                    AND products.name = %(searching)s
                    """
                    get_order_count_query += add_query
            #조회 기간
            if filter_dict.get('filter_date_from', None):
                add_query= """
                AND orders.created_at >= %(filter_date_from)s
                """
                get_order_count_query += add_query
            
            if filter_dict.get('filter_date_to', None):
                add_query= """
                AND orders.created_at <= %(filter_date_to)s
                """
                get_order_count_query += add_query

            #셀러 속성
            if filter_dict.get('seller_attribute_id', None):
                if filter_dict['seller_attribute_id'][0] == '1':
                    get_order_count_query += ''
                else:
                    add_query = """
                    AND sellers.seller_attribute_id in %(seller_attribute_id)s
                    """
                    get_order_count_query += add_query
            
            cursor.execute(get_order_count_query,filter_dict)
            orders = cursor.fetchone()
            return orders['count']

    def get_orders(self, db_connection, filter_dict):
        """
        주문 리스트
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
            cursor.fetchall() : 주문 리스트

        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            get_order_lists_query = """
            SELECT 
                orders.id as order_id,
                orders.created_at as paid_date,
                order_number, 
                detailed_order_number, 
                sellers.name_korean as seller_name,
                products.name as product_name,
                quantity,
                shipments.customer_name, 
                shipments.phone_number,
                paid_total, 
                orders.order_status_id,
                colors.color,
                sizes.size,
                order_status_history.updated_at
            FROM orders
            INNER JOIN colors ON orders.color_id=colors.id
            INNER JOIN sizes ON orders.size_id=sizes.id
            INNER JOIN products ON orders.product_id = products.id
            INNER JOIN sellers ON products.seller_id = sellers.id
            INNER JOIN shipments ON orders.shipment_id = shipments.id
            INNER JOIN order_status_history ON orders.id = order_status_history.order_id
            WHERE 1 = 1
            """
    
            #주문상태
            if filter_dict.get('order_status_id', None):
                add_query = """
                AND orders.order_status_id=%(order_status_id)s
                """
                get_order_lists_query += add_query
            
            #주문상태 변경시각 
            if filter_dict['order_status_id'] in [2,3,4,5]:
                add_query = """
                AND order_status_history.order_status_id=%(order_status_id)s
                """
                get_order_lists_query += add_query
    
            if filter_dict.get('searching_category', None):
                #주문번호
                if filter_dict['searching_category'] == '1': 
                    add_query = """
                    AND order_number = %(searching)s
                    """
                    get_order_lists_query += add_query
                #주문상세번호
                elif filter_dict['searching_category'] == '2': 
                    add_query = """
                    AND detailed_order_number = %(searching)s
                    """
                    get_order_lists_query += add_query
                #주문자명
                elif filter_dict['searching_category'] == '3': 
                    add_query = """
                    AND customer_name = %(searching)s
                    """
                    get_order_lists_query += add_query
                #핸드폰번호
                elif filter_dict['searching_category'] == '4': 
                    add_query = """
                    AND phone_number = %(searching)s
                    """
                    get_order_lists_query += add_query
                #셀러명
                elif filter_dict['searching_category'] == '5': 
                    add_query = """
                    AND sellers.name_korean = %(searching)s
                    """
                    get_order_lists_query += add_query
                #상품명
                elif filter_dict['searching_category'] == '6': 
                    add_query = """
                    AND products.name = %(searching)s
                    """
                    get_order_lists_query += add_query
            #조회기간
            if filter_dict.get('filter_date_from', None):
                add_query= """
                AND orders.created_at >= %(filter_date_from)s
                """
                get_order_lists_query += add_query
            
            if filter_dict.get('filter_date_to', None):
                add_query= """
                AND orders.created_at <= %(filter_date_to)s
                """
                get_order_lists_query += add_query

            #셀러 속성
            if filter_dict.get('seller_attribute_id', None):
                if filter_dict['seller_attribute_id'][0] == '1':
                    get_order_lists_query += ''
                else:
                    add_query = """
                    AND sellers.seller_attribute_id in %(seller_attribute_id)s
                    """
                    get_order_lists_query += add_query
            
            #오더링
            if filter_dict.get('filter_ordering', None):
                #최신 주문일순
                if filter_dict['filter_ordering'] == '1':
                    add_query = """
                    ORDER BY orders.created_at DESC
                    """
                    get_order_lists_query += add_query
                #주문일역순
                elif filter_dict['filter_ordering'] == '2':
                    add_query = """
                    ORDER BY orders.created_at ASC
                    """
                    get_order_lists_query += add_query
                
            #페이지네이션
            if filter_dict.get('limit', None):
                if filter_dict.get('offset', None):
                    add_query = """
                    LIMIT %(limit)s
                    OFFSET %(offset)s
                    """
                    get_order_lists_query += add_query
                else:
                    add_query = """
                    LIMIT %(limit)s
                    """
                    get_order_lists_query += add_query
            cursor.execute(get_order_lists_query,filter_dict)
            return cursor.fetchall()

    def get_order_id(self, db_connection):
        """
        가장 최근 주문 아이디 가져오기
        Args:
            
        Returns:
            cursor.fetchone() : 최근 주문 아이디
        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            get_order_id_query = """
            SELECT id 
            FROM orders
            ORDER BY created_at
            DESC LIMIT 1
            """
            cursor.execute(get_order_id_query)
            return cursor.fetchone()

    def insert_shipment(self, db_connection, order_info):
        """
        새로운 주문자 정보를 저장
        Args:
            customer_name      : 주문자 이름
            phone_number       : 핸드폰 번호 
            postal_code        : 우편번호
            address_1          : 도로명주소
            address_2          : 상세주소
            
        Returns:
            cursor.lastrowid : 생성된 주문자 정보의 아이디
        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            insert_shipment_query = """
            INSERT INTO shipments (
                customer_name,
                phone_number,
                postal_code,
                address_1,
                address_2
            ) VALUES (
                %(customer_name)s,
                %(phone_number)s,
                %(postal_code)s,
                %(address_1)s,
                %(address_2)s
            )
            """
            cursor.execute(insert_shipment_query, order_info)
            return cursor.lastrowid
    
    def insert_order(self, db_connection, order_info):
        """
        새로운 주문 정보를 저장
        Args:
            product_id         : 상품 아이디
            color_id           : 컬러 아이디
            size_id            : 사이즈 아이디
            quantity           : 주문 수량
            discount_status_id : 할인여부 
            sales_price        : 판매가
            discount_price     : 할인가
            paid_total         : 총 결제금액
        Returns:
            cursor.lastrowid : 생성된 주문 정보의 아이디
        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            insert_order_query = """
            INSERT INTO orders (
                product_id,
                order_number,
                detailed_order_number,
                quantity,
                shipment_id,
                paid_total,
                color_id,
                size_id,
                sales_price,
                discount_price,
                discount_status_id,
                order_status_id
            ) VALUES (
                %(product_id)s,
                %(order_number)s,
                %(detailed_order_number)s,
                %(quantity)s,
                %(shipment_id)s,
                %(paid_total)s,
                %(color_id)s,
                %(size_id)s,
                %(sales_price)s,
                %(discount_price)s,
                %(discount_status_id)s,
                1
            )
            """
            #order table 에 새로운 order 저장
            cursor.execute(insert_order_query, order_info)
            return cursor.lastrowid
    
    def check_product_options(self, db_connection, order_info):
        """
        주문 요청에 대해 컬러, 사이즈, 재고 여부 확인
        Args:
            product_id         : 상품 아이디
            color_id           : 컬러 아이디
            size_id            : 사이즈 아이디
            discount_statud_id : 할인 여부
        Returns:
            available_stock : 주문 가능한 재고 수량
        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            check_product_options_query = """
            SELECT 
                stock_quantity
            FROM 
                product_options
            RIGHT JOIN products ON product_options.product_id=products.id
            WHERE is_delete=0
            AND sales_status_id=2
            AND display_status_id=2
            AND discount_status_id=%(discount_status_id)s
            AND products.id=%(product_id)s
            AND size_id=%(size_id)s
            AND color_id=%(color_id)s
            """
            cursor.execute(check_product_options_query, order_info)
            available_stock = cursor.fetchone()
            if not available_stock:
                raise OutofStockError('S110')
            return available_stock
    
    def get_product_size_options(self, db_connection, product):
        """
        상품 사이즈 옵션을 조회합니다. 
        Args:
            product_id        : 상품 아이디
        Returns:
            cursor.fetchall() : 상품 사이즈 옵션
        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.08(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            get_product_size_query = """
            SELECT 
                sizes.size
            FROM 
                product_options
            INNER JOIN products ON product_options.product_id=products.id
            INNER JOIN sizes ON product_options.size_id=sizes.id
            WHERE is_delete=0
            AND sales_status_id=2
            AND display_status_id=2
            AND products.id=%(product_id)s
            """
            cursor.execute(get_product_size_query, product)
            sizes = cursor.fetchall()
            if not sizes:
                raise OutofStockError('S110')
            return sizes
    
    def get_product_color_options(self, db_connection, product):
        """
        상품 컬러 옵션을 조회합니다. 
        Args:
            product_id        : 상품 아이디
        Returns:
            cursor.fetchall() : 상품 사이즈 옵션
        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.08(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            get_product_color_query = """
            SELECT 
                colors.color
            FROM 
                product_options
            INNER JOIN products ON product_options.product_id=products.id
            INNER JOIN colors ON product_options.color_id=colors.id
            WHERE is_delete=0
            AND sales_status_id=2
            AND display_status_id=2
            AND products.id=%(product_id)s
            """
            cursor.execute(get_product_color_query, product)
            colors = cursor.fetchall()
            if not colors:
                raise OutofStockError('S110')
            return colors
    
    def get_product_price(self, db_connection, order_info):
        """
        상품 가격 확인
        Args:
            product_id         : 상품 아이디
            discount_statud_id : 할인 여부
        Returns:
            cursor.fetchone() : 상품 가격, 할인률
        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            get_price_query = """
            SELECT sales_price, discount_rate
            FROM products
            WHERE is_delete=0 
            AND sales_status_id=2
            AND display_status_id=2
            AND discount_status_id=%(discount_status_id)s
            AND products.id=%(product_id)s
            """
            cursor.execute(get_price_query, order_info)
            return cursor.fetchone()
    
    def get_product_sales_quantity(self, db_connection, order_info):
        """
        상품의 최소, 최대 구매 수량 확인
        Args:
            product_id         : 상품 아이디
            discount_statud_id : 할인 여부
        Returns:
            cursor.fetchone() : 상품 최소, 최대수량
        Authors:
            jisunn0130@gmail.com(최지선)
        
        History:
            2020.11.03(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            get_quantity_query = """
            SELECT min_sales_quantity, max_sales_quantity
            FROM products
            WHERE is_delete=0 
            AND sales_status_id=2
            AND display_status_id=2
            AND discount_status_id=%(discount_status_id)s
            AND products.id=%(product_id)s
            """
            cursor.execute(get_quantity_query, order_info)
            return cursor.fetchone()
    
    def update_product_stock_quantity(self, db_connection, order_info):
        """
        Args:
            product_id         : 상품 아이디
            color_id           : 컬러 아이디
            size_id            : 사이즈 아이디
            quantity           : 주문 수량
            discount_status_id : 할인여부

        Returns:
            rows : 업데이트 된 열 수
        Authors:
            jisunn0130@gmail.com(최지선)
        History:
            2020.11.03(최지선) : 초기 생성
        """
        with db_connection.cursor() as cursor:
            update_product_stock_query = """
            UPDATE product_options
            RIGHT JOIN products 
            ON product_options.product_id=products.id
            SET stock_quantity=stock_quantity-%(quantity)s
            WHERE is_delete=0 
            AND sales_status_id=2
            AND display_status_id=2
            AND discount_status_id=%(discount_status_id)s
            AND products.id=%(product_id)s
            AND size_id=%(size_id)s
            AND color_id=%(color_id)s
            """
            cursor.execute(update_product_stock_query, order_info)
            rows = cursor.rowcount
            if not rows:
                raise NotFoundError('S000')
            return rows
