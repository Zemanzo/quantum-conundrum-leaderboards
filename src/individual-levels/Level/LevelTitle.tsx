import { WebLink, WithChildren } from "../../types";
import {
  StyledLevelNumber,
  StyledTitle,
  StyledWrapper,
} from "./LevelTitle.style";

type LevelMetaProps = WithChildren<{
  webLink: WebLink;
  number: string | number;
}>;

export default function LevelTitle({
  children,
  webLink,
  number,
}: LevelMetaProps) {
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <StyledWrapper>
      <StyledTitle href={webLink}>
        <StyledLevelNumber>{paddedNumber}</StyledLevelNumber>
        {children}
      </StyledTitle>
    </StyledWrapper>
  );
}
