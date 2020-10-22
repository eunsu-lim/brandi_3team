import React from "react";
import { Home } from "@styled-icons/ionicons-outline";
import {
  BarChartLine,
  CartCheck,
  Cart,
  BagCheck,
  EmojiSmile,
  Gift,
  People,
} from "@styled-icons/bootstrap";

const NAVMENU = [
  {
    id: 1,
    menuIcon: <Home size="16" />,
    menuTitle: "홈",
    status: false,
  },
  {
    id: 2,
    menuIcon: <BarChartLine size="16" />,
    menuTitle: "통계",
    status: false,
    subMenu: [
      {
        id: 1,
        sub: "시간단위분석",
        url: "",
      },
    ],
  },
  {
    id: 3,
    menuIcon: <CartCheck size="16" />,
    menuTitle: "주문관리",
    status: false,
    subMenu: [
      {
        id: 1,
        sub: "결제완료관리",
        url: "/product",
      },
      {
        id: 2,
        sub: "상품준비관리",
        url: "",
      },
      {
        id: 3,
        sub: "배송중관리",
        url: "",
      },
      {
        id: 4,
        sub: "배송완료관리",
        url: "",
      },
      {
        id: 5,
        sub: "구매확정관리",
        url: "",
      },
    ],
  },
  {
    id: 4,
    menuIcon: <Cart size="16" />,
    menuTitle: "취소/환불 관리",
    status: false,
    subMenu: [
      {
        id: 1,
        sub: "환불요청관리",
        url: "",
      },
      {
        id: 2,
        sub: "환불완료관리",
        url: "",
      },
      {
        id: 3,
        sub: "주문취소완료관리",
        url: "",
      },
    ],
  },
  {
    id: 5,
    menuIcon: <BagCheck size="16" />,
    menuTitle: "상품관리",
    status: false,
    subMenu: [
      {
        id: 1,
        sub: "상품 관리",
        url: "",
      },
      {
        id: 2,
        sub: "상품 등록",
        url: "",
      },
    ],
  },
  {
    id: 6,
    menuIcon: <EmojiSmile size="16" />,
    menuTitle: "고객응대관리",
    status: false,
    subMenu: [
      {
        id: 1,
        sub: "Q&A 관리",
        url: "",
      },
      {
        id: 2,
        sub: "텍스트 리뷰",
        url: "",
      },
    ],
  },
  {
    id: 7,
    menuIcon: <Gift size="16" />,
    menuTitle: "기획전/쿠폰관리",
    status: false,
    subMenu: [
      {
        id: 1,
        sub: "기획전 관리",
        url: "",
      },
      {
        id: 2,
        sub: "쿠폰 관리",
        url: "",
      },
    ],
  },
  {
    id: 5,
    menuIcon: <People size="16" />,
    menuTitle: "회원 관리",
    status: false,
    subMenu: [
      {
        id: 1,
        sub: "회원관리_커뮤니티",
        url: "",
      },
      {
        id: 2,
        sub: "셀러 계정 관리",
        url: "",
      },
    ],
  },
];

export default NAVMENU;
