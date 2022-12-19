import styled from "styled-components";

export const StyledTimes = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.accentColor};
  padding: 0px 8px;
`;

export const StyledEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 33.3%;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "Oswald", sans-serif;
  text-shadow: 0px 1px 1px #363636;
  border-right: 2px solid #222;
  overflow: hidden;
  white-space: nowrap;

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

    span {
      display: inline-block;
      padding-left: 6px;
      color: ${(props) => props.theme.textColor}cc;
      font-weight: 100;
    }
  }
`;
