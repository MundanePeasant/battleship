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

  // keeps track if all the ships are sunk or not

  // shows which ships the opponent has remaining

  // receiveAttack --> receives an attack as a pair of coordinates, updates the ship if hit, and reports whether

  // isBattelship --> reports if all the ships have been sunk
  isBattleship() {
    if (!this.battleship) {
      this.battleship = this.ships.every((value) => value.isSunk() === true);
    }
    return this.battleship;
  }
}
