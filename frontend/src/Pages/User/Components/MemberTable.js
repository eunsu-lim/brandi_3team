import React from "react";
import styled from "styled-components";

export default function MemberTable() {
  return (
    <TableContainer>
      <SellerTable>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>번호</th>
            <th>셀러아이디</th>
            <th>영문이름</th>
            <th>힌글이름</th>
            <th>담당자이름</th>
            <th>셀러상태</th>
            <th>담당자 연락처</th>
            <th>담당자 이메일</th>
            <th>셀러속성</th>
            <th>등록일시</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>22328</td>
            <td>brandtest1023</td>
            <td>brandtest1023</td>
            <td>브랜드테스트102</td>
            <td>이정필</td>
            <td>입점</td>
            <td>010-8516-1399</td>
            <td>leejp@brandi.co.kr</td>
            <td>쇼핑몰</td>
            <td>2020-10-23 16:21:51</td>
            <td>
              <input type="button" />
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
  border: 1px solid #dddddd;
  margin: 10px 0;
`;

const SellerTable = styled.table`
  width: 100%;
  th {
    padding: 8px;
    background: #eee;
    font-size: 14px;
    font-weight: 600;
  }
  tr,
  th,
  td {
    border: 1px solid #ddd;
    white-space: nowrap;
  }
`;
