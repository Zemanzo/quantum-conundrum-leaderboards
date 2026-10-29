import styled from "styled-components";

export const StyledAbout = styled.div`
  height: 100%;
  font-size: 1.1em;
  max-width: 80ch;
  margin: auto;
  padding: 16px;

  a {
    color: #ce7bff;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }

  h2 {
    font-family: Oswald, sans-serif;
    font-weight: 500;
    font-size: 2.5em;
    margin: 8px 0 32px 0;
    color: var(--theme-purple);
    text-transform: uppercase;
  }

  h3 {
    font-family: Oswald, sans-serif;
    font-weight: 500;
    font-size: 1.8em;
    margin: 8px 0 0 0;
    color: var(--theme-purple);
    text-transform: uppercase;
  }

  p {
    margin: 0 0 16px 0;
  }
`;
