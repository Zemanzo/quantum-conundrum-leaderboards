import { useState, useCallback } from "react";
import { StyledMainText, StyledSubText } from "./CircleGraph.style";
import Tooltip from "./Tooltip";

type Values = Array<{
  amount: number;
  color: string;
  additionalInfo?: Record<string, any>;
}>;

type CircleGraphProps = {
  values: Values;
  mainText?: string | ((sum: number) => string);
  subText?: string;
};

const isTouchDevice = "ontouchstart" in window;

export default function CircleGraph({
  values,
  mainText,
  subText,
}: CircleGraphProps) {
  const [highlightedSegment, setHighlightedSegment] = useState<number | null>(
    null
  );
  const [target, setTarget] = useState<SVGPathElement | null>(null);
  const onRefChange = useCallback((node: SVGPathElement) => {
    setTarget(node);
  }, []);

  const sum = values.reduce<number>(
    (valuesSum, { amount }) => (valuesSum += amount),
    0
  );
  let startAngle = 0;

  return (
    <>
      <svg
        height="100%"
        viewBox="0 0 200 200"
        onMouseLeave={() => {
          setHighlightedSegment(null);
        }}
      >
        <g>
          {values.map(({ amount, color, additionalInfo }, i) => {
            const size = (amount / sum) * 360;
            const d = generateArcPath(startAngle, size + startAngle, 100, 70);
            startAngle += size;
            const opacity =
              highlightedSegment !== null
                ? highlightedSegment === i
                  ? 1
                  : 0.6
                : 1;
            return (
              <path
                d={d}
                fill={color}
                opacity={opacity}
                key={i}
                stroke="#161616"
                strokeWidth={0.5}
                onMouseEnter={() => {
                  setHighlightedSegment(i);
                }}
                onMouseLeave={() => {
                  if (highlightedSegment === i) {
                    setHighlightedSegment(null);
                  }
                }}
                onClick={() => {
                  if (additionalInfo?.scrollTo && !isTouchDevice) {
                    const scrollTarget = document.getElementById(
                      additionalInfo.scrollTo
                    );
                    scrollTarget?.scrollIntoView({
                      behavior: "auto",
                      block: "center",
                      inline: "center",
                    });
                    setTimeout(() => {
                      scrollTarget?.classList.add("highlight");
                    }, 300);
                    setTimeout(() => {
                      scrollTarget?.classList.remove("highlight");
                    }, 1000);
                  }
                }}
                ref={highlightedSegment === i ? onRefChange : undefined}
                style={additionalInfo?.scrollTo && { cursor: "pointer" }}
              />
            );
          })}
        </g>
        <StyledMainText
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {mainText
            ? typeof mainText === "string"
              ? mainText
              : mainText(sum)
            : sum.toFixed(2)}
        </StyledMainText>
        {subText && (
          <StyledSubText
            x="50%"
            y="60%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {subText}
          </StyledSubText>
        )}
      </svg>
      {highlightedSegment !== null && target && (
        <Tooltip
          info={values[highlightedSegment]}
          target={target}
          total={sum}
        />
      )}
    </>
  );
}

/**
 * Copied from https://github.com/luckyfoxdesign/donutsvg/blob/master/src/core/core.js
 */
function generateArcPath(
  startAngle: number,
  endAngle: number,
  outerRadius: number,
  innerRadius: number
) {
  startAngle = (startAngle * Math.PI) / 180;
  endAngle = (endAngle * Math.PI) / 180;
  const sinAlpha = Math.sin(startAngle);
  const cosAlpha = Math.cos(startAngle);
  const sinBeta = Math.sin(endAngle);
  const cosBeta = Math.cos(endAngle);
  const largeArc = endAngle - startAngle > Math.PI;

  const P = {
    x: outerRadius + outerRadius * sinAlpha,
    y: outerRadius - outerRadius * cosAlpha,
  };

  const Q = {
    x: outerRadius + outerRadius * sinBeta,
    y: outerRadius - outerRadius * cosBeta,
  };

  const R = {
    x: outerRadius + innerRadius * sinBeta,
    y: outerRadius - innerRadius * cosBeta,
  };

  const S = {
    x: outerRadius + innerRadius * sinAlpha,
    y: outerRadius - innerRadius * cosAlpha,
  };

  return `M${P.x}, ${P.y} A${outerRadius},${outerRadius} 0 ${
    largeArc ? "1" : "0"
  } 1 ${Q.x},${Q.y} L${R.x},${R.y} A${innerRadius},${innerRadius} 0 ${
    largeArc ? "1" : "0"
  } 0 ${S.x},${S.y} Z`;
}
