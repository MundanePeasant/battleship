import { Ship } from "../ship";

describe("Ship", () => {
  test("Hit increments by 1", () => {
    const testShip = new Ship(3);
    testShip.hit();
    expect(testShip.hits).toBe(1);
  });

  test("Hits don't go over length", () => {
    const testShip = new Ship(1);
    testShip.hit();
    testShip.hit();
    expect(testShip.hits).toBe(1);
  });

  test("Ship not sunk", () => {
    const testShip = new Ship(3);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
  });

  test("Ship sunk", () => {
    const testShip = new Ship(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });

  test("Ship placed", () => {
    const testShip = new Ship(2);
    testShip.place(1, 5);
    expect(testShip.cords).toEqual([
      [1, 5],
      [2, 5],
    ]);
  });

  test("Ship Placed with Negative Values 1", () => {
    const testShip = new Ship(2);
    expect(() => testShip.place(1, -5)).toThrow(
      "Place ship within the gameboard"
    );
  });

  test("Ship Placed with Negative Values 2", () => {
    const testShip = new Ship(2);
    expect(() => testShip.place(1, 12)).toThrow(
      "Place ship within the gameboard"
    );
  });

  test("Ship Placed out of Range 1", () => {
    const testShip = new Ship(5);
    expect(() => testShip.place(6, 1, "H")).toThrow(
      "Place ship within the gameboard"
    );
  });

  test("Ship Placed out of Range 2", () => {
    const testShip = new Ship(5);
    expect(() => testShip.place(7, 6, "V")).toThrow(
      "Place ship within the gameboard"
    );
  });

  test("Ship Placed Correctly 2", () => {
    const testShip = new Ship(5);
    testShip.place(1, 3, "H");
    expect(testShip.cords).toEqual([
      [1, 3],
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
    ]);
  });

  test("Ship Placed Correctly 3", () => {
    const testShip = new Ship(2);
    testShip.place(1, 0, "V");
    expect(testShip.cords).toEqual([
      [1, 0],
      [1, 1],
    ]);
  });
});
