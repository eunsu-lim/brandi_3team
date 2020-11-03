import React, { useState } from "react";
import styled from "styled-components";
import SellerBackImg from "./SellerBackImg";
import ManagerInfo from "./ManagerInfo";
import SellerAddress from "./SellerAddress";
import SellerTimePick from "./SellerTimePick";
import SellerStatus from "./SellerStatus";
import { InfoCircleFill, TelephoneFill } from "@styled-icons/bootstrap";
import { User } from "@styled-icons/boxicons-solid";

export default function SellerDetailTable({ register, errors }) {
  const [checked, setChecked] = useState(false);

  return (
    <TableContainer>
      <SellerTable>
        <tbody>
          <tr>
            <td>셀러페이지 배경이미지</td>
            <td>
              {/* UploadImg */}
              <SellerBackImg register={register} />
              <InfoLine>
                <InfoSmall>
                  <InfoCircleFill size="14" />
                  <span className="info">
                    브랜디 앱과 웹 사이트의 셀러 페이지에 보여질
                    배경이미지입니다.
                  </span>
                </InfoSmall>
                <InfoSmall>
                  <InfoCircleFill size="14" />
                  <span className="info">
                    배경이미지는 1200 * 850 사이즈 이상으로 등록해주세요.
                  </span>
                </InfoSmall>
                <InfoSmall>
                  <InfoCircleFill size="14" />
                  <span className="info">
                    확장자는 jpg, jpeg, png 만 가능하며, 허용 가능한 최대
                    파일사이즈 크기는 5MB 입니다.
                  </span>
                </InfoSmall>
              </InfoLine>
            </td>
          </tr>
          <tr>
            <td>
              셀러 한줄 소개
              <Require> *</Require>
            </td>
            <td>
              <SellerInput isError={errors.sellerInfo}>
                <User size="14" color="#ddd" />
                <input
                  type="text"
                  placeholder="셀러 한줄소개"
                  name="sellerInfo"
                  ref={register({ required: true })}
                />
              </SellerInput>
              {errors.sellerInfo && <ErrorMsg>필수 입력항목입니다.</ErrorMsg>}
            </td>
          </tr>
          <tr>
            <td>셀러 상세 소개</td>
            <td>
              <TextArea placeholder="셀러 상세소개" name="sellerDetailInfo" />
              <InfoLine>
                <InfoSmall>
                  <InfoCircleFill size="14" />
                  <span className="info">
                    셀러 상세 소개 글은 최소10자 이상 입니다.
                  </span>
                </InfoSmall>
              </InfoLine>
            </td>
          </tr>
          <tr>
            <td>
              담당자 정보
              <Require> *</Require>
            </td>
            <td>
              <ManagerInfo register={register} errors={errors} />
            </td>
          </tr>
          <tr>
            <td>
              고객 센터
              <Require> *</Require>
            </td>
            <td>
              <SellerInput isError={errors.customerTel}>
                <TelephoneFill size="14" color="#ddd" />
                <input
                  type="text"
                  placeholder="고객센터 전화번호"
                  name="customerTel"
                  ref={register({ required: true })}
                />
              </SellerInput>
              {errors.customerTel && <ErrorMsg>필수 입력항목입니다.</ErrorMsg>}
            </td>
          </tr>
          <tr>
            <td>
              택배 주소
              <Require> *</Require>
            </td>
            <td>
              <SellerAddress register={register} errors={errors} />
            </td>
          </tr>
          <tr>
            <td>
              고객센터 운영시간 (주중)
              <Require> *</Require>
            </td>
            <td>
              <CustomerTime>
                <SellerTimePick register={register} errors={errors} />
                <InfoSmall>
                  <InfoCircleFill size="14" />
                  <span className="info">
                    주말 및 공휴일에도 운영하시는 경우 체크박스를 누르시고
                    입력해주세요.
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                </InfoSmall>
              </CustomerTime>
            </td>
          </tr>
          {checked && (
            <tr>
              <td>
                고객센터 운영시간 (주말)
                <Require> *</Require>
              </td>
              <td>
                <SellerTimePick register={register} errors={errors} />
              </td>
            </tr>
          )}

          <tr>
            <td>셀러상태 변경기록</td>
            <td>
              <SellerStatus register={register} errors={errors} />
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
  }
  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  tr:nth-child(even) {
    background-color: #fff;
  }

  span {
    svg {
      margin-right: 4px;
    }
  }
`;

const InfoLine = styled.div`
  ${({ theme }) => theme.flex(null, null, "column")};
  margin-top: 8px;
  color: #1e90ff;
`;

const InfoSmall = styled.div`
  ${({ theme }) => theme.flex(null, "center")};
  .info {
    font-size: 13px;
    font-weight: normal;
    color: #1e90ff;
    &:first-child {
      margin-top: 8px;
    }
  }

  svg {
    margin-right: 4px;
    color: #1e90ff;
  }

  input {
    margin-left: 8px;
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

const TextArea = styled.textarea`
  padding: 9px;
  width: 444px;
  height: 100px;
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
`;

const ErrorMsg = styled.p`
  display: block;
  margin-top: 4px;
  font-size: 13px;
  color: #a94442;
`;

const CustomerTime = styled.div`
  position: relative;
  ${({ theme }) => theme.flex(null, "center")};
  svg {
    margin-left: 24px;
  }
`;
