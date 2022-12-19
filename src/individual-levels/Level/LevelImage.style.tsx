import styled from "styled-components";

export const StyledImage = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.accentColor};
  padding: 2px;

  > picture,
  img {
    max-height: 56px;
  }
`;
