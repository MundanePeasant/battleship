import { Gameboard } from "../gameboard";

describe("Gameboard", () => {
  test("returns true when all ships are sunk", () => {
    const gameBoard = new Gameboard();

    gameBoard.ships.forEach((ship) => {
      for (let i = 0; i < ship.length; i += 1) {
        ship.hit();
      }
    });

    expect(gameBoard.isBattleship()).toBe(true);
  });
});
