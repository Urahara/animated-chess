import { useCallback } from "react";
import { ChessPieceProps } from "./types";
import { Bishop, King, Knight, Peon, Queen, Rook } from "./Pieces";

export const ChessPiece = ({ color, height, type, width }: ChessPieceProps) => {
  const RenderPiece = useCallback(
    (type: ChessPieceProps["type"]) => {
      switch (type) {
        case "bishop":
          return <Bishop color={color} height={height} width={width} />;
        case "knight":
          return <Knight color={color} height={height} width={width} />;
        case "queen":
          return <Queen color={color} height={height} width={width} />;
        case "peon":
          return <Peon color={color} height={height} width={width} />;
        case "rook":
          return <Rook color={color} height={height} width={width} />;
        default:
          return <King color={color} height={height} width={width} />;
      }
    },
    [color, height, width]
  );

  return <div id={type}>{RenderPiece(type)}</div>;
};
