"use client";
import React, { useCallback, useContext, useMemo } from "react";
import { BasicCoords, ChessboardContext } from "@/context";
import clsx from "clsx";
import { ChessPiece, PiecesInfo } from "../ChessPiece";
import { EngineProps } from "./types";

export const Engine = ({ height, width }: EngineProps) => {
  const { path, setSelectedPieceCoords, convertToChessCoords, piecesInfo } =
    useContext(ChessboardContext);

  const BOARD_SIZE = 8;

  const handleChessCoordsClick = useCallback(
    ({ alive, color, coords, id, type, firstMove }: PiecesInfo) => {
      if (coords.x === null || coords.y === null) return;
      console.log("SELECTED PIECE", {
        alive,
        color,
        coords,
        id,
        type,
        firstMove,
      });

      setSelectedPieceCoords({
        alive,
        color,
        coords,
        id,
        type,
        firstMove,
      });
    },
    [setSelectedPieceCoords]
  );

  const { cellSize, offsetX, offsetY } = useMemo(() => {
    const cellSize = Math.min(width, height) / BOARD_SIZE;
    return {
      cellSize,
      offsetX: (width - BOARD_SIZE * cellSize) / 2,
      offsetY: (height - BOARD_SIZE * cellSize) / 2,
    };
  }, [width, height]);

  const handleRenderPiece = useCallback(
    ({ x, y }: BasicCoords) => {
      if (!piecesInfo.length) return;

      const piece = piecesInfo?.find(
        (p) => p.coords.x === x && p.coords.y === y
      );

      if (piece)
        return (
          <ChessPiece
            onClick={() => handleChessCoordsClick(piece)}
            width={cellSize}
            height={cellSize}
            type={piece.type}
            color={piece.color}
            key={piece.id}
          />
        );
    },
    [cellSize, handleChessCoordsClick, piecesInfo]
  );

  const renderBoard = useMemo(() => {
    const cells = [];

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cellCoord = { x: col, y: row } as BasicCoords;
        const isPath = path.some(
          (el) => el.x === cellCoord.x && el.y === cellCoord.y
        );
        const isLight = (row + col) % 2 === 0;

        cells.push(
          <div
            key={convertToChessCoords(cellCoord)}
            id={convertToChessCoords(cellCoord)}
            className={clsx("absolute cursor-pointer", {
              "bg-chess-light": isLight,
              "bg-chess-dark": !isLight,
              "animate-chess-pulse !bg-blue-200 duration-700": isPath,
            })}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              left: `${offsetX + col * cellSize}px`,
              top: `${offsetY + row * cellSize}px`,
            }}
          >
            {handleRenderPiece({ x: col, y: row } as BasicCoords)}
          </div>
        );
      }
    }
    return cells;
  }, [
    path,
    convertToChessCoords,
    cellSize,
    offsetX,
    offsetY,
    handleRenderPiece,
  ]);

  const renderCoordinates = useMemo(() => {
    const coordinates = [];

    for (let col = 0; col < BOARD_SIZE; col++) {
      const letter = String.fromCharCode(65 + col);
      const baseY = offsetY + BOARD_SIZE * cellSize + 10;

      coordinates.push(
        <div
          key={`coord-h-${col}`}
          className="absolute text-sm text-white font-medium"
          style={{
            left: `${offsetX + col * cellSize + cellSize / 2}px`,
            top: `${baseY}px`,
            transform: "translateX(-50%)",
          }}
        >
          {letter}
        </div>
      );
    }

    for (let row = 0; row < BOARD_SIZE; row++) {
      const number = 8 - row;
      const baseX = offsetX - 20;

      coordinates.push(
        <div
          key={`coord-v-${row}`}
          className="absolute text-sm text-white font-medium"
          style={{
            top: `${offsetY + row * cellSize + cellSize / 2}px`,
            left: `${baseX}px`,
            transform: "translateY(-50%)",
          }}
        >
          {number}
        </div>
      );
    }

    return coordinates;
  }, [cellSize, offsetX, offsetY]);

  return (
    <div className="relative" style={{ width, height }}>
      {renderBoard}
      {renderCoordinates}
    </div>
  );
};
