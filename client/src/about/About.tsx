import { StyledAbout } from "./About.style";

export default function About() {
  return (
    <StyledAbout>
      <h2>About</h2>
      <h3>This site</h3>
      <p>
        I made this mainly as a replacement for{" "}
        <a href="https://qc.zemanzo.nl/thread/">the thread</a> on the steam
        forums. Since those shut down, I had to relocate it elsewhere and this
        is what it ended up to be. It's not the best code but that doesn't
        matter because not many people go here. At least it's better than it
        used to be. I'm using the speedrun.com API to fetch the times and I have
        a list that I manually edit for the shifts.
      </p>
      <p>
        The code is open source, you can find it on GitHub:
        <ul>
          <li>
            Front-end:{" "}
            <a href="https://github.com/Zemanzo/quantum-conundrum-leaderboards">
              https://github.com/Zemanzo/quantum-conundrum-leaderboards
            </a>
          </li>
          <li>
            Back-end:{" "}
            <a href="https://github.com/Zemanzo/quantum-conundrum-leaderboards-server">
              https://github.com/Zemanzo/quantum-conundrum-leaderboards-server
            </a>
          </li>
        </ul>
      </p>
      <h3>Least Shifts</h3>
      <p>
        Shift records are based on the first person to provide proof of their
        run using said number of shifts. Speed is of no importance. Since
        speedrun.com doesn't provide any form to submit non-time related runs, I
        have to add these to the leaderboards manually. Hit me up when you have
        a better shift run and I'll change it accordingly. Not gonna bother with
        coding a submission interface for that cause it's not worth the effort.
      </p>
      <h3>Rules</h3>
      There are some glitches for ILs that are not approved of in the community:
      <p>
        <ul>
          <li>
            Restart Glitch (RG). This is a glitch that makes use of the frame of
            gameplay after restarting, allowing you to perserve momentum, active
            triggers preemptively or even bypass the level completely by
            touching the end trigger in that frame. Since the time you took to
            set up isn't counted by the in-game timer, this glitch is not
            allowed.{" "}
            <a href="https://www.youtube.com/watch?v=eTwE3QN8OCk">Examples</a>{" "}
            <a href="https://www.youtube.com/watch?v=HRq0TXN-wqs">here</a>.
            <br />
            Besides, if we would allow this, every level would be completed in 0
            seconds as you can jump towards the end level trigger, and hit it on
            reset. Don't do that.
          </li>
          <li>
            Continue Glitch (CG). This makes use of going through the game and
            opening up the level you wish to run. However, one does not enter
            the level yet, allowing it to set up before starting the time. Since
            the time you took to set up isn't counted by the in-game timer, this
            glitch is not allowed.{" "}
            <a href="https://youtu.be/JyRU7xvOvdM?t=52s">Example here</a>.
          </li>
        </ul>
      </p>
      <h3>Tools</h3>
      <p>
        There's no known way to open a console of sorts in the game, but you can
        still run commands through the bindings file. I've summed up my findings
        so far in{" "}
        <a href={process.env.PUBLIC_URL + "/keybindings.txt"}>this file</a>.
        Don't cheat.
      </p>
    </StyledAbout>
  );
}
