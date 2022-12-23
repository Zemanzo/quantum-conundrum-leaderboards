import styled from "styled-components";

export const StyledSubmit = styled.div`
  font-family: Oswald, sans-serif;
  padding: 16px;
  font-weight: 300;

  > form {
    display: grid;
    grid-gap: 4px 0;
    grid-template-columns: max-content 1fr;
    grid-auto-rows: auto;
    grid-auto-flow: row;

    > div {
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      padding-right: 16px;
    }
  }

  input,
  select {
    background-color: #222;
    font-family: Oswald, sans-serif;
    color: #eee;
    border: none;
    font-size: 1.5rem;
    border-bottom: #666 solid 2px;
    padding: 4px;

    :focus {
      outline: none;
      background-color: #444;
      border-bottom: #888 solid 2px;
    }
  }

  input[type="number"] {
    max-width: 7ch;
  }

  button {
    margin: 16px;
    padding: 16px;
    font-size: 1.5rem;
    background-color: var(--theme-purple);
    border: none;
    cursor: pointer;

    :not(:disabled):hover {
      filter: brightness(140%);
    }

    :disabled {
      filter: grayscale(100%);
    }
  }
`;

export const SubmitTitle = styled.h2`
  font-family: Oswald, sans-serif;
  font-weight: 500;
  font-size: 2.5em;
  margin: 0 0 0 1px;
  text-transform: uppercase;
  grid-column: span 3;
  align-self: end;
  padding-top: 0.5em;
  color: var(--theme-purple);

  @media (max-width: 1000px) {
    font-size: 1.8em;
    font-weight: 500;
    padding-left: 4px;
  }
`;
