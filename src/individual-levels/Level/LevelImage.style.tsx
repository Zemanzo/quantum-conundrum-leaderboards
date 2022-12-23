import styled from "styled-components";

export const StyledImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.accentColor};
  padding: 2px;

  > picture,
  img {
    max-height: 56px;
  }

  :hover > div {
    opacity: 1;
  }

  > div {
    transition: opacity 0.3s;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0008;
    position: absolute;
    font-size: 2.5em;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    cursor: pointer;
    user-select: none;
  }

  @media (max-width: 1000px) {
    > picture,
    img {
      max-width: 56px;
      height: 56px;
      object-fit: cover;
    }
  }
`;
