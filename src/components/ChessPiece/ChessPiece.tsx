"use client";

import { ChessPieceProps } from "./types";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useCanvasSprite } from "@/hooks";
import { useChessPieceAnimation, useChessPieceState } from "./hooks";

const FRAME_WIDTH = 100;
const FRAME_HEIGHT = 100;

const ANIMATION_VARIANTS: Variants = {
  idle: {
    scale: 2.5,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
  walk: {
    scale: 2.5,
    y: [0, -4, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      type: "tween",
    },
  },
  attack: {
    scale: [2.5, 2.7, 2.5],
    y: 0,
    transition: { type: "tween", duration: 0.4 },
  },
  hit: {
    scale: [2.5, 2.4, 2.5],
    y: 0,
    transition: { type: "tween", duration: 0.2 },
  },
  death: {
    scale: [2.5, 2.4, 2.5],
    y: 0,
    transition: { type: "tween", duration: 0.2 },
  },
};

export const ChessPiece = ({
  type,
  width,
  className,
  isAttacking,
  isMoving,
  isHit,
  isDead,
  color,
  style,
  ...rest
}: ChessPieceProps) => {
  const currentAnimation = useChessPieceState({
    isAttacking,
    isMoving,
    isHit,
    isDead,
  });

  const { fps, row, frames, sprite } = useChessPieceAnimation({
    color,
    type,
    currentAnimation,
  });

  const {
    canvasRef,
    width: frameWidth,
    height: frameHeight,
  } = useCanvasSprite({
    sprite,
    frames,
    fps,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    row,
    loop: currentAnimation === "idle" || currentAnimation === "walk",
  });

  const transform = `translate(-50%, -50%) scale(${width / frameWidth})${
    color === "white" ? " scaleX(-1)" : ""
  }`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        id={type}
        className={className}
        initial="idle"
        animate={currentAnimation}
        variants={ANIMATION_VARIANTS}
        style={{
          ...style,
          position: "relative",
          width,
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
            transform,
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
