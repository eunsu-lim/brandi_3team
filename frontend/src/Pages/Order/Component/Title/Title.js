import React from "react";
import styled from "styled-components";

function Title() {
  return (
    <div>
      <PageTitle>
        <h3>주문 관리</h3>
        <span>상품 준비 관리</span>
      </PageTitle>
      <BasicInfo>
        <p>
          ( 상품준비 단계에서는 구매회원의 주문취소가 가능하며, 배송준비단계로
          처리할 경우 3영업일 동안은 구매회원의 주문취소가 불가능합니다. )
        </p>
        <p>
          ( 배송준비로 변경하신 후 3영업일 이내로 상품 배송이 시작되지 않을 경우
          구매회원의 주문취소가 가능하며 이에 따른 책임은 판매자 회원에게
          있습니다. (전자상거래법 제 15조 1항에 근거) )
        </p>
      </BasicInfo>
    </div>
  );
}

export default Title;

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

const BasicInfo = styled.div`
  width: 100%;
  margin-bottom: 15px;
  font-size: 14px;
  letter-spacing: 0px;
  font-weight: 300;
  color: #888;
  line-height: 1.8;
`;
