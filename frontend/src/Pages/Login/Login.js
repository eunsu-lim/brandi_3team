import React from "react";
import styled from "styled-components";
import LoginForm from "./Components/LoginForm";
import Footer from "./Components/Footer";

function Login() {
  return (
    <Wrapper>
      <Content>
        {/* 브랜디 로고 */}
        <Logo>
          <img alt="logo" src="../../public/images/logo_seller_admin_1.png" />
        </Logo>
        {/* 로그인 form Component 분리 */}
        <LoginForm />
      </Content>
      <Footer />
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  height: 100vh;
`;

const Content = styled.div`
  ${({ theme }) => theme.flex(``, `center`, `column`)}
  margin: auto;
  padding: 65px 0 50px;
  width: 700px;
`;

const Logo = styled.div`
  margin-bottom: 40px;
  text-align: center;

  img {
    width: 130px;
  }
`;
