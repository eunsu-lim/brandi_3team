import React from "react";
import styled from "styled-components";
import MemberTable from "./MemberTable";

export default function MemberList() {
  return (
    <MemberListBox>
      <TableTitle>
        <h4>셀러 회원 리스트</h4>
      </TableTitle>
      <TableBox>
        {/* <Pagination /> */}
        <MemberTable />
      </TableBox>
    </MemberListBox>
  );
}

const MemberListBox = styled.div`
  margin-bottom: 25px;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TableTitle = styled.div`
  padding: 10px 10px 2px 10px;
  height: 38px;
  background-color: #eee;
  border-radius: 4px 4px 0 0;
  h4 {
    color: #333;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    margin-top: 1px;
  }
`;

const TableBox = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 0px 0px 4px 4px;
`;
