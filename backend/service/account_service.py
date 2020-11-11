import jwt
import bcrypt
from config import SECRET_KEY

from datetime   import datetime, timedelta

class AccountService:
    def __init__(self, account_dao, config):
        self.account_dao = account_dao
        self.config      = config

    def login(self, credential, db_connection):
        account_name    = credential['sellerId']
        password        = credential['sellerPassword']
        # account_dao에서 해당 함수를 실행하여 account_name과 일치하는 id, password, type_id를 가져 옴
        user_credential = self.account_dao.get_user_info(account_name, db_connection)
        
        # 클라이언트가 입력한 pw와 db에 저장된 pw를 비교하여 true or false로 반환
        authorized = bcrypt.checkpw(password.encode('UTF-8'), user_credential['password'].encode('UTF-8'))

        return authorized

    def get_user_info(self, account_name, db_connection):
        return self.account_dao.get_user_info(account_name, db_connection)

    def generate_access_token(self, account_id, account_type_id):
        payload = {
            'account_id' : account_id,
            'account_type_id':account_type_id,
            'exp'        : datetime.utcnow() + timedelta(seconds = 60 * 60 * 24)
        }
        token   = jwt.encode(payload, SECRET_KEY, 'HS256')

        return token.decode('UTF-8')

    def get_nav_and_button(self, account_type_id, db_connection):
        # dao에서 받은 데이터를 nav_data에 선언
        nav_data = self.account_dao.get_nav_list(account_type_id, db_connection)
        # nav에 url을 추가하기 위해 menu_url과 sub_url을 선언
        menu_url = {
            '홈':'/home',
            '통계':'',
            '주문관리':'',
            '취소/환불관리':'',
            '상품관리':'',
            '고객응대관리':'',
            '기획전/쿠폰관리':'',
            '회원관리':'',
            '공지사항' : '',
            '정산관리':'',
            '진열관리':'',
            '고객센터':''
        }

        sub_url = {
            '시간단위분석':'',
            '결제완료관리':'',
            '상품준비관리':'/order/1',
            '배송중관리':'/order/3',
            '배송완료관리':'/order/4',
            '구매확정관리':'/order/5',
            '환불요청관리':'',
            '환불완료관리':'',
            '주문취소완료관리':'',
            '상품관리':'/product',
            '상품등록':'',
            'Q&A관리':'',
            '텍스트리뷰':'',
            '포토리뷰':'',
            '기획전 관리':'',
            '쿠폰 관리':'',
            '회원 관리_커뮤니티':'',
            '셀러 계정 관리':'',
            '브랜디 공지' : '',
            '기획전 상품 신청':'',
            '기간별 통계':'',
            '베스트 상품분석':'',
            '판매추세 분석(상품별)':'',
            '전체주문관리':'',
            '반품진행관리':'',
            '환불승인중관리':'',
            '주문취소중관리':'',
            '정산 관리':'',
            '셀러별 정산요약':'',
            '셀러별 판매수수료':'',
            '주문별 판매수수료':'',
            '셀러별 서버이용료':'',
            '상점진열관리':'',
            '셀러 정보 관리':'/info',
            '패널티 셀러 관리':'',
            '도매처 관리':'',
            '헬피 신청 안내':'',
            '카카오톡 문의':'',
            '전화 1566-1910':'',
            'MD에게 제안':'',
            '오류/수정 제안':''
        }

        #  dao에서 받은 nav_data의 형태를 가공하기 위해 for문 실행
        temp_list = [1]
        final_dict = [{
            "id": 1,
            "menuTitle" :'홈',
            "menu_url" : '/home'
            }]

        for nav in nav_data:
            if nav['id'] not in temp_list:
                temp_list.append(nav['id'])
                final_dict.append(
                    {   "id": nav['id'],
                        "menuTitle" : nav['main'],
                        "menu_url" : menu_url[nav['main']],
                        'subMenu' : [{
                            'id': nav['sub_menus.id'],
                            'subTitle' : nav['sub'],
                            'sub_url' : sub_url[nav['sub']]
                        }]
                    }
                )
            else:
                index = temp_list.index(nav['id'])
                final_dict[index]['subMenu'].append(
                    {
                        'id': nav['sub_menus.id'],
                        'subTitle' : nav['sub'],
                        'sub_url' : sub_url[nav['sub']]
                    }
                )
        return final_dict