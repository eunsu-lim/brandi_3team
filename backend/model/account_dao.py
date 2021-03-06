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
            # account_name과 일치하는 데이터가 db에 없을 경우 NotFoundError 발생
            if row is None:
                raise NotFoundError('S000')

            return {
                'id'              : row['id'],
                'password'        : row['password'],
                'account_type_id' : row['account_type_id']
            }
    
    def get_nav_list(self, account_type_id, db_connection):
        with db_connection.cursor() as cursor:
            query = """
                SELECT
                    main_menus.id, main_menus.name as main,
                    sub_menus.id, sub_menus.name as sub,
                    account_type_id as account_type
                FROM main_menus
                LEFT JOIN sub_menus ON main_menus.id=sub_menus.main_menu_id
                LEFT JOIN account_type_menus ON account_type_menus.sub_menu_id=sub_menus.id
                WHERE account_type_id=%(account_type_id)s
            """
            cursor.execute(query, {'account_type_id': account_type_id})
            nav_list = cursor.fetchall()

            return nav_list
