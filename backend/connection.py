import pymysql
import boto3

from config  import database, S3_BUCKET, S3_ACCESS_KEY, S3_SECRET_KEY

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

def get_s3_connection():

    """ s3와 커넥션을 만들어주는 함수
    import 되어서 사용될 때 마다 하나의 s3 커넥션이 생긴다

    Returns:
        s3_connection 객체

    Authors:
        김성진 (kimsj5259@gmail.com)

    History:
        2020-11-06 (kimsj5259@gmail.com): 초기 생성
    """

    s3_connection = boto3.client(
        's3',
        aws_access_key_id      = S3_ACCESS_KEY,
        aws_secret_access_key  = S3_SECRET_KEY
    )
    return s3_connection

