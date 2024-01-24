import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
    this.board = Array.from({ length: 10 }, () => Array(10).fill(0));
    this.battleship = false; // true if all ships are sunk
    this.placements = {}; // key:value pair of the ships and their locations
  }

  // update board --> takes coordinates and relays what happened while updating the board array

  // shows which ships the opponent has remaining

  //input the locations of ships on the board. Pre-determined for now
  placeShips() {
    const placements = [
      [0, 0, "H"],
      [6, 0, "V"],
      [8, 5, "V"],
      [2, 1, "H"],
      [6, 3, "H"],
    ];

    this.ships.forEach((ship) => {
      const loc = this.ships.indexOf(ship);
      ship.place(placements[loc][0], placements[loc][1], placements[loc][2]);
    });
  }

  //puts the Ship locations into the gameboard
  loadShips() {
    this.ships.forEach((ship) => {
      ship.cords.forEach((cordinate) => {
        this.board[cordinate[0]][cordinate[1]] = 1;
      });
    });
  }

  // receiveAttack --> receives an attack as a pair of coordinates, updates the ship if hit, and reports whether
  receiveAttack(x, y) {
    const val = this.board[x][y];
    return;
  }

  // isBattelship --> reports if all the ships have been sunk
  isBattleship() {
    if (!this.battleship) {
      this.battleship = this.ships.every((value) => value.isSunk() === true);
    }
    return this.battleship;
  }
}
