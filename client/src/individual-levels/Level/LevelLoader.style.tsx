import styled from "styled-components";

export const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor}44;
  background-color: ${(props) => props.theme.accentColor};
  font-family: "Oswald", sans-serif;
  padding: 0px 8px;
  font-size: 1.6em;
  text-transform: uppercase;
  font-weight: 400;
  line-height: 1;
  grid-column: span 2;
`;
