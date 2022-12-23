import styled from "styled-components";

export const StyledShifts = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.accentColor};
`;

export const StyledEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
  padding: 0 8px;
  box-sizing: border-box;
  font-family: "Oswald", sans-serif;
  text-shadow: #000 0px 1px 2px, #000 0px 1px 2px, #fff6 0px 0px 5px;
  border-right: 2px solid ${(props) => props.theme.accentColor};
  background: #111c;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 8px;
  height: 56px;

  > :first-child {
    font-size: 1.59em;
    font-weight: 100;
    line-height: 1.2;
    color: #eee;
    text-decoration: none;
  }

  > a:first-child:hover {
    text-decoration: underline;
  }

  > a:not(:first-child) {
    font-size: 1.4em;
    display: inline-block;
    color: ${(props) => props.theme.accentColor};
    padding: 0 4px;
    border-radius: 4px;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }

    span {
      display: inline-block;
      padding-left: 6px;
      color: #eeeb;
      font-weight: 100;
    }
  }

  @media (max-width: 1000px) {
    font-size: 0.9em;
  }

  @media (min-width: 1400px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    > a:first-child,
    div:first-child {
      order: 1;
    }

    > a:not(:first-child) {
      order: 0;
    }
  }
`;

export const StyledNoRecord = styled.div`
  font-family: "Oswald", sans-serif;
  font-size: 1.2em;
  color: ${(props) => props.theme.textColor}cc;
  font-style: italic;
  text-shadow: #000 0px 1px 2px, #000 0px 1px 2px, #fff6 0px 0px 5px;
  padding-right: 16px;
`;
