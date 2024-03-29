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
    for (let i = 0; i < shipPlaces.length; i += 1) {
      if (shipPlaces[i]) {
        const place = shipPlaces[i];
        this.placements[i] = place;
      }
    }
  }

  generateComputerShips() {
    let placements = [];

    for (let i = 0; i < this.ships.length; i += 1) {
      let empty = true;
      while (empty) {
        //1 means horizontal, 2 is vertical
        const orient = Math.floor(Math.random() * 2) + 1;
        let x = 0;
        let y = 0;
        let shipPlace = [];
        if (orient == 1) {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * (9 - this.ships[i].length + 1));
          const cords = [];
          for (let z = 0; z < this.ships[i].length; z += 1) {
            cords.push([x, y + z]);
          }
          let exists = cords.some((cord) =>
            placements.some(
              (placement) =>
                placement[0] === cord[0] && placement[1] === cord[1]
            )
          );
          if (!exists) {
            placements = [...placements, ...cords];
            this.ships[i].place(x, y, "H");
            empty = false;
          }
        } else if (orient == 2) {
          x = Math.floor(Math.random() * (9 - this.ships[i].length + 1));
          y = Math.floor(Math.random() * 10);
          const cords = [];
          for (let z = 0; z < this.ships[i].length; z += 1) {
            cords.push([x + z, y]);
          }
          let exists = cords.some((cord) =>
            placements.some(
              (placement) =>
                placement[0] === cord[0] && placement[1] === cord[1]
            )
          );
          if (!exists) {
            placements = [...placements, ...cords];
            this.ships[i].place(x, y, "V");
            empty = false;
          }
        }
      }
    }
  }

  //input the locations of ships on the board. Pre-determined for now
  placeShips(playerType = "H") {
    this.ships.forEach((ship) => {
      const loc = this.ships.indexOf(ship);

      try {
        ship.place(this.placements[loc][0], this.placements[loc][1]);
      } catch (error) {
        console.log(error);
      }
    });
  }

  //puts the Ship locations into the gameboard
  //function is not correct, not putting the coordinates onto the board correctly
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
    let outcome = 0;

    switch (val) {
      case 1: //case when a ship occupies the coordinate but not yet hit
        //need to get the ship which occupies the coordinate and increment a hit
        let ship = this.findShip(x, y);
        ship.hit();
        this.board[x][y] = 2;
        outcome = 2;
        break;
      case 2: //case when a ship occupies the coordinate and has already been hit
        throw new Error("Coordinate already attacked");
      case 3: //case when a ship doesn't occupy the coordinate and coordinate already received for attack
        throw new Error("Coordinate already attacked");
      default:
        this.board[x][y] = 3;
        outcome = 3;
    }
    this.isBattleship();
    return outcome;
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
