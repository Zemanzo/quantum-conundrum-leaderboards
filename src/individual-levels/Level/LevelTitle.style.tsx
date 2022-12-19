import styled from "styled-components";

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.accentColor};
  font-family: "Oswald", sans-serif;
  padding: 0px 8px;
  font-size: 1.6em;
  text-transform: uppercase;
  font-weight: 400;
  line-height: 1;
`;
