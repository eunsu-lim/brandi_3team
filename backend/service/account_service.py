import jwt
import bcrypt

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

    def generate_access_token(self, account_id):
        payload = {
            'account_id' : account_id,
            'exp'        : datetime.utcnow() + timedelta(seconds = 60 * 60 * 24)
        }
        token   = jwt.encode(payload, 'SECRET_KEY', 'HS256')

        return token.decode('UTF-8')


