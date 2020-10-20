import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <Wrapper>
      <Content>
        <Logo>
          <img alt="logo" src="../../public/images/logo_seller_admin_1.png" />
        </Logo>
        <Form>
          <h3>브랜디 어드민 로그인</h3>
        </Form>
      </Content>
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

  h3 {
    margin-bottom: 25px;
    font-size: 24px;
    font-weight: 700;
  }
`;

const Logo = styled.div`
  margin-bottom: 40px;
  text-align: center;

  img {
    width: 130px;
  }
`;

const Form = styled.form`
  margin: 0 auto;
  padding: 64px 30px 0 30px;
  width: 380px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 31px 0 rgba(0, 0, 0, 0.1);
`;
