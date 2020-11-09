import jwt

from flask import request, jsonify, Blueprint
from flask_request_validator  import(
    Param,
    JSON,
    validate_params
)

from connection import get_connection
from exceptions import NotFoundError
from internal_code_sheets import internal_code_sheet

def create_account_endpoints(account_service):
    account_bp = Blueprint('accounts', __name__, url_prefix='/accounts')

    @account_bp.route('/login', methods=['POST'])
    @validate_params(
    #들어온 파라미터들을 유효성 검사
    Param('sellerId',JSON,str,required=True),
    Param('sellerPassword',JSON,str,required=True),
    )
    def login(*args):
        try:
            db_connection  = get_connection()
            credential     = request.json
            authorized     = account_service.login(credential, db_connection)

            # 로그인 성공
            if authorized:
                # service에서 해당 함수를 실행하여 sellerId와 일치하는 id와 password를 가져온다
                user_credential = account_service.get_user_info(credential['sellerId'], db_connection)
                account_type_id = user_credential['account_type_id'] 
                account_id      = user_credential['id']

                # service의 generate_access_token 함수를 통해 생성한 token을 token에 저장
                token           = account_service.generate_access_token(account_id)
                
                # token과 account_type_id을 클라이언트에게 전송
                return jsonify({
                    'access_token'    : token,
                    # 마스터일 경우 1, 셀러일 경우 2
                    'account_type_id' : account_type_id
                })
            # 로그인 실패 - 비밀번호 불일치
            else:
                message = internal_code_sheet['S107']
                return jsonify(message), (message['code'])

        # 로그인 실패 - sellerId가 db에 없을 경우
        except NotFoundError as e:
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])

        # 로그인 실패 시 - 그 외 에러 발생
        except Exception as e:
            return e, 401
        

        finally:
            db_connection.close()

    return account_bp