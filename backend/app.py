import config

from flask       import Flask
from flask_cors  import CORS

from model      import AccountDao
from service    import AccountService
from controller import create_account_endpoints

def create_app(test_config = None):
    app       = Flask(__name__)
    app.debug = True 

    if test_config is None:
        app.config.from_pyfile('config.py')

    else:
        app.config.update(test_config)

    CORS(app, resources={r'*':{'origins':'*'}})

    #persistence layer
    account_dao = AccountDao()

    #business layer
    account_service = AccountService(account_dao, config)

    #presentation layer(엔드포인트 생성)
    app.register_blueprint(create_account_endpoints(account_service))

    return app 
