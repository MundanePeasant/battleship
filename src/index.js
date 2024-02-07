import "./style.css";
import { Player } from "./player";
import { landingDOM, shipDOM } from "./dom";

const player = new Player();
const computer = new Player(false, "Computer");

computer.board.generateComputerShips();
computer.board.loadShips();

landingDOM.createPage();

let shipPlacement = new Array(5).fill(null);

while (shipPlacement.includes(null)) {
  console.log("inside the loop");
  const selectShips = await landingDOM.awaitPlacement();
  shipPlacement = landingDOM.placeShips(shipPlacement, selectShips);

  console.log(shipPlacement);
  player.board.receivePlacements(shipPlacement);
  player.board.placeShips();
  player.board.loadShips();
  shipDOM.placeShips("H", player.board);
}

//change to !player.board.battlehsip and !computer.board.battleship when ready to implement correctly
while (!player.board.battleship && !computer.board.battleship) {
  console.log("runs loops");
  let skipIteration = false;

  if (player.turn) {
    //prompt the player on where to attack

    //implement Promise function that awaits for an event listener (player clicking tile) to take place
    console.log("waiting for player...");
    const cords = await landingDOM.awaitAttack();
    //make the attack

    try {
      computer.board.receiveAttack(...cords);
    } catch (error) {
      console.error("Error", error);
      skipIteration = true;
    }

    if (!skipIteration) {
      shipDOM.updateAttacks("C", computer.board);
      player.changeTurn();
      computer.changeTurn();
    }
  }
  if (computer.turn) {
    console.log("computer turn");
    //calculate the next turn
    const attackCords = computer.calcNextTurn(player.board.board);
    //make the attack
    const outcome = player.board.receiveAttack(...attackCords);

    if (outcome === 2) {
      computer.lastHit = computer.lastTurn;
    }

    //update the board
    shipDOM.updateAttacks("H", player.board);
    //change turns to the player
    computer.changeTurn();
    player.changeTurn();
  }
}
