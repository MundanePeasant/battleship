export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.cords = [];
  }

  hit() {
    if (this.hits < this.length) {
      this.hits += 1;
    }
    if (!this.sunk && this.length === this.hits) {
      this.sunk = true;
    }
  }

  isSunk() {
    return this.sunk;
  }

  //configures the grid location of the ship
  place(x, y, orientation = "H") {
    if (
      x < 0 ||
      y < 0 ||
      x > 9 ||
      y > 9 ||
      (orientation === "H" && x > 10 - this.length) ||
      (orientation === "V" && y > 10 - this.length)
    ) {
      console.log(x);
      console.log(y);
      throw new Error("Place ship within the gameboard");
    }

    for (let i = 0; i < this.length; i += 1) {
      if (orientation === "H") {
        this.cords.push([x, y + i]);
      } else {
        this.cords.push([x + i, y]);
      }
    }
  }
}
