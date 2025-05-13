import { PiecesTypes } from "../types";

const WHITE_SPRITESHEET = "/sprites/Pieces/White";
const BLACK_SPRITESHEET = "/sprites/Pieces/Black";

type AnimationType = "idle" | "walk" | "attack" | "hit" | "death";

interface AnimationConfig {
  row: number;
  frames: number;
  fps: number;
  sprite: string;
}

interface UseChessPieceAnimationProps {
  color: "white" | "black";
  type: PiecesTypes;
  currentAnimation: AnimationType;
}

const ANIMATION_CONFIGS: Record<AnimationType, AnimationConfig> = {
  idle: { row: 0, frames: 6, fps: 8, sprite: "" },
  walk: { row: 1, frames: 6, fps: 8, sprite: "" },
  attack: { row: 2, frames: 6, fps: 8, sprite: "" },
  death: { row: 5, frames: 6, fps: 8, sprite: "" },
  hit: { row: 4, frames: 6, fps: 8, sprite: "" },
};

const PIECE_SPRITE_MAP: Record<PiecesTypes, string> = {
  peon: "Pawn",
  knight: "Knight",
  bishop: "Bishop",
  rook: "Rook",
  queen: "Queen",
  king: "King",
};

export const useChessPieceAnimation = ({
  color,
  type,
  currentAnimation,
}: UseChessPieceAnimationProps): AnimationConfig => {
  const BASE_SPRITE_DIRECTORY = color === "white" ? WHITE_SPRITESHEET : BLACK_SPRITESHEET;
  
  if (!PIECE_SPRITE_MAP[type]) {
    throw new Error(`Invalid piece type: ${type}`);
  }

  const spriteDirectory = `${BASE_SPRITE_DIRECTORY}/${PIECE_SPRITE_MAP[type]}.png`;
  
  return {
    ...ANIMATION_CONFIGS[currentAnimation],
    sprite: spriteDirectory,
  };
};
