declare module 'react-sprite-animator' {
  interface SpriteAnimatorProps {
    sprite: string;
    width: number;
    height: number;
    frameCount: number;
    frameWidth: number;
    frameHeight: number;
    fps?: number;
    loop?: boolean;
    startFrame?: number;
    stopLastFrame?: boolean;
    shouldAnimate?: boolean;
  }

  const SpriteAnimator: React.FC<SpriteAnimatorProps>;
  export default SpriteAnimator;
} 