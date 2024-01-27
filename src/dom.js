//initializes the page with all the elements pre-interaction by the player
export const landingDOM = (function () {
  const createPage = () => {
    const div = document.createElement("div");
    div.classList.add("gameboard-container", "fullscreen");
    document.body.appendChild(div);

    createChild("gameboard-container", "title");
    createChild("gameboard-container", "computer", "board-container");
    createChild("gameboard-container", "player", "board-container");
    createChild("computer", "board", "c1");
    createChild("player", "board", "p1");
    createGrid("board", "c1");
    createGrid("board", "p1");
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

  return { createPage };
})();
