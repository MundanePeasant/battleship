/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   landingDOM: () => (/* binding */ landingDOM),\n/* harmony export */   shipDOM: () => (/* binding */ shipDOM)\n/* harmony export */ });\n/* harmony import */ var _assets_navy_ship_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/navy-ship.png */ \"./src/assets/navy-ship.png\");\n\n\n//initializes the page with all the elements pre-interaction by the player\nconst landingDOM = function () {\n  const createPage = () => {\n    const div = document.createElement(\"div\");\n    div.classList.add(\"gameboard-container\", \"fullscreen\");\n    document.body.appendChild(div);\n    createChild(\"gameboard-container\", \"title\");\n    addLogo(\"title\");\n    addTitle(\"title\");\n    addLogo(\"title\", \"flip\");\n    createChild(\"gameboard-container\", \"computer\", \"board-container\");\n    createChild(\"gameboard-container\", \"player\", \"board-container\");\n    createChild(\"computer\", \"filler\", \"l\");\n    createChild(\"computer\", \"board\", \"c1\");\n    createChild(\"computer\", \"filler\", \"r\");\n    createChild(\"player\", \"filler\", \"l\");\n    createChild(\"player\", \"board\", \"p1\");\n    createChild(\"player\", \"filler\", \"ship-selector\");\n    draggableShips(\"ship-selector\");\n    createGrid(\"board\", \"c1\");\n    createGrid(\"board\", \"p1\");\n    shipTileSizer();\n    addAttackListener();\n  };\n  const createChild = (parentClass, ...ident) => {\n    const parent = document.querySelector(`.${parentClass}`);\n    const div = document.createElement(\"div\");\n    div.classList.add(...ident);\n    parent.appendChild(div);\n  };\n  const createGrid = (selector, second) => {\n    const container = document.querySelector(`.${selector}.${second}`);\n    for (let i = 0; i < 100; i += 1) {\n      const cell = document.createElement(\"div\");\n      cell.classList.add(\"tile\");\n      container.appendChild(cell);\n    }\n  };\n  const draggableShips = selector => {\n    const container = document.querySelector(`.${selector}`);\n    for (let i = 0; i < 5; i += 1) {\n      const ship = document.createElement(\"div\");\n      ship.id = i;\n      ship.classList.add(\"ship-drag\");\n      container.appendChild(ship);\n    }\n    const shipLength = [5, 4, 3, 3, 2];\n    for (let i = 0; i < shipLength.length; i += 1) {\n      const container = document.getElementById(`${i}`);\n      const shipHolder = document.createElement(\"div\");\n      shipHolder.classList.add(\"ship-holder\");\n      for (let x = 0; x < shipLength[i]; x += 1) {\n        const tile = document.createElement(\"div\");\n        tile.classList.add(\"ship-tile\");\n        shipHolder.appendChild(tile);\n      }\n      container.appendChild(shipHolder);\n    }\n  };\n  const initDragAndDropForShip = () => {\n    return new Promise((resolve, reject) => {\n      const ship = document.querySelectorAll(\".ship-holder\");\n      if (!ship) {\n        throw new Error(`No ship found at index ${shipIndex}`);\n      }\n      ship.forEach(ship => {\n        const id = ship.parentNode.id;\n        ship.setAttribute(\"draggable\", true);\n        ship.ondragstart = () => {\n          resolve(id);\n        };\n      });\n    });\n  };\n  const handleDropForShip = () => {\n    return new Promise((resolve, reject) => {\n      const tiles = document.querySelector(\".p1\").children;\n      for (let i = 0; i < tiles.length; i += 1) {\n        tiles[i].ondrop = event => {\n          event.preventDefault();\n          const row = Math.floor(i / 10);\n          const col = i % 10;\n          const output = [row, col];\n          resolve(output);\n        };\n        tiles[i].ondragover = event => {\n          event.preventDefault();\n        };\n      }\n    });\n  };\n  const awaitPlacement = async () => {\n    let index = await initDragAndDropForShip();\n    let cords = await handleDropForShip();\n    const place = [index, cords];\n    return place;\n  };\n  const placeShips = (promiseShip, shipObj) => {\n    const index = parseInt(shipObj[0]);\n    const x = shipObj[1][0];\n    const y = shipObj[1][1];\n    const updatedPromises = [...promiseShip];\n    updatedPromises[index] = [x, y];\n    return updatedPromises;\n  };\n  const shipTileSizer = () => {\n    let tile = document.querySelectorAll(\".tile\")[0];\n    let shipTile = document.querySelectorAll(\".ship-tile\");\n    let tileStyles = window.getComputedStyle(tile);\n    let tileSize = parseFloat(tileStyles.width);\n    shipTile.forEach(tile => {\n      tile.style.width = `${tileSize}px`;\n      tile.style.height = `${tileSize}px`;\n    });\n  };\n  const addAttackListener = () => {\n    return new Promise(resolve => {\n      const elements = document.querySelector(\".c1\").children;\n      for (let i = 0; i < elements.length; i += 1) {\n        elements[i].addEventListener(\"click\", () => {\n          let cords = [];\n          cords.push(Math.floor(i / 10));\n          cords.push(i % 10);\n          resolve(cords);\n        });\n      }\n    });\n  };\n  const awaitAttack = async () => {\n    let cords = await addAttackListener();\n    return cords;\n  };\n  const addLogo = (parentClass, orientation) => {\n    const parent = document.querySelector(`.${parentClass}`);\n    let img = document.createElement(\"img\");\n    img.src = _assets_navy_ship_png__WEBPACK_IMPORTED_MODULE_0__;\n    img.style.height = \"100%\";\n    img.alt = \"image of a navy battleship\";\n    if (orientation) {\n      img.style.transform = \"scaleX(-1)\";\n    }\n    parent.appendChild(img);\n  };\n  const addTitle = parentClass => {\n    const parent = document.querySelector(`.${parentClass}`);\n    let div = document.createElement(\"div\");\n    div.innerText = \"BATTLESHIP\";\n    div.classList.add(\"header\");\n    parent.appendChild(div);\n  };\n  return {\n    createPage,\n    awaitAttack,\n    awaitPlacement,\n    placeShips\n  };\n}();\nconst shipDOM = function () {\n  const placeShips = (playerType, gameboard) => {\n    //if player, then place the ships at the bottom\n    if (playerType === \"H\") {\n      const grid = document.querySelector(`.p1`).children;\n\n      //add the ship class to each location where a ship sits\n      for (let x = 0; x < 10; x += 1) {\n        for (let y = 0; y < 10; y += 1) {\n          if (gameboard.board[x][y] === 1) {\n            const index = x * 10 + y;\n            grid[index].classList.add(\"ship\");\n          }\n        }\n      }\n    }\n  };\n  const updateAttacks = (playerType, gameboard) => {\n    //update the board to show results of the attack\n    const grid = playerType === \"H\" ? document.querySelector(`.p1`).children : document.querySelector(`.c1`).children;\n    for (let x = 0; x < 10; x += 1) {\n      for (let y = 0; y < 10; y += 1) {\n        if (gameboard.board[x][y] === 3) {\n          const index = x * 10 + y;\n          grid[index].classList.add(\"miss\");\n        }\n        if (gameboard.board[x][y] === 2) {\n          const index = x * 10 + y;\n          grid[index].classList.add(\"hit\");\n        }\n      }\n    }\n  };\n  return {\n    placeShips,\n    updateAttacks\n  };\n}();\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nclass Gameboard {\n  constructor() {\n    this.ships = [new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(5), new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4), new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3), new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3), new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2)];\n    this.board = Array.from({\n      length: 10\n    }, () => Array(10).fill(0));\n    this.battleship = false; // true if all ships are sunk\n    this.placements = new Array(5); //where ships are placed on the board\n  }\n  receivePlacements(shipPlaces) {\n    for (let i = 0; i < shipPlaces.length; i += 1) {\n      if (shipPlaces[i]) {\n        const place = shipPlaces[i];\n        this.placements[i] = place;\n      }\n    }\n  }\n  generateComputerShips() {\n    let placements = [];\n    for (let i = 0; i < this.ships.length; i += 1) {\n      let empty = true;\n      while (empty) {\n        //1 means horizontal, 2 is vertical\n        const orient = Math.floor(Math.random() * 2) + 1;\n        let x = 0;\n        let y = 0;\n        let shipPlace = [];\n        if (orient == 1) {\n          x = Math.floor(Math.random() * 10);\n          y = Math.floor(Math.random() * (9 - this.ships[i].length + 1));\n          const cords = [];\n          for (let z = 0; z < this.ships[i].length; z += 1) {\n            cords.push([x, y + z]);\n          }\n          let exists = cords.some(cord => placements.some(placement => placement[0] === cord[0] && placement[1] === cord[1]));\n          if (!exists) {\n            placements = [...placements, ...cords];\n            this.ships[i].place(x, y, \"H\");\n            empty = false;\n          }\n        } else if (orient == 2) {\n          x = Math.floor(Math.random() * (9 - this.ships[i].length + 1));\n          y = Math.floor(Math.random() * 10);\n          const cords = [];\n          for (let z = 0; z < this.ships[i].length; z += 1) {\n            cords.push([x + z, y]);\n          }\n          let exists = cords.some(cord => placements.some(placement => placement[0] === cord[0] && placement[1] === cord[1]));\n          if (!exists) {\n            placements = [...placements, ...cords];\n            this.ships[i].place(x, y, \"V\");\n            empty = false;\n          }\n        }\n      }\n    }\n  }\n\n  //input the locations of ships on the board. Pre-determined for now\n  placeShips(playerType = \"H\") {\n    this.ships.forEach(ship => {\n      const loc = this.ships.indexOf(ship);\n      try {\n        ship.place(this.placements[loc][0], this.placements[loc][1]);\n      } catch (error) {\n        console.log(error);\n      }\n    });\n  }\n\n  //puts the Ship locations into the gameboard\n  //function is not correct, not putting the coordinates onto the board correctly\n  loadShips() {\n    this.ships.forEach(ship => {\n      ship.cords.forEach(cordinate => {\n        this.board[cordinate[0]][cordinate[1]] = 1;\n      });\n    });\n  }\n\n  // receiveAttack --> receives an attack as a pair of coordinates, updates the ship if hit, and reports whether\n  receiveAttack(x, y) {\n    const val = this.board[x][y];\n    if (x < 0 || y < 0 || x > 9 || y > 9) {\n      throw new Error(\"Place ship within the gameboard\");\n    }\n    let outcome = 0;\n    switch (val) {\n      case 1:\n        //case when a ship occupies the coordinate but not yet hit\n        //need to get the ship which occupies the coordinate and increment a hit\n        let ship = this.findShip(x, y);\n        ship.hit();\n        this.board[x][y] = 2;\n        outcome = 2;\n        break;\n      case 2:\n        //case when a ship occupies the coordinate and has already been hit\n        throw new Error(\"Coordinate already attacked\");\n      case 3:\n        //case when a ship doesn't occupy the coordinate and coordinate already received for attack\n        throw new Error(\"Coordinate already attacked\");\n      default:\n        this.board[x][y] = 3;\n        outcome = 3;\n    }\n    this.isBattleship();\n    return outcome;\n  }\n  findShip(x, y) {\n    let ship = this.ships.find(ship => ship.cords.some(coordinate => coordinate[0] === x && coordinate[1] === y));\n    return ship || null;\n  }\n\n  //returns number of ships sunk\n  countSunkShips() {\n    return this.ships.filter(ship => ship.sunk).length;\n  }\n\n  // isBattelship --> reports if all the ships have been sunk\n  isBattleship() {\n    if (!this.battleship) {\n      this.battleship = this.ships.every(value => value.isSunk() === true);\n    }\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\nconst player = new _player__WEBPACK_IMPORTED_MODULE_1__.Player();\nconst computer = new _player__WEBPACK_IMPORTED_MODULE_1__.Player(false, \"Computer\");\ncomputer.board.generateComputerShips();\ncomputer.board.loadShips();\n_dom__WEBPACK_IMPORTED_MODULE_2__.landingDOM.createPage();\nlet shipPlacement = new Array(5).fill(null);\nwhile (shipPlacement.includes(null)) {\n  console.log(\"inside the loop\");\n  const selectShips = await _dom__WEBPACK_IMPORTED_MODULE_2__.landingDOM.awaitPlacement();\n  shipPlacement = _dom__WEBPACK_IMPORTED_MODULE_2__.landingDOM.placeShips(shipPlacement, selectShips);\n  console.log(shipPlacement);\n  player.board.receivePlacements(shipPlacement);\n  player.board.placeShips();\n  player.board.loadShips();\n  _dom__WEBPACK_IMPORTED_MODULE_2__.shipDOM.placeShips(\"H\", player.board);\n}\n\n//change to !player.board.battlehsip and !computer.board.battleship when ready to implement correctly\nwhile (!player.board.battleship && !computer.board.battleship) {\n  console.log(\"runs loops\");\n  let skipIteration = false;\n  if (player.turn) {\n    //prompt the player on where to attack\n\n    //implement Promise function that awaits for an event listener (player clicking tile) to take place\n    console.log(\"waiting for player...\");\n    const cords = await _dom__WEBPACK_IMPORTED_MODULE_2__.landingDOM.awaitAttack();\n    //make the attack\n\n    try {\n      computer.board.receiveAttack(...cords);\n    } catch (error) {\n      console.error(\"Error\", error);\n      skipIteration = true;\n    }\n    if (!skipIteration) {\n      _dom__WEBPACK_IMPORTED_MODULE_2__.shipDOM.updateAttacks(\"C\", computer.board);\n      player.changeTurn();\n      computer.changeTurn();\n    }\n  }\n  if (computer.turn) {\n    console.log(\"computer turn\");\n    //calculate the next turn\n    const attackCords = computer.calcNextTurn(player.board.board);\n    //make the attack\n    const outcome = player.board.receiveAttack(...attackCords);\n    if (outcome === 2) {\n      computer.lastHit = computer.lastTurn;\n    }\n\n    //update the board\n    _dom__WEBPACK_IMPORTED_MODULE_2__.shipDOM.updateAttacks(\"H\", player.board);\n    //change turns to the player\n    computer.changeTurn();\n    player.changeTurn();\n  }\n}\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\nclass Player {\n  constructor(turn = true, type = \"Human\") {\n    this.type = type;\n    this.board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();\n    this.turn = turn;\n    this.lastTurn = null;\n    this.lastHit = null;\n    this.shipsSunk = 0;\n  }\n  changeTurn() {\n    this.turn = !this.turn;\n  }\n\n  //take in the enemy board and find locations of all 0s and 1s. randomly selects a location to fire on\n  calcNextTurn(board) {\n    const options = board.reduce((acc, row, rowIndex) => {\n      row.forEach((value, colIndex) => {\n        if (value === 0 || value === 1) {\n          acc.push({\n            row: rowIndex,\n            col: colIndex\n          });\n        }\n      });\n      return acc;\n    }, []);\n    if (this.lastHit != null) {\n      console.log(\"ONTO SOMETHING\");\n      //calculate what the 4 tiles closest are\n      console.log(this.lastHit);\n      let x = this.lastHit[0];\n      let y = this.lastHit[1];\n      //randomly select one of the four\n      let opt = Math.floor(Math.random() * 4);\n      const offsets = [[-1, 0], [1, 0], [0, -1], [0, 1]];\n      let coords = [x + offsets[opt][0], y + offsets[opt][1]];\n\n      //check to make sure the tile is available in options, if not, pick random\n      let match = options.some(option => {\n        return option.row === coords[0] && options.col === coords[1];\n      });\n      while (!match && opt < 6) {\n        opt++;\n        let newCoords = [x + offsets[opt % 3][0], y + offsets[opt % 3][1]];\n        match = options.some(option => {\n          return option.row === newCoords[0] && option.col === newCoords[1];\n        });\n        if (match) {\n          coords = newCoords;\n        }\n      }\n      if (match) {\n        this.lastTurn = coords;\n        return coords;\n      }\n    }\n    this.lastHit = null;\n    console.log(options);\n    const index = Math.floor(Math.random() * options.length);\n    let coord = [];\n    if (options.length > 0) {\n      console.log(index);\n      console.log(options[index][\"row\"]);\n      coord.push(options[index][\"row\"]);\n      coord.push(options[index][\"col\"]);\n    }\n    this.lastTurn = coord;\n    return coord;\n  }\n\n  //puts gameboard in state where it can be looked at by oppossing player\n  scrubBoard() {\n    return this.board.map(row => row.map(res => res === 1 ? 0 : res));\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = 0;\n    this.sunk = false;\n    this.cords = [];\n  }\n  hit() {\n    if (this.hits < this.length) {\n      this.hits += 1;\n    }\n    if (!this.sunk && this.length === this.hits) {\n      this.sunk = true;\n    }\n  }\n  isSunk() {\n    return this.sunk;\n  }\n\n  //configures the grid location of the ship\n  place(x, y, orientation = \"H\") {\n    if (x < 0 || y < 0 || x > 9 || y > 9 || orientation === \"V\" && x > 10 - this.length || orientation === \"H\" && y > 10 - this.length) {\n      throw new Error(\"Place ship within the gameboard\");\n    }\n    for (let i = 0; i < this.length; i += 1) {\n      if (orientation === \"H\") {\n        this.cords.push([x, y + i]);\n      } else {\n        this.cords.push([x + i, y]);\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/Bulletproof-w1nxx.ttf */ \"./src/assets/Bulletproof-w1nxx.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `:root {\n  --background-color: rgba(196, 209, 217);\n  --cerulean: rgba(0, 157, 219, 0.75);\n  --lochmara: rgba(0, 120, 189);\n  --water-leaf: rgba(169, 232, 234, 0.37);\n  --elephant: rgba(16, 43, 60);\n  --pickled-bluewood: rgba(45, 68, 83);\n  --shuttle-grey: rgba(93, 109, 126);\n}\n\n@font-face {\n  font-family: \"TopGun\";\n  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});\n  font-weight: 700;\n  font-style: normal;\n}\n\n.fullscreen {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: var(--background-color);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.title {\n  width: 50%;\n  height: 10%;\n  margin-top: 0.5%;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: flex-end;\n}\n\n.header {\n  font-family: \"TopGun\";\n  font-size: 64px;\n  margin-left: 3%;\n  margin-right: 3%;\n  color: var(--pickled-bluewood);\n}\n\n.board-container {\n  width: 75%;\n  height: 40%;\n  padding: 1%;\n  display: flex;\n  justify-content: space-evenly;\n}\n\n.board {\n  height: 100%;\n  aspect-ratio: 1 / 1;\n  background-color: var(--cerulean);\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.tile {\n  width: 100%;\n  height: 100%;\n  border: 1px solid var(--water-leaf);\n  box-sizing: border-box;\n  transition: transform 0.1s ease-in-out;\n}\n\n.tile:hover {\n  transform: scale(1.15);\n  border: none;\n}\n\n.ship {\n  background-color: var(--shuttle-grey);\n}\n\n.hit {\n  background-color: red;\n}\n\n.miss {\n  background-color: white;\n}\n\n.filler {\n  width: 30%;\n}\n\n.ship-selector {\n  display: flex;\n  flex-direction: column;\n}\n\n.ship-drag {\n  width: 100%;\n  height: 100%;\n}\n\n.ship-holder {\n  display: flex;\n  flex-direction: row;\n}\n\n.ship-tile {\n  background-color: var(--shuttle-grey);\n  border: 1px solid var(--water-leaf);\n  box-sizing: border-box;\n  transition: transform 0.1s ease-in-out;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/assets/Bulletproof-w1nxx.ttf":
/*!******************************************!*\
  !*** ./src/assets/Bulletproof-w1nxx.ttf ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"993ed292c39ad990f142.ttf\";\n\n//# sourceURL=webpack://battleship/./src/assets/Bulletproof-w1nxx.ttf?");

/***/ }),

/***/ "./src/assets/navy-ship.png":
/*!**********************************!*\
  !*** ./src/assets/navy-ship.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"ab34f024862426951e38.png\";\n\n//# sourceURL=webpack://battleship/./src/assets/navy-ship.png?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;