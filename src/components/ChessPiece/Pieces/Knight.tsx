import { ChessPieceProps } from "../types";

export const Knight = ({
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
      <path
        d="M22.5,10.63
           C20.5,10.63 18.5,12.13 17.5,14.13
           L16.5,15.63
           C15.5,17.13 15,19.13 15,21.13
           C15,23.13 15.5,25.13 16.5,26.63
           L17.5,28.13
           C18.5,29.63 20.5,31.13 22.5,31.13
           C24.5,31.13 26.5,29.63 27.5,28.13
           L28.5,26.63
           C29.5,25.13 30,23.13 30,21.13
           C30,19.13 29.5,17.13 28.5,15.63
           L27.5,14.13
           C26.5,12.13 24.5,10.63 22.5,10.63 Z"
      />
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
