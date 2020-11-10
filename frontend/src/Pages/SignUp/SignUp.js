import React from "react";
import styled from "styled-components";
import JoinTitle from "./Components/JoinTitle";
import JoinForm from "./Components/JoinForm";
import Footer from "./Components/Footer";

function SignUp() {
  return (
    <SignUpWrap>
      <SellerJoin>
        {/* 브랜디 로고 */}
        <LogoWrap>
          <Logo />
        </LogoWrap>
        {/* 회원가입 타이틀 및 단계 */}
        <JoinTitle />
        {/* 회원가입 Form */}
        <JoinForm />
      </SellerJoin>
      {/* 회원가입 Footer */}
      <Footer />
    </SignUpWrap>
  );
}

export default SignUp;

const SignUpWrap = styled.div`
  ${({ theme }) => theme.flex(``, ``, `column`)}
  height: 100vh;
  background-color: #fafafa;
`;

const SellerJoin = styled.div`
  margin: 0 auto;
  padding: 20px 30px 15px;
  width: 500px;
  height: auto;
  overflow: auto;
  background-color: #fff;
  border-radius: 4px;
`;

const LogoWrap = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const Logo = styled.img.attrs({
  alt: "브랜디 로고",
  src: "../../../public/images/logo_seller_admin_1.png",
})`
  width: 130px;
`;
