import styled from "styled-components";

export const StyledStatistics = styled.div`
  grid-column: span 5;
  font-family: Oswald, sans-serif;
  font-weight: 300;
  font-size: 1.5em;
  margin: 32px 0 0 0;
  padding: 0 32px 8px 32px;
  text-shadow: #000 0px 0px 2px, #000 0px 0px 5px;

  display: flex;
  justify-content: center;
  overflow: hidden;

  max-height: 25vh;
  min-height: 250px;

  h2 {
    margin: 0;
  }

  @media (max-width: 1000px) {
    display: block;
    max-height: calc(100vh - 60px);
    overflow-x: auto;
  }
`;

export const GraphsContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;

  flex: 1;

  > svg:not(:last-of-type) {
    margin-right: 32px;
  }

  @media (max-width: 750px) {
    display: block;
    overflow-x: auto;
    max-height: 40vh;
    white-space: nowrap;

    > svg {
      display: inline-block;
      width: 100%;
      max-height: 40vh;
    }
  }
`;

export const StyledWings = styled.div`
  margin-right: 32px;

  @media (max-width: 1000px) {
    margin-right: 0;
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }

  h3 {
    margin: 0;
    font-weight: 500;
    font-size: 1.4em;

    @media (max-width: 1000px) {
      font-size: 1em;
      min-width: 100%;
    }
  }

  input[type="checkbox"] {
    width: 1.3em;
    height: 1.3em;
    margin-right: 6px;
  }

  input[type="checkbox"]:not(:checked) {
    opacity: 0.5;

    ~ span {
      filter: brightness(50%);
      text-shadow: #eee6 0px 0px 5px;
    }
  }
`;

export const StyledWingEntry = styled.div<{ textColor: string }>`
  display: flex;
  align-items: center;
  color: ${(props) => props.textColor};
  font-weight: 400;
  white-space: nowrap;

  > label {
    cursor: pointer;
    user-select: none;
  }

  @media (max-width: 1000px) {
    font-size: 0.7em;
    padding: 4px;
  }
`;
