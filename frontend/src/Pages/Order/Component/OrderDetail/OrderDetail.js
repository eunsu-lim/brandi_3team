import React from "react";
import Nav from "../../../../Components/Nav/Nav";
import Header from "../../../../Components/Header/Header";
import Footer from "../../../../Components/Footer/Footer";
import OrderInfo from "./Component/OrderInfo/OrderInfo";
import OrderDetailInfo from "./Component/OrderDetailInfo/OrderDetailInfo";
import OrderProductInfo from "./Component/OrderProductInfo/OrderProductInfo";
import OrderReceiverInfo from "./Component/OrderReceiverInfo/OrderReceiverInfo";
import OrderStatusChangeRecord from "./Component/OrderStatusChangeRecord/OrderStatusChangeRecord";
import styled from "styled-components";
import { ArrowForwardIos } from "@styled-icons/material-sharp/ArrowForwardIos";
import { Home } from "@styled-icons/fa-solid/Home";
import { Truck } from "@styled-icons/fa-solid/Truck";

function OrderDetail() {
  return (
    <OrderDetailWrap>
      <Header />
      <OrderDetailBox>
        <Nav />
        <OrderDetailArticle>
          <PageTitle>
            <h3>주문 상세 관리</h3>
            <span>주문 목록/관리</span>
          </PageTitle>
          <PageNav>
            <ul>
              <Home size="13" style={{ color: "#666" }} />
              <li>주문관리</li>
              <ArrowForwardIos size="13" />
              <li>주문 상세 페이지</li>
            </ul>
          </PageNav>
          <OrderDetailPortlet>
            <OrderPortletTitle>
              <Truck
                size="13"
                style={{
                  transform: "scaleX(-1)",
                  color: "#666",
                }}
              />
              <span>주문 상세</span>
            </OrderPortletTitle>
            <OrderPortletBody>
              <OrderPortletInfoTitle>
                <ArrowForwardIos size="10" />
                <span>주문 정보</span>
              </OrderPortletInfoTitle>
              {/* 주문 정보 */}
              <OrderInfo />
              {/* 주문 상세 정보 */}
              <OrderDetailInfo />
              {/* 상품 정보 */}
              <OrderProductInfo />
              {/* 수취자 정보 */}
              <OrderReceiverInfo />
              {/* 주문상태 변경 이력 */}
              <OrderStatusChangeRecord />
            </OrderPortletBody>
          </OrderDetailPortlet>
        </OrderDetailArticle>
      </OrderDetailBox>
      <Footer />
    </OrderDetailWrap>
  );
}

export default OrderDetail;

const OrderDetailWrap = styled.section`
  position: relative;
`;

const OrderDetailBox = styled.div`
  display: flex;
`;

const OrderDetailArticle = styled.article`
  flex: 1;
  min-height: 100vh;
  height: auto;
  padding: 66px 20px 20px 20px;
  width: calc(100% - 214px);
`;

const PageTitle = styled.div`
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

const PageNav = styled.nav`
  display: flex;
  background-color: #eeeeee;
  padding-left: 10px;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 10px;
  justify-content: space-between;

  ul {
    display: flex;
    align-items: center;
    padding: 8px;

    li {
      font-size: 13px;
      padding: 0 5px;
      cursor: default;
    }
  }
`;

const OrderDetailPortlet = styled.div`
  margin-bottom: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const OrderPortletTitle = styled.div`
  height: 38px;
  background-color: #eee;
  border-radius: 4px 4px 0 0;
  padding: 10px 10px 2px 10px;

  span {
    color: #333;
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    margin-left: 5px;
    padding: 0;
    margin-top: 1px;
  }
`;

const OrderPortletBody = styled.div`
  border: 1px solid #eee;
  padding: 10px;
`;

const OrderPortletInfoTitle = styled(OrderPortletTitle)`
  background-color: cornsilk;
  border: 1px solid #eee;

  span {
    color: #333;
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    margin-left: 5px;
    padding: 0;
    margin-top: 1px;
  }
`;
