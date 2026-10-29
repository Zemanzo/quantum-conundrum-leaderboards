import { WithChildren } from "../types";
import { StyledError } from "./ErrorBanner.style";

type ErrorBannerProps = WithChildren;

export default function ErrorBanner({ children }: ErrorBannerProps) {
  return <StyledError>{children}</StyledError>;
}
