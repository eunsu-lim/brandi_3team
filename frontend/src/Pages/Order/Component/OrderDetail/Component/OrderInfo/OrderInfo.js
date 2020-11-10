import React from "react";
import styled from "styled-components";

function OrderInfo() {
  return (
    <OrderPortletInfo>
      <OrderNumberDate>
        <div>
          <div>주문 번호 : </div>
          <label htmlFor="">20201007000121000</label>
        </div>
        <div>
          <div>주문 일시 : </div>
          <label htmlFor="">2020-10-26 14:10:35</label>
        </div>
      </OrderNumberDate>
      <hr />
      <OrderPayment>
        <div>
          <div>총 결제금액 : </div>
          <label>72,090원</label>
        </div>
      </OrderPayment>
    </OrderPortletInfo>
  );
}

export default OrderInfo;

const OrderPortletInfo = styled.div`
  border: 1px solid #eee;
  border-radius: 4px 4px 0 0;
  padding: 10px 10px 2px 20px;
  font-size: 13px;
  margin-bottom: 20px;

  label {
    color: #333;
    font-size: 14px;
    height: 38px;
    font-weight: 400;
    margin-top: 1px;
    margin-bottom: 15px;
    margin-left: 5px;
    padding: 0;
  }

  hr {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const OrderNumberDate = styled.div`
  width: 100%;

  div {
    display: inline-block;
    width: 50%;
    margin-bottom: 5px;

    div {
      width: 33.3%;
    }

    label {
      width: 66.6%;
    }
  }
`;

const OrderPayment = styled(OrderNumberDate)``;
