from flask      import (
    request, 
    jsonify, 
    Blueprint
)
from flask_request_validator  import(
    Param,
    JSON,
    validate_params
)


from decorator            import login_required
from connection           import get_connection
from internal_code_sheets  import internal_code_sheet
from exceptions           import (
    DuplicatedDataError,
    InvalidDataError,
    NotFoundError,
    PasswordError
)

def create_seller_endpoints(seller_service):
    seller_bp = Blueprint('sellers', __name__, url_prefix = '/sellers')
    
    @seller_bp.route('/sign-up', methods=['POST'])
    @validate_params(
        #들어온 파라미터들을 유효성 검사
        Param('sellerId',JSON,str,required=True),
        Param('sellerPassword',JSON,str,required=True),
        Param('sellerPhone',JSON,str,required=True),
        Param('sellerName',JSON,str,required=True),
        Param('sellerEnName',JSON,str,required=True),
        Param('sellerTel',JSON,str,required=True),
    )
    #회원가입 엔드포인트
    def sign_up(*args):
        """
        새로운 셀러를 생성합니다.
            Args:
                    account_name        : 셀러 아이디,
                    password            : 패스워드,
                    name_english        : 영문 셀러명,
                    name_korean         : 셀러명,
                    cs_contact          : 고객센터 전화번호 ,
                    seller_attribute_id : 셀러 속성 PK(쇼핑몰 마켓  로드샵  디자이너브랜드  제너럴브랜드  내셔널브랜드  뷰티),
                    phone_number        : 담당자 전화번호,
            
            Returns:
                200, {'message':'SUCCSS','code':200} : 회원가입 성공
                400, {'message':'DUPLICATED_DATA','client_message':'이미 존재하는 아이디 입니다.','code':400} : 회원가입 실패, 유효성 검사 오류
                400, {'message':'INVALID_PASSWORD','client_message':'특수문자를 사용하세요.','code':400} : 회원가입 실패, 유효성 검사 오류
                400, {'message':'INVALID_PASSWORD','client_message':'대문자를 사용하세요.','code':400} : 회원가입 실패, 유효성 검사 오류
                400, {'message':'INVALID_PASSWORD','client_message':'소문자를 사용하세요.','code':400} : 회원가입 실패, 유효성 검사 오류
                400, {'message':'INVALID_PASSWORD','client_message':'숫자를 포함하세요.','code':400} : 회원가입 실패, 유효성 검사 오류
                400, {'message':'INVALID_PASSWORD','client_message':'글자수를 확인하세요.','code':400} : 회원가입 실패, 유효성 검사 오류
            
            Authors:
                jisunn0130@gmail.com(최지선)
            
            History:
                2020.10.28(최지선) : 초기 생성
        """
        try:
            #db 접속
            db_connection = get_connection()
            #request 로 들어온 seller_info 받습니다. 
            seller_info = request.json
            result = seller_service.create_new_account(seller_info, db_connection)
            #회원가입 성공
            if result == 'S100':
                db_connection.commit()
                message = internal_code_sheet[result]
                return jsonify(message), (message['code'])
        
        #아이디 중복인 경우
        except DuplicatedDataError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
        #비밀번호 유효성 검사에 걸린 경우
        except PasswordError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])
        
        finally:
            db_connection.close()


    # 

    # 비밀번호 변경 엔드포인트 sellers/edit-password

    @seller_bp.route('/edit-password', methods=['PATCH'])
    @validate_params(
        #들어온 파라미터들을 유효성 검사
        Param('password', JSON, str, required=True),
        Param('new_password', JSON, str, required=True)
    )
    @login_required
    def edit_password(*args):
        """
        셀러가 비밀번호를 변경합니다.
        Args:
            password     : 패스워드,
            new_password : 변경할 패스워드
        Returns:
            200, {'account_type_id':seller_data['account_type_id'],'access_token':access_token} : 비밀번호 변경 성공
            400, {'message':'INVALID_DATA','code':400}, : 복호화 실패
            400, {'message':'INVALID_PASSWORD','client_message':'특수문자를 사용하세요.','code':400} : 비밀번호 변경 실패, 유효성 검사 오류
            400, {'message':'INVALID_PASSWORD','client_message':'대문자를 사용하세요.','code':400} : 비밀번호 변경 실패, 유효성 검사 오류
            400, {'message':'INVALID_PASSWORD','client_message':'소문자를 사용하세요.','code':400} : 비밀번호 변경 실패, 유효성 검사 오류
            400, {'message':'INVALID_PASSWORD','client_message':'숫자를 포함하세요.','code':400} : 비밀번호 변경 실패, 유효성 검사 오류
            400, {'message':'INVALID_PASSWORD','client_message':'글자수를 확인하세요.','code':400} : 비밀번호 변경 실패, 유효성 검사 오류

        Authors:
            limes1787@gmail.com(임은수)
        
        History:
            2020.11.04(임은수) : 초기 생성      
        """
        try:
            #db 접속
            db_connection = get_connection()
            # request 로 들어온 seller_info(request.json프론트 요청) 받습니다.
            seller_info = request.json
            # account_id라는 key를 seller_info에 추가하고 value를 token에서 받아온 account_id를 넣어줌
            seller_info['account_id'] = request.account_id['account_id']
            # request.seller_id = seller['id'] => service
            result = seller_service.edit_seller_password(seller_info, db_connection)
            # 비밀번호 변경 성공 
            #           internal_code_sheet 요청 성공
            #           요청 성공시 commit
            db_connection.commit()
            message = internal_code_sheet[result]
            return jsonify(message), (message['code'])
        
        # 비밀번호 유효성 검사에 걸린 경우
        except PasswordError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])

        # 암호화 해독 실패
        except InvalidDataError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])

        except NotFoundError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])

        # 모든 에러에 대한 예외 처리
        except Exception as e:
            db_connection.rollback()
            return jsonify(e), 400
        
        finally:
            db_connection.close()


    # 계정 정보 수정페이지 정보 가져오기
    @seller_bp.route('/seller-details', methods=['GET'])
    @login_required
    def seller_detail_infos(*args):
        """
        셀러 계정의 정보를 가져옵니다. 
        Args:
            account_id : 해당 아이디 셀러의 정보를 가져옵니다.
        Returns:    

        Authors:
            limes1787@gmail.com(임은수)
        
        History:
            2020.11.07(임은수) : 초기 생성      
        """
        try:
            #db 접속
            db_connection = get_connection()

            # request 로 들어온 seller_info로 받기 위해 딕셔너리 형태로 초기화.
            seller_info = {}

            # account_id라는 key를 seller_info에 추가하고 value를 token에서 받아온 account_id를 넣어줌
            seller_info['account_id'] = request.account_id['account_id']

            # request.seller_id = seller['id'] => service
            result = seller_service.seller_detail_infos(seller_info, db_connection)

            # 요청 성공시
            return jsonify(result)
        
        except NotFoundError as e:
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])

        # 그 외 에러에 대한 예외 처리
        except Exception as e:
            return jsonify(e), 400
        
        finally:
            db_connection.close()

    
    # 계정 정보 수정페이지 수정 엔드포인트 생성
    @seller_bp.route('/edit-seller-details', methods=['PATCH'])
    @validate_params(
        # 들어온 파라미터들을 유효성 검사
        # 셀러 기본 정보
        Param('short_description', JSON, str, required=True),
        Param('detailed_description', JSON, str, required=True),
        # 담당자 정보
        Param('person_in_charge', JSON, str, required=True),
        Param('phone_number', JSON, str, required=True),
        Param('email', JSON, str, required=True),
        # 주소
        Param('postal_code', JSON, str, required=True),
        Param('address_1', JSON, str, required=True),
        Param('address_2', JSON, str, required=True),
        # 배송 / 환불 정보
        Param('delivery_description',JSON, str, required=True),
        Param('refund_description',JSON, str, required=True)
    )
    @login_required
    def edit_seller_detail_infos(*args):
        """
        셀러 계정의 정보를 수정합니다. 
        Args:
            profile_image         : 셀러 프로필 이미지
            short_description     : 셀러 한줄 소개
            detailed_description  : 셀러 상세 소개
            background_image_url  : 셀러 배경 이미지
            person_in_charge      : 담당자 이름
            phone_number          : 연락처
            email                 : 이메일
            postal_code           : 우편번호
            address_1             : 도로명/지번 주소
            address_2             : 상세 주소
            delivery_description  : 배송 정보
            refund_description    : 환불 정보

        Returns: 
            200, {'account_id':seller_data['account_id'],'access_token':access_token} : 정보 수정 성공

        Authors:
            limes1787@gmail.com(임은수)
        
        History:
            2020.11.07(임은수) : 초기 생성      
        """
        try:
            #db 접속
            db_connection = get_connection()

            # request 로 들어온 seller_info(request프론트 요청) 받습니다.
            seller_info = dict(request.form)

            # 필수 이미지 profile_image
            seller_profile = request.files.get('profile_image')
            # 이미지가 없으면 none
            seller_back = request.files.get('background_image_url', None)

            # account_id라는 key를 seller_info에 추가하고 value를 token에서 받아온 account_id를 넣어줌
            seller_info['account_id'] = request.account_id['account_id']

            # request.seller_id = seller['id'] => service
            result = seller_service.edit_seller_detail_infos(seller_info, seller_profile, seller_back, db_connection)

            # internal_code_sheet 요청 성공
            db_connection.commit()
            message = internal_code_sheet[result]
            return jsonify(message), (message['code'])

        except NotFoundError as e:
            db_connection.rollback()
            message = internal_code_sheet[e.code]
            return jsonify(message), (message['code'])

        # 그 외의 에러에 대한 예외 처리
        except Exception as e:
            db_connection.rollback()
            return jsonify(e), 400
        
        finally:
            db_connection.close()
        




    return seller_bp