import React, { useState, Fragment } from "react";
import Nav from "../../Components/Nav/Nav";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import Title from "./Component/Title/Title";
import FilterArea from "./Component/FilterArea/FilterArea";
import OrderManagementArea from "./Component/OrderManagementArea/OrderManagementArea";
import styled from "styled-components";

function Order(props) {
  // const history = useHistory();
  // const [orderId, setOrderId] = useState(props.match.params.id);
  // console.log(props.match.params.id);

  // const handleChange = (e) => {
  //   history.push(`/product/${e}`);
  //   window.location.reload();
  // };

  return (
    <OrderContainer>
      <Header />
      <Nav />
      <PageContent>
        {/* 타이틀 영역 */}
        <Title />
        {/* 필터 영역 */}
        <FilterArea />
        {/* 주문 관리 리스트 영역 */}
        <OrderManagementArea />
      </PageContent>
      <Footer />
    </OrderContainer>
  );
}

export default Order;

const OrderContainer = styled.div`
  display: flex;
`;

const PageContent = styled.div`
  /* margin-left: 215px; */
  margin-top: 30px;
  padding: 25px 20px 20px 20px;
  background-color: #fafafa;
`;
