import { useRef, useLayoutEffect } from "react";
import { StyledTooltip } from "./Tooltip.style";

type TooltipProps = {
  info: {
    amount: number;
    color: string;
    additionalInfo?: Record<string, any>;
  };
  target: SVGPathElement;
  total: number;
};

export default function Tooltip({ info, target, total }: TooltipProps) {
  const targetRects = target.getBoundingClientRect();
  const cx = targetRects.x + targetRects.width * 0.5;
  const cy = targetRects.y + targetRects.height * 0.5;

  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (ref.current) {
      const ownRects = ref.current.getBoundingClientRect();
      ref.current.style.marginLeft = `${-ownRects.width * 0.5}px`;
    }
  }, [target]);

  return (
    <StyledTooltip cx={cx} cy={cy + 24} ref={ref}>
      <b>
        {info.amount} {info.additionalInfo?.unit}
        {info.additionalInfo?.unit && info.amount !== 1 && "s"} (
      </b>
      {((info.amount / total) * 100).toFixed(2)}%)
      {info.additionalInfo &&
        Object.entries(info.additionalInfo).map(([key, value]) => {
          if (key === "unit" || key === "scrollTo") {
            return null;
          }
          return (
            <div key={key}>
              <span>{key}</span>: <span>{value}</span>
            </div>
          );
        })}
    </StyledTooltip>
  );
}
