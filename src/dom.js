//initializes the page with all the elements pre-interaction by the player
export const landingDOM = (function () {
  const createPage = () => {
    const div = document.createElement("div");
    div.classList.add("gameboard-container", "fullscreen");
    document.body.appendChild(div);

    createChild("gameboard-container", "title");
    createChild("gameboard-container", "computer", "board-container");
    createChild("gameboard-container", "player", "board-container");

    createChild("computer", "filler", "l");
    createChild("computer", "board", "c1");
    createChild("computer", "filler", "r");

    createChild("player", "filler", "l");
    createChild("player", "board", "p1");
    createChild("player", "filler", "ship-selector");
    draggableShips("ship-selector");

    createGrid("board", "c1");
    createGrid("board", "p1");

    shipTileSizer();
    addAttackListener();
  };

  const createChild = (parentClass, ...ident) => {
    const parent = document.querySelector(`.${parentClass}`);
    const div = document.createElement("div");
    div.classList.add(...ident);
    parent.appendChild(div);
  };

  const createGrid = (selector, second) => {
    const container = document.querySelector(`.${selector}.${second}`);

    for (let i = 0; i < 100; i += 1) {
      const cell = document.createElement("div");
      cell.classList.add("tile");
      container.appendChild(cell);
    }
  };

  const draggableShips = (selector) => {
    const container = document.querySelector(`.${selector}`);
    for (let i = 0; i < 5; i += 1) {
      const ship = document.createElement("div");
      ship.id = i;
      ship.classList.add("ship-drag");
      container.appendChild(ship);
    }
    const shipLength = [5, 4, 3, 3, 2];

    for (let i = 0; i < shipLength.length; i += 1) {
      const container = document.getElementById(`${i}`);
      const shipHolder = document.createElement("div");
      shipHolder.classList.add("ship-holder");

      for (let x = 0; x < shipLength[i]; x += 1) {
        console.log(shipLength[i]);
        const tile = document.createElement("div");
        tile.classList.add("ship-tile");
        shipHolder.appendChild(tile);
      }
      container.appendChild(shipHolder);
    }
  };

  const shipTileSizer = () => {
    let tile = document.querySelectorAll(".tile")[0];
    let shipTile = document.querySelectorAll(".ship-tile");

    let tileStyles = window.getComputedStyle(tile);
    let tileSize = parseFloat(tileStyles.width);

    shipTile.forEach((tile) => {
      tile.style.width = `${tileSize}px`;
      tile.style.height = `${tileSize}px`;
    });
  };

  const addAttackListener = () => {
    return new Promise((resolve) => {
      const elements = document.querySelector(".c1").children;
      console.log(elements);

      for (let i = 0; i < elements.length; i += 1) {
        elements[i].addEventListener("click", () => {
          let cords = [];

          cords.push(Math.floor(i / 10));
          cords.push(i % 10);

          resolve(cords);
        });
      }
    });
  };

  const awaitAttack = async () => {
    let cords = await addAttackListener();
    console.log(cords);
    return cords;
  };

  return { createPage, awaitAttack };
})();

export const shipDOM = (function () {
  const placeShips = (playerType, gameboard) => {
    //if player, then place the ships at the bottom
    if (playerType === "H") {
      const grid = document.querySelector(`.p1`).children;

      //add the ship class to each location where a ship sits
      for (let x = 0; x < 10; x += 1) {
        for (let y = 0; y < 10; y += 1) {
          if (gameboard.board[x][y] === 1) {
            const index = x * 10 + y;
            grid[index].classList.add("ship");
          }
        }
      }
    }
  };

  const updateAttacks = (playerType, gameboard) => {
    //update the board to show results of the attack
    const grid =
      playerType === "H"
        ? document.querySelector(`.p1`).children
        : document.querySelector(`.c1`).children;
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        if (gameboard.board[x][y] === 3) {
          const index = x * 10 + y;
          grid[index].classList.add("miss");
        }
        if (gameboard.board[x][y] === 2) {
          const index = x * 10 + y;
          grid[index].classList.add("hit");
        }
      }
    }
  };

  return { placeShips, updateAttacks };
})();
