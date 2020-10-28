import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NAVMENU from "./NavMenu";
import MenuItem from "./MenuItem";
import { ArrowDropRight } from "@styled-icons/remix-line";

export default function Nav() {
  const [isSideBar, setIsSideBar] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [isSideMenuOver, setSideMenuOver] = useState(false);
  const [listId, setListId] = useState();

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

  return (
    <NavMenuList isSideBar={isSideBar}>
      <MenuToggle onClick={() => handleBar()}>
        <ArrowDropRight color="black" isSideBar={isSideBar} />
      </MenuToggle>
      {/* 메뉴 리스트 영역 */}
      <MenuBox isSideBar={isSideBar}>
        {NAVMENU.map((nav, idx) => {
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
    transform: ${({ isSideBar }) => (isSideBar ? "rotate(180deg)" : "")};
  }
`;

const MenuBox = styled.ul`
  margin-top: 98px;
  width: 100%;
`;
