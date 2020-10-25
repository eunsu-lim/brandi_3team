import React from "react";
import styled from "styled-components";
import { ArrowIosBack, ArrowIosForward } from "@styled-icons/evaicons-solid";

export default function Pagination() {
  return (
    <Paging>
      <Page>
        <PageText>Page</PageText>
        <div className="pageArrow">
          <ArrowIosBack color="#333" size="14" />
        </div>
        <input type="text" className="pageNum" />
        <div className="pageArrow">
          <ArrowIosForward color="#333" size="14" />
        </div>
        <PageText>of 822</PageText>
      </Page>
      <View>
        <PageText>View</PageText>
        <select>
          <option>10</option>
          <option>20</option>
          <option>50</option>
          <option>100</option>
          <option>150</option>
        </select>
        <PageText>records</PageText>
      </View>
      <PageTotal>
        <PageText>
          Found total <PageText>8,212</PageText> records
        </PageText>
      </PageTotal>
    </Paging>
  );
}

const Paging = styled.ul`
  ${({ theme }) => theme.flex("flex-start")};
`;

const Page = styled.li`
  display: flex;
  position: relative;
  padding-right: 4px;
  line-height: 1.4;
  .pageArrow {
    padding: 5px 10px;
    color: #333;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
  }
  .pageNum {
    margin: 0 5px;
    width: 45px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
  }
  &:after {
    position: absolute;
    right: 0;
    content: "|";
    line-height: 30px;
  }
`;

const PageText = styled.span`
  margin: 0 4px;
  color: #000 !important;
  font-weight: 400 !important;
  line-height: 30px;
`;

const View = styled.li`
  position: relative;
  padding-right: 4px;
  select {
    margin: 0 5px;
    padding: 8px;
    width: 80px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
  }
  &:after {
    position: absolute;
    right: 0;
    content: "|";
    line-height: 30px;
  }
`;

const PageTotal = styled.li``;
