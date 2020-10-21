import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function FormActions() {
  return (
    <FormActionsWrapper>
      <button type="submit">로그인</button>
      <Join>
        <p>아직 셀러가 아니신가요?</p>
        <Link to="/signup">
          <span className="join">회원가입하기</span>
        </Link>
      </Join>
    </FormActionsWrapper>
  );
}

export default FormActions;

const FormActionsWrapper = styled.div`
  button {
    margin-top: 20px;
    padding: 13px 0;
    width: 100%;
    border: 1px solid transparent;
    border-radius: 8px;
    font-size: 12px;
    color: #fff;
    background: #000;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;

const Join = styled.div`
  margin-top: 24px;
  font-size: 12px;
  text-align: center;

  p {
    display: inline-block;
    color: #929292;
    letter-spacing: -0.6px;
  }

  .join {
    margin-left: 4px;
    color: #3c72ff;
    font-weight: 400;
  }
`;
