import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowDropLeft, Question } from "@styled-icons/remix-line";
import { Calculate } from "@styled-icons/material-outlined";
import { Home } from "@styled-icons/ionicons-outline";
import {
  BarChartLine,
  CartCheck,
  Cart,
  BagCheck,
  EmojiSmile,
  Gift,
  People,
  CardList,
  Eye,
} from "@styled-icons/bootstrap";

export default function MenuItem({
  menuIcon,
  url,
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
  const [isPage, setIsPage] = useState(false);

  const handleActivePage = () => {
    setIsPage(!isPage);
    console.log(isPage);
  };

  return (
    <Fragment>
      {/* 메뉴 bar가 sidebar로 접혀 있을 경우 */}
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
            isPage={isPage}
          >
            {NAV_ICON[menuTitle]}
            {isSideMenuOver && <span>{menuTitle}</span>}
          </ListMenu>

          {/* 서브 메뉴가 있고, index 값이 동일한 경우 서브 메뉴 mouseover */}
          {subMenu && index === listId && isSideMenuOver && (
            <SubMenu isSideBar={isSideBar}>
              {subMenu.map((list, idx) => {
                return (
                  <li key={idx} onClick={handleActivePage}>
                    <Link to={list.sub_url}>{list.subTitle}</Link>
                  </li>
                );
              })}
            </SubMenu>
          )}
        </SideItem>
      ) : (
        // 기본 메뉴 - 펼쳐진 nav bar
        <ListItem
          active={listId === index}
          onClick={() => handleSubMenu(index)}
          isPage={isPage}
        >
          <ListMenu active={listId === index}>
            {NAV_ICON[menuTitle]}
            <span>{menuTitle}</span>
            {subMenu && (
              <Arrow active={listId === index}>
                <ArrowDropLeft size="22" />
              </Arrow>
            )}
          </ListMenu>
          {/* 서브 메뉴가 있고, index 값이 동일한 경우 서브 메뉴 열기 */}
          {subMenu && index === listId && (
            <SubMenu isSubMenuOpen={isSubMenuOpen} isSideBar={isSideBar}>
              {subMenu.map((list, idx) => {
                return (
                  <li key={idx} onClick={handleActivePage}>
                    {/* 아래 to 부분, url과 id 값으로 이동하도록 수정 - 김상준 */}
                    <Link to={list.sub_url}>{list.subTitle}</Link>
                    {/* <a href={`${url}/${list.id}`}>{list.sub}</a> */}
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
  max-height: ${({ active }) => (active ? "1000px" : "40px")};
  transform-origin: top;
  font-weight: 300;
  font-size: 14px;
  color: #eee;
  background-color: ${({ active }) => (active ? "#27272B" : "")};
  border-bottom: 1px solid #414247;
  box-sizing: border-box;
  transition: 0.8s;
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

// NAV_ICON menuTitle과 연결
const NAV_ICON = {
  홈: <Home size="16" />,
  통계: <BarChartLine size="16" />,
  주문관리: <CartCheck size="16" />,
  "취소/환불관리": <Cart size="16" />,
  상품관리: <BagCheck size="16" />,
  고객응대관리: <EmojiSmile size="16" />,
  "기획전/쿠폰관리": <Gift size="16" />,
  회원관리: <People size="16" />,
  공지사항: <CardList size="16" />,
  정산관리: <Calculate size="16" />,
  진열관리: <Eye size="16" />,
  고객센터: <Question size="16" />,
};
