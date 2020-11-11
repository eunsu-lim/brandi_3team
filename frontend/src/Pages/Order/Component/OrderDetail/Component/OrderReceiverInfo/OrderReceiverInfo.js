import React from "react";
import styled from "styled-components";
import { ArrowForwardIos } from "@styled-icons/material-sharp/ArrowForwardIos";

function OrderReceiverInfo() {
  return (
    <OrderReceiverContainer>
      <OrderReceiverInfoTitle>
        <ArrowForwardIos size="10" />
        <span>수취자 정보</span>
      </OrderReceiverInfoTitle>
      <Orderer>
        <div>
          <div>주문자명 : </div>
          <label htmlFor="">브랜디</label>
        </div>
        <div>
          <div className="contact">연락처 :</div>
          <label htmlFor="">010-3650-2119</label>
          <div className="btn-contact">
            <ChangeContact type="button" value="변경" />
          </div>
        </div>
      </Orderer>
      <hr />
      <Address>
        <div>
          <div>배송지 : </div>
          <label htmlFor="">서울 도봉구 노해로 258 엄저구점저구 (01453)</label>
        </div>
        <div>
          <div>배송시 요청사항 : </div>
          <label htmlFor="">일반배송</label>
          <br />
          <label htmlFor="">
            새벽도착 : 택배함에 넣어주세요 (택배함 번호 없음)
          </label>
          <div className="btn-address">
            <ChangeAddress type="button" value="배송지 변경" />
          </div>
        </div>
      </Address>
    </OrderReceiverContainer>
  );
}

export default OrderReceiverInfo;

const OrderReceiverContainer = styled.div`
  padding: 0 10px 2px 20px;
  margin-bottom: 20px;
  border-radius: 4px 4px 0 0;
  border: 1px solid #eee;
  font-size: 13px;

  label {
    color: #333;
    font-size: 14px;
    height: 38px;
    font-weight: 400;
    margin-top: 1px;
    margin-bottom: 15px;
    padding: 0;
  }
`;

const OrderReceiverInfoTitle = styled.div`
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

const Orderer = styled.div`
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

  .btn-contact {
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

const Address = styled(Orderer)`
  .btn-address {
    width: 41.6%;
    text-align: right;
  }
`;

const ChangeAddress = styled.input`
  display: inline-block;
  margin-bottom: 0;
  padding: 6px 12px;
  text-align: center;
  border: none;
  border-radius: 3px;
  outline: none;
  background-color: #5bc0de;
  border-color: #46b8da;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
`;
