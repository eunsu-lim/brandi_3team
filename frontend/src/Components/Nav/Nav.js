import React, { useState } from "react";
import styled from "styled-components";
import NAVMENU from "./NavMenu";
import MenuItem from "./MenuItem";
import { ArrowDropRight } from "@styled-icons/remix-line";

export default function Nav() {
  const [isSideBar, setIsSideBar] = useState(false);

  return (
    <NavMenuList isSideBar={isSideBar}>
      <MenuToggle onClick={() => setIsSideBar(!isSideBar)}>
        <ArrowDropRight color="black" isSideBar={isSideBar} />
      </MenuToggle>
      <MenuBox isSideBar={isSideBar}>
        {NAVMENU.map((nav, i) => {
          console.log(nav.subMenu);
          return (
            <MenuItem
              key={i}
              menuIcon={nav.menuIcon}
              menuTitle={nav.menuTitle}
              subMenu={nav.subMenu}
              isSideBar={isSideBar}
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
  li {
    span {
      //display: ${({ isSideBar }) => (isSideBar ? "none" : "block")};
    }
  }
`;
