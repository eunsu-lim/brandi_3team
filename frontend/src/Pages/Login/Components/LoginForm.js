import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import FormActions from "./FormActions";

export default function LoginForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));

  return (
    <LoginFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h3>브랜디 어드민 로그인</h3>
      <IdInput ref={register({ required: true })} isError={errors.username} />
      {errors.username && <span>아이디를 입력해주세요.</span>}
      <PasswordInput
        ref={register({ required: true })}
        isError={errors.password}
      />
      {errors.password && <span>비밀번호를 입력해주세요.</span>}
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
  name: "username",
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
  name: "password",
  placeholder: "셀러 비밀번호",
  type: "password",
})`
  margin-top: 10px;
`;
