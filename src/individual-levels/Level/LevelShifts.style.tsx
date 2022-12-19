import styled from "styled-components";

export const StyledShifts = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.accentColor};
  padding: 0px 8px;
`;

export const StyledEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "Oswald", sans-serif;
  text-shadow: 0px 1px 1px #363636;

  > div {
    font-size: 1.8em;
    font-weight: 100;
  }

  > a {
    color: ${(props) => props.theme.textColor};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }

  > span {
    font-style: italic;
  }
`;
