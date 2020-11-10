import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import SellerInfo from "./Components/SellerInfo";
import { Home } from "@styled-icons/boxicons-solid";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline";

export default function Info() {
  return (
    <UserWrap>
      <Header />
      <UserBox>
        <Nav />
        <UserContainer>
          <UserContent>
            <h3>
              셀러 정보 수정 페이지
              <span>셀러 정보 조회 / 수정</span>
            </h3>
            <MenuBar>
              <ul>
                <li>
                  <Home size="14" color="#333" />
                  회원 관리
                  <ArrowIosForwardOutline size="14" color="#999" />
                </li>
                <li>
                  셀러 계정 관리
                  <ArrowIosForwardOutline size="14" color="#999" />
                </li>
                <li>셀러 정보 조회 / 수정</li>
              </ul>
            </MenuBar>
            {/* 셀러 정보 수정 컴포넌트 */}
            <SellerInfo />
          </UserContent>
        </UserContainer>
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
  width: calc(100% - 214px);
`;

const UserContent = styled.div`
  padding: 25px 20px 20px 20px;
  h3 {
    margin-bottom: 15px;
    font-size: 26px;
    font-weight: 300;
    color: #666;
    span {
      font-size: 14px;
      font-weight: 300;
      color: #888;
    }
  }
  td:first-child {
    width: 16%;
  }
`;

const MenuBar = styled.div`
  background-color: #eee;
  margin-bottom: 10px;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 10px;
  padding-right: 20px;
  ul {
    ${({ theme }) => theme.flex(null, "flex-start")};
    padding: 8px;
    li {
      ${({ theme }) => theme.flex("center", "flex-start")};
      font-size: 14px;
      svg {
        margin: 0 4px;
      }
    }
  }
`;
