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

  place(x, y) {
    if (x < 0 || y < 0 || x > 10 || y > 10) {
      throw new Error("Place ship within the gameboard");
    }
    this.cords.push(x, y);
  }
}
