import React from "react";
import Nav from "../../../../Components/Nav/Nav";
import Header from "../../../../Components/Header/Header";
import Footer from "../../../../Components/Footer/Footer";
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
              <Home size="16" />
              <li>주문관리</li>
              <ArrowForwardIos size="13" />
              <li>주문 상세 페이지</li>
            </ul>
          </PageNav>
          {/* 주문 상세 내용 */}
          <OrderDetailPortlet>
            <OrderPortletTitle>
              <Truck size="16" />
              <span>주문 상세</span>
            </OrderPortletTitle>
            <OrderPortletBody>
              {/* 주문 정보 */}
              <OrderPortletInfo>
                <OrderPortletInfoTitle>
                  <ArrowForwardIos size="10" />
                  <span>주문 정보</span>
                </OrderPortletInfoTitle>
                <div>
                  <div>
                    <div>주문 번호:</div>
                    <div>
                      <label htmlFor="">20201007000121000</label>
                    </div>
                  </div>
                  <div>주문 일시 : </div>
                  <div>
                    <label htmlFor="">2020-10-26 14:10:35</label>
                  </div>
                </div>
                <hr />
                <div>
                  <div>총 결제금액:</div>
                  <div>72,090원</div>
                </div>
              </OrderPortletInfo>
              <OrderPortletDetail>
                <ArrowForwardIos size="10" />
                <span>주문 상세 정보</span>
                <div>
                  <div>
                    <div>주문 상세 번호:</div>
                    <div>
                      <label htmlFor="">B202010260005C001</label>
                    </div>
                  </div>
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
                      <option value="">상품준비</option>
                      <option value="">배송중</option>
                      <option value="">배송완료</option>
                      <option value="">환불완료</option>
                      <option value="">주문취소완료</option>
                      <option value="">구매확정</option>
                    </select>
                  </div>
                </div>
                <hr />
                <div>
                  <div>총 결제금액:</div>
                  <div>72,090원</div>
                </div>
              </OrderPortletDetail>
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

const OrderDetailPortlet = styled.article`
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const OrderPortletTitle = styled.header`
  background-color: #eee;
  border-radius: 4px 4px 0 0;
  padding: 10px 10px 2px 20px;

  span {
    color: #333;
    display: inline-block;
    font-size: 16px;
    height: 38px;
    line-height: 38px;
    font-weight: 400;
    margin-left: 5px;
    padding: 0;
    margin-top: 1px;
  }
`;

const OrderPortletBody = styled(OrderDetailPortlet)`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 2px 20px;
`;

const OrderPortletInfo = styled(OrderPortletTitle)`
  hr {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const OrderPortletInfoTitle = styled.header`
  background-color: cornsilk;
`;

const OrderPortletDetail = styled.article``;
