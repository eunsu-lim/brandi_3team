import config

from flask     import Flask
from flask_cors  import CORS

from sqlalchemy  import create_engine

def create_app(test_config = None):
    app       = Flask(__name__)
    app.debug = True 

    if test_config is None:
        app.config.from_pyfile('config.py')

    else:
        app.config.update(test_config)

    database     = create_engine(app.config['DB_URL'], encoding = 'utf-8', max_overflow = 0)
    app.database = database 

    CORS(app, recources={r'*' : {'origins':'*'}})

    return app 
