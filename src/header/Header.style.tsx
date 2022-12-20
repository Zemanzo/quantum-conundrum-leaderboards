import styled from "styled-components";
import { ReactComponent as QcAtomWhite } from "../images/qcatomwhite.svg";

export const StyledLogo = styled(QcAtomWhite)`
  height: 1.15em;
  width: 1.1em;
  margin-right: 0.4em;
`;

export const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #110612 40%, #9430d122 100%);
  border-bottom: #23122f 2px solid;
  min-height: 54px;
  box-shadow: #000000 0px 0px 15px 5px;
  z-index: 10;
`;

export const StyledH1 = styled.h1`
  text-transform: uppercase;
  margin: 8px 16px;
  display: flex;
  align-items: center;
  font-size: 2.2em;
  font-family: "Yanone Kaffeesatz", sans-serif;
  margin-right: 2em;

  > span {
    margin-bottom: -6px;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  line-height: 29px;
`;

export const Divider = styled.span`
  margin: 0px 12px;
`;

// .blackoutline {
// 	text-shadow: 0px -1px #000, 1px -1px #000, 1px 0px #000, 1px 1px #000, 0px 1px #000, -1px 1px #000, -1px 0px #000, -1px -1px #000;
// }
