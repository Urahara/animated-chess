import { useEffect, useState } from "react";
import { ChessPieceProps } from "../types";

export const useChessPieceState = ({
  isAttacking,
  isMoving,
  isHit,
  isDead,
}: Pick<ChessPieceProps, "isAttacking" | "isMoving" | "isHit" | "isDead">) => {
  const [currentAnimation, setCurrentAnimation] = useState<
    "idle" | "walk" | "attack" | "hit" | "death"
  >(isDead ? "death" : "idle");

  useEffect(() => {
    if (isDead) setCurrentAnimation("death");
    else if (isAttacking) setCurrentAnimation("attack");
    else if (isMoving) setCurrentAnimation("walk");
    else if (isHit) setCurrentAnimation("hit");
    else setCurrentAnimation("idle");
  }, [isAttacking, isMoving, isHit, isDead]);

  return currentAnimation;
};
