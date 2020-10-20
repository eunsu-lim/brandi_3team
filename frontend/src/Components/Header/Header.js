import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderBox>
      <HeaderLeft>
        <LogoBox>
          <LogoImg />
        </LogoBox>
      </HeaderLeft>
      <HeaderRight>
        <LoginAccount>intern_master</LoginAccount>
      </HeaderRight>
    </HeaderBox>
  );
}

const HeaderBox = styled.header`
  ${({ theme }) => theme.flex("space-between", "center")};
  padding: 0 20px;
  height: 45px;
  background-color: #873b53;
  color: #fff;
`;

const HeaderLeft = styled.div``;

const LogoBox = styled.a`
  width: 100px;
`;

const LogoImg = styled.h1`
  background-image: url("../../../public/images/logo_2.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 100px;
  height: 45px;
  border: 0;
  outline: none;
`;

const HeaderRight = styled.div``;

const LoginAccount = styled.div``;
