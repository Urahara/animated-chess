import { ChessPieceProps } from "../types";

export const Queen = ({
  color,
  height,
  width,
}: Omit<ChessPieceProps, "type">) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="40" fill={color} />
    <polygon
      points="50,15 40,35 60,35"
      fill={color === "black" ? "white" : "black"}
    />
    <text
      x="50"
      y="50"
      textAnchor="middle"
      dominantBaseline="middle"
      fill={color === "black" ? "white" : "black"}
      fontSize="12"
      fontFamily="Arial, sans-serif"
    >
      QUEEN
    </text>
  </svg>
);
