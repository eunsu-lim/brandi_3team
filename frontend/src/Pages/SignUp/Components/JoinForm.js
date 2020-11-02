import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { PersonFill } from "@styled-icons/bootstrap";
import { LockPassword } from "@styled-icons/remix-fill";
import { Check } from "@styled-icons/boxicons-regular";
import { Phone } from "@styled-icons/boxicons-solid";
import { InformationCircle } from "@styled-icons/heroicons-solid";
import { Text } from "@styled-icons/ionicons-sharp";
import { Comment } from "@styled-icons/fa-regular";
import InputMask from "react-input-mask";
import axios from "axios";
import { api } from "../../../Config/api";

function JoinForm() {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      sellerRadio: "1",
    },
  });

  const onSubmit = async (data) => {
    const newData = JSON.stringify(data);

    await axios
      .post(`${api}/sellers/sign-up`, newData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        res.message === "success" ? alert("회원가입 성공") : null
      )
      .catch((err) => console.log("err >>>>>>", err));
  };

  const [password, setPassword] = useState("");
  const [rPassword, setRpassword] = useState("");

  return (
    <JoinFormWrap>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h4>가입 정보</h4>
        {/* 셀러 Id Input */}
        <SellerId isError={errors.sellerId}>
          <PersonFill />
          <input
            name="sellerId"
            type="text"
            placeholder="아이디"
            ref={register({ required: true, minLength: 5 })}
            autoComplete="off"
          />
          {/* 필수 입력 에러 메세지 */}
          {errors.sellerId && errors.sellerId.type === "required" && (
            <ErrorMsg>필수 입력항목입니다.</ErrorMsg>
          )}
          {/* 최소 길이 에러 메세지 */}
          {errors.sellerId && errors.sellerId.type === "minLength" && (
            <ErrorMsg>아이디의 최소 길이는 5글자입니다.</ErrorMsg>
          )}
        </SellerId>
        {/* 셀러 Password Input */}
        <SellerPassword isError={errors.sellerPassword}>
          <LockPassword />
          <input
            name="sellerPassword"
            type="password"
            placeholder="비밀번호"
            ref={register({
              required: true,
              pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            })}
            onChange={(password) => setPassword(password.target.value)}
            autoComplete="off"
          />
          {/* 필수 입력 에러 메세지 */}
          {errors.sellerPassword &&
            errors.sellerPassword.type === "required" && (
              <ErrorMsg>필수 입력항목입니다.</ErrorMsg>
            )}
          {/* 유효성 검사 에러 메세지 */}
          {errors.sellerPassword &&
            errors.sellerPassword.type === "pattern" && (
              <ErrorMsg>
                비밀번호는 8~20글자의 영문대소문자, 숫자, 특수문자를 조합해야
                합니다.
              </ErrorMsg>
            )}
        </SellerPassword>
        {/* 셀러 Password 재입력 Input */}
        <SellerRpassword isError={password !== rPassword}>
          <Check />
          <input
            name="sellerRpassword"
            type="password"
            placeholder="비밀번호 재입력"
            ref={register()}
            onChange={(Rpassword) => setRpassword(Rpassword.target.value)}
            autoComplete="off"
          />
          {/* password과 rPassword 입력할 때마다 state로 상태 관리, 값 불일치 시 에러 메세지 */}
          {password !== rPassword && (
            <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>
          )}
        </SellerRpassword>
        <h4>담당자 정보</h4>
        <SellerInfo>(*실제 샵을 운영하시는 분)</SellerInfo>
        {/* 셀러 전화번호 Input */}
        <SellerPhone isError={errors.sellerPhone}>
          <Phone />
          <InputMask
            mask="999-9999-9999"
            name="sellerPhone"
            placeholder="핸드폰번호"
            inputRef={register({ required: true })}
            autoComplete="off"
          />
          {/* 필수 입력 에러 메세지 */}
          {errors.sellerPhone && errors.sellerPhone.type === "required" && (
            <ErrorMsg>필수 입력항목입니다.</ErrorMsg>
          )}
          {/* 000-0000-0000 형식이 아닐 경우 에러 메세지 */}
          {errors.sellerPhone && errors.sellerPhone.type === "pattern" && (
            <ErrorMsg>올바른 정보를 입력해주세요. (ex. 000-0000-0000)</ErrorMsg>
          )}
          {/* 하이픈 포함 최대 13자리 넘을 경우 에러 메세지 */}
          {errors.sellerPhone && errors.sellerPhone.type === "maxLength" && (
            <ErrorMsg>올바른 정보를 입력해주세요. (ex. 000-0000-0000)</ErrorMsg>
          )}
        </SellerPhone>
        <PhoneInfo>
          <InformationCircle />
          입점 신청 후 브랜디 담당자가 연락을 드릴 수 있으니 정확한 정보를
          기입해주세요.
        </PhoneInfo>
        <h4>셀러 정보</h4>
        {/* 셀러 정보 Radio Input */}
        <SellerRadio>
          <label>
            <input name="sellerRadio" type="radio" value="1" ref={register} />
            쇼핑몰
          </label>
          <label>
            <input name="sellerRadio" type="radio" value="2" ref={register} />
            마켓
          </label>
          <label>
            <input name="sellerRadio" type="radio" value="3" ref={register} />
            로드샵
          </label>
          <label>
            <input name="sellerRadio" type="radio" value="4" ref={register} />
            디자이너브랜드
          </label>
          <label>
            <input name="sellerRadio" type="radio" value="5" ref={register} />
            제너럴브랜드
          </label>
          <label>
            <input name="sellerRadio" type="radio" value="6" ref={register} />
            내셔널브랜드
          </label>
          <label>
            <input name="sellerRadio" type="radio" value="7" ref={register} />
            기타
          </label>
        </SellerRadio>
        {/* 셀러 정보 Text Input */}
        {/* 셀러명 Input */}
        <SellerName isError={errors.sellerName}>
          <Text />
          <input
            name="sellerName"
            type="text"
            placeholder="셀러명 (상호)"
            ref={register({
              required: true,
              pattern: /^[가-힣|a-z|A-Z|0-9|\*]+$/,
            })}
            autoComplete="off"
          />
          {/* 필수 입력 에러 메세지 */}
          {errors.sellerName && errors.sellerName.type === "required" && (
            <ErrorMsg>필수 입력항목입니다.</ErrorMsg>
          )}
          {/* 한글(자음, 모음 조합), 영문, 숫자 정규식 에러 메세지 */}
          {errors.sellerName && errors.sellerName.type === "pattern" && (
            <ErrorMsg>한글,영문,숫자만 입력해주세요.</ErrorMsg>
          )}
        </SellerName>
        {/* 영문 셀러명 Input */}
        <SellerEnName isError={errors.sellerEnName}>
          <Text />
          <input
            name="sellerEnName"
            type="text"
            placeholder="영문 셀러명 (영문상호)"
            ref={register({ required: true, pattern: /^[a-z|0-9|\*]+$/ })}
            autoComplete="off"
          />
          {/* 필수 입력 에러 메세지 */}
          {errors.sellerEnName && errors.sellerEnName.type === "required" && (
            <ErrorMsg>필수 입력항목입니다.</ErrorMsg>
          )}
          {/* 영문, 숫자 정규식 에러 메세지 */}
          {errors.sellerEnName && errors.sellerEnName.type === "pattern" && (
            <ErrorMsg>셀러 영문명은 소문자만 입력가능합니다.</ErrorMsg>
          )}
        </SellerEnName>
        {/* 고객센터 전화번호 Input */}
        <SellerTel isError={errors.sellerTel}>
          <Phone />
          <input
            name="sellerTel"
            type="text"
            placeholder="고객센터 전화번호"
            ref={register({ required: true, pattern: /^[0-9 \-]+$/ })}
            autoComplete="off"
          />
          {/* 필수 입력 에러 메세지 */}
          {errors.sellerTel && errors.sellerTel.type === "required" && (
            <ErrorMsg>필수 입력항목입니다.</ErrorMsg>
          )}
          {/* 숫자, 하이픈 정규식 에러 메세지 */}
          {errors.sellerTel && errors.sellerTel.type === "pattern" && (
            <ErrorMsg>
              고객센터 전화번호는 숫자와 하이픈만 입력가능합니다.
            </ErrorMsg>
          )}
        </SellerTel>
        {/* 사이트 URL Input */}
        <SellerSite isError={errors.sellerSite}>
          <PersonFill />
          <input
            name="sellerSite"
            type="text"
            placeholder="사이트 URL"
            ref={register({
              required: true,
              pattern: /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/,
            })}
            autoComplete="off"
          />
          {/* 필수 입력 에러 메세지 */}
          {errors.sellerSite && errors.sellerSite.type === "required" && (
            <ErrorMsg>필수 입력항목입니다.</ErrorMsg>
          )}
          {/* URL 정규식 에러 메세지 */}
          {errors.sellerSite && errors.sellerSite.type === "pattern" && (
            <ErrorMsg>
              올바른 주소를 입력해주세요. (ex. http://www.brandi.co.kr)
            </ErrorMsg>
          )}
        </SellerSite>
        {/* 카카오톡 ID Input */}
        <SellerKakao>
          <Comment />
          <input
            name="sellerKakao"
            type="text"
            placeholder="카카오톡 아이디"
            ref={register}
            autoComplete="off"
          />
        </SellerKakao>
        {/* 인스타그램 ID Input */}
        <SellerInsta>
          <Comment />
          <input
            name="sellerInsta"
            type="text"
            placeholder="인스타그램 아이디"
            ref={register}
            autoComplete="off"
          />
        </SellerInsta>
        {/* 회원가입 Button */}
        <JoinBtn>
          <SubmitBtn>신청</SubmitBtn>
          <Link to="/login">
            <CancelBtn>취소</CancelBtn>
          </Link>
        </JoinBtn>
      </Form>
    </JoinFormWrap>
  );
}

