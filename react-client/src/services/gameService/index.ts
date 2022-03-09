import { Socket } from "socket.io-client";
import { IPlayMatrix, IStartGame } from "../../components/game";

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise((rs, rj) => {
      socket.emit("join_game", { roomId });
      socket.on("room_joined", () => rs(true));
      socket.on("room_join_error", ({ error }) => rj(error));
    });
  }

  public async deckInformation(socket: Socket, decksInPlay: number[]) {
    socket.emit("decks_in_play", { decksInPlay });
  }

  public async updateGame(socket: Socket, gameMatrix: IPlayMatrix) {
    socket.emit("update_game", { matrix: gameMatrix });
  }

  public async onGameUpdate(
    socket: Socket,
    listener: (matrix: IPlayMatrix) => void
  ) {
    socket.on("on_game_update", ({ matrix }) => listener(matrix));
  }

  public async onStartGame(
    socket: Socket,
    listener: (options: IStartGame) => void
  ) {
    socket.on("start_game", listener);
  }

}

export default new GameService();
