import { PiecesInfo } from "@/components/ChessPiece/types";
import { Dispatch, JSX, SetStateAction } from "react";

export type BasicCoords = {
  x: number | null;
  y: number | null;
};

export type ChessboardContextProps = {
  selectedCoords: BasicCoords;
  setSelectedCoords: Dispatch<SetStateAction<BasicCoords>>;
  convertToChessCoords: (x: number, y: number) => string;
  convertFromChessCoords: (coords: string) => BasicCoords
  piecesInfo: PiecesInfo
  setPiecesInfo: Dispatch<SetStateAction<PiecesInfo>>
};

export type ChessboardContextProviderProps = {
  children: JSX.Element;
};
