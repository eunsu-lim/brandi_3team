import datetime

from flask                   import request, jsonify, Blueprint

from flask_request_validator import Param, GET, JSON, validate_params, Pattern, Enum

from decorator               import login_required
from connection              import get_connection, get_s3_connection
from internal_code_sheets     import internal_code_sheet
from exceptions              import DuplicatedDataError, InvalidDataError, NotFoundError, PasswordError, InvalidProductInformationError, InvalidSellerInformationError, ProgrammingError, InvalidChoiceMade 

def create_product_endpoints(product_service):
    product_app = Blueprint('products', __name__, url_prefix='/products')

    @product_app.route('/product_list', methods = ['GET'])
    #@login_required
    @validate_params(
        Param('registerStatus', GET, bool, required=False),
        Param('filterDateFrom', GET, str, rules=[Pattern(r"^\d\d\d\d-\d{1,2}-\d{1,2}$")], required=False),
        Param('filterDAteTo', GET, str, rules=[Pattern(r"^\d\d\d\d-\d{1,2}-\d{1,2}$")], required=False),
        Param('sellerName', GET, required=False),
        Param('productName', GET, required=False),
        Param('product_id', GET, list, required=False),
        Param('productCode', GET, required=False),
        Param('sellerType', GET, list,  required=False),    #str이 아니라 int
        Param('salesStatus', GET, int, rules=[Enum(1, 2, 3)], required=False),
        Param('displayStatus', GET, int, rules=[Enum(1, 2, 3)], required=False),
        Param('discountStatus', GET, int, rules=[Enum(1, 2, 3)], required=False),
        Param('offset', GET, int, required=False),
        Param('limit', GET, int, required=False)
    )

    def get_products(*args):
        """상품 정보 리스트 전달 API

        쿼리 파라미터로 필터링에 사용될 값을 받아 필터링된 상품의 데이터 리스트를 보내줍니다.

        args:
            *args:
                filterDateFrom : 조회기간 시작
                filterDateTo   : 조회기간 끝
                sellerName     : 셀러 이름 검색을 위한 파라미터
                productName    : SelectFilter 안에 있는 목록 중 상품이름
                productNo      : SelectFilter 안에 있는 목록 중 상품번호
                productCode    : SelectFilter 안에 있는 목록 중 상품코드
                sellerType     : 셀러속성 id
                salesStatus    : 판매여부
                displayStatus  : 진열여부
                discountStatus : 할인여부
            }
        
        returns :
            200: 상품리스트
            500: Exception
        
        Author:
            김성진 
        
        History:
            2020-11-01 (김성진): 초기 생성

        """

        try:
            if args[1]:
                filterDateFrom = datetime.datetime.strptime(args[1],'%Y-%m-%d')
            else:
                filterDateFrom = ""

            if args[2]:
                filterDateTo   = datetime.datetime.strptime(args[2], '%Y-%m-%d')
            else:
                filterDateTo = ""

            db_connection = get_connection()
            
            filter_dict   = {
                'registerStatus'   : args[0],
                'filterDateFrom'   : args[1],   #조회기간 시작
                'filterDateTo'     : args[2],   #조회기간 끝
                'sellerName'       : args[3],   #셀러명
                'productName'      : args[4],   #상품이름
                'product_id'       : args[5],   #상품번호                                                                       
                'productCode'      : args[6],   #상품코드
                'sellerType'       : args[7],   #셀러속성
                'salesStatus'      : args[8],   #판매여부
                'displayStatus'    : args[9],   #진열여부
                'discountStatus'   : args[10],   #할인여부
                'offset'           : 0 if args[11] is None else args[11],  #데이터를 어디서부터 받아올것인지
                'limit'            : 10 if args[12] is None else args[12]  #페이지의 숫자
            }

            total_number = product_service.get_total_number(filter_dict, db_connection)
            products     = product_service.get_products(filter_dict, db_connection)
            
            return jsonify({'products' : products, 'total_number': total_number})

        except InvalidProductInformationError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])

        except InvalidSellerInformationError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])

        finally:
            db_connection.close()
    
    
    @product_app.route('/excel', methods=['GET'])
    #@login_required
    @validate_params(
        Param('product_id', GET, list, required=False),
    )
    def make_excel(*args):
        """ 상품 정보 엑셀 다운로드 API

        전체 상품 또는 선택 상품의 정보를 excel 파일로 다운로드 합니다.

        args:
            product_id : 상품의 id 리스트

        returns:
            200: Excel 파일 다운
            500: Exception
        
        Author:
            김성진
        
        History:
            2020-11-04 (김성진): 초기 생성
        """
    
        db_connection = get_connection()
        try:
            # 선택한 상품들의 id를 list로 받는다.
            product_id_list = {
                'product_id'      : args[0],
            }

            excels = product_service.create_excel(product_id_list, db_connection)
            return jsonify(excels)
        
        except ProgrammingError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
        
        finally:
            db_connection.close()
    
    
    @product_app.route('/modify', methods=['POST'])
    #@login_required
    @validate_params(
        Param('salesStatusModify', GET, int, rules=[Enum(1, 2, 3)], required=False), #안에 NULL=True 해도 되나?
        Param('displayStatusModify', GET, int, rules=[Enum(1, 2, 3)], required=False),
        Param('product_id', GET, list, required=False)
    )
    
    def status_update(*args):
        """ 상품의 판매여부 및 진열여부 수정 API
        
        선택한 상품의 판매여부 및 진열여부 수정이 있을시 수정.

        args:
            product_id: 상품의 id 리스트
        
        returns:
            200: 지정된 상품의 판매 및 진열여부 수정
            500: Exception
        
        Author:
            김성진
        
        History:
            2020-11-04 (김성진): 초기 생성
        """
        try:
            db_connection = get_connection()

            product_id_list = {
                'salesStatusModify'   : args[0],
                'displayStatusModify' : args[1],
                'product_id'          : args[2]
            }

            fixed_products = product_service.product_status_change(product_id_list, db_connection)

            db_connection.commit()

        except InvalidChoiceMade as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])

        else:
            return jsonify(fixed_products)

        finally:
            db_connection.close()  

            
    return product_app
