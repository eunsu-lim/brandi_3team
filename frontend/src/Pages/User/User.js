import React, { useState, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";
import axios from "axios";
import styled from "styled-components";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import MemberList from "./Components/MemberList";
import { Home } from "@styled-icons/boxicons-solid";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline";

export default function User() {
  const [sellerList, setSellerList] = useState([]);

  // 페이지 로드 시 리스트 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`public/Data/SellerList.json`);
        setSellerList(result.data.SellerList);
        console.log("result>>>", result.data.SellerList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <UserWrap>
      <Header />
      <UserBox>
        <Nav />
        <UserContainer>
          <UserContent>
            <h3>
              셀러 계정 관리
              <span>셀러 회원 목록 / 관리</span>
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
                <li>셀러 회원 리스트</li>
              </ul>
            </MenuBar>
            <MemberList sellerList={sellerList} setSellerList={setSellerList} />
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
  }
  span {
    font-size: 14px;
    font-weight: 300;
    color: #888;
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
