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
  text-shadow: #000 0px 1px 2px, #000 0px 1px 2px, #fff6 0px 0px 5px;
  border-right: 2px solid ${(props) => props.theme.accentColor};
  background: #111c;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 8px;
  height: 56px;

  > a:first-child {
    font-size: 1.59em;
    font-weight: 100;
    line-height: 1.2;
    color: #eee;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
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

  @media (min-width: 1400px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;

    > a:first-child {
      order: 1;
    }

    > a:not(:first-child) {
      order: 0;
    }
  }
`;