export default JoinForm;

const JoinFormWrap = styled.div``;

const Form = styled.form`
  h4 {
    display: inline-block;
    margin: 20px 0 10px 15px;
    padding-left: 15px;
    ${({ theme }) => theme.font("18px", `300`)}
  }

  input {
    margin-left: 10px;
    padding: 6px 12px 6px 33px;
    width: 348px;
    height: 20px;
    box-shadow: none;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    font-size: 14px;
    color: #333333;
    background-color: white;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

    &:focus {
      outline: none;
      border-color: #999999;
    }
  }

  label {
    display: inline-block;
    margin-right: 10px;
    line-height: 1.5;
    font-size: 14px;
    color: #333;
  }

  svg {
    position: absolute;
    left: 8px;
    top: -3px;
    margin: 11px 2px 4px 10px;
    width: 18px;
    height: 18px;
    color: #ccc;
  }
`;

const SellerId = styled.div`
  margin: 0 15px 15px 15px;
  position: relative;

  /* 에러 메세지가 있을 경우 Input과 Icon 색상 변경 */
  input {
    border: 1px solid ${({ isError }) => (isError ? "#a94442" : "#e5e5e5")};

    &:focus {
      border: 1px solid ${({ isError }) => (isError ? "#a94442" : "#999999")};
    }
  }

  svg {
    color: ${({ isError }) => (isError ? "#a94442" : "#ccc")};
  }
`;

