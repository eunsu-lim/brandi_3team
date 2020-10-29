import React from "react";
import styled from "styled-components";
import InputMask from "react-input-mask";
import { User } from "@styled-icons/boxicons-solid";
import { TelephoneFill } from "@styled-icons/bootstrap";
import { Email } from "@styled-icons/material";
import { Plus } from "@styled-icons/fa-solid";

export default function ChargerInfo({ register, errors }) {
  return (
    <Charger>
      <ChargerInput>
        <SellerInput isError={errors.ChargerInfo}>
          <User size="14" color="#ddd" />
          <input
            type="text"
            placeholder="담당자명"
            name="ChargerInfo"
            ref={register({ required: true })}
          />
        </SellerInput>
        {errors.ChargerInfo && <ErrorMsg>필수 입력항목입니다.</ErrorMsg>}
      </ChargerInput>
      <ChargerInput>
        <SellerInput>
          <TelephoneFill size="14" color="#ddd" />
          <InputMask
            mask="999-9999-9999"
            type="text"
            placeholder="담당자 핸드폰번호"
            name="ChargerTel"
            inputRef={register}
          />
        </SellerInput>
      </ChargerInput>
      <ChargerInput>
        <SellerInput isError={errors.ChargerEmail}>
          <Email size="14" color="#ddd" />
          <input
            type="text"
            placeholder="담당자 이메일"
            name="ChargerEmail"
            ref={register({ required: true })}
          />
        </SellerInput>
        {errors.ChargerEmail && <ErrorMsg>필수 입력항목입니다.</ErrorMsg>}
        <button className="plusBtn btn">
          <Plus size="16" color="#fff" />
        </button>
      </ChargerInput>
    </Charger>
  );
}

const Charger = styled.div`
  ${({ theme }) => theme.flex("space-around", null, "column")};
`;

const ChargerInput = styled.div`
  margin-bottom: 8px;
  &:last-child {
    position: relative;
    margin-bottom: 0;
    .btn {
      position: absolute;
      top: 0;
      left: 40%;
      width: 40px;
      height: 34px;
      margin-left: 8px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .plusBtn {
    color: #fff;
    background-color: #5cb85c;
    border: none;
    border: 1px solid #4cae4c;
    &:hover {
      color: #fff;
      background-color: #449d44;
      border-color: #398439;
    }
  }
`;

const SellerInput = styled.div`
  position: relative;
  ${({ theme }) => theme.flex(null, "center")};
  width: 40%;
  height: 34px;
  border-radius: 4px;

  /* isError - 에러 메세지가 있을 경우  */
  svg {
    position: absolute;
    margin: 12px;
    color: ${({ isError }) => (isError ? "#b94a48" : "#ccc")};
  }
  input {
    padding: 9px 12px;
    padding-left: 33px;
    width: 100%;
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
