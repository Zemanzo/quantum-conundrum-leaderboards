import { useLocation } from "react-router-dom";
import { WithChildren } from "../types";
import { StyledA, StyledCurrentPage, StyledLink } from "./HeaderButton.style";

type HeaderButtonProps = WithChildren<{
  path: `/${string}` | `http://${string}` | `https://${string}`;
  title?: string;
}>;

export default function HeaderButton({
  children,
  path,
  title,
}: HeaderButtonProps) {
  const location = useLocation();
  if (path === location.pathname) {
    return <StyledCurrentPage>{children}</StyledCurrentPage>;
  }
  return path.startsWith("/") ? (
    <StyledLink to={path} title={title}>
      {children}
    </StyledLink>
  ) : (
    <StyledA href={path} title={title}>
      {children}
    </StyledA>
  );
}
