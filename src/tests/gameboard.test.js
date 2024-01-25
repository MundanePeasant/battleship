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

  test("Ship placements are correctly loaded in", () => {
    const gameBoard = new Gameboard();
    gameBoard.placeShips();
    gameBoard.loadShips();

    expect(gameBoard.board[0][0]).toBe(1);
    expect(gameBoard.board[8][6]).toBe(1);
    expect(gameBoard.board[4][1]).toBe(1);
    expect(gameBoard.board[9][9]).toBe(0);
    expect(gameBoard.board[7][3]).toBe(1);
    expect(gameBoard.board[7][0]).toBe(0);
    expect(gameBoard.board[1][9]).toBe(0);
  });

  test("Gameboard correctly receives series of attacks", () => {
    const gameBoard = new Gameboard();
    gameBoard.placeShips();
    gameBoard.loadShips();

    gameBoard.receiveAttack(0, 0);
    let ship = gameBoard.ships[0];

    expect(ship.hits).toBe(1);
    expect(gameBoard.board[0][0]).toBe(2);

    expect(() =>
      gameBoard.receiveAttack(0, 0).toThrow("Coordinate already attacked")
    );

    expect(() =>
      gameBoard.receiveAttack(10, 0).toThrow("Place ship within the gameboard")
    );

    gameBoard.receiveAttack(7, 0);
    expect(ship.hits).toBe(1);
    expect(gameBoard.board[7][0]).toBe(3);
  });
});
