import { Chessboard } from "@/components";
import { ChessboardContextProvider } from "@/context";
import { GameContextProvider } from "@/context/GameContext";

export default function Home() {
  return (
    <GameContextProvider>
      <ChessboardContextProvider>
        <div className="w-screen h-screen">
          <Chessboard />
        </div>
      </ChessboardContextProvider>
    </GameContextProvider>
  );
}
