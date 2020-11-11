import React from "react";
import styled from "styled-components";

function JoinTitle() {
  return (
    <JoinTitleWrap>
      <h3>셀러회원 가입</h3>
      <hr />
      <JoinStep />
    </JoinTitleWrap>
  );
}

export default JoinTitle;

const JoinTitleWrap = styled.div`
  text-align: center;

  h3 {
    margin: 20px auto 10px;
    font-size: 24px;
    font-weight: 300;
  }

  hr {
    margin: 20px 0;
    border: 0;
    border-top: 1px solid #e0dfdf;
    border-bottom: 1px solid #fefefe;
  }
`;

const JoinStep = styled.img.attrs({
  alt: "회원가입 단계",
  src: "../../../public/images/seller_join_top_2.png",
})``;
