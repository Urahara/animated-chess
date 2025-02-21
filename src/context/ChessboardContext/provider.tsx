import { useState } from "react";
import { ChessboardContext } from "./contex";
import { BasicCoords, ChessboardContextProviderProps } from "./types";
import { defaultPiecesInfo, PiecesInfo } from "@/components";

export const ChessboardContextProvider = ({
  children,
}: ChessboardContextProviderProps) => {
  const [selectedCoords, setSelectedCoords] = useState<BasicCoords>({
    x: null,
    y: null,
  });
  const [piecesInfo, setPiecesInfo] = useState<PiecesInfo>(defaultPiecesInfo);

  const convertToChessCoords = (x: number, y: number) => {
    const alfabeticCoords = ["A", "B", "C", "D", "E", "F", "G", "H"][x];
    const numberCoords = 8 - y;
    return `${alfabeticCoords}${numberCoords}`;
  };

  const convertFromChessCoords = (coords: string) => {
    const alfabeticCoords = ["A", "B", "C", "D", "E", "F", "G", "H"];

    const x = alfabeticCoords.indexOf(coords[0]);
    const y = Number(coords[1]) - 1;

    return { x, y };
  };

  return (
    <ChessboardContext.Provider
      value={{
        selectedCoords,
        setSelectedCoords,
        convertToChessCoords,
        convertFromChessCoords,
        piecesInfo,
        setPiecesInfo,
      }}
    >
      {children}
    </ChessboardContext.Provider>
  );
};
