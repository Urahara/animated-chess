import { ChessPieceProps } from "../types";

export const King = ({
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
      <path d="M22.5,11.63 L22.5,6" />
      <path d="M20,8 L25,8" />
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
