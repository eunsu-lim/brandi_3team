import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Close } from "@styled-icons/evaicons-solid";

export default function ChangePassword({ setIsModal }) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => console.log("data", data);
  const [pwd, setPwd] = useState("");
  const [chkPwd, setChkPwd] = useState("");
  // 비밀번호를 변경하시겠습니까?
  // 비밀번호가 변경되었습니다. 보안을 위해 재로그인해주세요.
  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ChangePassModal onClick={() => setIsModal(false)}></ChangePassModal>

        <ModalContent>
          <ModalHeader>
            <h4>비밀번호 변경하기</h4>
            <button onClick={() => setIsModal(false)}>
              <Close size="14" color="#999" />
            </button>
          </ModalHeader>
          <ModalBody>
            <SellerInput>
              <p>현재 비밀번호</p>
              <input type="password" placeholder="" name="cuurentPwd" />
            </SellerInput>
            <SellerInput isError={errors.password}>
              <label htmlFor="password">변경할 비밀번호</label>
              <input
                id="password"
                name="password"
                aria-invalid={errors.passward ? "true" : "false"}
                ref={register({
                  required: true,
                  pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                })}
                type="password"
                placeholder="변경할 비밀번호"
                onChange={(pwd) => setPwd(pwd.target.value)}
              />
              {errors.password &&
                alert(
                  "비밀번호는 8~20글자의 영문대소문자, 숫자, 특수문자를 조합해야 합니다."
                )}
            </SellerInput>
            <SellerInput isError={errors.chkPassword}>
              <p>비밀번호 재입력</p>
              <input
                type="password"
                placeholder="한번 더 입력해주세요."
                name="chkPassword"
                ref={register({ required: true })}
                onChange={(chkPwd) => setChkPwd(chkPwd.target.value)}
              />
              {errors.chkPassword &&
                alert(
                  "비밀번호는 8~20글자의 영문대소문자, 숫자, 특수문자를 조합해야 합니다."
                )}
            </SellerInput>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => setIsModal(false)}
            >
              취소
            </button>
            <button type="button" className="btn btn-success">
              변경
            </button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Fragment>
  );
}

const Form = styled.form``;

const ChangePassModal = styled.div`
  z-index: 8;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ModalContent = styled.div`
  z-index: 9;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -157px;
  width: 400px;
  background: #fff;
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 16px;
  border-bottom: 1px solid #efefef;
  h4 {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.4;
  }
  button {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  padding: 16px;
`;

const ModalFooter = styled.div`
  ${({ theme }) => theme.flex("flex-end")};
  padding: 16px;
  border-top: 1px solid #e5e5e5;

  .btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    border: none;
    outline: 0;
    border-radius: 4px;
  }

  .btn-default {
    color: #333;
    background-color: #fff;
    border: 1px solid #e5e5e5;
  }

  .btn-success {
    margin-left: 8px;
    color: #fff;
    background-color: #5cb85c;
    border: 1px solid #4cae4c;
  }
`;

const SellerInput = styled.div`
  position: relative;
  ${({ theme }) => theme.flex(null, null, "column")};
  margin-left: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  label {
    margin-bottom: 8px;
    text-align: left;
  }
  /* isError - 에러 메세지가 있을 경우  */
  input {
    display: block;
    padding: 9px 12px;
    border: 1px solid ${({ isError }) => (isError ? "#a94442" : "#ddd")};
    border-radius: 4px;
    outline: 0;
    &:placeholder {
      color: #ddd;
    }
    &:focus {
      border: 1px solid ${({ isError }) => (isError ? "#a94442" : "#999999")};
      border-radius: 4px;
    }
  }
`;
