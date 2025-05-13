import { BasicCoords } from "@/context";
import { HTMLMotionProps } from "framer-motion";

export type PiecesTypes =
  | "peon"
  | "knight"
  | "king"
  | "bishop"
  | "queen"
  | "rook";

export interface ChessPieceProps extends HTMLMotionProps<"div"> {
  color: "white" | "black";
  type: PiecesTypes;
  width: number;
  height: number;
  className?: string;
  isAttacking?: boolean;
  isMoving?: boolean;
  isHit?: boolean;
  isDead?: boolean;
}

export type PiecesInfo = {
  id: string;
  coords: BasicCoords;
  alive: boolean;
  color: "black" | "white";
  type: PiecesTypes;
  firstMove?: boolean;
}
