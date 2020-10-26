import pymysql.cursors

from config  import database 

def get_connection():
    connection = pymysql.connect(
            host = database['host'],
            port = database['port'],
            user = database['user'],
            password = database['password'],
            database = database['database'],
            charset  = database['charset'],
            cursorclass = pymysql.cursors.DictCursor)
    return connection

