import React from "react";
import styled from "styled-components";
import { InfoCircleFill } from "@styled-icons/bootstrap";

export default function SellerUSerTable() {
  return (
    <TableContainer>
      <SellerTable>
        <tbody>
          <tr>
            <td>셀러 프로필</td>
            <td>
              <div>
                <div></div>
                <input type="file" />
                <span className="info">
                  <InfoCircleFill size="14" />
                  셀러 프로필 확장자는 jpg, jpeg, png 만 가능하며, 허용 가능한
                  최대 파일사이즈 크기는 5MB 입니다.
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>셀러 상태</td>
            <td>입점대기</td>
          </tr>
          <tr>
            <td>셀러 속성</td>
            <td>
              <label>
                <span>쇼핑몰</span>
                <input type="radio" />
              </label>

              <label>
                <span>마켓</span>
                <input type="radio" />
              </label>

              <label>
                <span>로드샵</span>
                <input type="radio" />
              </label>
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
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>셀러 영문명</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>셀러 계정</td>
            <td>wecode11</td>
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

  label {
    margin-right: 12px;
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
