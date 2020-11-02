import config

from flask     import Flask
from flask_cors  import CORS


def create_app(test_config = None):
    app       = Flask(__name__)
    app.debug = True 

    if test_config is None:
        app.config.from_pyfile('config.py')

    else:
        app.config.update(test_config)

    CORS(app)

    return app 
