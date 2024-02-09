import navyShip from "./assets/navy-ship.png";

//initializes the page with all the elements pre-interaction by the player
export const landingDOM = (function () {
  const createPage = () => {
    const div = document.createElement("div");
    div.classList.add("gameboard-container", "fullscreen");
    document.body.appendChild(div);

    createChild("gameboard-container", "title");
    addLogo("title");
    addTitle("title");
    addLogo("title", "flip");
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
        const tile = document.createElement("div");
        tile.classList.add("ship-tile");
        shipHolder.appendChild(tile);
      }
      container.appendChild(shipHolder);
    }
  };

  const initDragAndDropForShip = () => {
    return new Promise((resolve, reject) => {
      const ship = document.querySelectorAll(".ship-holder");
      if (!ship) {
        throw new Error(`No ship found at index ${shipIndex}`);
      }

      ship.forEach((ship) => {
        const id = ship.parentNode.id;
        ship.setAttribute("draggable", true);
        ship.ondragstart = () => {
          resolve(id);
        };
      });
    });
  };

  const handleDropForShip = () => {
    return new Promise((resolve, reject) => {
      const tiles = document.querySelector(".p1").children;

      for (let i = 0; i < tiles.length; i += 1) {
        tiles[i].ondrop = (event) => {
          event.preventDefault();
          const row = Math.floor(i / 10);
          const col = i % 10;
          const output = [row, col];
          resolve(output);
        };
        tiles[i].ondragover = (event) => {
          event.preventDefault();
        };
      }
    });
  };

  const awaitPlacement = async () => {
    let index = await initDragAndDropForShip();
    let cords = await handleDropForShip();
    const place = [index, cords];
    return place;
  };

  const placeShips = (promiseShip, shipObj) => {
    const index = parseInt(shipObj[0]);
    const x = shipObj[1][0];
    const y = shipObj[1][1];

    const updatedPromises = [...promiseShip];

    updatedPromises[index] = [x, y];
    return updatedPromises;
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
    return cords;
  };

  const addLogo = (parentClass, orientation) => {
    const parent = document.querySelector(`.${parentClass}`);
    let img = document.createElement("img");

    img.src = navyShip;
    img.style.height = "100%";
    img.alt = "image of a navy battleship";

    if (orientation) {
      img.style.transform = "scaleX(-1)";
    }

    parent.appendChild(img);
  };

  const addTitle = (parentClass) => {
    const parent = document.querySelector(`.${parentClass}`);
    let div = document.createElement("div");

    div.innerText = "BATTLESHIP";
    div.classList.add("header");

    parent.appendChild(div);
  };

  return { createPage, awaitAttack, awaitPlacement, placeShips };
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
