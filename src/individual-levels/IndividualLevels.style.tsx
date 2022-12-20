import styled from "styled-components";

export const StyledLevels = styled.main`
  display: grid;
  grid-gap: 2px 0;
  grid-template-columns: max-content min-content minmax(150px, max-content) 3fr 1fr;
  grid-auto-rows: minmax(60px, auto);
  grid-auto-flow: row;
  padding: 0 16px;
  max-width: 1600px;
  margin: auto;
`;
