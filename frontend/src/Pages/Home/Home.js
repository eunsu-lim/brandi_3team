import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";

export default function Home() {
  const test = useSelector((store) => store.dataReducer);
  console.log("initial_state >>>>>>", test);
  return (
    <MainWrap>
      <Header />
      <MainBox>
        <Nav />
        <MainContainer>
          {/* 여기에 component 추가 후 작업해주세요!! */}
        </MainContainer>
      </MainBox>
      <Footer />
    </MainWrap>
  );
}

const MainWrap = styled.div`
  position: relative;
`;

const MainBox = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  flex: 1;
  min-height: 100vh;
  height: auto;
  padding-top: 45px;
`;
