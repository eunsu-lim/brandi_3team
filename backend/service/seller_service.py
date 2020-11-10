import jwt
import bcrypt

from utils      import validate_password
from exceptions import (
    DuplicatedDataError,
    InvalidDataError,
    NotFoundError
)

class SellerService:
    def __init__(self, seller_dao, config):
        self.seller_dao = seller_dao
        self.config     = config
    
    def get_seller_orders(self, db_connection, seller_id):
        """
        셀러의 주문 현황를 조회합니다. 
            Args:
                seller_id: 셀러 아이디
             
            Returns:
                {
                    "date": 날짜,
                    "counts": 주문건수,
                    "amounts":주문금액
                }   
            Authors:
                jisunn0130@gmail.com(최지선)
            
            History:
                2020.11.08(최지선) : 초기 생성
        """
        print('sss',seller_id)
        order_counts = self.seller_dao.get_seller_order_counts(db_connection, seller_id)
        return order_counts


    def create_new_account(self, seller_info, db_connection):
        """
        새로운 셀러를 생성합니다.
            Args:
                    account_name        : 셀러 아이디,
                    password            : 패스워드,
                    name_english        : 영문 셀러명,
                    name_korean         : 셀러명,
                    cs_contact          : 고객센터 전화번호 ,
                    seller_attribute_id : 셀러 속성 PK(쇼핑몰 마켓  로드샵  디자이너브랜드  제너럴브랜드  내셔널브랜드  뷰티),
                    phone_number        : 담당자 전화번호,
            Returns:
                password_validation : 비밀번호 유효성 검사 결과 
                DuplicatedDataError : 중복 아이디 검사 실패 시 에러 반환
                S100                : 회원가입 성공 코드

            Authors:
                jisunn0130@gmail.com(최지선)
            
            History:
                2020.10.28(최지선) : 초기 생성
        """
        #비밀번호 유효성 검사를 통과하지 못할 경우 exception을 controller 로 반환
        password_validation = validate_password(seller_info['sellerPassword'])
        if password_validation != False:
            return password_validation
        
        #아이디 중복 검사를 통과하지 못할 경우 exception 을 일으킴
        existing_account = self.seller_dao.get_account(seller_info, db_connection)
        if existing_account:
            raise DuplicatedDataError('S106')
        
        #유효성 검사를 다 거쳐서 데이터베이스에 데이터 저장 (비밀번호 암호화)
        seller_info['sellerPassword'] = bcrypt.hashpw(
                seller_info['sellerPassword'].encode('utf-8'),bcrypt.gensalt()
                ).decode('utf-8')
        result = self.seller_dao.insert_seller(seller_info, db_connection)
        return 'S100'
    
    def get_seller_data(self, seller_id, db_connection):
        """
        Home 화면에 나타나는 seller의 data를 가져옵니다.
        """
        seller_data = self.seller_dao.get_seller_data(seller_id, db_connection)
        return seller_data