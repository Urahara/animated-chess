import { useEffect, useRef, useState } from 'react';

type UseCanvasSpriteProps = {
  sprite: string;
  frameCount: number;
  fps: number;
  width: number;
  height: number;
  loop?: boolean;
  shouldAnimate?: boolean;
};

export const useCanvasSprite = ({
  sprite,
  frameCount,
  fps,
  width,
  height,
  loop = true,
  shouldAnimate = true,
}: UseCanvasSpriteProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameWidth = width / frameCount;
  const frameTime = 1000 / fps;
  const lastFrameTime = useRef<number>(0);
  const currentFrame = useRef(0);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  const isAnimating = useRef<boolean>(false);

  useEffect(() => {
    const image = new Image();
    image.src = sprite;
    image.onload = () => {
      imageRef.current = image;
      setIsLoaded(true);
    };
  }, [sprite]);

  useEffect(() => {
    if (!shouldAnimate || !isLoaded || !canvasRef.current || !imageRef.current) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = undefined;
      }
      isAnimating.current = false;
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match the frame size
    canvas.width = frameWidth;
    canvas.height = height;

    const animate = (timestamp: number) => {
      if (!lastFrameTime.current) {
        lastFrameTime.current = timestamp;
      }

      const elapsed = timestamp - lastFrameTime.current;

      if (elapsed >= frameTime) {
        lastFrameTime.current = timestamp;

        if (currentFrame.current >= frameCount - 1) {
          if (!loop) {
            if (animationFrameId.current) {
              cancelAnimationFrame(animationFrameId.current);
              animationFrameId.current = undefined;
            }
            isAnimating.current = false;
            return;
          }
          currentFrame.current = 0;
        } else {
          currentFrame.current++;
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw current frame
        ctx.drawImage(
          imageRef.current!,
          currentFrame.current * frameWidth,
          0,
          frameWidth,
          height,
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    isAnimating.current = true;
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = undefined;
      }
      isAnimating.current = false;
    };
  }, [frameCount, frameTime, frameWidth, height, isLoaded, loop, shouldAnimate]);

  return {
    canvasRef,
    width: frameWidth,
    height,
    isAnimating: isAnimating.current,
  };
}; 