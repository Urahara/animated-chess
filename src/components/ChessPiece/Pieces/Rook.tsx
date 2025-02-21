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
      <path d="M9,39 L36,39 L36,33 L9,33 Z" />
      <path d="M9,33 L9,27 L36,27 L36,33" />
      <path
        d="M12,30 
           C12,31 13,32 15,32 
           L30,32 
           C32,32 33,31 33,30 
           L33,27 
           C33,26 32,25 30,25 
           L15,25 
           C13,25 12,26 12,27 
           L12,30 Z"
      />
    </g>
  </svg>
);
