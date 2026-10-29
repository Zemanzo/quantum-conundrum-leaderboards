import styled from "styled-components";
import { ReactComponent as QcAtomWhite } from "../images/qcatomwhite.svg";
import { ReactComponent as DiscordLogo } from "../images/wumpus_white.svg";

export const StyledLogo = styled(QcAtomWhite)`
  height: 1.15em;
  width: 1.1em;
  min-height: 1.15em;
  min-width: 1.1em;
  margin-right: 0.4em;
`;

export const StyledDiscordLogo = styled(DiscordLogo)`
  height: 100%;
  width: 100%;
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

  @media (max-width: 1100px) {
    font-size: 1.4em;
  }

  > span {
    margin-bottom: -6px;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  flex: 1;
  line-height: 29px;
`;

export const LinkGroup = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
export const InternalLinkGroup = styled(LinkGroup)`
  flex: 3;
  justify-content: flex-start;

  @media (max-width: 600px) {
    flex: 1;
    flex-direction: column;
  }
`;
export const ExternalLinkGroup = styled(LinkGroup)`
  flex: 2;
  justify-content: flex-end;

  @media (max-width: 600px) {
    margin-left: 16px;
  }
`;

export const Divider = styled.span`
  margin: 0px 12px;
`;

// .blackoutline {
// 	text-shadow: 0px -1px #000, 1px -1px #000, 1px 0px #000, 1px 1px #000, 0px 1px #000, -1px 1px #000, -1px 0px #000, -1px -1px #000;
// }
