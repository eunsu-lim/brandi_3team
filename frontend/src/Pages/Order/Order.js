import React, { useState } from "react";
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
    <PageContent>
      {/* 타이틀 영역 */}
      <Title />
      {/* 필터 영역 */}
      <FilterArea />
      {/* 주문 관리 리스트 영역 */}
      <OrderManagementArea />
    </PageContent>
  );
}

export default Order;

const PageContent = styled.div`
  margin-left: 215px;
  margin-top: 0px;
  padding: 25px 20px 20px 20px;
  background-color: #fafafa;
`;
