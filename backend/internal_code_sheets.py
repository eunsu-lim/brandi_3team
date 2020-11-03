internal_code_sheet = {
    #쿼리 실패
    "S000":{'message':'QUERY_OPERATION_FAILED','code':400},
    
    #요청 성공 
    "S100":{'message':'SUCCESS','code':200},

    #비밀번호 유효성 검사
    "S101":{'message':'INVALID_PASSWORD','client_message':'특수문자를 사용하세요.','code':400},
    "S102":{'message':'INVALID_PASSWORD','client_message':'대문자를 사용하세요.','code':400},
    "S103":{'message':'INVALID_PASSWORD','client_message':'소문자를 사용하세요.','code':400},
    "S104":{'message':'INVALID_PASSWORD','client_message':'숫자를 포함하세요.','code':400},
    "S105":{'message':'INVALID_PASSWORD','client_message':'글자수를 확인하세요.','code':400},
    
    #아이디 중복
    "S106":{'message':'DUPLICATED_DATA','client_message':'이미 존재하는 아이디 입니다.','code':400},

    #Invalid data
    "S107":{'message':'INVALID_DATA','code':400},

    #빈 값 에러
    "S108":{'message':'VALUE_NOT_FOUND','client_message':'회원가입을 해주세요.','code':400},

    #인가 실패
    "S109":{'message':'INVALID_REQUEST','client_message':'로그인을 해주세요.','code':400},

    #재고 부족
    "S110":{'message':'OUT_OF_STOCK','client_message':'품절된 상품입니다.','code':400},

    #가격 잘못됨
    "S111":{'message':'PRICE_DOES_NOT_MATCH','code':400},

    #최소구매수량
    "S112":{'message':'INVALID_REQUEST','client_message':'최소 구매수량을 확인하세요','code':400},

    #최대구매수량
    "S113":{'message':'INVALID_REQUEST','client_message':'최대 구매수량을 확인하세요','code':400},
}