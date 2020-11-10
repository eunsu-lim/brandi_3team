import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import ProductContent from "./Components/ProductContent";

export default function Product() {
  return (
    <ProductWrap>
      <Header />
      <ProductBox>
        <Nav />
        <ProductContainer>
          {/* 상품 관리 Component 분리 */}
          <ProductContent />
        </ProductContainer>
      </ProductBox>
      <Footer />
    </ProductWrap>
  );
}

const ProductWrap = styled.div`
  position: relative;
`;

const ProductBox = styled.div`
  display: flex;
`;

const ProductContainer = styled.div`
  flex: 1;
  min-height: 100vh;
  height: auto;
  padding-top: 45px;
  width: calc(100% - 214px);
`;
