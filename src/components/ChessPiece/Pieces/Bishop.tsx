import { ChessPieceProps } from "../types";

export const Bishop = ({
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
        d="M22.5,11.63
           C21.5,11.63 20.5,11.73 19.5,11.93
           C18.5,12.13 17.5,12.43 16.5,12.83
           C15.5,13.23 14.5,13.73 13.5,14.33
           C12.5,14.93 11.5,15.63 10.5,16.43
           L33.5,16.43
           C32.5,15.63 31.5,14.93 30.5,14.33
           C29.5,13.73 28.5,13.23 27.5,12.83
           C26.5,12.43 25.5,12.13 24.5,11.93
           C23.5,11.73 22.5,11.63 22.5,11.63 Z"
      />
      <path d="M22.5,14 L20,20 L25,20 Z" />
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
