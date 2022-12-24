import styled from "styled-components";

export const StyledTooltip = styled.div<{ cx: number; cy: number }>`
  font-size: 1rem;
  position: absolute;
  background: #333;
  left: ${(props) => props.cx}px;
  top: ${(props) => props.cy}px;
  pointer-events: none;
  padding: 8px;
`;
