import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.accentColor};
`;

export const StyledTitle = styled.a`
  color: ${(props) => props.theme.textColor};
  font-family: "Oswald", sans-serif;
  padding: 0px 8px;
  font-size: 1.6em;
  text-transform: uppercase;
  font-weight: 400;
  line-height: 1;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  @media (max-width: 1000px) {
    padding: 0 2px;
    font-size: 1.2em;
  }
`;
