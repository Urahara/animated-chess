import { BasicCoords } from "@/context";

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
};

export type PiecesInfo = {
  id: string;
  coords: BasicCoords;
  alive: boolean;
  color: "black" | "white";
  type: PiecesTypes;
  firstMove?: boolean;
}[];
