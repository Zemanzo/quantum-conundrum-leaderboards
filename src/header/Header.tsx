import {
  StyledHeader,
  StyledH1,
  StyledNav,
  Divider,
  StyledLogo,
} from "./Header.style";
import HeaderButton from "./HeaderButton";

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>
        <StyledLogo />
        <span>Quantum Condundrum Leaderboards</span>
      </StyledH1>
      <StyledNav>
        <HeaderButton path="/full-game">Full game</HeaderButton>
        <HeaderButton path="/individual-levels">Individual levels</HeaderButton>
        <HeaderButton path="/about">About</HeaderButton>
        <Divider>-</Divider>
        <HeaderButton path="https://discord.gg/9jS6Xvc">Discord</HeaderButton>
        <HeaderButton path="https://www.speedrun.com/qc">
          speedrun.com/qc
        </HeaderButton>
      </StyledNav>
    </StyledHeader>
  );
}
