import re
import pandas as pd
import boto3

from datetime    import datetime
from connection  import get_connection, get_s3_connection

class ProductService:
    def __init__(self, product_dao):
        self.product_dao = product_dao
    
    def get_products(self, filter_dict, db_connection):
        """ 상품 리스트 전달

        Args:
            db_connection : 연결된 db 객체

        Author:
            김성진
        
        History:
            2020-10-30 (김성진): 초기 생성
        """
        
        products = self.product_dao.get_products(filter_dict, db_connection)

        for product in products:
            if product['discount_status']:
                if product['discount_rate'] is None:
                    product['discount_rate'] = 0
                discounted_price = product['sales_price'] - (product['sales_price'] * product['discount_rate'])
                product['discounted_price'] = discounted_price
        
        return products
    
    def get_total_number(self, filter_dict, db_connection):
        """ 총 상품 개수
        
        Args:
            filter_info : 필터 정보
            db_connection : 연결된 db 객채

        Author:
            김성진
        
        History:
            2020-11-10 (김성진): 초기 생성
        """

        total_number = self.product_dao.get_total_products(filter_dict, db_connection)

        return total_number['totalproducts']

    
    def create_excel(self, product_id_list, db_connection):
        
        """ 상품 정보 엑셀 파일 다운로드

        특정 아이디의 상품 정보를 엑셀 파일로 다운로드 한다.

        Author:
            김성진
        
        History:
            2020-11-04 (김성진): 초기생성
        """
    
        if len(product_id_list) > 0:
            s3 = get_s3_connection()

            fixed_products = self.product_dao.get_excel(product_id_list, db_connection)

            excel_file = pd.DataFrame({
                "대표이미지" : products['thumbnail'],
                "상품명"    : products['name'],
                "상품번호"   : products['id'],
                "상품코드"   : products['code'],
                "셀러속성"   : products['type'],
                "셀러명"    : products['name_korean'],
                "판매가"    : products['sales_price'],
                "할인가"    : (products['sales_price'], - (products['sales_price'] * products['discount_rate'])),  
                "판매여부"   : products['sales_status_id'],
                "진열여부"   : products['display_status_id'],
                "할인여부"   : products['discount_status_id']
            } for products in fixed_products)

            file_name = 'test.xlsx'
            file = f'../{file_name}'

            excel_file.to_excel(file, encoding='utf8')

            s3.upload_file(file, "brandi-3team", file_name)
            
            file_url = f'https://brandi-3team.s3.ap-northeast-2.amazonaws.com/{file_name}'

            return file_url


    def product_status_change(self, fixed_products, db_connection):

        """ 상품 판매여부 및 진열여부 수정

        Author: 
            김성진

        History:
            2020-11-04 (김성진): 초기 생성
        """

        
        # 상품 상태 변경
        status_modified = self.product_dao.update_products(fixed_products, db_connection)
        
        return status_modified