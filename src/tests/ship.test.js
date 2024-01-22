import { Ship } from "../ship";

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
