import { useLocation } from "react-router-dom";
import { WithChildren } from "../types";
import { StyledA, StyledCurrentPage, StyledLink } from "./HeaderButton.style";

type HeaderButtonProps = WithChildren<{
  path: `/${string}` | `http://${string}` | `https://${string}`;
}>;

export default function HeaderButton({ children, path }: HeaderButtonProps) {
  const location = useLocation();
  if (path === location.pathname) {
    return <StyledCurrentPage>{children}</StyledCurrentPage>;
  }
  return path.startsWith("/") ? (
    <StyledLink to={path}>{children}</StyledLink>
  ) : (
    <StyledA href={path}>{children}</StyledA>
  );
}
