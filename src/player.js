import { Gameboard } from "./gameboard";

export class Player {
  constructor(type = "Human", turn = true) {
    this.type = type;
    this.board = new Gameboard();
    this.turn = turn;
    this.lastTurn = null;
    this.enemyBoard = null;
  }

  changeTurn() {
    this.turn = !this.turn;
  }

  calcNextTurn() {
    //pulls in last turn and either randomly attempts a sqaure or one close to the last hit if ship not sunk
  }

  scrubBoard() {
    //puts gameboard in state where it can be looked at by oppossing player
    let psuedo = this.board;
    return psuedo.map((row) => row.map((res) => (res === 1 ? 0 : res)));
  }
}
