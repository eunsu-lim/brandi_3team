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
        order_counts = self.seller_dao.get_seller_order_counts(db_connection, seller_id)
        seller_data = self.seller_dao.get_seller_data(seller_id, db_connection)
        return {'order_counts': order_counts, 'seller_data': seller_data}


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


    # 
    # 비밀번호 변경 로직
    def edit_seller_password(self, seller_info, db_connection):
        """
        셀러가 비밀번호를 변경 합니다. 
            Args:
                    password            : 패스워드,
                    new password        : 변경할 패스워드,
            Returns:

            Authors:
                limes1787@gmail.com(임은수)
            
            History:
                2020.11.04(임은수) : 초기 생성
        """
        
        # 기존 암호(복호화한 후)를 가져와서 비밀번호가 맞는지 확인 
        seller_data = self.seller_dao.get_seller_password(seller_info, db_connection)
        password_validation = validate_password(seller_info['new_password'])

        if password_validation != False:
            return password_validation
    
        if seller_data:
            # bcrypt.checkpw(암호화되지 않은 비밀번호, 암호화된 비밀번호)
            if bcrypt.checkpw(seller_info['password'].encode('utf-8'),seller_data['password'].encode('utf-8')):
                # seller_info['new_passaword'] 을 암호화해서 db에 저장
                seller_info['password'] = bcrypt.hashpw(
                    seller_info['new_password'].encode('utf-8'),bcrypt.gensalt()
                ).decode('utf-8')
                result = self.seller_dao.edit_seller_password(seller_info, db_connection)

                return 'S100'

            #checkpw 실패할 경우 (ex)invalid salt)
            raise InvalidDataError('S107')
        #seller_data 가 None 인 경우
        raise NotFoundError('S108')


    def seller_detail_infos(self, seller_info, db_connection):
        """
        셀러의 상세 정보를 가져옵니다. 
            Authors:
                limes1787@gmail.com(임은수)
            
            History:
                2020.11.07(임은수) : 초기 생성
        """

        seller_data = self.seller_dao.get_seller_detail_infos(seller_info, db_connection)
        if seller_data:
            return {'seller_data' : seller_data}
            
        #seller_data 가 None 인 경우
        raise NotFoundError('S108')


    def edit_seller_detail_infos(self, seller_info, seller_profile, seller_back, db_connection):
        """
        셀러의 상세 정보를 수정합니다.
            Authors:
                limes1787@gmail.com(임은수)
            History:
                2020.11.07(임은수) : 초기 생성
        
        """

        s3 = boto3.client(
            "s3",
            aws_access_key_id      = config.S3_ACCESS_KEY_LES,
            aws_secret_access_key  = config.S3_SECRET_KEY_LES
        )

        # 셀러 프로필 이미지가 있으면
        if seller_profile:
            s3.upload_fileobj(
                seller_profile, 
                config.S3_BUCKET_LES,
                "seller_profile/{}".format(seller_info['account_id']),
                ExtraArgs={
                    "ContentType": seller_profile.content_type
                }
            )     
            seller_info["profile_image"] = "https://eunsulim.s3.ap-northeast-2.amazonaws.com/seller_profile/{}".format(seller_info['account_id'])
            result = self.seller_dao.edit_seller_profile(seller_info, db_connection)


        # 셀러 배경 이미지가 있으면
        if seller_back:
            s3.upload_fileobj(
                seller_back, 
                config.S3_BUCKET_LES,
                "seller_back/{}".format(seller_info['account_id']),
                ExtraArgs={
                    "ContentType": seller_back.content_type
                }
            )
            seller_info["background_image_url"] = "https://eunsulim.s3.ap-northeast-2.amazonaws.com/seller_back/{}".format(seller_info['account_id'])
            result = self.seller_dao.edit_seller_back(seller_info, db_connection)
        

        

        # 수정할 데이터를 가져와서 넣어준다. 
        seller_data = self.seller_dao.get_seller_detail_infos(seller_info, db_connection)
        if seller_data:
            # 가져온 데이터를 수정한다.
            result = self.seller_dao.edit_seller_detail_infos(seller_info, db_connection)
            return 'S100'
        
        
        #seller_data 가 None 인 경우
        raise NotFoundError('S108')

