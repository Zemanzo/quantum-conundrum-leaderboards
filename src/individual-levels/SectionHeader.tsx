import {
  StyledHeader,
  SectionTitle,
  StyledShifts,
} from "./SectionHeader.style";

type SectionHeaderProps = {
  title: string;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <StyledHeader>
        <div>BEST TIME</div>
        <div>#2 TIME</div>
        <div>#3 TIME</div>
      </StyledHeader>
      <StyledShifts>LEAST SHIFTS</StyledShifts>
    </>
  );
}
