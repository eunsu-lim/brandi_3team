import React, { useState } from "react";
import styled from "styled-components";
import ImgUpload from "./ImgUpload";
import { InfoCircleFill } from "@styled-icons/bootstrap";
import { User } from "@styled-icons/boxicons-solid";

export default function SellerDefaultInfo({
  register,
  errors,
  uploadId,
  profileImg,
  uploadProfileImg,
  removeProfileImg,
  changePassword,
}) {
  // console.log("values", values);
  return (
    <TableContainer>
      <SellerTable>
        <tbody>
          <tr>
            <td>
              셀러 프로필
              <Require> *</Require>
            </td>
            <td>
              {/* UploadImg 컴포넌트 분리 */}
              <ImgUpload
                refImg={register({ required: true })}
                uploadId={uploadId}
                name="sellerProfileImg"
                imgFile={profileImg}
                onChange={uploadProfileImg}
                removeFile={removeProfileImg}
              />
              <span className="info">
                <InfoCircleFill size="14" />
                셀러 프로필 확장자는 <b> jpg, jpeg, png</b> 만 가능하며, 허용
                가능한 최대 파일사이즈 크기는 <b> 5MB</b> 입니다.
              </span>
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
                    value="1"
                    ref={register({ required: true })}
                  />
                </label>
                <label>
                  <span>마켓</span>
                  <input
                    type="radio"
                    name="status"
                    value="2"
                    ref={register({ required: true })}
                  />
                </label>
                <label>
                  <span>로드샵</span>
                  <input
                    type="radio"
                    name="status"
                    value="3"
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
                셀러명(한글, 영문) 변경시 셀러명과 동일하게 등록된 브랜드 정보는
                자동으로 변경되지 않습니다. 관리자께서는 이점 유의해주시기
                바라며, 브랜드 정보 수정은 [이전 버전 관리 > 브랜드관리] 에서
                가능합니다.
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
              {errors.sellerNameKo && <ErrorMsg>필수 입력항목입니다.</ErrorMsg>}
              {/*  isSeller && 삼항연산자
                <span>{seller_name_ko}</span>
              */}
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
              {errors.sellerNameEn && <ErrorMsg>필수 입력항목입니다.</ErrorMsg>}
            </td>
          </tr>
          <tr>
            <td>셀러 계정</td>
            <td>
              Brandi
              <BtnDanger onClick={(e) => changePassword(e)}>
                비밀번호 변경하기
              </BtnDanger>
            </td>
          </tr>
        </tbody>
      </SellerTable>
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
    .info {
      margin-top: 8px;
    }
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
    top: 0;
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
