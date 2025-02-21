"use client";
import React, { useEffect, useRef, useState } from "react";
import { Engine } from "../Engine/component";

export const Chessboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const newSize = Math.min(containerWidth, containerHeight) * 0.9;
      setBoardSize(newSize);
    };

    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
      updateSize();
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex justify-center items-center pb-7 pl-7"
    >
      <Engine width={boardSize} height={boardSize} />
    </div>
  );
};
