import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";

export default function Product() {
  return (
    <ProductWrap>
      <Header />
      <ProductBox>
        <Nav />
        <ProductContainer>
          {/* 여기 안쪽에 추가 후 작업해주세요!! */}
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
`;
