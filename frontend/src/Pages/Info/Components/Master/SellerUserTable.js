import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import UploadImg from "./UploadImg";
import { InfoCircleFill } from "@styled-icons/bootstrap";
import { User } from "@styled-icons/boxicons-solid";

export default function SellerUSerTable() {
  const { register, handleSubmit, errors } = useForm();

  // form Data 전송
  const onSubmit = (data) => {
    // 실패 시 alert
    // alert("입력하지 않은 필수항목이 있습니다. 다시 확인해주세요");
  };

  return (
    <TableContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SellerTable>
          <tbody>
            <tr>
              <td>
                셀러 프로필
                <Require> *</Require>
              </td>
              <td>
                {/* UploadImg 컴포넌트 분리 */}
                <UploadImg register={register} />
              </td>
            </tr>
            <tr>
              <td>셀러 상태</td>
              <td>입점대기</td>
            </tr>
            <tr>
              <td>
                셀러 속성
                <Require> *</Require>
              </td>
              <td>
                <SellerStatus>
                  <label>
                    <span>쇼핑몰</span>
                    <input
                      type="radio"
                      name="status"
                      ref={register({ required: true })}
                    />
                  </label>
                  <label>
                    <span>마켓</span>
                    <input
                      type="radio"
                      name="status"
                      ref={register({ required: true })}
                    />
                  </label>
                  <label>
                    <span>로드샵</span>
                    <input
                      type="radio"
                      name="status"
                      ref={register({ required: true })}
                    />
                  </label>
                </SellerStatus>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <span className="info">
                  <InfoCircleFill size="14" />
                  셀러명(한글, 영문) 변경시 셀러명과 동일하게 등록된 브랜드
                  정보는 자동으로 변경되지 않습니다. 관리자께서는 이점
                  유의해주시기 바라며, 브랜드 정보 수정은 [이전 버전 관리 >
                  브랜드관리] 에서 가능합니다.
                </span>
              </td>
            </tr>
            <tr>
              <td>셀러 한글명</td>
              <td>
                {/* 셀러 한글명 input */}
                <SellerInput isError={errors.sellerNameKo}>
                  <User size="14" color="#ddd" />
                  <input
                    type="text"
                    placeholder="셀러 한글명"
                    name="sellerNameKo"
                    ref={register({ required: true })}
                  />
                </SellerInput>
                {errors.sellerNameKo && (
                  <ErrorMsg>필수 입력항목입니다.</ErrorMsg>
                )}
              </td>
            </tr>
            <tr>
              {/* 셀러 영문명 input */}
              <td>셀러 영문명</td>
              <td>
                <SellerInput isError={errors.sellerNameEn}>
                  <User size="14" color="#ddd" />
                  <input
                    type="text"
                    placeholder="셀러 영문명"
                    name="sellerNameEn"
                    ref={register({ required: true })}
                  />
                </SellerInput>
                {errors.sellerNameEn && (
                  <ErrorMsg>필수 입력항목입니다.</ErrorMsg>
                )}
              </td>
            </tr>
            <tr>
              <td>셀러 계정</td>
              <td>
                wecode11
                <BtnDanger>비밀번호 변경하기</BtnDanger>
              </td>
            </tr>
          </tbody>
        </SellerTable>
        <SellerInfoBtn>
          <button
            type="submit"
            className="btn btn-success disabled"
            id="save_button"
          >
            수정
          </button>
          <button type="button" className="btn btn-default" id="back_button">
            취소
          </button>
        </SellerInfoBtn>
      </Form>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 10px 0;
  padding: 0 10px;
`;

const Form = styled.form`
  width: 100%;
`;

const SellerTable = styled.table`
  padding: 10px;
  width: 100%;
  border: 1px solid #dddddd;
  tr,
  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    white-space: nowrap;
    vertical-align: middle;
    font-size: 13px;
    line-height: 1.8;
  }
  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  tr:nth-child(even) {
    background-color: #fff;
  }

  span {
    &.info {
      ${({ theme }) => theme.flex(null, "center")};
      font-size: 13px;
      font-weight: normal;
      color: #1e90ff;
    }
    svg {
      margin-right: 4px;
    }
  }
`;

const SellerStatus = styled.div`
  ${({ theme }) => theme.flex(null, "center")};
  label {
    ${({ theme }) => theme.flex(null, "center")};
    margin-right: 12px;
    span {
      font-weight: normal;
      color: #333;
    }
    input {
      margin: 0 4px;
    }
  }
`;

const Require = styled.span`
  color: red !important;
  font-weight: bold;
  font-size: 16px !important;
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

const SellerInfoBtn = styled.div`
  ${({ theme }) => theme.flex("center", "center")};
  margin: 24px 0;
  button {
    margin: 4px;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    background-color: #fff;
    color: #999;
    border: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    &.btn-success {
      color: #fff;
      background-color: #5cb85c;
      border-color: #4cae4c;
    }
  }
`;

const BtnDanger = styled.button`
  margin-left: 8px;
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  color: #fff;
  border: none;
  cursor: pointer;
  background-color: #d9534f;
  outline: 0;
`;
