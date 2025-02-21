import { ChessPieceProps } from "../types";

export const Peon = ({
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
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M 22.5,11.63 
               C 21.25,11.63 20,12.01 19,12.7 
               C 18,13.39 17.25,14.41 16.88,15.55 
               C 16.49,16.71 16.44,17.97 16.75,19.17 
               C 17.06,20.37 17.66,21.46 18.5,22.35 
               C 19.34,23.24 20.39,23.9 21.6,24.27 
               C 22.8,24.63 24.06,24.6 25.22,24.27 
               C 26.38,23.93 27.42,23.27 28.25,22.38 
               C 29.08,21.48 29.68,20.39 29.99,19.17 
               C 30.31,17.97 30.26,16.71 29.88,15.55 
               C 29.51,14.41 28.76,13.39 27.75,12.7 
               C 26.75,12.01 25.5,11.63 24.25,11.63 Z"
      />
      <path
        d="M 12,30 
               C 12,31 13,32 15,32 
               L 30,32 
               C 32,32 33,31 33,30 
               L 33,27 
               C 33,26 32,25 30,25 
               L 15,25 
               C 13,25 12,26 12,27 
               L 12,30 Z"
      />
    </g>
  </svg>
);
