import styled from "styled-components";

export const StyledError = styled.div`
  grid-column: span 5;
  font-family: Oswald, sans-serif;
  font-weight: 300;
  font-size: 1.5em;
  margin: 32px 0 0 0;
  padding: 0 32px 8px 32px;
  background: repeating-linear-gradient(
    45deg,
    #4b4320,
    #4b4320 10px,
    #222 10px,
    #222 20px
  );
  text-shadow: #000 0px 0px 2px, #000 0px 0px 5px;

  h2 {
    margin: 0;
  }
`;
