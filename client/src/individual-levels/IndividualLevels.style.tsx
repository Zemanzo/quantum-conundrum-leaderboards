import styled from "styled-components";

export const StyledLevels = styled.main`
  display: grid;
  grid-gap: 2px 0;
  grid-template-columns: min-content min-content minmax(130px, max-content) 3fr 1fr;
  grid-auto-rows: minmax(60px, auto);
  grid-auto-flow: row;
  padding: 0 16px;
  max-width: 1800px;
  margin: auto;

  @media (max-width: 1000px) {
    grid-template-columns: min-content min-content minmax(130px, max-content) 3fr 1fr;
    padding: 0;
  }
`;
