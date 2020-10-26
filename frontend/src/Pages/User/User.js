import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";

export default function User() {
  return (
    <UserWrap>
      <Header />
      <UserBox>
        <Nav />
        <UserContainer>{/* 작업 */}</UserContainer>
      </UserBox>
      <Footer />
    </UserWrap>
  );
}

const UserWrap = styled.div`
  position: relative;
`;

const UserBox = styled.div`
  display: flex;
`;

const UserContainer = styled.div`
  flex: 1;
  min-height: 100vh;
  height: auto;
  padding-top: 45px;
`;
