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
shipDOM.placeShips("H", player.board);

//change to !player.board.battlehsip and !computer.board.battleship when ready to implement correctly
while (player.board.battleship || computer.board.battleship) {
  console.log("runs loops");
  if (player.turn) {
    //prompt the player on where to attack
    //make the attack
    //implement Promise function that awaits for an event listener (player clicking tile) to take place
    
    //give player feedback on what happened
    //change turns to the computer
    player.changeTurn();
    computer.changeTurn();
  }
  if (computer.turn) {
    //calculate the next turn
    const attackCords = computer.calcNextTurn(player.board.board);
    //make the attack
    player.board.receiveAttack(...attackCords);
    //change turns to the player
    computer.changeTurn();
    player.changeTurn();
  }
}
