import { useEffect, useState } from "react";
import { ChessPieceProps } from "./types";
import { motion, AnimatePresence, Variants } from "framer-motion";

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
    }, 200);

    return () => clearInterval(interval);
  }, [color, currentAnimation, shouldAnimate]);

  const config = SPRITE_CONFIG[color][currentAnimation];
  const spriteStyle = {
    width: (config.width / config.frames) * 2,
    height: config.height * 2,
    backgroundImage: `url(${config.sprite})`,
    backgroundPosition: `-${currentFrame * (config.width / config.frames)}px 0`,
    backgroundRepeat: "no-repeat",
    transform: `scale(${width / ((config.width / config.frames) * 2)})`,
    transformOrigin: "center",
    imageRendering: "pixelated" as const,
  };

  const variants: Variants = {
    idle: {
      scale: 3,
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
            ...spriteStyle,
            position: "absolute",
            width: `${width}px`,
            height: `${width}px`,
            transform: `scale(${width / ((config.width / config.frames) * 2)})`,
            transformOrigin: "center",
            pointerEvents: "none",
          }}
          animate={{
            y: isMoving ? -4 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            repeat: isMoving ? Infinity : 0,
            repeatType: "reverse",
            duration: 0.8,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};
