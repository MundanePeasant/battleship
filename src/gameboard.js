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
    this.placements = new Array(5); //where ships are placed on the board
  }

  receivePlacements(shipPlaces) {
    //this.placements[parseInt(shipVal)] = [x, y, "H"];

    for (let i = 0; i < shipPlaces.length; i += 1) {
      //need to add ship orientation here!!!!
      const place = shipPlaces[i];
      place.push("H");
      this.placements[i] = place;
    }
  }

  //input the locations of ships on the board. Pre-determined for now
  placeShips(playerType = "H") {
    const placements = [
      [0, 0, "H"],
      [6, 0, "V"],
      [2, 7, "V"],
      [2, 1, "H"],
      [6, 3, "H"],
    ];

    if (playerType === "C") {
      this.placements = placements;
    }

    this.ships.forEach((ship) => {
      const loc = this.ships.indexOf(ship);
      ship.place(
        this.placements[loc][0],
        this.placements[loc][1],
        this.placements[loc][2]
      );
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
    if (x < 0 || y < 0 || x > 9 || y > 9) {
      throw new Error("Place ship within the gameboard");
    }

    switch (val) {
      case 1: //case when a ship occupies the coordinate but not yet hit
        //need to get the ship which occupies the coordinate and increment a hit
        let ship = this.findShip(x, y);
        ship.hit();
        this.board[x][y] = 2;
        break;
      case 2: //case when a ship occupies the coordinate and has already been hit
        throw new Error("Coordinate already attacked");
      case 3: //case when a ship doesn't occupy the coordinate and coordinate already received for attack
        throw new Error("Coordinate already attacked");
      default:
        this.board[x][y] = 3;
    }

    this.isBattleship();
  }

  findShip(x, y) {
    let ship = this.ships.find((ship) =>
      ship.cords.some(
        (coordinate) => coordinate[0] === x && coordinate[1] === y
      )
    );

    return ship || null;
  }

  //returns number of ships sunk
  countSunkShips() {
    return this.ships.filter((ship) => ship.sunk).length;
  }

  // isBattelship --> reports if all the ships have been sunk
  isBattleship() {
    if (!this.battleship) {
      this.battleship = this.ships.every((value) => value.isSunk() === true);
    }
  }
}
