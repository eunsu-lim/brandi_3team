import React from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import MemberTable from "./MemberTable";
import { List } from "@styled-icons/evaicons-solid";
import { Share } from "@styled-icons/fa-solid";

export default function MemberList() {
  return (
    <MemberListBox>
      <TableTitle>
        <h4>
          <List size="16" />
          셀러 회원 리스트
        </h4>
        <ShareBtn>
          <Share size="16" color="#fff" />
          엑셀 다운로드
        </ShareBtn>
      </TableTitle>
      <TableBox>
        <Pagination />
        <MemberTable />
        <Pagination />
      </TableBox>
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

const ShareBtn = styled.button`
  ${({ theme }) => theme.flex(null, "center")};
  padding: 4px 10px;
  color: #fff;
  background-color: #5cb85c;
  border: none;
  border-color: #4cae4c;
  border-radius: 4px;
  svg {
    margin-right: 4px;
  }
`;
