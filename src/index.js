import "./style.css";
import { Player } from "./player";

const player = new Player();
const computer = new Player("Computer", false);

player.board.placeShips();
player.board.loadShips();
computer.board.placeShips();
computer.board.loadShips();

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
    //make the attack
    //change turns to the player
    computer.changeTurn();
    player.changeTurn();
  }
}
