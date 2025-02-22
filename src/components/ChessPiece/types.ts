import { BasicCoords } from "@/context";
import { HTMLAttributes } from "react";

export type PiecesTypes =
  | "peon"
  | "knight"
  | "king"
  | "bishop"
  | "queen"
  | "rook";

export type ChessPieceProps = {
  width: number;
  height: number;
  type: PiecesTypes;
  color: "black" | "white";
} & HTMLAttributes<HTMLDivElement>

export type PiecesInfo = {
  id: string;
  coords: BasicCoords;
  alive: boolean;
  color: "black" | "white";
  type: PiecesTypes;
  firstMove?: boolean;
}
