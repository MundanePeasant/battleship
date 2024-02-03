import "./style.css";
import { Player } from "./player";
import { landingDOM, shipDOM } from "./dom";

const player = new Player();
const computer = new Player(false, "Computer");

player.board.placeShips();
player.board.loadShips();
computer.board.placeShips();
computer.board.loadShips();

landingDOM.createPage();

//need to add code which awaits the players dropping all ships
/*const placements = await landingDOM.placeAllShips();
console.log("ships placed");
*/

const shipPlacement = Array.apply(null, Array(5)).map(function () {});

while (!shipPlacement.includes(null)) {
  const selectShips = await landingDOM.awaitPlacement();
  landingDOM.placeShips(selectShips[0], selectShips[1]);
}

console.log(selectShips);

shipDOM.placeShips("H", player.board);

//change to !player.board.battlehsip and !computer.board.battleship when ready to implement correctly
while (!player.board.battleship && !computer.board.battleship) {
  console.log("runs loops");
  if (player.turn) {
    //prompt the player on where to attack

    //implement Promise function that awaits for an event listener (player clicking tile) to take place
    console.log("waiting for player...");
    const cords = await landingDOM.awaitAttack();
    //make the attack
    computer.board.receiveAttack(...cords);
    //give player feedback on what happened
    //update the board to show what happened with the attack
    shipDOM.updateAttacks("C", computer.board);
    //change turns to the computer
    player.changeTurn();
    computer.changeTurn();
  }
  if (computer.turn) {
    console.log("computer turn");
    //calculate the next turn
    const attackCords = computer.calcNextTurn(player.board.board);
    //make the attack
    player.board.receiveAttack(...attackCords);
    //update the board
    shipDOM.updateAttacks("H", player.board);
    //change turns to the player
    computer.changeTurn();
    player.changeTurn();
  }
}
