import React, { useState, useEffect } from "react";
import Nav from "../../Components/Nav/Nav";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useHistory, useParams } from "react-router-dom";
import Title from "./Component/Title/Title";
import FilterArea from "./Component/FilterArea/FilterArea";
import OrderManagementArea from "./Component/OrderManagementArea/OrderManagementArea";
import styled from "styled-components";

function Order(props) {
  const [selectedBtn, setSeletedBtn] = useState([]);

  const handleBtn = (btn) => {
    selectedBtn.includes(value)
      ? setSeletedBtn(selectedBtn.filter((el) => el !== value))
      : setSelectedBtn([...selectedBtn, value]);
  };

  // const history = useHistory();
  // const [orderId, setOrderId] = useState(props.match.params.id);
  // console.log(props.match.params.id);

  // const handleChange = (e) => {
  //   history.push(`/product/${e}`);
  //   window.location.reload();
  // };

  return (
    <Orderwrap>
      <Header />
      <OrderBox>
        <Nav />
        <OrderContainer>
          {/* 타이틀 영역 */}
          <Title />
          {/* 필터 영역 */}
          <FilterArea handleBtn={(e) => handleBtn(e)} />
          {/* 주문 관리 리스트 영역 */}
          <OrderManagementArea />
        </OrderContainer>
      </OrderBox>
      <Footer />
    </Orderwrap>
  );
}

export default Order;

const Orderwrap = styled.article`
  position: relative;
`;

const OrderBox = styled.div`
  display: flex;
`;

const OrderContainer = styled.div`
  flex: 1;
  min-height: 100vh;
  height: auto;

  padding: 66px 20px 20px 20px;
  width: calc(100% - 214px);
`;
