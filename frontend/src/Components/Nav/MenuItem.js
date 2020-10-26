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
  isSideMenuOver,
  handleSubMenu,
  handleSideMenu,
  index,
  listId,
}) {
  return (
    <Fragment>
      {isSideBar ? (
        <SideItem
          active={listId === index}
          onMouseEnter={() => handleSideMenu(index)}
          onMouseLeave={() => handleSideMenu(false)}
        >
          <ListMenu
            active={listId === index}
            isSideBar={isSideBar}
            isSideMenuOver={isSideMenuOver}
          >
            {menuIcon}
            {isSideMenuOver && <span>{menuTitle}</span>}
          </ListMenu>

          {subMenu && index === listId && isSideMenuOver && (
            <SubMenu isSideBar={isSideBar}>
              {subMenu.map((list, idx) => {
                return (
                  <li key={idx}>
                    <Link to={list.url}>{list.sub}</Link>
                  </li>
                );
              })}
            </SubMenu>
          )}
        </SideItem>
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
      )}
    </Fragment>
  );
}

const ListItem = styled.li`
  ${({ theme }) => theme.flex("flex-start", null, "column")};
  position: relative;
  height: ${({ active }) => (active ? "auto" : "40px")};
  font-weight: 300;
  font-size: 14px;
  color: #eee;
  background-color: ${({ active }) => (active ? "#27272B" : "")};
  border-bottom: 1px solid #414247;
  box-sizing: border-box;
  transition: ${({ active }) => (active ? "1s" : "1s")};
  cursor: pointer;
  &:hover {
    background-color: #27272b;
  }
  span {
    margin-left: 8px;
  }
`;

const SideItem = styled.li`
  border-bottom: 1px solid #414247;
  &:hover {
    width: 214px;
    background-color: #35363a;
    cursor: pointer;
    span {
      display: block;
      margin-left: 12px;
      background-color: #27272b;
      font-weight: 300;
      font-size: 14px;
      color: #eee;
    }
  }
  span {
    display: none;
  }
`;

const ListMenu = styled.div`
  display: flex;
  padding: 10px 13px 10px 15px;
  /* 현재 페이지 적용 (나중에 수정 후 적용) **수정 금지 */
  /* border-right: ${({ active }) => (active ? "4px solid #d12610" : "")}; */
`;

const Arrow = styled.span`
  position: absolute;
  right: 12px;
  transform: ${({ active }) => (active ? "rotate(-90deg)" : "")};
  color: ${({ active }) => (active ? "#fff" : "#666")};
`;

const SubMenu = styled.ul`
  margin: ${({ isSubMenuOpen }) => (isSubMenuOpen ? "" : "8px 0")};
  position: ${({ isSideBar }) => (isSideBar ? "absolute" : "static")};
  left: ${({ isSideBar }) => (isSideBar ? "43px" : "")};
  margin-top: ${({ isSideBar }) => (isSideBar ? "0" : "")};
  padding-right: ${({ isSideBar }) => (isSideBar ? "8px" : "")};
  width: ${({ isSideBar }) => (isSideBar ? "171px" : "")};
  background: ${({ isSideBar }) => (isSideBar ? "#414247" : "")};
  transition: 3s;
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
