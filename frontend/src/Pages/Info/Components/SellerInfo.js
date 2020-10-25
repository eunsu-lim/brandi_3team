import React from "react";
import styled from "styled-components";
import SellerUserTable from "./SellerUserTable";
import { User } from "@styled-icons/boxicons-solid";

export default function SellerInfo() {
  return (
    <MemberListBox>
      <TableTitle>
        <h4>
          <User size="16" />
          기본 정보
        </h4>
      </TableTitle>
      <SellerUserTable />
      <TableBox></TableBox>
    </MemberListBox>
  );
}

const MemberListBox = styled.div`
  margin-bottom: 60px;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TableTitle = styled.div`
  ${({ theme }) => theme.flex("space-between", "center")};
  padding: 8px 12px;
  height: 38px;
  background-color: #eee;
  border-radius: 4px 4px 0 0;
  h4 {
    color: #333;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    margin-top: 1px;
    margin-left: 4px;
    svg {
      margin-right: 4px;
    }
  }
`;

const TableBox = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 0px 0px 4px 4px;
`;
