import { ChessPieceProps } from "../types";

export const Rook = ({
  color,
  height,
  width,
}: Omit<ChessPieceProps, "type">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 45 45"
  >
    <g
      fill={color}
      stroke="#000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z M 15,32 L 15,29 L 30,29 L 30,32 L 15,32 z M 18,29 L 18,25 L 27,25 L 27,29 L 18,29 z M 21,25 L 21,21 L 24,21 L 24,25 L 21,25 z M 12,21 L 12,13 L 15,13 L 15,21 L 12,21 z M 30,21 L 30,13 L 33,13 L 33,21 L 30,21 z M 9,13 L 9,9 L 36,9 L 36,13 L 9,13 z M 12,9 L 12,5 L 15,5 L 15,9 L 12,9 z M 30,9 L 30,5 L 33,5 L 33,9 L 30,9 z" />
    </g>
  </svg>
);
