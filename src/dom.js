//creates the skeleton for the boards to be placed in
export const landingDOM = (function () {
  const createPage = () => {
    const div = document.createElement("div");
    div.classList.add("gameboard-container", "fullscreen");
    document.body.appendChild(div);
  };

  return { createPage };
})();
