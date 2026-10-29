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

  > img,
  > svg {
    max-height: 1.5em;
    min-width: 1.5em;
  }
`;

export const StyledLink = styled(Link)`
  ${sharedLinkStyles}

  @media (max-width: 600px) {
    line-height: 1em;
    margin: 4px 0;
    white-space: nowrap;
  }
`;

export const StyledA = styled.a`
  ${sharedLinkStyles}

  display: inline-flex;
  align-items: center;

  :hover {
    border-bottom: transparent 1px solid;
  }
`;

export const StyledCurrentPage = styled.b`
  ${sharedStyles}

  @media (max-width: 600px) {
    line-height: 1em;
    margin: 4px 0;
    white-space: nowrap;
  }
  color: #9430d1;
  border-bottom: #9430d1 2px solid;
`;
