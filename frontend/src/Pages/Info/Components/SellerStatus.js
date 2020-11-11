import React from "react";
import styled from "styled-components";

export default function SellerStatus() {
  return (
    <StatusTable>
      <thead>
        <tr>
          <th>셀러상태 변경 적용일시</th>
          <th>셀러 상태</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2020-10-26 17:11:58</td>
          <td>입점 대기</td>
        </tr>
        <tr>
          <td>2020-10-26 17:11:58</td>
          <td>입점 대기</td>
        </tr>
      </tbody>
    </StatusTable>
  );
}

const StatusTable = styled.table`
  width: 100%;
  th {
    background-color: #fff;
  }
  th {
    border: 1px solid red;
    font-weight: normal;
    text-align: left;
  }

  td:first-child {
    width: 68% !important;
  }
`;
