import { Chessboard } from "@/components";
import { ChessboardContextProvider } from "@/context";

export default function Home() {
  return (
    <ChessboardContextProvider>
      <div className="w-screen h-screen">
        <Chessboard />
      </div>
    </ChessboardContextProvider>
  );
}
