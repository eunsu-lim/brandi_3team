from sqlalchemy import create_engine


db = {
        'user'     : 'root',
        'password' : '2540',
        'host'     : 'localhost',
        'port'     : 3306,
        'database' : 'brandi'
        }

DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=uft8"

