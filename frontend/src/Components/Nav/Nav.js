import React, { useState } from "react";
import styled from "styled-components";
// import NAVMENU from "./NavMenu";

export default function Nav() {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <NavMenuList>
      {/* <Link to="/">Item 1</Link> */}
      <h1>Item1</h1>
      <div
        className={`sub-menu-click`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <span></span>
      </div>
      <ul className={`sub-menu && ${subMenuOpen ? "is-open" : ""}`}>
        <li className="menu-item">Sub-Item 1</li>
        <li className="menu-item">Sub-Item 2</li>
        <li className="menu-item">Sub-Item 3</li>
      </ul>
    </NavMenuList>
  );
}

const NavMenuList = styled.div``;
