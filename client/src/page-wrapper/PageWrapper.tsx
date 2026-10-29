import { WithChildren } from "../types";
import Header from "../header/Header";
import { StyledContentWrapper, StyledPageWrapper } from "./PageWrapper.style";

type PageWrapperProps = WithChildren;

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <StyledPageWrapper>
      <Header />
      <StyledContentWrapper>{children}</StyledContentWrapper>
    </StyledPageWrapper>
  );
}
