import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const sharedStyles = css`
  font-size: 1.1em;
  display: inline-block;
  line-height: 29px;
  user-select: none;
  margin: 0px 15px;
`;

const sharedLinkStyles = css`
  ${sharedStyles}

  color: #eee;
  text-decoration: none;
  border-bottom: transparent 1px solid;

  :hover {
    border-bottom: #eee 1px solid;
  }
`;

export const StyledLink = styled(Link)`
  ${sharedLinkStyles}
`;

export const StyledA = styled.a`
  ${sharedLinkStyles}
`;

export const StyledCurrentPage = styled.b`
  ${sharedStyles}
  color: #9430d1;
  border-bottom: #9430d1 2px solid;
`;
