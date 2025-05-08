"use client";

import { useEffect, useState } from "react";
import { ChessPieceProps } from "./types";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useCanvasSprite } from "@/hooks";

const SPRITE_CONFIG = {
  white: {
    idle: {
      sprite: "/sprites/Soldier/Soldier_Idle.png",
      frames: 3,
      width: 192,
      height: 64,
      fps: 6,
    },
    walk: {
      sprite: "/sprites/Soldier/Soldier_Walk.png",
      frames: 5,
      width: 320,
      height: 64,
      fps: 10,
    },
    attack: {
      sprite: "/sprites/Soldier/Soldier_Attack01.png",
      frames: 4,
      width: 256,
      height: 64,
      fps: 12,
    },
    hit: {
      sprite: "/sprites/Soldier/Soldier_Hit.png",
      frames: 6,
      width: 384,
      height: 64,
      fps: 12,
    },
    death: {
      sprite: "/sprites/Soldier/Soldier_Death.png",
      frames: 5,
      width: 320,
      height: 64,
      fps: 10,
    },
  },
  black: {
    idle: {
      sprite: "/sprites/Orc/Orc_Idle.png",
      frames: 3,
      width: 192,
      height: 64,
      fps: 6,
    },
    walk: {
      sprite: "/sprites/Orc/Orc_Walk.png",
      frames: 5,
      width: 320,
      height: 64,
      fps: 10,
    },
    attack: {
      sprite: "/sprites/Orc/Orc_Attack01.png",
      frames: 4,
      width: 256,
      height: 64,
      fps: 12,
    },
    hit: {
      sprite: "/sprites/Orc/Orc_Hit.png",
      frames: 6,
      width: 384,
      height: 64,
      fps: 12,
    },
    death: {
      sprite: "/sprites/Orc/Orc_Death.png",
      frames: 5,
      width: 320,
      height: 64,
      fps: 10,
    },
  },
};

export const ChessPiece = ({
  color,
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
  >("idle");
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isAttacking) {
      setCurrentAnimation("attack");
      setShouldAnimate(true);
    } else if (isMoving) {
      setCurrentAnimation("walk");
      setShouldAnimate(true);
    } else if (isHit) {
      setCurrentAnimation("hit");
      setShouldAnimate(true);
    } else if (isDead) {
      setCurrentAnimation("death");
      setShouldAnimate(true);
    } else {
      setCurrentAnimation("idle");
      setShouldAnimate(true);
    }
  }, [isAttacking, isMoving, isHit, isDead]);

  const config = SPRITE_CONFIG[color][currentAnimation];
  const {
    canvasRef,
    width: frameWidth,
    height: frameHeight,
    isAnimating,
  } = useCanvasSprite({
    sprite: config.sprite,
    frameCount: config.frames,
    fps: config.fps,
    width: config.width,
    height: config.height,
    loop: currentAnimation === "idle" || currentAnimation === "walk",
    shouldAnimate,
  });

  const variants: Variants = {
    idle: {
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    attack: {
      scale: [1, 1.2, 1],
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.4,
      },
    },
    hit: {
      scale: [1, 0.9, 1],
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2,
      },
    },
    death: {
      scale: [1, 0.8, 0],
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
        duration: 0.6,
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
          cursor: "pointer",
          zIndex: 10,
          overflow: "hidden",
          pointerEvents: "auto",
        }}
        {...rest}
      >
        <motion.div
          style={{
            position: "absolute",
            width: `${width}px`,
            height: `${width}px`,
            transform: `scale(${(width / frameWidth) * 8})`,
            transformOrigin: "center",
            pointerEvents: "none",
          }}
          animate={{
            y: isAnimating && isMoving ? -4 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            repeat: isAnimating && isMoving ? Infinity : 0,
            repeatType: "reverse",
            duration: 0.8,
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
