import { WithChildren } from "../../types";
import { StyledTitle } from "./LevelTitle.style";

type LevelMetaProps = WithChildren;

export default function LevelTitle({ children }: LevelMetaProps) {
  return <StyledTitle>{children}</StyledTitle>;
}
