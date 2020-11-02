import pymysql

from config  import database 

def get_connection():
    """
    import 되서 사용될 때마다 connection 생성
    
    returns :
        database connection 객체
    
    Authors :
        jisunn0130@gmail.com (최지선) , kimsj5259@gmail.com (김성진)
    
    History :
        2020-10-27  (jisunn0130@gmail.com) : 초기생성
    """
    
    connection = pymysql.connect(
            host = database['host'],
            port = database['port'],
            user = database['user'],
            password = database['password'],
            database = database['database'],
            charset  = database['charset'],
            cursorclass = pymysql.cursors.DictCursor)
    
    return connection

