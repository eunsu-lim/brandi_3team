import jwt
from functools            import wraps

from flask                import jsonify, request

from model.seller_dao     import SellerDao
from config               import SECRET_KEY, ALGORITHM
from connection           import get_connection
from internal_code_sheet  import internal_code_sheet
from exceptions           import NotFoundError, InvalidDataError

def login_required(func):
    """"
    로그인이 필요한 요청에서 header에 담긴 access_token 을 확인하여 인가된 사용자인지 체크합니다. 
    가입된 사용자일 경우 request에 seller_id 를 담아서 리턴합니다. 

    Returns:
        seller_id : 셀러 정보 id
        {'message':'INVALID_DATA','code':400}: 잘못된 토큰
        {'message':'VALUE_NOT_FOUND','client_message':'회원가입을 해주세요.','code':400}: 가입된 유저가 없는 경우 

    Authors:
        jisunn0130@gmail.com(최지선)
        
    History:
        2020.10.28(최지선) : 초기 생성
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            access_token       = request.headers.get('Authorization', None) 
            payload            = jwt.decode(access_token, SECRET_KEY, algorithm = ALGORITHM)
            request.account_id = payload
            db_connection      = get_connection()
            seller             = SellerDao().get_seller_id(db_connection, payload)
            if seller['is_delete'] == 0: 
                request.seller_id = seller['id']
            else:
                raise  InvalidDataError('S107')

        except jwt.DecodeError:
            return jsonify(internal_code_sheet['S107']), (internal_code_sheet[result]['S107'])

        except NotFoundError:
            return jsonify(internal_code_sheet['S108']), (internal_code_sheet[result]['S108'])
        
        finally:
            db_connection.close()

        return func(*args, **kwargs)
    return wrapper 
