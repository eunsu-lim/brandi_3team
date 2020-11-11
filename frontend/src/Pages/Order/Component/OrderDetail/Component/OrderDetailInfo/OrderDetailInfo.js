import React from "react";
import styled from "styled-components";
import { ArrowForwardIos } from "@styled-icons/material-sharp/ArrowForwardIos";

function OrderDetailInfo() {
  return (
    <OrderPortletDetail>
      <OrderDetailInfoTitle>
        <ArrowForwardIos size="10" />
        <span>주문 상세 정보</span>
      </OrderDetailInfoTitle>
      <OrderDetailNumberStatus>
        <div className="title">
          <div>주문 상세 번호 : </div>
          <label htmlFor="">B202010260005C001</label>
        </div>
        <div>
          <div>주문 상태 : </div>
          <div>
            <select name="" id="">
              <option value="">주문접수</option>
              <option value="">배송준비</option>
              <option value="">주문취소중</option>
              <option value="">환불요청</option>
              <option value="">반품진행</option>
              <option value="">환불승인중</option>
              <option value="">결제대기</option>
              <option value="">결제완료</option>
              <option value="" selected>
                상품준비
              </option>
              <option value="">배송중</option>
              <option value="">배송완료</option>
              <option value="">환불완료</option>
              <option value="">주문취소완료</option>
              <option value="">구매확정</option>
            </select>
          </div>
        </div>
      </OrderDetailNumberStatus>
      <hr />
      <OrderDetailPaymentDate>
        <div>
          <div>결제일시:</div>
          <label htmlFor="">2020-10-07 17:46:27</label>
        </div>
        <div>
          <div>정산예정일 :</div>
          <label htmlFor="">아직 구매확정이 되지 않은 주문건입니다.</label>
        </div>
      </OrderDetailPaymentDate>
      <hr />
      <Contact>
        <div>
          <div className="contact">연락처 :</div>
          <label htmlFor="">010-3650-2119</label>
          <div className="btn">
            <ChangeContact type="button" value="변경" />
          </div>
        </div>
      </Contact>
    </OrderPortletDetail>
  );
}

export default OrderDetailInfo;

const OrderPortletDetail = styled.div`
  padding: 0 10px 2px 20px;
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 4px 4px 0 0;
  font-size: 13px;

  label {
    color: #333;
    font-size: 14px;
    height: 38px;
    font-weight: 400;
    margin-top: 1px;
    margin-left: 5px;
    padding: 0;
  }
`;

const OrderDetailInfoTitle = styled.div`
  height: 38px;
  background-color: #eee;
  border-radius: 4px 4px 0 0;
  padding: 10px 10px 2px 10px;
  margin-left: -20px;
  margin-right: -10px;

  span {
    display: inline-block;
    margin-top: 1px;
    margin-left: 5px;
    padding: 0;
    line-height: 16px;
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }
`;

const OrderDetailNumberStatus = styled.div`
  width: 100%;
  padding: 10px 10px 0 10px;

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

  select {
    width: 66.6%;
    height: 34px;
    padding: 6px 12px;
    background-color: #eee;
    box-shadow: none;
    border: none;
    border-radius: 4px;
    outline: none;
  }
`;

const OrderDetailPaymentDate = styled(OrderDetailNumberStatus)``;

const Contact = styled(OrderDetailNumberStatus)`
  .btn {
    width: 41.6%;
    text-align: center;
  }
`;

const ChangeContact = styled.input`
  padding: 1px 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  border: none;
  border-color: #d43f3a;
  background-color: #d9534f;
  color: white;
  outline: none;
  text-shadow: none;
  font-size: 12px;
  line-height: 1.5;
  cursor: pointer;
`;
