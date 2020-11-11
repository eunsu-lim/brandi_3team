import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ACCOUNT_API } from "../../../Config/api";
import { Close } from "@styled-icons/evaicons-solid";

export default function ChangePassword({ setIsModal }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    if (data) {
      const changePwd = confirm("비밀번호를 변경하시겠습니까?");
      if (changePwd == true) {
        try {
          axios
            .patch(
              `${ACCOUNT_API}/sellers/edit-password`,
              {
                password: data.password,
                new_password: data.new_password,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("access_token"),
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              if (res.status === 200) {
                alert(
                  "비밀번호가 변경되었습니다. 보안을 위해 재로그인해주세요."
                );
                window.location.reload();
                // history.push("/");
              }
            });
        } catch (err) {
          console.log(err);
          alert(
            "비밀번호 변경 도중 오류가 발생했습니다. \n현재 비밀번호가 일치하지 않습니다."
          );
        }
      } else {
        alert("취소되었습니다.");
      }
    }
  };

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
            <SellerInput isError={errors.password}>
              <label htmlFor="cuurentPwd">현재 비밀번호</label>
              <input
                type="password"
                placeholder="현재 비밀번호"
                name="password"
                autoComplete="off"
                ref={register({ required: true })}
              />
              {errors.password && <ErrorMsg>필수 입력 항목입니다.</ErrorMsg>}
            </SellerInput>

            <SellerInput isError={errors.new_password}>
              <label htmlFor="password">변경할 비밀번호</label>
              <input
                id="password"
                name="new_password"
                ref={register({
                  required: true,
                  pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                })}
                type="password"
                placeholder="변경할 비밀번호"
                autoComplete="off"
              />
              {errors.new_password &&
                errors.new_password.type === "required" && (
                  <ErrorMsg>필수 입력 항목입니다.</ErrorMsg>
                )}
              {errors.new_password &&
                errors.new_password.type === "pattern" && (
                  <ErrorMsg>
                    비밀번호는 8~20글자의 영문대소문자, 숫자, 특수문자를
                    조합해야 합니다.
                  </ErrorMsg>
                )}
            </SellerInput>
            {/* 유효성 검사 에러 메세지 */}
            <SellerInput isError={errors.rePasswrod}>
              <label htmlFor="rePassword">비밀번호 재입력</label>
              <input
                type="password"
                placeholder="한번 더 입력해주세요."
                name="rePassword"
                ref={register({
                  required: true,
                  validate: (value) =>
                    value === watch("new_password") ||
                    "비밀번호가 일치하지 않습니다",
                })}
                autoComplete="off"
              />
              {errors.rePassword && (
                <ErrorMsg>{errors.rePassword.message}</ErrorMsg>
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
            <button type="submit" className="btn btn-success">
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

const ErrorMsg = styled.p`
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #a94442;
`;
