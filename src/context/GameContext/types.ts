import { Dispatch, JSX, SetStateAction } from "react";

export type GameOverType = {
    over: boolean;
    winner: {
      color: 'black' | 'white' | null ,
      details: string;
    }
    looser: {
      color: 'black' | 'white' | null ,
      details: string;
    }
  }

export type GameContextProps = {
  turn: 'black' | 'white' | null 
  setTurn: Dispatch<SetStateAction<'black' | 'white' | null>>;
  gameOver: GameOverType
  setGameOver: Dispatch<SetStateAction<GameOverType>>;
};

export type GameContextProviderProps = {
  children: JSX.Element;
};
