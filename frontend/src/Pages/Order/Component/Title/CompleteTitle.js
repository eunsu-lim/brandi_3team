import React from "react";
import styled from "styled-components";

function CompleteTitle() {
  return (
    <div>
      <PageTitle>
        <h3>주문 관리</h3>
        <span>배송완료 관리</span>
      </PageTitle>
    </div>
  );
}

export default CompleteTitle;

const PageTitle = styled.header`
  display: flex;
  align-items: center;
  vertical-align: center;
  padding: 0px;
  font-size: 26px;
  letter-spacing: -1px;
  color: #666;
  margin: 0px 0px 15px 0px;

  span {
    padding-top: 10px;
    padding-left: 5px;
    font-size: 14px;
    color: #888;
  }
`;
