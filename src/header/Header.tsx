import {
  StyledHeader,
  StyledH1,
  StyledNav,
  StyledLogo,
  StyledDiscordLogo,
  InternalLinkGroup,
  ExternalLinkGroup,
} from "./Header.style";
import HeaderButton from "./HeaderButton";
import SrcLogo from "../images/src.png";

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>
        <StyledLogo />
        <span>Quantum Condundrum Leaderboards</span>
      </StyledH1>
      <StyledNav>
        <InternalLinkGroup>
          <HeaderButton path="/full-game">Full game</HeaderButton>
          <HeaderButton path="/individual-levels">
            Individual levels
          </HeaderButton>
          <HeaderButton path="/about">About</HeaderButton>
        </InternalLinkGroup>
        <ExternalLinkGroup>
          <HeaderButton path="https://discord.gg/9jS6Xvc">
            <StyledDiscordLogo />
          </HeaderButton>
          <HeaderButton
            title="speedrun.com/qc"
            path="https://www.speedrun.com/qc"
          >
            <img src={SrcLogo} alt="speedrun.com/qc" />
          </HeaderButton>
        </ExternalLinkGroup>
      </StyledNav>
    </StyledHeader>
  );
}
