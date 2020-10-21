import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowDropRight } from "@styled-icons/remix-line";

export default function MenuItem({ menuIcon, menuTitle, subMenu, isSideBar }) {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <Fragment>
      {isSideBar ? (
        // <ListItem onMouseEnter={() => setSubMenuOpen(!isSubMenuOpen)}>
        <ListItem>{menuIcon}</ListItem>
      ) : (
        <ListItem onClick={() => setSubMenuOpen(!isSubMenuOpen)}>
          {menuIcon}
          <span>{menuTitle}</span>
          {subMenu && (
            <Arrow isSubMenuOpen={isSubMenuOpen}>
              <ArrowDropRight size="22" />
            </Arrow>
          )}
        </ListItem>
      )}

      {subMenu && (
        <SubMenu isSubMenuOpen={isSubMenuOpen} isSideBar={isSideBar}>
          {isSubMenuOpen &&
            subMenu.map((list, idx) => {
              console.log("l", list);
              return (
                <li key={idx}>
                  <Link to={list.url}>{list.sub}</Link>
                </li>
              );
            })}
        </SubMenu>
      )}
    </Fragment>
  );
}

const ListItem = styled.li`
  ${({ theme }) => theme.flex("flex-start", "center")};
  position: relative;
  padding: 10px 13px 10px 15px;
  height: 40px;
  font-weight: 300;
  font-size: 14px;
  color: #eee;
  border-bottom: 1px solid #414247;
  cursor: pointer;
  span {
    margin-left: 8px;
  }
`;

const Arrow = styled.span`
  position: absolute;
  right: 12px;
  transform: ${({ isSubMenuOpen }) => (isSubMenuOpen ? "rotate(90deg)" : "")};
  svg {
    color: #666;
  }
`;

const SubMenu = styled.ul`
  margin: ${({ isSubMenuOpen }) => (isSubMenuOpen ? "8px 0" : "")};
  position: ${({ isSideBar }) => (isSideBar ? "absolute" : "static")};
  width: ${({ isSideBar }) => (isSideBar ? "164px" : "")};
  background: ${({ isSideBar }) => (isSideBar ? "#414247" : "")};
  li {
    margin-top: 1px;
    a {
      display: block;
      padding: 5px 0 5px 35px;
      width: 100%;
      color: #cecfd3;
      font-size: 14px;
      font-weight: 300;
      height: auto;
      transition: 3s;
      &:hover {
        color: #ffffff;
        background: #414247;
      }
    }
  }
`;
