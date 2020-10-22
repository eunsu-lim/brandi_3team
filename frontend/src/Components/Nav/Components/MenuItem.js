import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowDropLeft } from "@styled-icons/remix-line";

export default function MenuItem({
  menuIcon,
  menuTitle,
  subMenu,
  isSideBar,
  isSubMenuOpen,
  setSubMenuOpen,
  handleSubMenu,
  index,
  listId,
}) {
  return (
    <Fragment>
      {/* <ListItem active={listId === index}></ListItem> */}

      {isSideBar ? (
        <ListItem
          active={listId === index && isSubMenuOpen}
          onMouseEnter={() => handleSubMenu(index)}
          onMouseLeave={() => handleSubMenu(false)}
        >
          <ListMenu active={listId === index} isSideBar={isSideBar}>
            {menuIcon}
            {listId === index && <span>{menuTitle}</span>}
          </ListMenu>

          {subMenu && index === listId && (
            <SubMenu isSubMenuOpen={isSubMenuOpen} isSideBar={isSideBar}>
              {subMenu.map((list, idx) => {
                return (
                  <li key={idx}>
                    <Link to={list.url}>{list.sub}</Link>
                  </li>
                );
              })}
            </SubMenu>
          )}
        </ListItem>
      ) : (
        <ListItem
          active={listId === index}
          onClick={() => handleSubMenu(index)}
        >
          <ListMenu active={listId === index}>
            {menuIcon}
            <span>{menuTitle}</span>
            {subMenu && (
              <Arrow active={listId === index}>
                <ArrowDropLeft size="22" />
              </Arrow>
            )}
          </ListMenu>

          {subMenu && index === listId && (
            <SubMenu
              isSubMenuOpen={isSubMenuOpen}
              isSideBar={isSideBar}
              onMouseLeave={() => setSubMenuOpen(false)}
            >
              {subMenu.map((list, idx) => {
                return (
                  <li key={idx}>
                    <Link to={list.url}>{list.sub}</Link>
                  </li>
                );
              })}
            </SubMenu>
          )}
        </ListItem>
      )}
    </Fragment>
  );
}

const ListItem = styled.li`
  ${({ theme }) => theme.flex("flex-start", "center", "column")};
  position: relative;
  width: ${({ onMouseEnter, isSideBar }) =>
    onMouseEnter && isSideBar ? "215px" : ""};
  font-weight: 300;
  font-size: 14px;
  color: #eee;
  background-color: ${({ active }) => (active ? "#27272B" : "")};
  border-bottom: ${({ isSideBar }) => (isSideBar ? "1px solid #414247" : "")};
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #27272b;
  }
  span {
    margin-left: 8px;
  }
`;

const ListMenu = styled.div`
  display: flex;
  padding: 10px 13px 10px 15px;
  width: 100%;
  border-right: ${({ active }) => (active ? "4px solid #d12610" : "")};
`;

const Arrow = styled.span`
  position: absolute;
  right: 12px;
  transform: ${({ active }) => (active ? "rotate(-90deg)" : "")};
  color: ${({ active }) => (active ? "#fff" : "#666")};
`;

const SubMenu = styled.ul`
  margin: ${({ isSubMenuOpen }) => (isSubMenuOpen ? "" : "8px 0")};
  display: ${({ isSubMenuOpen }) => (isSubMenuOpen ? "none" : "block")};
  position: ${({ isSideBar }) => (isSideBar ? "absolute" : "static")};
  left: ${({ isSideBar }) => (isSideBar ? "43px" : "")};
  margin-top: ${({ isSideBar }) => (isSideBar ? "0" : "")};
  padding-right: ${({ isSideBar }) => (isSideBar ? "8px" : "")};
  width: ${({ isSideBar }) => (isSideBar ? "164px" : "")};
  height: ${({ isSubMenuOpen }) => (isSubMenuOpen ? "0" : "auto")};
  background: ${({ isSideBar }) => (isSideBar ? "#414247" : "")};
  flex-direction: column;
  width: 100%;
  li {
    margin-top: 1px;
    width: 100%;
    a {
      display: block;
      padding: 5px 0 5px 35px;
      width: 100%;
      height: auto;
      color: #cecfd3;
      font-size: 14px;
      font-weight: 300;
      line-height: 1.4;
      &:hover {
        color: #ffffff;
        background: #414247;
      }
    }
  }
`;
