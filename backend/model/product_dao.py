import pymysql

class ProductDao:
    def get_products(self, products, db_connection):
        """ 상품 리스트 구현

        쿼리 파라미터에 따른 필터링된 상품 리스트 전달.

        args:
            product_info : 필터링을 위한 상품 정보
            db_connection: 데이터베이스를 지칭하는 객체
        
        returns:
            200: 필터링된 상품 리스트
        
        Author:
            김성진 (kimsj5259@gmail.com)
        
        History:
            2020-10-31 (김성진): 초기 생성
        """

        with db_connection.cursor() as cursor:            
            filter_query = """
                SELECT
                    p.id,
                    p.name,
                    p.thumbnail,
                    p.code,
                    p.sales_price,
                    p.discount_rate,
                    ds.status AS display_status,
                    ss.status AS sales_status,
                    dcs.status AS discount_status,
                    s_attr.type,
                    p.created_at,
                    p.register_status,
                    s.name_korean
                FROM products AS p

                #셀러 정보 조인
                INNER JOIN sellers AS s ON s.id = p.seller_id

                #셀러 속성 조인
                INNER JOIN seller_attributes As s_attr ON s_attr.id = s.seller_attribute_id

                #판매여부
                INNER JOIN sales_status AS ss ON ss.id = p.sales_status_id

                #진열여부
                INNER JOIN display_status AS ds ON ds.id = p.display_status_id

                #할인여부
                INNER JOIN discount_status AS dcs ON dcs.id = p.discount_status_id

                WHERE p.is_delete = 0
                AND s.is_delete = 0
                """
                
            #조회기간 시작 
            if products.get('filterDateFrom', None):
                filter_query += " AND p.created_at >= %(filterDateFrom)s "
                
            #조회기간 끝
            if products.get('filterDateTo', None):
                filter_query += " AND p.created_at <= %(filterDateTo)s "

            #셀러명
            if products.get('sellerName', None):
                products['sellerName'] = f"%{products['sellerName']}%"
                filter_query += " AND s.name_korean LIKE %(sellerName)s "

            #상품이름
            if products.get('productName', None):
                products['productName'] = f"%{products['productName']}%"
                filter_query += " AND p.name LIKE %(productName)s "
            
            #상품번호
            if products.get('product_id', None):
                filter_query += " AND p.id = %(product_id)s "

            #상품코드
            if products.get('productCode', None):
                filter_query += " AND p.code = %(productCode)s "

            #셀러속성
            #sellertype = list(map(str, products['sellerType'])) 
            #products['sellerType'] = tuple(sellertype)      #리스트로 받아온 것을 튜플로
            if products.get('sellerType', None):
                filter_query += " AND s_attr.id IN %(sellerType)s "

            #판매여부 (0은 전체, 1은 판매, 2는 미판매)
            if products.get('salesStatus', None):
                filter_query += " AND p.sales_status_id = %(salesStatus)s "

            #진열여부
            if products.get('displayStatus', None):
                filter_query += " AND p.display_status_id = %(displayStatus)s "

            #할인여부
            if products.get('discountStatus', None):
                filter_query += " AND p.discount_status_id = %(discountStatus)s "

            filter_query += """
            LIMIT
                %(limit)s
            OFFSET
                %(offset)s
            """   
            # 카운트해서 product 숫자만큼
            cursor.execute(filter_query, products)
            
            filtered_product = cursor.fetchall()
            
            return filtered_product

    
    def get_total_products(self, total_number, db_connection):
        """ 전체 상품 조회건수

        쿼리 파라미터에 따른 필터링된 상품 리스트의 조회건수
        
        returns:
            200: 필터링된 상품의 조회건수
        
        Author:
            김성진 (kimsj5259@gmail.com)
        
        History:
            2020-11-10 (김성진): 초기 생성
        """

        with db_connection.cursor() as cursor:            
            filter_query = """
                SELECT COUNT(*) AS totalproducts
                FROM products AS p
                
                INNER JOIN sellers AS s ON s.id = p.seller_id

                INNER JOIN seller_attributes As s_attr ON s_attr.id = s.seller_attribute_id

                INNER JOIN sales_status AS ss ON ss.id = p.sales_status_id

                INNER JOIN display_status AS ds ON ds.id = p.display_status_id
                
                INNER JOIN discount_status AS dcs ON dcs.id = p.discount_status_id

                WHERE p.is_delete = 0
                AND s.is_delete = 0
                """
            
            #조회기간 시작 
            if total_number.get('filterDateFrom', None):
                filter_query += " AND p.created_at >= %(filterDateFrom)s "
                
            #조회기간 끝
            if total_number.get('filterDateTo', None):
                filter_query += " AND p.created_at <= %(filterDateTo)s "

            #셀러명
            if total_number.get('sellerName', None):
                total_number['sellerName'] = f"%{total_number['sellerName']}%"
                filter_query += " AND s.name_korean LIKE %(sellerName)s "

            #상품이름
            if total_number.get('productName', None):
                total_number['productName'] = f"%{total_number['productName']}%"
                filter_query += " AND p.name LIKE %(productName)s "
            
            #상품번호
            if total_number.get('product_id', None):
                filter_query += " AND p.id = %(product_id)s "

            #상품코드
            if total_number.get('productCode', None):
                filter_query += " AND p.code = %(productCode)s "

            #셀러속성
            if total_number.get('sellerType', None):
                filter_query += " AND s_attr.id IN %(sellerType)s "

            #판매여부 (0은 전체, 1은 판매, 2는 미판매)
            if total_number.get('salesStatus', None):
                filter_query += " AND p.sales_status_id = %(salesStatus)s "

            #진열여부
            if total_number.get('displayStatus', None):
                filter_query += " AND p.display_status_id = %(displayStatus)s "

            #할인여부
            if total_number.get('discountStatus', None):
                filter_query += " AND p.discount_status_id = %(discountStatus)s "

            # 카운트해서 product 숫자만큼
            cursor.execute(filter_query, total_number)

            total_products = cursor.fetchone()

            return total_products


    def get_excel(self, products, db_connection):
        """ 상품 리스트 구현

        product_id의 따라 값에 따라 상품 정보가 들어있는 엑셀파일 링크 전달.

        args:
            product_info : 필터링을 위한 상품 정보
            db_connection: 데이터베이스를 지칭하는 객체
        
        returns:
            200: 필터링된 상품 리스트
        
        Author:
            김성진 (kimsj5259@gmail.com)
        
        History:
            2020-10-31 (김성진): 초기 생성
        """

        with db_connection.cursor() as cursor:
            
            filter_query = """
                SELECT
                    p.id,
                    p.name,
                    p.thumbnail,
                    p.code,
                    p.sales_price,
                    p.discount_rate,
                    p.sales_status_id,
                    p.display_status_id,
                    p.discount_status_id,
                    s_attr.type,
                    s.name_korean
                FROM products AS p

                #셀러 정보 조인
                INNER JOIN sellers AS s ON s.id = p.seller_id

                #셀러 속성 조인
                INNER JOIN seller_attributes As s_attr ON s_attr.id = s.seller_attribute_id

                #판매여부
                INNER JOIN sales_status AS ss ON ss.id = p.sales_status_id

                #진열여부
                INNER JOIN display_status AS ds ON ds.id = p.display_status_id

                #할인여부
                INNER JOIN discount_status AS dcs ON dcs.id = p.discount_status_id

                WHERE p.is_delete = 0
                AND s.is_delete = 0
                """

            # str -> int로 변환,
            products_number = list(map(int, products['product_id']))
            # 리스트에서 튜플로 다시 변환
            products_number = tuple(products_number)
            
            #받아온 값을 여기에
            products['product_id'] = products_number
            
            if products.get('product_id', None):
                filter_query += " AND p.id IN %(product_id)s "
                #filter_query += " AND p.id IN (1,2,3) "

            filtered_product = cursor.execute(filter_query, products)
            
            return cursor.fetchall()


    def update_products(self, status_modified, db_connection):
        """
        상품의 판매여부 및 진열여부 업데이트

        Args:
            db_connection   : 데이터베이스
            status_modified : 상품의 판매여부 및 진열여부 수정 사항
        
        Returns:
            200: 필터링 된 상품
        
        Author:
            김성진(kimsj5259@gmail.com)
        
        History:
            2020-11-04(김성진): 초기 생성
        
        """

        with db_connection.cursor(pymysql.cursors.DictCursor) as cursor:
            
            filter_query = """
                UPDATE
                    products
                SET
                    sales_status_id   = %(salesStatusModify)s,
                    display_status_id = %(displayStatusModify)s
                WHERE
                    id IN %(product_id)s
            """

            cursor.execute(filter_query, status_modified)
            
            return cursor.fetchall()
