import React, { useState, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";
import axios from "axios";
import styled from "styled-components";
import NAVMENU from "./NavMenu";
import MenuItem from "./MenuItem";
import { ArrowDropRight } from "@styled-icons/remix-line";

export default function Nav() {
  const [isSideBar, setIsSideBar] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [isSideMenuOver, setSideMenuOver] = useState(false);
  const [listId, setListId] = useState();

  // 통신 받아 올 nav data
  const [navli, setNavli] = useState();

  // 사이드 메뉴 클릭 시
  const handleBar = () => {
    setIsSideBar(!isSideBar);
    setSubMenuOpen(!isSubMenuOpen);
    setSideMenuOver(false);
  };

  // 서브 메뉴 클릭 시
  const handleSubMenu = (idx) => {
    listId === idx ? setListId(-1) : setListId(idx);
  };

  // 사이드 메뉴 마우스 오버 시
  const handleSideMenu = (idx) => {
    listId === idx ? setListId(-1) : setListId(idx);
    setSideMenuOver(true);
  };

  // 페이지 로드 시 get 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`public/Data/NavData.json`);
        setNavli(result.data.data.nav_data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <NavMenuList isSideBar={isSideBar}>
      <MenuToggle onClick={() => handleBar()} isSideBar={isSideBar}>
        <ArrowDropRight color="black" isSideBar={isSideBar} />
      </MenuToggle>
      {/* 메뉴 리스트 영역 */}
      <MenuBox isSideBar={isSideBar}>
        {navli &&
          navli.map((nav, idx) => {
            return (
              <MenuItem
                key={idx}
                index={idx}
                listId={listId}
                menuIcon={nav.menuIcon}
                menuTitle={nav.menuTitle}
                subMenu={nav.subMenu}
                isSideBar={isSideBar}
                isSubMenuOpen={isSubMenuOpen}
                isSideMenuOver={isSideMenuOver}
                handleSubMenu={handleSubMenu}
                handleSideMenu={handleSideMenu}
              />
            );
          })}
      </MenuBox>
    </NavMenuList>
  );
}

const NavMenuList = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  width: ${({ isSideBar }) => (isSideBar ? "42px" : "215px")};
  background: #35363a;
  color: #eee;
  z-index: 1;
`;

const MenuToggle = styled.div`
  position: absolute;
  right: 0;
  top: 60px;
  width: 24px;
  height: 24px;
  border-radius: 4px 0px 0px 4px;
  background-color: #fcfcfc;
  cursor: pointer;
  svg {
    transform: ${({ isSideBar }) =>
      isSideBar ? "roatte(90eg)" : "rotate(180deg)"};
  }
`;

const MenuBox = styled.ul`
  margin-top: 98px;
  width: 100%;
`;
