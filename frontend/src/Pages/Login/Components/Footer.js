import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterWrap>
      <FooterContent>
        회사명 : (주)브랜디 | 주소 : (06223) 서울특별시 강남구 테헤란로 32길 26
        청송빌딩 | 사업자등록번호 : 220-88-93187 I 통신판매업신고 :
        2016-서울강남-00359호
        <br />
        이메일 : help@brandi.co.kr | 2018 © brandi inc.
        {/* 이용약관 & 개인정보처리방침 */}
        <FooterTerms>
          <Terms>이용약관</Terms> | <Policy>개인정보처리방침</Policy>
        </FooterTerms>
      </FooterContent>
    </FooterWrap>
  );
}

export default Footer;

const FooterWrap = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px 0;
  font-size: 12px;
  background-color: #202020;
`;

const FooterContent = styled.div`
  margin: 0 auto;
  width: 720px;
  text-align: left;
  font-size: 11px;
  color: #999ba2;
  line-height: 1.8;
  letter-spacing: -0.5px;
  word-break: keep-all;
`;

const FooterTerms = styled.div`
  margin-top: 10px;

  a {
    display: inline-block;
    font-weight: 500;
    font-size: 11px;
    color: #fff;
    letter-spacing: normal;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Terms = styled.a.attrs({
  href:
    "https://docs.google.com/document/d/17wXs6bt8g8eiWdWDgdR9pp6Z5OZ9tE22UDaDQYThbwI/edit",
})``;

const Policy = styled.a.attrs({ href: "https://www.brandi.co.kr/policy" })``;
