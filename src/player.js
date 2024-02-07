import { Gameboard } from "./gameboard";

export class Player {
  constructor(turn = true, type = "Human") {
    this.type = type;
    this.board = new Gameboard();
    this.turn = turn;
    this.lastTurn = null;
    this.lastHit = null;
    this.shipsSunk = 0;
  }

  changeTurn() {
    this.turn = !this.turn;
  }

  //take in the enemy board and find locations of all 0s and 1s. randomly selects a location to fire on
  calcNextTurn(board) {
    const options = board.reduce((acc, row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value === 0 || value === 1) {
          acc.push({ row: rowIndex, col: colIndex });
        }
      });
      return acc;
    }, []);

    if (this.lastHit == this.lastTurn && this.lastHit != null) {
      console.log("ONTO SOMETHING");
      //calculate what the 4 tiles closest are
      console.log(this.lastHit);
      //randomly select one of the four
      //check to make sure the tile is available in options, if not, pick random
    }

    console.log(options);

    const index = Math.floor(Math.random() * options.length);
    let coord = [];
    if (options.length > 0) {
      coord.push(options[index]["row"]);
      coord.push(options[index]["col"]);
    }
    this.lastTurn = coord;
    return coord;
  }

  //puts gameboard in state where it can be looked at by oppossing player
  scrubBoard() {
    return this.board.map((row) => row.map((res) => (res === 1 ? 0 : res)));
  }
}
