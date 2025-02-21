import { createContext } from "react";
import { ChessboardContextProps } from "./types";
import { defaultPiecesInfo } from "@/components";

export const ChessboardContext = createContext<ChessboardContextProps>({
  selectedCoords: { x: null, y: null },
  setSelectedCoords: () => {},
  convertToChessCoords: () => "",
  convertFromChessCoords: () => ({ x: 0, y: 0 }),
  piecesInfo: defaultPiecesInfo,
  setPiecesInfo: () => "",
});
