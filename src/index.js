import "./style.css";
import { Player } from "./player";
import { landingDOM } from "./dom";

const player = new Player();
const computer = new Player(false, "Computer");

player.board.placeShips();
player.board.loadShips();
computer.board.placeShips();
computer.board.loadShips();

landingDOM.createPage();

while (!player.board.battleship || !computer.board.battleship) {
  if (player.turn) {
    //prompt the player on where to attack
    //make the attack
    //give player feedback on what happened
    //change turns to the computer
    player.changeTurn();
    computer.changeTurn();
  }
  if (computer.turn) {
    //calculate the next turn
    const attackCords = computer.calcNextTurn(player.board);
    //make the attack
    player.board.receiveAttack(...attackCords);
    //change turns to the player
    computer.changeTurn();
    player.changeTurn();
  }
}
