import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NAVMENU from "./NavMenu";
import MenuItem from "./Components/MenuItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { ArrowDropRight } from "@styled-icons/remix-line";

export default function Nav() {
  const [isSideBar, setIsSideBar] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [listId, setListId] = useState();

  const handleBar = () => {
    setIsSideBar(!isSideBar);
    setSubMenuOpen(!isSubMenuOpen);
    // setListId();
  };

  const handleSubMenu = (idx) => {
    setListId(idx);
    listId === idx && setSubMenuOpen(!isSubMenuOpen);
  };

  const handleSideMenu = (idx) => {
    setListId(idx);
    listId === idx ? setSubMenuOver(true) : setSubMenuOver(false);
  };

  // useEffect(() => {
  //   isSideBar && handleSubMenu;
  // }, [isSideBar]);

  console.log("Toggle >>>>>>", isSideBar);
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
              setSubMenuOpen={setSubMenuOpen}
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
