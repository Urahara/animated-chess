import { BasicCoords } from "@/context";
import { MotionProps } from "framer-motion";

export type PiecesTypes =
  | "peon"
  | "knight"
  | "king"
  | "bishop"
  | "queen"
  | "rook";

export type ChessPieceProps = {
  color: "white" | "black";
  type: "king" | "queen" | "bishop" | "knight" | "rook" | "peon";
  width: number;
  height: number;
  className?: string;
  isAttacking?: boolean;
  isMoving?: boolean;
  isHit?: boolean;
  isDead?: boolean;
} & Omit<MotionProps, "children">;

export type PiecesInfo = {
  id: string;
  coords: BasicCoords;
  alive: boolean;
  color: "black" | "white";
  type: PiecesTypes;
  firstMove?: boolean;
}
