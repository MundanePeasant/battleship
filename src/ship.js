export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    if (this.hits < this.length) {
      this.hits += 1;
    }
  }

  isSunk() {
    if (!this.sunk && this.length === this.hits) {
      this.sunk = true;
    }
    return this.sunk;
  }
}
