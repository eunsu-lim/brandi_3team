import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormActions from "./FormActions";
import axios from "axios";
import { api } from "../../../Config/api";

import { useDispatch } from "react-redux";
import { saveAccountType } from "../../../Store/Action";

export default function LoginForm() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  // 로그인 버튼 클릭 시 실행되는 함수
  const onSubmit = async (data) => {
    const loginData = JSON.stringify(data);

    await axios
      .post(`${api}/sellers/sign-in`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // 로그인 성공 시 Token을 localStorage에 저장
        localStorage.setItem("access_token", res.data.access_token);
        // Account Type을 Redux에 저장하여 전역 관리
        dispatch(saveAccountType(res.data.account_type_id));
        res.data.access_token
          ? history.push("/")
          : alert("아이디, 비밀번호를 확인해주세요!");
      })
      .catch((err) => console.log("err >>>>>>", err));
  };

  return (
    <LoginFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h3>브랜디 어드민 로그인</h3>
      {/* Id Input */}
      <IdInput ref={register({ required: true })} isError={errors.sellerId} />
      {errors.sellerId && <span>아이디를 입력해주세요.</span>}
      {/* Password Input */}
      <PasswordInput
        ref={register({ required: true })}
        isError={errors.sellerPassword}
      />
      {errors.sellerPassword && <span>비밀번호를 입력해주세요.</span>}
      {/* 로그인 Btn & 회원가입 */}
      <FormActions />
    </LoginFormWrapper>
  );
}

const LoginFormWrapper = styled.form`
  ${({ theme }) => theme.flex(``, ``, `column`)}
  margin: 0 auto;
  padding: 64px 30px 0 30px;
  width: 380px;
  height: 350px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 31px 0 rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 25px;
    font-size: 24px;
    font-weight: 700;
  }

  span {
    margin: 6px 0 0 0;
    font-weight: 700;
    font-size: 12px;
    text-align: left;
    color: #202020;
  }
`;

const IdInput = styled.input.attrs({
  name: "sellerId",
  placeholder: "셀러 아이디",
  type: "text",
})`
  padding: 13px 16px;
  border: 1px solid ${({ isError }) => (isError ? "red" : "#e5e5e5")};
  border-radius: 8px;
  font-size: 12px;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: 1.5;
  color: #333333;
  background-color: white;

  &:focus {
    outline: none;
    border: 1px solid ${({ isError }) => (isError ? "red" : "gray")};
    background-color: transparent;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }
`;

const PasswordInput = styled(IdInput).attrs({
  name: "sellerPassword",
  placeholder: "셀러 비밀번호",
  type: "password",
})`
  margin-top: 10px;
`;
