import { useEffect, useState } from "react";
import { ChessPieceProps } from "./types";
import { motion } from "framer-motion";
import clsx from "clsx";

const SPRITE_CONFIG = {
  white: {
    idle: {
      sprite: "/sprites/Soldier/Soldier_Idle.png",
      frames: 3,
      width: 192, // 3 frames * 64px
      height: 64,
    },
    walk: {
      sprite: "/sprites/Soldier/Soldier_Walk.png",
      frames: 5,
      width: 320, // 5 frames * 64px
      height: 64,
    },
    attack: {
      sprite: "/sprites/Soldier/Soldier_Attack01.png",
      frames: 4,
      width: 256, // 4 frames * 64px
      height: 64,
    },
    hit: {
      sprite: "/sprites/Soldier/Soldier_Hit.png",
      frames: 6,
      width: 384, // 6 frames * 64px
      height: 64,
    },
    death: {
      sprite: "/sprites/Soldier/Soldier_Death.png",
      frames: 5,
      width: 320, // 5 frames * 64px
      height: 64,
    },
  },
  black: {
    idle: {
      sprite: "/sprites/Orc/Orc_Idle.png",
      frames: 3,
      width: 192,
      height: 64,
    },
    walk: {
      sprite: "/sprites/Orc/Orc_Walk.png",
      frames: 5,
      width: 320,
      height: 64,
    },
    attack: {
      sprite: "/sprites/Orc/Orc_Attack01.png",
      frames: 4,
      width: 256,
      height: 64,
    },
    hit: {
      sprite: "/sprites/Orc/Orc_Hit.png",
      frames: 6,
      width: 384,
      height: 64,
    },
    death: {
      sprite: "/sprites/Orc/Orc_Death.png",
      frames: 5,
      width: 320,
      height: 64,
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
  const [currentFrame, setCurrentFrame] = useState(0);
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
      setShouldAnimate(false);
    }
  }, [isAttacking, isMoving, isHit, isDead]);

  useEffect(() => {
    if (!shouldAnimate) {
      setCurrentFrame(0);
      return;
    }

    const config = SPRITE_CONFIG[color][currentAnimation];
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const nextFrame = prev + 1;
        if (nextFrame >= config.frames) {
          if (
            currentAnimation === "attack" ||
            currentAnimation === "hit" ||
            currentAnimation === "death"
          ) {
            setShouldAnimate(false);
            return 0;
          }
          return 0;
        }
        return nextFrame;
      });
    }, 150); // Slower animation speed

    return () => clearInterval(interval);
  }, [color, currentAnimation, shouldAnimate]);

  const config = SPRITE_CONFIG[color][currentAnimation];
  const spriteStyle = {
    width: config.width / config.frames,
    height: config.height,
    backgroundImage: `url(${config.sprite})`,
    backgroundPosition: `-${currentFrame * (config.width / config.frames)}px 0`,
    backgroundRepeat: "no-repeat",
    transform: `scale(${width / (config.width / config.frames)})`,
    transformOrigin: "center",
    imageRendering: "pixelated" as const,
  };

  return (
    <motion.div
      id={type}
      className={clsx("transition-all", className)}
      animate={{
        scale: isAttacking ? [1, 1.2, 1] : 1,
        rotate: isAttacking ? [0, 15, -15, 0] : 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      style={style}
      {...rest}
    >
      <div style={spriteStyle} />
    </motion.div>
  );
};
