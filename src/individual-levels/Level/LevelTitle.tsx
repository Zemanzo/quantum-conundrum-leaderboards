import { WebLink, WithChildren } from "../../types";
import { StyledTitle, StyledWrapper } from "./LevelTitle.style";

type LevelMetaProps = WithChildren<{ webLink: WebLink }>;

export default function LevelTitle({ children, webLink }: LevelMetaProps) {
  return (
    <StyledWrapper>
      <StyledTitle href={webLink}>{children}</StyledTitle>
    </StyledWrapper>
  );
}