const SellerPassword = styled(SellerId)``;

const SellerRpassword = styled(SellerId)`
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SellerPhone = styled(SellerId)`
  margin-bottom: 4px;
`;

const SellerInfo = styled.span`
  margin-left: 4px;
  font-size: 14px;
  color: rgb(30, 144, 255);
`;

const PhoneInfo = styled(SellerInfo.withComponent("p"))`
  position: relative;
  margin: 4px auto 15px;
  padding-left: 30px;
  width: 386px;
  font-size: 12px;

  svg {
    display: inline-block;
    position: absolute;
    left: 0;
    top: -2px;
    margin-top: 0;
    width: 16px;
    height: 16px;
    color: rgb(30, 144, 255);
  }
`;

const SellerRadio = styled(SellerId)`
  input {
    margin-right: 4px;
    width: 14px;
    height: 14px;
  }
`;

const SellerName = styled(SellerId)``;

const SellerEnName = styled(SellerId)``;

const SellerTel = styled(SellerId)``;

const SellerSite = styled(SellerId)``;

const SellerKakao = styled(SellerId)`
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SellerInsta = styled(SellerKakao)``;

const JoinBtn = styled.div`
  margin-top: 40px;
  margin-bottom: 15px;
  text-align: center;
`;

const SubmitBtn = styled.button`
  margin-bottom: 0;
  padding: 6px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  color: #fff;
  background-color: #5bc0de;
  cursor: pointer;

  &:hover {
    background-color: #31b0d5;
  }

  &:focus {
    outline: none;
  }
`;

const CancelBtn = styled(SubmitBtn)`
  border-radius: 4px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #d9534f;

  &:hover {
    background-color: #c9302c;
  }
`;

const ErrorMsg = styled.span`
  display: inline-block;
  margin: 8px 0 8px 12px;
  font-size: 13px;
  color: #a94442;
`;
