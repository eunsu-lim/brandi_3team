import config
import decimal
import datetime

from flask       import Flask
from flask_cors  import CORS
from flask.json import JSONEncoder

from model      import AccountDao, SellerDao, OrderDao
from service    import AccountService, SellerService, OrderService
from controller import create_account_endpoints, create_seller_endpoints, create_order_endpoints

class CustomEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return float(obj)
        elif isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        return super(JSONEncoder, self).default(obj)


def create_app(test_config=None):
    app = Flask(__name__)
    app.json_encoder = CustomEncoder

    CORS(app, resources={r'*':{'origins':'*'}})
    
    if test_config is None:
        app.config.from_pyfile('config.py')
    else:
        app.config.update(test_config)

    #persistence layer
    account_dao = AccountDao()
    seller_dao = SellerDao()

    #business layer
    account_service = AccountService(account_dao, config)
    seller_service = SellerService(seller_dao, config)

    #presentation layer(엔드포인트 생성)
    app.register_blueprint(create_account_endpoints(account_service))
    app.register_blueprint(create_seller_endpoints(seller_service))

    return app 
    seller_dao = SellerDao()
    order_dao  = OrderDao()

    #business layer
    seller_service = SellerService(seller_dao, config)
    order_service  = OrderService(order_dao)
 
    #presentation layer(엔드포인트 생성)
    app.register_blueprint(create_seller_endpoints(seller_service))
    app.register_blueprint(create_order_endpoints(order_service))
    
    return app 
