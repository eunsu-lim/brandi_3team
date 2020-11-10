import React, { useState } from "react";
import styled from "styled-components";
import ImgUpload from "./ImgUpload";
import { InfoCircleFill } from "@styled-icons/bootstrap";
import { User } from "@styled-icons/boxicons-solid";

export default function SellerDefaultInfo({
  register,
  errors,
  infos,
  uploadId,
  isChangeImg,
  profileImg,
  uploadProfileImg,
  removeProfileImg,
  changePassword,
}) {
  const [clickValue, setClickValue] = useState(0);
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
                refImg={
                  profileImg
                    ? register({ required: false })
                    : register({ required: true })
                }
                uploadId={uploadId}
                name="profile_image"
                isChangeImg={isChangeImg}
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
            <td>
              {(infos.seller_status_id === 1 && "입점 대기") ||
                (infos.seller_status_id === 2 && "입점") ||
                (infos.seller_status_id === 3 && "퇴점 대기") ||
                (infos.seller_status_id === 4 && "퇴점") ||
                (infos.seller_status_id === 5 && "휴점")}
            </td>
          </tr>
          <tr>
            <td>셀러 한글명</td>
            <td>
              {/* 셀러 한글명  */}
              <span>{infos && infos.name_korean}</span>
            </td>
          </tr>
          <tr>
            <td>셀러 영문명</td>
            <td>
              {/* 셀러 영문명  */}
              <span>{infos && infos.name_english}</span>
            </td>
          </tr>
          <tr>
            <td>셀러 계정</td>
            <td>
              {infos.account_name}
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
