"use client";

import { useEffect, useState } from "react";
import { ChessPieceProps } from "./types";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useCanvasSprite } from "@/hooks";

const SPRITESHEET = "/sprites/Warrior/SpriteSheet/Warrior_Sheet-Effect.png";
const FRAME_WIDTH = 69;
const FRAME_HEIGHT = 44;

const SPRITE_CONFIG = {
  idle: { row: 0, frames: 6, fps: 8 },
  walk: { row: 1, frames: 6, fps: 8 },
  attack: { row: 2, frames: 6, fps: 8 },
  death: { row: 5, frames: 6, fps: 8 },
  hit: { row: 4, frames: 6, fps: 8 },
};

export const ChessPiece = ({
  type,
  width,
  className,
  isAttacking,
  isMoving,
  isHit,
  isDead,
  style,
  ...rest
}: ChessPieceProps) => {
  const [currentAnimation, setCurrentAnimation] = useState<
    "idle" | "walk" | "attack" | "hit" | "death"
  >(isDead ? "death" : "idle");

  useEffect(() => {
    if (isDead) {
      setCurrentAnimation("death");
    } else if (isAttacking) {
      setCurrentAnimation("attack");
    } else if (isMoving) {
      setCurrentAnimation("walk");
    } else if (isHit) {
      setCurrentAnimation("hit");
    } else {
      setCurrentAnimation("idle");
    }
  }, [isAttacking, isMoving, isHit, isDead]);

  const config = SPRITE_CONFIG[currentAnimation];
  const startFrame = config.frames;

  const {
    canvasRef,
    width: frameWidth,
    height: frameHeight,
  } = useCanvasSprite({
    sprite: SPRITESHEET,
    frameCount: config.frames,
    fps: config.fps,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    row: config.row,
    loop: currentAnimation === "idle" || currentAnimation === "walk",
    startFrame,
  });

  const variants: Variants = {
    idle: {
      scale: 1.5,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    walk: {
      scale: 1.5,
      y: [0, -4, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        type: "tween",
      },
    },
    attack: {
      scale: [1.5, 1.7, 1.5],
      y: 0,
      transition: {
        type: "tween",
        duration: 0.4,
      },
    },
    hit: {
      scale: [1.5, 1.4, 1.5],
      y: 0,
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
    death: {
      scale: [1.5, 1.4, 1.5],
      y: 0,
      transition: {
        type: "tween",
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        id={type}
        className={className}
        initial="idle"
        animate={currentAnimation}
        variants={variants}
        style={{
          ...style,
          position: "relative",
          width: width,
          height: width,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          overflow: "hidden",
          pointerEvents: "auto",
        }}
        {...rest}
      >
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: `${frameWidth}px`,
            height: `${frameHeight}px`,
            transform: `translate(-50%, -50%) translateX(10px) scale(${
              width / frameWidth
            })`,
            transformOrigin: "center",
            pointerEvents: "none",
          }}
        >
          <canvas
            ref={canvasRef}
            width={frameWidth}
            height={frameHeight}
            style={{
              imageRendering: "pixelated",
              width: `${frameWidth}px`,
              height: `${frameHeight}px`,
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
