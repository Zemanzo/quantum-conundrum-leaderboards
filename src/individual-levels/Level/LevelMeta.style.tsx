import styled from "styled-components";

export const LevelNumber = styled.div``;

export const LevelId = styled.div`
  visibility: hidden;
  height: 0px;
  font-size: 0.4em;
  opacity: 0.7;
  margin-top: 2px;
`;

export const StyledMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 4px;
  text-align: center;
  color: ${(props) => props.theme.accentColorDark};
  background-color: ${(props) => props.theme.accentColor};
  font-size: 2em;
  font-family: "Oswald", sans-serif;
  line-height: 1;

  :hover ${LevelId} {
    height: auto;
    width: auto;
    visibility: visible;
    display: block;
  }

  @media (max-width: 1000px) {
    padding: 0 2px;
    font-size: 1.2em;

    ${LevelId} {
      display: none;
      width: 0px;
      font-size: 0.8em;
    }
  }
`;
