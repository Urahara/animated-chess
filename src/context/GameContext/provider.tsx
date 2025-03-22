import { useState } from "react";
import { GameContext } from "./contex";
import { GameContextProviderProps, GameOverType } from "./types";

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [turn, setTurn] = useState<"white" | "black" | null>("white");
  const [gameOver, setGameOver] = useState<GameOverType>({
    looser: {
      color: null,
      details: "",
    },
    winner: {
      color: null,
      details: "",
    },
    over: false,
  });
  return (
    <GameContext.Provider
      value={{
        turn,
        setTurn,
        gameOver,
        setGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
