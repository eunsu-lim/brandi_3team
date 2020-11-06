import pymysql
from exceptions import NotFoundError

class AccountDao:
    def get_user_info(self, account_name, db_connection):
        """
        accounts table에서 account_name과 일치하는 id, password, account_type_id를 반환
        """
        with db_connection.cursor() as cursor:
            query = """
                SELECT
                    id,
                    password,
                    account_type_id
                FROM accounts
                WHERE account_name = %(account_name)s
            """
            cursor.execute(query, {'account_name': account_name})
            row = cursor.fetchone()
            if row is None:
                raise NotFoundError('S000')

            return {
                'id'              : row['id'],
                'password'        : row['password'],
                'account_type_id' : row['account_type_id']
            }
