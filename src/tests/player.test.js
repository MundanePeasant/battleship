import { Player } from "../player";

describe("Player", () => {
  test("Calculates Next Turn", () => {
    const testPlayer = new Player();

    const testBoard = [
      [1, 0, 3, 2],
      [3, 1, 1, 2],
    ];

    const result = testPlayer.calcNextTurn(testBoard);

    expect(result.length).toBe(2);

    expect([
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ]).toContainEqual(result);
  });
});
