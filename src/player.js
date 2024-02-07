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

    if (this.lastHit != null) {
      console.log("ONTO SOMETHING");
      //calculate what the 4 tiles closest are
      console.log(this.lastHit);
      let x = this.lastHit[0];
      let y = this.lastHit[1];
      //randomly select one of the four
      let opt = Math.floor(Math.random() * 4);

      const offsets = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];

      let coords = [x + offsets[opt][0], y + offsets[opt][1]];

      //check to make sure the tile is available in options, if not, pick random
      let match = options.some((option) => {
        return option.row === coords[0] && options.col === coords[1];
      });

      while (!match && opt < 6) {
        opt++;
        let newCoords = [x + offsets[opt % 3][0], y + offsets[opt % 3][1]];
        match = options.some((option) => {
          return option.row === newCoords[0] && option.col === newCoords[1];
        });

        if (match) {
          coords = newCoords;
        }
      }

      if (match) {
        return coords;
      }
    }

    this.lastHit = null;

    console.log(options);

    const index = Math.floor(Math.random() * options.length);
    let coord = [];
    if (options.length > 0) {
      console.log(index);
      console.log(options[index]["row"]);
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
