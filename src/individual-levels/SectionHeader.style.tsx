import styled from "styled-components";

export const SectionTitle = styled.h2`
  font-family: Oswald, sans-serif;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0 0 0 1px;
  text-transform: uppercase;
  grid-column: span 3;
  align-self: end;
  padding-top: 0.5em;
  color: ${(props) => props.theme.accentColor};
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: end;
  color: ${(props) => props.theme.accentColor};
  font-family: "Oswald", sans-serif;
  font-style: italic;
  padding: 0px 8px;
  font-size: 1.4em;
  text-transform: uppercase;
  font-weight: 400;

  > div {
    padding: 0 8px;
    width: 33.3%;
    text-align: right;
  }
`;

export const StyledShifts = styled(StyledHeader)`
  width: 100%;
  justify-content: end;
  padding: 0 16px;
`;
