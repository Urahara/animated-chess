import { useCallback, useEffect, useState } from "react";
import { ChessboardContext } from "./contex";
import { BasicCoords, ChessboardContextProviderProps } from "./types";
import { defaultPiecesInfo, PiecesInfo } from "@/components";

export const ChessboardContextProvider = ({
  children,
}: ChessboardContextProviderProps) => {
  const [selectedPieceCoords, setSelectedPieceCoords] =
    useState<PiecesInfo | null>(defaultPiecesInfo[0]);
  const [piecesInfo, setPiecesInfo] = useState<PiecesInfo[]>(defaultPiecesInfo);
  const [path, setPath] = useState<BasicCoords[]>([]);

  const convertToChessCoords = ({ x, y }: BasicCoords) => {
    if (x === null || y === null) return "";
    const alfabeticCoords = ["A", "B", "C", "D", "E", "F", "G", "H"][x];
    const numberCoords = 8 - y;
    return `${alfabeticCoords}${numberCoords}`;
  };

  const convertFromChessCoords = (coords: string) => {
    const alfabeticCoords = ["A", "B", "C", "D", "E", "F", "G", "H"];

    const x = alfabeticCoords.indexOf(coords[0]);
    const y = Number(coords[1]) - 1;

    return { x, y } as BasicCoords;
  };

  const handleVerifyIsEmptyCell = useCallback(
    ({ coords, color }: Pick<PiecesInfo, "coords" | "color">) => {
      if (coords.x === null || coords?.y === null) return false;
      if (coords.x > 7 || coords?.y > 7) return false;
      if (coords.x < 0 || coords?.y < 0) return false;

      const hasPiece = piecesInfo.some(
        (el) =>
          el.coords.x === coords.x &&
          el.coords.y === coords.y &&
          el.color === color
      );

      return !hasPiece;
    },
    [piecesInfo]
  );

  const handleCalcPathColor = (
    color: PiecesInfo["color"],
    coord: PiecesInfo["coords"]["x"]
  ) => {
    if (color === "black" && coord !== null) return -1 * coord;

    return coord as number;
  };

  const handleSetPathForPiece = useCallback(
    (piece: PiecesInfo) => {
      if (piece.coords.y === null || piece.coords.x === null) return;
      const { x, y } = piece.coords;
      const calculedPath = [];

      switch (piece.type) {
        case "knight": {
          const pY = (y +
            handleCalcPathColor(piece.color, 2)) as BasicCoords["y"];
          let newPosition = {
            y: pY,
            x: (x - 1) as BasicCoords["x"],
          };

          if (
            handleVerifyIsEmptyCell({ color: piece.color, coords: newPosition })
          ) {
            calculedPath.push(newPosition);
          }

          newPosition = {
            y: pY,
            x: (x + 1) as BasicCoords["x"],
          };

          if (
            handleVerifyIsEmptyCell({ color: piece.color, coords: newPosition })
          ) {
            calculedPath.push(newPosition);
          }

          break;
        }
        default: {
          let newPosition = {
            y: (y + handleCalcPathColor(piece.color, 1)) as BasicCoords["y"],
            x,
          };

          if (
            handleVerifyIsEmptyCell({ color: piece.color, coords: newPosition })
          ) {
            calculedPath.push(newPosition);
          }

          if (piece.firstMove) {
            newPosition = {
              y: (y + handleCalcPathColor(piece.color, 2)) as BasicCoords["y"],
              x,
            };

            if (
              handleVerifyIsEmptyCell({
                color: piece.color,
                coords: newPosition,
              })
            ) {
              calculedPath.push(newPosition);
            }
          }

          break;
        }
      }

      setPath(calculedPath);
    },
    [handleVerifyIsEmptyCell]
  );

  useEffect(() => {
    if (
      selectedPieceCoords?.coords.x === null ||
      selectedPieceCoords?.coords.y === null ||
      !selectedPieceCoords
    )
      setPath([]);
    else handleSetPathForPiece(selectedPieceCoords);
  }, [handleSetPathForPiece, selectedPieceCoords]);

  return (
    <ChessboardContext.Provider
      value={{
        selectedPieceCoords,
        path,
        setPath,
        setSelectedPieceCoords,
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
