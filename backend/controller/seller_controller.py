from flask      import (
    request, 
    jsonify, 
    Blueprint
)
from flask_request_validator  import(
    Param,
    JSON,
    validate_params
)

from decorator            import login_required
from connection           import get_connection
from internal_code_sheets  import internal_code_sheet
from exceptions           import (
    DuplicatedDataError,
    InvalidDataError,
    NotFoundError,
    PasswordError
)

def create_seller_endpoints(seller_service):
    seller_bp = Blueprint('sellers', __name__, url_prefix = '/sellers')

    @seller_bp.route('/home', methods=['GET'])
    @login_required
    def get_seller_order_status(*args):
        """
        셀러의 주문 현황를 조회합니다. 
            Args:
                N/A
             
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
        try:
            db_connection = get_connection()
            seller_id  = request.seller_id
    
            result = seller_service.get_seller_orders(db_connection, {"seller_id":seller_id})
            return jsonify(result),(internal_code_sheet['S100']['code'])
        
        except NotFoundError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
        
        except Exception as e:
            db_connection.rollback()
            return jsonify(e), 400

        finally:
            db_connection.close()
    
    @seller_bp.route('/sign-up', methods=['POST'])
    @validate_params(
        #들어온 파라미터들을 유효성 검사
        Param('sellerId',JSON,str,required=True),
        Param('sellerPassword',JSON,str,required=True),
        Param('sellerPhone',JSON,str,required=True),
        Param('sellerName',JSON,str,required=True),
        Param('sellerEnName',JSON,str,required=True),
        Param('sellerTel',JSON,str,required=True),
    )
    #회원가입 엔드포인트
    def sign_up(*args):
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
                200, {'message':'SUCCSS','code':200} : 회원가입 성공
                400, {'message':'DUPLICATED_DATA','client_message':'이미 존재하는 아이디 입니다.','code':400} : 회원가입 실패, 유효성 검사 오류
                400, {'message':'INVALID_PASSWORD','client_message':'특수문자를 사용하세요.','code':400} : 회원가입 실패, 유효성 검사 오류
                400, {'message':'INVALID_PASSWORD','client_message':'대문자를 사용하세요.','code':400} : 회원가입 실패, 유효성 검사 오류
                400, {'message':'INVALID_PASSWORD','client_message':'소문자를 사용하세요.','code':400} : 회원가입 실패, 유효성 검사 오류
                400, {'message':'INVALID_PASSWORD','client_message':'숫자를 포함하세요.','code':400} : 회원가입 실패, 유효성 검사 오류
                400, {'message':'INVALID_PASSWORD','client_message':'글자수를 확인하세요.','code':400} : 회원가입 실패, 유효성 검사 오류
            
            Authors:
                jisunn0130@gmail.com(최지선)
            
            History:
                2020.10.28(최지선) : 초기 생성
        """
        try:
            #db 접속
            db_connection = get_connection()
            #request 로 들어온 seller_info 받습니다. 
            seller_info = request.json
            result = seller_service.create_new_account(seller_info, db_connection)
            #회원가입 성공
            if result == 'S100':
                db_connection.commit()
                message = internal_code_sheet[result]
                return jsonify(message), (message['code'])
        
        #아이디 중복인 경우
        except DuplicatedDataError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
        #비밀번호 유효성 검사에 걸린 경우
        except PasswordError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
        
        except Exception as e:
            db_connection.rollback()
            return jsonify(e), 400
        
        finally:
            db_connection.close()

    # 홈 엔드포인트
    @seller_bp.route('/home', methods=['GET'])
    @login_required
    def home():
        try:
            # db 접속
            db_connection = get_connection()
            # 데코레이터에서 seller_id를 받습니다.
            seller_id = request.seller_id
            # seller_id와 일치하는 상품준비, 배송완료, 전체상품 수, 노출상품 수를 가져 옵니다.
            seller_data = seller_service.get_seller_data(seller_id, db_connection)
            # 그러기 위해서는 service에 함수
            # 그리고 dao에 함수
            # 상품준비, 배송완료, 전체상품 수, 노출상품 수 return
            return seller_data
            
        finally:
            db_connection.close()
    return seller_bp