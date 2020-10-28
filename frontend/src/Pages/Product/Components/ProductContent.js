import React from "react";
import styled from "styled-components";
import ListFilterArea from "./ListFilterArea";
import ProductList from "./ProductList";

function ProductContent() {
  return (
    <ProductContentWrap>
      <h3>상품 관리</h3>
      {/* 상품 리스트 필터 영역*/}
      <ListFilterArea />
      {/* 상품 리스트 영역 */}
      <ProductList />
    </ProductContentWrap>
  );
}

export default ProductContent;

const ProductContentWrap = styled.div`
  min-height: 892px;
  padding: 25px 20px 70px 20px;
  background-color: #fafafa;

  h3 {
    margin: 0px 0px 15px 0px;
    font-size: 26px;
    font-weight: 300;
    letter-spacing: -1px;
    color: #666;
  }
`;
