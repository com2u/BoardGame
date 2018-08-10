/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Engine/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Engine/Services/GameStorage.ts":
/*!****************************************!*\
  !*** ./Engine/Services/GameStorage.ts ***!
  \****************************************/
/*! exports provided: GameStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameStorage\", function() { return GameStorage; });\n/* harmony import */ var _ParseGameJSON__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParseGameJSON */ \"./Engine/Services/ParseGameJSON.ts\");\n\r\nclass GameStorage {\r\n    constructor(localStorage) {\r\n        this.localStorage = localStorage;\r\n        this.storageKey = 'custom-games';\r\n        const loadedGames = JSON.parse(localStorage.get(this.storageKey) || '{}');\r\n        this.games =\r\n            Object\r\n                .keys(loadedGames)\r\n                .reduce((games, gameName) => {\r\n                const definition = loadedGames[gameName];\r\n                games[gameName] = Object.assign({}, definition, { config: Object(_ParseGameJSON__WEBPACK_IMPORTED_MODULE_0__[\"updateGameConfig\"])(definition.config) });\r\n                return games;\r\n            }, {});\r\n    }\r\n    hasGame(name) {\r\n        return this.getGame(name) != null;\r\n    }\r\n    getGame(name) {\r\n        return this.games[name];\r\n    }\r\n    addGame(name, definition) {\r\n        if (this.hasGame(name)) {\r\n            return {\r\n                status: 'error',\r\n                errors: [\r\n                    'Game with such name already exists'\r\n                ]\r\n            };\r\n        }\r\n        this.games[name] = definition;\r\n        this.localStorage.set(this.storageKey, JSON.stringify(this.games));\r\n        return {\r\n            status: 'ok'\r\n        };\r\n    }\r\n    getGameNames() {\r\n        return Object.keys(this.games);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Services/GameStorage.ts?");

/***/ }),

/***/ "./Engine/Services/LoadStaticGame.ts":
/*!*******************************************!*\
  !*** ./Engine/Services/LoadStaticGame.ts ***!
  \*******************************************/
/*! exports provided: loadStaticGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadStaticGame\", function() { return loadStaticGame; });\n/* harmony import */ var _ParseGameJSON__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParseGameJSON */ \"./Engine/Services/ParseGameJSON.ts\");\n\r\nfunction loadStaticGame(loader, folderName) {\r\n    return loader\r\n        .load(`Games/${folderName}/components.json`)\r\n        .then(result => {\r\n        return {\r\n            boardImageURL: `Games/${folderName}/board.png`,\r\n            componentsSpriteSheetURL: `Games/${folderName}/components.png`,\r\n            config: Object(_ParseGameJSON__WEBPACK_IMPORTED_MODULE_0__[\"parseGameJSON\"])(result)\r\n        };\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Services/LoadStaticGame.ts?");

/***/ }),

/***/ "./Engine/Services/LocalStorage.ts":
/*!*****************************************!*\
  !*** ./Engine/Services/LocalStorage.ts ***!
  \*****************************************/
/*! exports provided: LocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LocalStorage\", function() { return LocalStorage; });\nclass LocalStorage {\r\n    constructor(key) {\r\n        this.key = key;\r\n    }\r\n    get(key) {\r\n        return localStorage.getItem(this.getKey(key));\r\n    }\r\n    getKey(key) {\r\n        return `${this.key}_${key}`;\r\n    }\r\n    set(key, value) {\r\n        localStorage.setItem(this.getKey(key), value);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Services/LocalStorage.ts?");

/***/ }),

/***/ "./Engine/Services/ParseGameJSON.ts":
/*!******************************************!*\
  !*** ./Engine/Services/ParseGameJSON.ts ***!
  \******************************************/
/*! exports provided: parseGameJSON, updateGameConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseGameJSON\", function() { return parseGameJSON; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateGameConfig\", function() { return updateGameConfig; });\n/* harmony import */ var _update_game_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../update-game-json */ \"./Engine/update-game-json.ts\");\n\r\nfunction parseGameJSON(json) {\r\n    return updateGameConfig(JSON.parse(json));\r\n}\r\nfunction updateGameConfig(gameConfig) {\r\n    if (gameConfig.version == null) {\r\n        return Object(_update_game_json__WEBPACK_IMPORTED_MODULE_0__[\"updateGameStateFromV1ToV2\"])(Object(_update_game_json__WEBPACK_IMPORTED_MODULE_0__[\"updateGameStateFromV0ToV1\"])(gameConfig));\r\n    }\r\n    else if (gameConfig.version === '1') {\r\n        return Object(_update_game_json__WEBPACK_IMPORTED_MODULE_0__[\"updateGameStateFromV1ToV2\"])(gameConfig);\r\n    }\r\n    else if (gameConfig.version === '2') {\r\n        return gameConfig;\r\n    }\r\n    else {\r\n        throw new Error('Unsupported game config loaded');\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Services/ParseGameJSON.ts?");

/***/ }),

/***/ "./Engine/Views/Button.ts":
/*!********************************!*\
  !*** ./Engine/Views/Button.ts ***!
  \********************************/
/*! exports provided: ButtonView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ButtonView\", function() { return ButtonView; });\nclass ButtonView {\r\n    constructor(root, buttonLabel, onClick) {\r\n        this.root = root;\r\n        this.buttonLabel = buttonLabel;\r\n        this.onClick = onClick;\r\n        this.button = document.createElement('button');\r\n        this.button.innerHTML = buttonLabel;\r\n        this.button.addEventListener('click', this.onClick);\r\n        if (this.root != null) {\r\n            this.root.appendChild(this.button);\r\n        }\r\n    }\r\n    get element() {\r\n        return this.button;\r\n    }\r\n    destroy() {\r\n        if (this.root != null) {\r\n            this.root.removeChild(this.button);\r\n        }\r\n        this.button.removeEventListener('click', this.onClick);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/Button.ts?");

/***/ }),

/***/ "./Engine/Views/CheckBoxField.ts":
/*!***************************************!*\
  !*** ./Engine/Views/CheckBoxField.ts ***!
  \***************************************/
/*! exports provided: CheckBoxField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CheckBoxField\", function() { return CheckBoxField; });\nclass CheckBoxField {\r\n    constructor(root, labelText, onChange) {\r\n        this.root = root;\r\n        this.labelText = labelText;\r\n        this.onChange = onChange;\r\n        this.handleCheck = () => this.onChange(this.input.checked);\r\n        this.label = document.createElement('label');\r\n        this.input = document.createElement('input');\r\n        this.input.setAttribute('type', 'checkbox');\r\n        this.input.addEventListener('change', this.handleCheck);\r\n        this.label.innerText = labelText;\r\n        this.label.appendChild(this.input);\r\n        this.root.appendChild(this.label);\r\n    }\r\n    destroy() {\r\n        this.input.removeEventListener('change', this.handleCheck);\r\n        this.root.removeChild(this.label);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/CheckBoxField.ts?");

/***/ }),

/***/ "./Engine/Views/Container.ts":
/*!***********************************!*\
  !*** ./Engine/Views/Container.ts ***!
  \***********************************/
/*! exports provided: ContainerView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ContainerView\", function() { return ContainerView; });\n/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ \"./Engine/Views/CreateElement.ts\");\n\r\nclass ContainerView {\r\n    constructor(root, _content, className = null, eventListeners) {\r\n        this.root = root;\r\n        this._content = _content;\r\n        this.className = className;\r\n        this.eventListeners = eventListeners;\r\n        this.container = Object(_CreateElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('div', ['container-view', className]);\r\n        if (this.eventListeners != null) {\r\n            Object\r\n                .keys(this.eventListeners)\r\n                .forEach(eventName => this.container.addEventListener(eventName, this.eventListeners[eventName]));\r\n        }\r\n        Object.keys(_content).forEach(key => {\r\n            this.container.appendChild(_content[key].element);\r\n        });\r\n        if (this.root != null) {\r\n            this.root.appendChild(this.container);\r\n        }\r\n    }\r\n    get content() {\r\n        return this._content;\r\n    }\r\n    get element() {\r\n        return this.container;\r\n    }\r\n    destroy() {\r\n        if (this.eventListeners != null) {\r\n            Object\r\n                .keys(this.eventListeners)\r\n                .forEach(eventName => this.container.removeEventListener(eventName, this.eventListeners[eventName]));\r\n        }\r\n        Object.keys(this._content).forEach(key => {\r\n            this.container.removeChild(this._content[key].element);\r\n            this._content[key].destroy();\r\n        });\r\n        if (this.root != null && this.root.contains(this.container)) {\r\n            this.root.removeChild(this.container);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/Container.ts?");

/***/ }),

/***/ "./Engine/Views/CreateElement.ts":
/*!***************************************!*\
  !*** ./Engine/Views/CreateElement.ts ***!
  \***************************************/
/*! exports provided: createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\nfunction createElement(name, classes, style, attributes) {\r\n    const element = document.createElement(name);\r\n    if (classes != null) {\r\n        classes.forEach(className => {\r\n            if (className != null) {\r\n                element.classList.add(className);\r\n            }\r\n        });\r\n    }\r\n    if (style != null) {\r\n        Object.keys(style).forEach((property) => element.style[property] = style[property]);\r\n    }\r\n    if (attributes != null) {\r\n        Object.keys(attributes).forEach((property) => element.setAttribute(property, attributes[property]));\r\n    }\r\n    return element;\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/CreateElement.ts?");

/***/ }),

/***/ "./Engine/Views/FileInput.ts":
/*!***********************************!*\
  !*** ./Engine/Views/FileInput.ts ***!
  \***********************************/
/*! exports provided: FileInputView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FileInputView\", function() { return FileInputView; });\n/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ \"./Engine/Views/CreateElement.ts\");\n\r\nclass FileInputView {\r\n    constructor(onInput, extensions, className = null) {\r\n        this.onInput = onInput;\r\n        this.extensions = extensions;\r\n        this.className = className;\r\n        this.handleChange = () => {\r\n            this.onInput(this.input.files && this.input.files[0]);\r\n        };\r\n        this.input = Object(_CreateElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('input', ['file-input-view', this.className], {}, {\r\n            type: 'file',\r\n            accept: this.extensions\r\n        });\r\n        this.input.addEventListener('change', this.handleChange);\r\n    }\r\n    get value() {\r\n        return this.input.files && this.input.files[0];\r\n    }\r\n    get element() {\r\n        return this.input;\r\n    }\r\n    destroy() {\r\n        this.input.removeEventListener('change', this.handleChange);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/FileInput.ts?");

/***/ }),

/***/ "./Engine/Views/Game.ts":
/*!******************************!*\
  !*** ./Engine/Views/Game.ts ***!
  \******************************/
/*! exports provided: GameView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameView\", function() { return GameView; });\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./Engine/Views/Sprite.ts\");\n/* harmony import */ var _JSON__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JSON */ \"./Engine/Views/JSON.ts\");\n/* harmony import */ var _CheckBoxField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckBoxField */ \"./Engine/Views/CheckBoxField.ts\");\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Button */ \"./Engine/Views/Button.ts\");\n/* harmony import */ var _download_file__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../download-file */ \"./Engine/download-file.ts\");\n/* harmony import */ var _MovablePiece__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MovablePiece */ \"./Engine/Views/MovablePiece.ts\");\n/* harmony import */ var _MultiSidedSprite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MultiSidedSprite */ \"./Engine/Views/MultiSidedSprite.ts\");\n/* harmony import */ var _PieceContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PieceContainer */ \"./Engine/Views/PieceContainer.ts\");\n/* harmony import */ var _random_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../random-utils */ \"./Engine/random-utils.ts\");\n/* harmony import */ var _GameStateStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./GameStateStore */ \"./Engine/Views/GameStateStore.ts\");\n/* harmony import */ var _GameHistory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./GameHistory */ \"./Engine/Views/GameHistory.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass GameView {\r\n    constructor(gameDefinition, root) {\r\n        this.gameDefinition = gameDefinition;\r\n        this.root = root;\r\n        this.gameStateContainer = null;\r\n        this.pieces = [];\r\n        this.containers = [];\r\n        this.background = null;\r\n        this.gameConfig = null;\r\n        this.containerToPieceMap = new Map();\r\n        this.pieceToContainerMap = new Map();\r\n        this.board = document.createElement('div');\r\n        this.board.classList.add('game-view__board');\r\n        this.root.appendChild(this.board);\r\n        this.currentActorLabel = document.createElement('div');\r\n        this.currentActorLabel.classList.add('game-view__current-actor');\r\n        this.root.appendChild(this.currentActorLabel);\r\n        this.showJSONViewField = new _CheckBoxField__WEBPACK_IMPORTED_MODULE_2__[\"CheckBoxField\"](this.root, 'Show game state: ', showJSON => {\r\n            if (showJSON) {\r\n                this.root.classList.add('game-view--show-game-state-json');\r\n            }\r\n            else {\r\n                this.root.classList.remove('game-view--show-game-state-json');\r\n            }\r\n        });\r\n        this.JSONView = new _JSON__WEBPACK_IMPORTED_MODULE_1__[\"JSONView\"](root, {\r\n            version: '2',\r\n            sprites: {},\r\n            components: []\r\n        }, newConfig => {\r\n            this.gameConfig = newConfig;\r\n            if (this.gameStateContainer != null) {\r\n                this.gameStateContainer.addState(newConfig.components, 'changed_in_json_editor');\r\n            }\r\n        });\r\n        this.saveButton = new _Button__WEBPACK_IMPORTED_MODULE_3__[\"ButtonView\"](this.root, 'Save', () => Object(_download_file__WEBPACK_IMPORTED_MODULE_4__[\"downloadJsonFile\"])(`${'components'}.json`, JSON.stringify(this.gameConfig, null, 2)));\r\n        this.gameConfig = gameDefinition.config;\r\n        this.gameStateContainer = new _GameStateStore__WEBPACK_IMPORTED_MODULE_9__[\"GameStateContainer\"](gameDefinition.config.components);\r\n        this.gameStateContainer.state.map(components => {\r\n            this.updateComponentPositions(components);\r\n            if (this.gameConfig != null) {\r\n                this.JSONView.setValue(Object.assign({}, this.gameConfig, { components }));\r\n            }\r\n        });\r\n    }\r\n    updateComponentPositions(components) {\r\n        if (this.gameConfig == null) {\r\n            return;\r\n        }\r\n        const newConfig = Object.assign({}, this.gameConfig, { components });\r\n        this.JSONView.setValue(newConfig);\r\n        this.destroyBoard();\r\n        this.createBoard(newConfig);\r\n        this.updateItemsAssignedToContainers();\r\n    }\r\n    createBoard(config) {\r\n        if (this.gameStateContainer == null) {\r\n            return;\r\n        }\r\n        this.background = document.createElement('img');\r\n        this.background.src = this.gameDefinition.boardImageURL;\r\n        this.background.setAttribute('draggable', 'false');\r\n        this.board.appendChild(this.background);\r\n        this.historyView = new _GameHistory__WEBPACK_IMPORTED_MODULE_10__[\"GameHistoryView\"](this.gameStateContainer);\r\n        this.root.appendChild(this.historyView.element);\r\n        const sprites = config\r\n            .components\r\n            .filter(component => component.type == 'piece')\r\n            .map((c, index) => {\r\n            const piece = c;\r\n            const sprite = new _MultiSidedSprite__WEBPACK_IMPORTED_MODULE_6__[\"MultiSidedSpriteView\"](this.board, piece, config.sprites, this.gameDefinition.componentsSpriteSheetURL, piece.sides, piece.currentSide, () => {\r\n                const newCurrentSide = (piece.currentSide + 1) % piece.sides.length;\r\n                if (piece.currentSide !== newCurrentSide && this.gameStateContainer != null) {\r\n                    const newState = this.gameStateContainer.state.get().map(c => {\r\n                        if (c === piece) {\r\n                            return Object.assign({}, piece, { currentSide: newCurrentSide });\r\n                        }\r\n                        else {\r\n                            return c;\r\n                        }\r\n                    });\r\n                    this.gameStateContainer.addState(newState, 'flip_piece');\r\n                }\r\n            });\r\n            const pieceView = new _MovablePiece__WEBPACK_IMPORTED_MODULE_5__[\"MovablePieceView\"](this.board, `[${index}] ${piece.name}`, piece.location, sprite, newLocation => {\r\n                if (this.gameStateContainer != null) {\r\n                    this.gameStateContainer.movePiece(piece, newLocation);\r\n                }\r\n            }, piece => {\r\n                this.currentActorLabel.innerHTML = `Current component - ${piece.name}`;\r\n                this.bringToTop(piece);\r\n            }, 1);\r\n            return pieceView;\r\n        });\r\n        const pieceContainers = config\r\n            .components\r\n            .filter(c => c.type === 'container')\r\n            .map(c => {\r\n            const container = c;\r\n            const sprite = new _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"SpriteView\"](null, this.gameDefinition.componentsSpriteSheetURL, config.sprites[container.backgroundSprite], container.backgroundSprite);\r\n            const piece = new _MovablePiece__WEBPACK_IMPORTED_MODULE_5__[\"MovablePieceView\"](this.board, container.name, container.location, new _PieceContainer__WEBPACK_IMPORTED_MODULE_7__[\"PieceContainerView\"](this.board, sprite, container, 0, () => this.shufflePieces(piece), () => this.resetPieces(piece)), newLocation => {\r\n                if (this.gameStateContainer != null) {\r\n                    this.gameStateContainer.movePiece(container, newLocation);\r\n                }\r\n            }, () => { });\r\n            return piece;\r\n        });\r\n        this.containers.push(...pieceContainers);\r\n        this.pieces.push(...sprites);\r\n    }\r\n    updateItemsAssignedToContainers() {\r\n        this.containerToPieceMap = new Map();\r\n        this.pieces.forEach(piece => {\r\n            for (let container of this.containers) {\r\n                let assignedItems;\r\n                if (this.containerToPieceMap.has(container)) {\r\n                    assignedItems = this.containerToPieceMap.get(container);\r\n                }\r\n                else {\r\n                    assignedItems = [];\r\n                    this.containerToPieceMap.set(container, assignedItems);\r\n                }\r\n                if (this.pieceBelongsToContainer(container.content.containerComponent, piece.content.renderedObject)) {\r\n                    assignedItems.push(piece);\r\n                    this.pieceToContainerMap.set(piece, container);\r\n                }\r\n            }\r\n        });\r\n        this.containers.forEach(c => {\r\n            const items = this.containerToPieceMap.get(c);\r\n            if (items == null) {\r\n                throw new Error('Items were not assigned for container');\r\n            }\r\n            c.content.itemsCount = items.length;\r\n        });\r\n    }\r\n    pieceBelongsToContainer(container, piece) {\r\n        if (this.gameConfig == null) {\r\n            throw new Error('Game state is not initialized');\r\n        }\r\n        const containerSprite = this.gameConfig.sprites[container.backgroundSprite];\r\n        const position = piece.location.position;\r\n        return (position.x >= (container.location.position.x - containerSprite.width / 2) &&\r\n            position.x <= (container.location.position.x + containerSprite.width / 2) &&\r\n            position.y >= (container.location.position.y - containerSprite.height / 2) &&\r\n            position.y <= (container.location.position.y + containerSprite.height / 2));\r\n    }\r\n    resetPieces(container) {\r\n        if (this.gameStateContainer == null) {\r\n            return;\r\n        }\r\n        const newState = this.gameStateContainer.state.get().map(c => {\r\n            if (c.category === container.content.containerComponent.category) {\r\n                const newLocation = {\r\n                    rotation: container.location.rotation,\r\n                    position: Object.assign({}, container.location.position, { z: Math.max(c.location.position.z, container.location.position.z + 1) })\r\n                };\r\n                return Object.assign({}, c, { location: newLocation });\r\n            }\r\n            else {\r\n                return c;\r\n            }\r\n        });\r\n        this.gameStateContainer.addState(newState, 'move_pieces_to_container');\r\n    }\r\n    shufflePieces(container) {\r\n        if (this.gameStateContainer == null) {\r\n            return;\r\n        }\r\n        const items = this.containerToPieceMap.get(container);\r\n        if (items == null) {\r\n            throw new Error('Items were not assigned to the container');\r\n        }\r\n        const shuffled = Object(_random_utils__WEBPACK_IMPORTED_MODULE_8__[\"shuffle\"])(items);\r\n        const map = shuffled.reduce((map, item, index) => {\r\n            map.set(item.content.renderedObject, index);\r\n            return map;\r\n        }, new Map());\r\n        const newState = this.gameStateContainer.state.get().map(c => {\r\n            const shuffledItemIndex = map.get(c);\r\n            if (shuffledItemIndex == null) {\r\n                return c;\r\n            }\r\n            return Object.assign({}, c, { location: Object.assign({}, c.location, { position: Object.assign({}, c.location.position, { z: shuffledItemIndex + container.location.position.z + 1 }) }) });\r\n        });\r\n        this.gameStateContainer.addState(newState, 'shuffle_pieces');\r\n        // shuffled.forEach((item, index) => item.setLocation({\r\n        //   rotation: item.location.rotation,\r\n        //   position: {\r\n        //     ...item.location.position,\r\n        //     z: index + container.location.position.z + 1\r\n        //   }\r\n        // }))\r\n        // this.updateJSONView()\r\n        // this.updateItemsAssignedToContainers()\r\n    }\r\n    bringToTop(piece) {\r\n        this\r\n            .pieces\r\n            .sort((elementA, elementB) => {\r\n            const a = elementA.location.position;\r\n            const b = elementB.location.position;\r\n            if (a.z > b.z) {\r\n                return 1;\r\n            }\r\n            if (a.z < b.z) {\r\n                return -1;\r\n            }\r\n            return 0;\r\n        })\r\n            .forEach((element, index) => {\r\n            const newLocation = {\r\n                position: Object.assign({}, element.location.position, { z: index }),\r\n                rotation: element.location.rotation\r\n            };\r\n            element.setLocation(newLocation);\r\n        });\r\n        piece.setLocation({\r\n            rotation: piece.location.rotation,\r\n            position: Object.assign({}, piece.location.position, { z: this.pieces.length })\r\n        });\r\n    }\r\n    destroy() {\r\n        this.JSONView.destroy();\r\n        this.showJSONViewField.destroy();\r\n        this.saveButton.destroy();\r\n        this.root.removeChild(this.board);\r\n        this.root.removeChild(this.currentActorLabel);\r\n        this.destroyBoard();\r\n    }\r\n    destroyBoard() {\r\n        if (this.background != null) {\r\n            this.board.removeChild(this.background);\r\n        }\r\n        if (this.historyView != null) {\r\n            this.root.removeChild(this.historyView.element);\r\n            this.historyView.destroy();\r\n        }\r\n        // this.root.removeChild(this.board)\r\n        this.pieces.forEach(element => element.destroy());\r\n        this.containers.forEach(container => container.destroy());\r\n        this.pieces = [];\r\n        this.containers = [];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/Game.ts?");

/***/ }),

/***/ "./Engine/Views/GameHistory.ts":
/*!*************************************!*\
  !*** ./Engine/Views/GameHistory.ts ***!
  \*************************************/
/*! exports provided: GameHistoryView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameHistoryView\", function() { return GameHistoryView; });\n/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container */ \"./Engine/Views/Container.ts\");\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button */ \"./Engine/Views/Button.ts\");\n/* harmony import */ var _Label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Label */ \"./Engine/Views/Label.ts\");\n/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./List */ \"./Engine/Views/List.ts\");\n\r\n\r\n\r\n\r\nclass GameHistoryView {\r\n    constructor(gameStateContainer) {\r\n        this.gameStateContainer = gameStateContainer;\r\n        this.undoButton = new _Button__WEBPACK_IMPORTED_MODULE_1__[\"ButtonView\"](null, 'Undo', () => this.gameStateContainer.unwindHistory());\r\n        this.view = new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](null, {\r\n            countLabel: new _Label__WEBPACK_IMPORTED_MODULE_2__[\"LabelView\"]('', 'game-history-view--items-count-label'),\r\n            historyItemsList: new _List__WEBPACK_IMPORTED_MODULE_3__[\"ListView\"](this.gameStateContainer.history, item => {\r\n                return new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](null, {\r\n                    name: new _Label__WEBPACK_IMPORTED_MODULE_2__[\"LabelView\"](item.action, 'history-list__item__name'),\r\n                    time: new _Label__WEBPACK_IMPORTED_MODULE_2__[\"LabelView\"](item.time.toLocaleTimeString(), 'history-list__item__time')\r\n                }, 'history-list__item');\r\n            }, 'history-list'),\r\n            controls: new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](null, {\r\n                undoButton: this.undoButton\r\n            })\r\n        });\r\n        gameStateContainer.history.itemAdded.subscribe(() => this.handleCountUpdate());\r\n        gameStateContainer.history.itemRemoved.subscribe(() => this.handleCountUpdate());\r\n        this.handleCountUpdate();\r\n    }\r\n    handleCountUpdate() {\r\n        const count = this.gameStateContainer.history.items.length;\r\n        const label = count === 0\r\n            ? 'History is empty'\r\n            : `Items in history: ${count}`;\r\n        this.view.content.countLabel.text = label;\r\n        this.undoButton.element.disabled = count === 0;\r\n    }\r\n    get element() {\r\n        return this.view.element;\r\n    }\r\n    destroy() {\r\n        this.view.destroy();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/GameHistory.ts?");

/***/ }),

/***/ "./Engine/Views/GameSelection.ts":
/*!***************************************!*\
  !*** ./Engine/Views/GameSelection.ts ***!
  \***************************************/
/*! exports provided: GameSelectionView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameSelectionView\", function() { return GameSelectionView; });\nclass GameSelectionView {\r\n    constructor(root, games, onSelect) {\r\n        this.root = root;\r\n        this.games = games;\r\n        this.onSelect = onSelect;\r\n        this.changeListener = () => {\r\n            if (this.select.value !== '') {\r\n                console.log('value changed to ', this.select.value);\r\n                this.onSelect(this.select.value);\r\n            }\r\n        };\r\n        this.select = document.createElement('select');\r\n        this.render();\r\n        this.select.addEventListener('change', this.changeListener);\r\n        root.appendChild(this.select);\r\n    }\r\n    set options(options) {\r\n        this.games = options;\r\n        this.render();\r\n    }\r\n    set value(v) {\r\n        this.select.value = v;\r\n    }\r\n    get value() {\r\n        return this.select.value;\r\n    }\r\n    render() {\r\n        while (this.select.children.length) {\r\n            this.select.removeChild(this.select.firstChild);\r\n        }\r\n        this.games.forEach(game => {\r\n            const option = document.createElement('option');\r\n            option.value = game;\r\n            option.innerText = game;\r\n            this.select.appendChild(option);\r\n        });\r\n    }\r\n    destroy() {\r\n        this.select.removeEventListener('change', this.changeListener);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/GameSelection.ts?");

/***/ }),

/***/ "./Engine/Views/GameStateStore.ts":
/*!****************************************!*\
  !*** ./Engine/Views/GameStateStore.ts ***!
  \****************************************/
/*! exports provided: GameStateContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameStateContainer\", function() { return GameStateContainer; });\n/* harmony import */ var _reaction_framework_observable_variable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../reaction-framework/observable-variable */ \"./reaction-framework/observable-variable.ts\");\n/* harmony import */ var _reaction_framework_observable_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reaction-framework/observable-array */ \"./reaction-framework/observable-array.ts\");\n\r\n\r\nclass GameStateContainer {\r\n    constructor(initialState) {\r\n        this.initialState = initialState;\r\n        this._history = new _reaction_framework_observable_array__WEBPACK_IMPORTED_MODULE_1__[\"ObservableArray\"]([]);\r\n        this.history = this._history;\r\n        this.currentState = new _reaction_framework_observable_variable__WEBPACK_IMPORTED_MODULE_0__[\"Variable\"](this.initialState);\r\n        this.state = this.currentState;\r\n    }\r\n    addState(state, action) {\r\n        this._history.add({\r\n            action,\r\n            time: new Date(),\r\n            state\r\n        });\r\n        console.log('setting state');\r\n        this.currentState.set(state);\r\n        console.log('state set');\r\n    }\r\n    unwindHistory() {\r\n        const snapshot = this._history.pop();\r\n        if (snapshot == null) {\r\n            throw new Error('History is empty');\r\n        }\r\n        else {\r\n            const lastHistoryItem = this._history.items[this._history.items.length - 1];\r\n            const newState = (lastHistoryItem && lastHistoryItem.state) || this.initialState;\r\n            this.currentState.set(newState);\r\n            return snapshot;\r\n        }\r\n    }\r\n    movePiece(piece, newLocation) {\r\n        this.addState(this.state.get()\r\n            .map(c => c === piece\r\n            ? Object.assign({}, piece, { location: newLocation }) : c), 'move_piece');\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/GameStateStore.ts?");

/***/ }),

/***/ "./Engine/Views/GameUpload.ts":
/*!************************************!*\
  !*** ./Engine/Views/GameUpload.ts ***!
  \************************************/
/*! exports provided: GameUploadView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameUploadView\", function() { return GameUploadView; });\n/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container */ \"./Engine/Views/Container.ts\");\n/* harmony import */ var _Label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Label */ \"./Engine/Views/Label.ts\");\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button */ \"./Engine/Views/Button.ts\");\n/* harmony import */ var _FileInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FileInput */ \"./Engine/Views/FileInput.ts\");\n/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InputField */ \"./Engine/Views/InputField.ts\");\n/* harmony import */ var _Services_ParseGameJSON__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Services/ParseGameJSON */ \"./Engine/Services/ParseGameJSON.ts\");\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Input */ \"./Engine/Views/Input.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst imageExtensions = [\r\n    '.png',\r\n    '.jpg',\r\n    '.gif',\r\n].join();\r\nclass GameUploadView {\r\n    constructor(onGameSubmit) {\r\n        this.onGameSubmit = onGameSubmit;\r\n        this.handleFormUpdate = () => {\r\n            const form = this.container.content.form.content;\r\n            const name = form.name.input.content.input.value;\r\n            const boardImage = form.boardImage.input.value;\r\n            const componentsSpriteSheet = form.componentsSpriteSheet.input.value;\r\n            const gameConfig = form.gameConfig.input.value;\r\n            if (boardImage != null && componentsSpriteSheet != null && gameConfig != null && name != null) {\r\n                Promise\r\n                    .all([\r\n                    fileToDataURL(boardImage),\r\n                    fileToDataURL(componentsSpriteSheet),\r\n                    fileToText(gameConfig)\r\n                ])\r\n                    .then(([boardImageURL, componentsSpriteSheetURL, gameConfig]) => {\r\n                    this.gameDefinition = {\r\n                        boardImageURL,\r\n                        componentsSpriteSheetURL,\r\n                        config: Object(_Services_ParseGameJSON__WEBPACK_IMPORTED_MODULE_5__[\"parseGameJSON\"])(gameConfig)\r\n                    };\r\n                    this.container.content.form.content.footer.content.submit.element.disabled = false;\r\n                })\r\n                    .catch(() => {\r\n                    this.gameDefinition = null;\r\n                    this.container.content.form.content.footer.content.submit.element.disabled = true;\r\n                });\r\n            }\r\n            else {\r\n                this.container.content.form.content.footer.content.submit.element.disabled = true;\r\n            }\r\n        };\r\n        this.gameDefinition = null;\r\n        this.handleSubmit = () => {\r\n            const form = this.container.content.form.content;\r\n            const name = form.name.input.content.input.value;\r\n            if (this.gameDefinition != null && name != null) {\r\n                const response = this.onGameSubmit(name, this.gameDefinition);\r\n                if (response.status == 'error') {\r\n                    form.footer.content.errors.text = response.errors.join('\\n');\r\n                }\r\n                else {\r\n                    form.footer.content.errors.text = '';\r\n                }\r\n            }\r\n        };\r\n        this.container = new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](null, {\r\n            header: new _Label__WEBPACK_IMPORTED_MODULE_1__[\"LabelView\"]('Upload game files', 'game-upload-view__header'),\r\n            form: new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](null, {\r\n                name: new _InputField__WEBPACK_IMPORTED_MODULE_4__[\"InputField\"]('Name', new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](null, {\r\n                    input: new _Input__WEBPACK_IMPORTED_MODULE_6__[\"InputView\"](this.handleFormUpdate)\r\n                })),\r\n                boardImage: new _InputField__WEBPACK_IMPORTED_MODULE_4__[\"InputField\"]('boardImage', new _FileInput__WEBPACK_IMPORTED_MODULE_3__[\"FileInputView\"](this.handleFormUpdate, imageExtensions)),\r\n                componentsSpriteSheet: new _InputField__WEBPACK_IMPORTED_MODULE_4__[\"InputField\"]('componentsSpriteSheet', new _FileInput__WEBPACK_IMPORTED_MODULE_3__[\"FileInputView\"](this.handleFormUpdate, imageExtensions)),\r\n                gameConfig: new _InputField__WEBPACK_IMPORTED_MODULE_4__[\"InputField\"]('gameConfig', new _FileInput__WEBPACK_IMPORTED_MODULE_3__[\"FileInputView\"](this.handleFormUpdate, '.json')),\r\n                footer: new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](null, {\r\n                    errors: new _Label__WEBPACK_IMPORTED_MODULE_1__[\"LabelView\"]('', 'game-upload-view__errors'),\r\n                    submit: new _Button__WEBPACK_IMPORTED_MODULE_2__[\"ButtonView\"](null, 'submit', this.handleSubmit)\r\n                }, 'game-upload-view__footer')\r\n            }, 'game-upload-view__form')\r\n        }, 'game-upload-view');\r\n        this.handleFormUpdate();\r\n    }\r\n    get element() {\r\n        return this.container.element;\r\n    }\r\n    destroy() {\r\n    }\r\n}\r\nfunction fileToDataURL(file) {\r\n    const reader = new FileReader();\r\n    return new Promise((resolve, reject) => {\r\n        reader.onload = () => resolve(reader.result);\r\n        reader.onerror = () => reject(reader.error);\r\n        reader.readAsDataURL(file);\r\n    });\r\n}\r\nfunction fileToText(file) {\r\n    const reader = new FileReader();\r\n    return new Promise((resolve, reject) => {\r\n        reader.onload = () => resolve(reader.result);\r\n        reader.onerror = () => reject(reader.error);\r\n        reader.readAsText(file);\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/GameUpload.ts?");

/***/ }),

/***/ "./Engine/Views/Input.ts":
/*!*******************************!*\
  !*** ./Engine/Views/Input.ts ***!
  \*******************************/
/*! exports provided: InputView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InputView\", function() { return InputView; });\n/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ \"./Engine/Views/CreateElement.ts\");\n\r\nclass InputView {\r\n    constructor(onChange, className = null) {\r\n        this.onChange = onChange;\r\n        this.className = className;\r\n        this.input = Object(_CreateElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('input', ['input-view', this.className], {}, {\r\n            type: 'text'\r\n        });\r\n        this.handleChange = () => this.onChange(this.input.value);\r\n        this.input.addEventListener('change', this.handleChange);\r\n    }\r\n    get value() {\r\n        return this.input.value == '' ? null : this.input.value;\r\n    }\r\n    set value(value) {\r\n        this.input.value = value == null ? '' : value;\r\n    }\r\n    get element() {\r\n        return this.input;\r\n    }\r\n    destroy() {\r\n        this.input.removeEventListener('change', this.handleChange);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/Input.ts?");

/***/ }),

/***/ "./Engine/Views/InputField.ts":
/*!************************************!*\
  !*** ./Engine/Views/InputField.ts ***!
  \************************************/
/*! exports provided: InputField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InputField\", function() { return InputField; });\n/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ \"./Engine/Views/CreateElement.ts\");\n\r\nclass InputField {\r\n    constructor(label, inputView, className = null) {\r\n        this.label = label;\r\n        this.inputView = inputView;\r\n        this.className = className;\r\n        this.text = Object(_CreateElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('span', ['input-field-view__label']);\r\n        this.labelElement = Object(_CreateElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('label', ['input-field-view', this.className]);\r\n        this.text.innerHTML = this.label;\r\n        this.labelElement.appendChild(this.text);\r\n        this.labelElement.appendChild(this.inputView.element);\r\n    }\r\n    get input() {\r\n        return this.inputView;\r\n    }\r\n    get element() {\r\n        return this.labelElement;\r\n    }\r\n    destroy() {\r\n        this.labelElement.removeChild(this.text);\r\n        this.labelElement.removeChild(this.inputView.element);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/InputField.ts?");

/***/ }),

/***/ "./Engine/Views/JSON.ts":
/*!******************************!*\
  !*** ./Engine/Views/JSON.ts ***!
  \******************************/
/*! exports provided: JSONView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"JSONView\", function() { return JSONView; });\nclass JSONView {\r\n    constructor(root, value, onInput) {\r\n        this.root = root;\r\n        this.onInput = onInput;\r\n        this.handleInput = () => {\r\n            try {\r\n                this.onInput(JSON.parse(this.input.value || ''));\r\n            }\r\n            catch (e) {\r\n                console.log(e);\r\n            }\r\n        };\r\n        this.input = document.createElement('textarea');\r\n        this.input.addEventListener('keyup', this.handleInput);\r\n        this.setValue(value);\r\n        this.root.appendChild(this.input);\r\n    }\r\n    setValue(value) {\r\n        this.input.value = JSON.stringify(value, null, 2);\r\n    }\r\n    destroy() {\r\n        this.input.removeEventListener('keyup', this.handleInput);\r\n        this.root.removeChild(this.input);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/JSON.ts?");

/***/ }),

/***/ "./Engine/Views/Label.ts":
/*!*******************************!*\
  !*** ./Engine/Views/Label.ts ***!
  \*******************************/
/*! exports provided: LabelView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LabelView\", function() { return LabelView; });\n/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ \"./Engine/Views/CreateElement.ts\");\n\r\nclass LabelView {\r\n    constructor(_text, className) {\r\n        this._text = _text;\r\n        this.className = className;\r\n        this._element = Object(_CreateElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('div', [this.className]);\r\n        this.text = _text;\r\n    }\r\n    set text(newValue) {\r\n        this._text = newValue;\r\n        this._element.innerHTML = newValue;\r\n    }\r\n    get text() {\r\n        return this._text;\r\n    }\r\n    get element() {\r\n        return this._element;\r\n    }\r\n    destroy() {\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/Label.ts?");

/***/ }),

/***/ "./Engine/Views/List.ts":
/*!******************************!*\
  !*** ./Engine/Views/List.ts ***!
  \******************************/
/*! exports provided: ListView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ListView\", function() { return ListView; });\n/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ \"./Engine/Views/CreateElement.ts\");\n\r\nclass ListView {\r\n    constructor(array, itemRenderer, className = null) {\r\n        this.array = array;\r\n        this.itemRenderer = itemRenderer;\r\n        this.className = className;\r\n        this.renderedViews = [];\r\n        this.container = Object(_CreateElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('div', ['list-view', this.className]);\r\n        array.itemAdded.subscribe(() => this.redraw());\r\n        array.itemRemoved.subscribe(() => this.redraw());\r\n        this.redraw();\r\n    }\r\n    redraw() {\r\n        this.destroy();\r\n        this.array.items.forEach(item => {\r\n            const view = this.itemRenderer(item);\r\n            this.container.appendChild(view.element);\r\n            this.renderedViews.push(view);\r\n        });\r\n    }\r\n    get element() {\r\n        return this.container;\r\n    }\r\n    destroy() {\r\n        let child;\r\n        while (child = this.container.firstChild) {\r\n            this.container.removeChild(child);\r\n        }\r\n        this.renderedViews.forEach(v => v.destroy());\r\n        this.renderedViews = [];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/List.ts?");

/***/ }),

/***/ "./Engine/Views/Main.ts":
/*!******************************!*\
  !*** ./Engine/Views/Main.ts ***!
  \******************************/
/*! exports provided: MainView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MainView\", function() { return MainView; });\n/* harmony import */ var _GameSelection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameSelection */ \"./Engine/Views/GameSelection.ts\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game */ \"./Engine/Views/Game.ts\");\n/* harmony import */ var _GameUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameUpload */ \"./Engine/Views/GameUpload.ts\");\n/* harmony import */ var _Services_LoadStaticGame__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Services/LoadStaticGame */ \"./Engine/Services/LoadStaticGame.ts\");\n/* harmony import */ var _Services_LocalStorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Services/LocalStorage */ \"./Engine/Services/LocalStorage.ts\");\n/* harmony import */ var _Services_GameStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Services/GameStorage */ \"./Engine/Services/GameStorage.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass MainView {\r\n    constructor(loader, root) {\r\n        this.loader = loader;\r\n        this.root = root;\r\n        this.Game = null;\r\n        const menuElement = document.createElement('div');\r\n        menuElement.classList.add('main-menu');\r\n        root.appendChild(menuElement);\r\n        this.gameElement = document.createElement('div');\r\n        this.gameElement.classList.add('game-view');\r\n        root.appendChild(this.gameElement);\r\n        const localStorage = new _Services_LocalStorage__WEBPACK_IMPORTED_MODULE_4__[\"LocalStorage\"]('board-game');\r\n        this.gamesStorage = new _Services_GameStorage__WEBPACK_IMPORTED_MODULE_5__[\"GameStorage\"](localStorage);\r\n        loader\r\n            .loadJSON('games.json')\r\n            .then(gamesConfig => {\r\n            const GameSelection = new _GameSelection__WEBPACK_IMPORTED_MODULE_0__[\"GameSelectionView\"](menuElement, gamesConfig.gameFolders.concat(this.gamesStorage.getGameNames()), gameId => {\r\n                const customGame = this.gamesStorage.getGame(gameId);\r\n                if (customGame != null) {\r\n                    this.selectGame(customGame);\r\n                }\r\n                else if (gamesConfig.gameFolders.indexOf(gameId)) {\r\n                    Object(_Services_LoadStaticGame__WEBPACK_IMPORTED_MODULE_3__[\"loadStaticGame\"])(loader, gameId).then(game => this.selectGame(game));\r\n                }\r\n            });\r\n            const gameUploadView = new _GameUpload__WEBPACK_IMPORTED_MODULE_2__[\"GameUploadView\"]((name, game) => {\r\n                const response = this.gamesStorage.addGame(name, game);\r\n                if (response.status == 'error') {\r\n                    return response;\r\n                }\r\n                GameSelection.options = gamesConfig.gameFolders.concat(this.gamesStorage.getGameNames());\r\n                GameSelection.value = name;\r\n                this.selectGame(game);\r\n                return response;\r\n            });\r\n            menuElement.appendChild(gameUploadView.element);\r\n            const firstGame = gamesConfig.gameFolders[0];\r\n            if (firstGame == null) {\r\n                throw new Error(`No games found in games.json`);\r\n            }\r\n            Object(_Services_LoadStaticGame__WEBPACK_IMPORTED_MODULE_3__[\"loadStaticGame\"])(loader, firstGame).then(game => this.selectGame(game));\r\n        });\r\n    }\r\n    selectGame(game) {\r\n        if (this.Game != null) {\r\n            this.Game.destroy();\r\n        }\r\n        this.Game = new _Game__WEBPACK_IMPORTED_MODULE_1__[\"GameView\"](game, this.gameElement);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/Main.ts?");

/***/ }),

/***/ "./Engine/Views/MovablePiece.ts":
/*!**************************************!*\
  !*** ./Engine/Views/MovablePiece.ts ***!
  \**************************************/
/*! exports provided: MovablePieceView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MovablePieceView\", function() { return MovablePieceView; });\n/* harmony import */ var _vector_3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vector-3 */ \"./Engine/vector-3.ts\");\n\r\nclass MovablePieceView {\r\n    constructor(root, name, location, _content, onLocationInput, bringToTop, zIndex = 0) {\r\n        this.root = root;\r\n        this.name = name;\r\n        this.location = location;\r\n        this._content = _content;\r\n        this.onLocationInput = onLocationInput;\r\n        this.bringToTop = bringToTop;\r\n        this.zIndex = zIndex;\r\n        this._showRotationHandle = false;\r\n        this.rotationInProgress = false;\r\n        this.rotationStartElementLocation = null;\r\n        this.rotationStartEventLocation = null;\r\n        this._draggingInProgress = false;\r\n        this.dragStartEventLocation = null;\r\n        this.onElementPointerDown = (event) => {\r\n            this.draggingInProgress = true;\r\n            this.dragStartEventLocation = {\r\n                x: event.pageX,\r\n                y: event.pageY\r\n            };\r\n        };\r\n        this.onRotationHandlePointerDown = (event) => {\r\n            event.stopPropagation();\r\n            const rect = this.element.getBoundingClientRect();\r\n            this.rotationStartEventLocation = {\r\n                x: event.pageX,\r\n                y: event.pageY\r\n            };\r\n            this.rotationStartElementLocation = {\r\n                x: rect.left + rect.width / 2,\r\n                y: rect.top + rect.height / 2\r\n            };\r\n            this.rotationInProgress = true;\r\n        };\r\n        this.onDocumentPointerMove = (event) => {\r\n            const updatedRotation = this.getUpdatedRotation(event);\r\n            if (updatedRotation != null) {\r\n                this.updateElementLocation({\r\n                    rotation: updatedRotation,\r\n                    position: this.location.position\r\n                });\r\n                return;\r\n            }\r\n            if (this.dragStartEventLocation == null || !this.draggingInProgress) {\r\n                return;\r\n            }\r\n            this.updateElementLocation({\r\n                rotation: this.location.rotation,\r\n                position: {\r\n                    x: this.location.position.x + event.pageX - this.dragStartEventLocation.x,\r\n                    y: this.location.position.y + event.pageY - this.dragStartEventLocation.y,\r\n                    z: this.location.position.z\r\n                }\r\n            });\r\n        };\r\n        this.onDocumentPointerDown = (event) => {\r\n            if (event.target != this.element) {\r\n                this.showRotationHandle = false;\r\n            }\r\n        };\r\n        this.onDocumentPointerUp = (event) => {\r\n            if (this.rotationInProgress) {\r\n                const updatedRotation = this.getUpdatedRotation(event);\r\n                if (updatedRotation != null) {\r\n                    this.onLocationInput({\r\n                        rotation: updatedRotation,\r\n                        position: this.location.position\r\n                    });\r\n                }\r\n                this.rotationInProgress = false;\r\n            }\r\n            if (this.dragStartEventLocation == null || !this.draggingInProgress) {\r\n                return;\r\n            }\r\n            this.showRotationHandle = true;\r\n            const increment = {\r\n                x: event.pageX - this.dragStartEventLocation.x,\r\n                y: event.pageY - this.dragStartEventLocation.y,\r\n                z: 0\r\n            };\r\n            if (!Object(_vector_3__WEBPACK_IMPORTED_MODULE_0__[\"isZero\"])(increment)) {\r\n                this.onLocationInput({\r\n                    rotation: this.location.rotation,\r\n                    position: Object(_vector_3__WEBPACK_IMPORTED_MODULE_0__[\"add\"])(this.location.position, increment)\r\n                });\r\n            }\r\n            this.dragStartEventLocation = null;\r\n            this.draggingInProgress = false;\r\n        };\r\n        this.element = document.createElement('div');\r\n        this.element.classList.add('movable-piece-view');\r\n        this.element.appendChild(this._content.element);\r\n        root.appendChild(this.element);\r\n        this.rotationHandle = document.createElement('div');\r\n        this.rotationHandle.classList.add('movable-piece-view__rotation-handle');\r\n        this.rotationHandle.style.display = 'none';\r\n        this.element.appendChild(this.rotationHandle);\r\n        this.element.addEventListener('pointerdown', this.onElementPointerDown);\r\n        this.rotationHandle.addEventListener('pointerdown', this.onRotationHandlePointerDown);\r\n        document.addEventListener('pointerdown', this.onDocumentPointerDown);\r\n        document.addEventListener('pointermove', this.onDocumentPointerMove);\r\n        document.addEventListener('pointerup', this.onDocumentPointerUp);\r\n        this.updateZIndex();\r\n        this.updateElementLocation(location);\r\n    }\r\n    get content() {\r\n        return this._content;\r\n    }\r\n    get showRotationHandle() {\r\n        return this._showRotationHandle;\r\n    }\r\n    set showRotationHandle(value) {\r\n        this.rotationHandle.style.display = value ? 'block' : 'none';\r\n        this._showRotationHandle = value;\r\n        this.updateZIndex();\r\n    }\r\n    set draggingInProgress(value) {\r\n        this._draggingInProgress = value;\r\n        if (value) {\r\n            this.showRotationHandle = value;\r\n        }\r\n    }\r\n    get draggingInProgress() {\r\n        return this._draggingInProgress;\r\n    }\r\n    updateZIndex() {\r\n        this.element.style.zIndex = this.showRotationHandle ? '10' : this.zIndex.toString();\r\n    }\r\n    getUpdatedRotation(event) {\r\n        if (this.rotationInProgress && this.rotationStartElementLocation != null && this.rotationStartEventLocation != null) {\r\n            const offset = {\r\n                x: event.pageX - this.rotationStartElementLocation.x,\r\n                y: event.pageY - this.rotationStartElementLocation.y,\r\n            };\r\n            const vectorToStartEventPosition = {\r\n                x: this.rotationStartEventLocation.x - this.rotationStartElementLocation.x,\r\n                y: this.rotationStartEventLocation.y - this.rotationStartElementLocation.y,\r\n            };\r\n            const vectorToNewEventPosition = {\r\n                x: event.pageX - this.rotationStartElementLocation.x,\r\n                y: event.pageY - this.rotationStartElementLocation.y,\r\n            };\r\n            const a = vectorToStartEventPosition;\r\n            const b = vectorToNewEventPosition;\r\n            const angle = Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x);\r\n            return this.location.rotation + Math.round(angle * 180 / Math.PI);\r\n        }\r\n    }\r\n    setLocation(location) {\r\n        this.location = location;\r\n        this.updateElementLocation(location);\r\n    }\r\n    updateElementLocation(location) {\r\n        const p = location.position;\r\n        this.element.style.transform = `translate3d(${p.x - Math.round(this.element.clientWidth / 2)}px, ${p.y - Math.round(this.element.clientHeight / 2)}px, ${p.z}px) rotateZ(${location.rotation}deg)`;\r\n    }\r\n    destroy() {\r\n        this.element.removeChild(this._content.element);\r\n        this._content.destroy();\r\n        this.element.removeEventListener('pointerdown', this.onElementPointerDown);\r\n        document.removeEventListener('pointermove', this.onDocumentPointerMove);\r\n        document.removeEventListener('pointerup', this.onDocumentPointerUp);\r\n        this.root.removeChild(this.element);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/MovablePiece.ts?");

/***/ }),

/***/ "./Engine/Views/MultiSidedSprite.ts":
/*!******************************************!*\
  !*** ./Engine/Views/MultiSidedSprite.ts ***!
  \******************************************/
/*! exports provided: MultiSidedSpriteView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MultiSidedSpriteView\", function() { return MultiSidedSpriteView; });\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./Engine/Views/Sprite.ts\");\n\r\nclass MultiSidedSpriteView {\r\n    constructor(root, _renderedObject, spritesMap, spriteSheetURL, sides, _currentSide, handleDoubleClick) {\r\n        this.root = root;\r\n        this._renderedObject = _renderedObject;\r\n        this.spritesMap = spritesMap;\r\n        this._currentSide = _currentSide;\r\n        this.handleDoubleClick = handleDoubleClick;\r\n        this._element = document.createElement('div');\r\n        this._element.classList.add('multi-sided-sprite-view');\r\n        this.root.appendChild(this._element);\r\n        this.sprites = sides.map(side => {\r\n            const sprite = new _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"SpriteView\"](this._element, spriteSheetURL, this.spritesMap[side], side);\r\n            sprite.visible = false;\r\n            return sprite;\r\n        });\r\n        this.currentSide = _currentSide;\r\n        if (handleDoubleClick != null) {\r\n            this._element.addEventListener('dblclick', handleDoubleClick);\r\n        }\r\n    }\r\n    get element() {\r\n        return this._element;\r\n    }\r\n    get renderedObject() {\r\n        return this._renderedObject;\r\n    }\r\n    get currentSide() {\r\n        return this._currentSide;\r\n    }\r\n    set currentSide(newValue) {\r\n        this._currentSide = newValue;\r\n        this.sprites.forEach((sprite, index) => {\r\n            sprite.visible = index == newValue;\r\n        });\r\n    }\r\n    destroy() {\r\n        if (this.handleDoubleClick != null) {\r\n            this.element.removeEventListener('dblclick', this.handleDoubleClick);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/MultiSidedSprite.ts?");

/***/ }),

/***/ "./Engine/Views/PieceContainer.ts":
/*!****************************************!*\
  !*** ./Engine/Views/PieceContainer.ts ***!
  \****************************************/
/*! exports provided: PieceContainerView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PieceContainerView\", function() { return PieceContainerView; });\n/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container */ \"./Engine/Views/Container.ts\");\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button */ \"./Engine/Views/Button.ts\");\n/* harmony import */ var _Label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Label */ \"./Engine/Views/Label.ts\");\n\r\n\r\n\r\nclass PieceContainerView {\r\n    constructor(root, backgroundSprite, containerConfig, _itemsCount, onShuffle, onReset) {\r\n        this.root = root;\r\n        this.backgroundSprite = backgroundSprite;\r\n        this.containerConfig = containerConfig;\r\n        this._itemsCount = _itemsCount;\r\n        this.onShuffle = onShuffle;\r\n        this.onReset = onReset;\r\n        this.controls = new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](null, {\r\n            reset: new _Button__WEBPACK_IMPORTED_MODULE_1__[\"ButtonView\"](null, 'reset', () => this.onReset()),\r\n            shuffle: new _Button__WEBPACK_IMPORTED_MODULE_1__[\"ButtonView\"](null, 'shuffle', () => this.onShuffle())\r\n        }, 'piece-container-view__controls', {\r\n            pointerdown: e => e.stopPropagation(),\r\n            pointerup: e => e.stopPropagation()\r\n        });\r\n        this.container = new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](this.root, {\r\n            itemsCountLabel: new _Label__WEBPACK_IMPORTED_MODULE_2__[\"LabelView\"](this.getItemsLabel(this._itemsCount), 'piece-container-view__items-count-label'),\r\n            sprite: this.backgroundSprite,\r\n            controls: this.controls\r\n        }, 'piece-container-view');\r\n    }\r\n    get containerComponent() {\r\n        return this.containerConfig;\r\n    }\r\n    set itemsCount(newValue) {\r\n        this.container.content.itemsCountLabel.text = `${newValue} items`;\r\n    }\r\n    getItemsLabel(count) {\r\n        return `${count} items`;\r\n    }\r\n    get element() {\r\n        return this.container.element;\r\n    }\r\n    destroy() {\r\n        this.container.destroy();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/PieceContainer.ts?");

/***/ }),

/***/ "./Engine/Views/Sprite.ts":
/*!********************************!*\
  !*** ./Engine/Views/Sprite.ts ***!
  \********************************/
/*! exports provided: SpriteView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SpriteView\", function() { return SpriteView; });\nclass SpriteView {\r\n    constructor(root, imageURL, config, name) {\r\n        this.root = root;\r\n        this._visible = true;\r\n        this.image = document.createElement('div');\r\n        this.image.classList.add('sprite-view');\r\n        this.image.setAttribute('data-sprite-name', name);\r\n        const s = this.image.style;\r\n        s.backgroundImage = `url(\"${imageURL}\")`;\r\n        s.backgroundPosition = `${-config.x}px ${-config.y}px`;\r\n        s.width = `${config.width}px`;\r\n        s.height = `${config.height}px`;\r\n        if (root != null) {\r\n            root.appendChild(this.image);\r\n        }\r\n    }\r\n    get element() {\r\n        return this.image;\r\n    }\r\n    destroy() {\r\n        if (this.root != null && this.root.contains(this.image)) {\r\n            this.root.removeChild(this.image);\r\n        }\r\n    }\r\n    set visible(newValue) {\r\n        this.image.style.display = newValue ? 'block' : 'none';\r\n        this._visible = newValue;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/Sprite.ts?");

/***/ }),

/***/ "./Engine/download-file.ts":
/*!*********************************!*\
  !*** ./Engine/download-file.ts ***!
  \*********************************/
/*! exports provided: downloadJsonFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"downloadJsonFile\", function() { return downloadJsonFile; });\nfunction downloadJsonFile(filename, content) {\r\n    var element = document.createElement('a');\r\n    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(content));\r\n    element.setAttribute('download', filename);\r\n    element.style.display = 'none';\r\n    document.body.appendChild(element);\r\n    element.click();\r\n    document.body.removeChild(element);\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/download-file.ts?");

/***/ }),

/***/ "./Engine/index.ts":
/*!*************************!*\
  !*** ./Engine/index.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _json_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-loader */ \"./Engine/json-loader.ts\");\n/* harmony import */ var _Views_Main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Views/Main */ \"./Engine/Views/Main.ts\");\n\r\n\r\nconst loader = new _json_loader__WEBPACK_IMPORTED_MODULE_0__[\"Loader\"](window.location.href.substring(0, window.location.href.lastIndexOf('/')));\r\nconst root = document.getElementById('root');\r\nif (root == null) {\r\n    throw new Error('Required elements are nor found');\r\n}\r\nconst game = new _Views_Main__WEBPACK_IMPORTED_MODULE_1__[\"MainView\"](loader, root);\r\n\n\n//# sourceURL=webpack:///./Engine/index.ts?");

/***/ }),

/***/ "./Engine/json-loader.ts":
/*!*******************************!*\
  !*** ./Engine/json-loader.ts ***!
  \*******************************/
/*! exports provided: Loader, loadJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Loader\", function() { return Loader; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadJSON\", function() { return loadJSON; });\nclass Loader {\r\n    constructor(baseUrl) {\r\n        this.baseUrl = baseUrl;\r\n    }\r\n    loadJSON(relativeUrl) {\r\n        return loadJSON(`${this.baseUrl}/${relativeUrl}`);\r\n    }\r\n    load(relativeUrl) {\r\n        return fetch(`${this.baseUrl}/${relativeUrl}`).then(response => response.text());\r\n    }\r\n}\r\nfunction loadJSON(url) {\r\n    return fetch(url).then(response => response.json());\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/json-loader.ts?");

/***/ }),

/***/ "./Engine/random-utils.ts":
/*!********************************!*\
  !*** ./Engine/random-utils.ts ***!
  \********************************/
/*! exports provided: shuffle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shuffle\", function() { return shuffle; });\nfunction shuffle(numbers) {\r\n    return numbers.sort(() => {\r\n        const random = Math.random();\r\n        if (random > 0.5) {\r\n            return 1;\r\n        }\r\n        else if (random < 0.5) {\r\n            return -1;\r\n        }\r\n        else {\r\n            return 0;\r\n        }\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/random-utils.ts?");

/***/ }),

/***/ "./Engine/update-game-json.ts":
/*!************************************!*\
  !*** ./Engine/update-game-json.ts ***!
  \************************************/
/*! exports provided: updateGameStateFromV0ToV1, updateGameStateFromV1ToV2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateGameStateFromV0ToV1\", function() { return updateGameStateFromV0ToV1; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateGameStateFromV1ToV2\", function() { return updateGameStateFromV1ToV2; });\nfunction updateGameStateFromV0ToV1(state) {\r\n    const updated = {\r\n        version: '1',\r\n        sprites: {},\r\n        components: []\r\n    };\r\n    let lastSpriteName = 0;\r\n    const spritesMap = {};\r\n    updated.components = state.Components.map(c => {\r\n        let existingSprite = spritesMap[JSON.stringify(c.source)];\r\n        if (existingSprite == null) {\r\n            lastSpriteName += 1;\r\n            existingSprite = {\r\n                name: `sprite_${lastSpriteName}`,\r\n                sprite: c.source\r\n            };\r\n            spritesMap[JSON.stringify(c.source)] = existingSprite;\r\n            updated.sprites[existingSprite.name] = existingSprite.sprite;\r\n        }\r\n        const component = {\r\n            type: 'piece',\r\n            category: null,\r\n            name: c.name,\r\n            sides: [existingSprite.name],\r\n            currentSide: 0,\r\n            location: {\r\n                position: {\r\n                    x: c.target.x,\r\n                    y: c.target.y,\r\n                    z: 0\r\n                },\r\n                rotation: c.target.rotation\r\n            }\r\n        };\r\n        return component;\r\n    });\r\n    return updated;\r\n}\r\nfunction updateGameStateFromV1ToV2(state) {\r\n    return Object.assign({}, state, { components: state.components.map(c => {\r\n            if (c.type !== 'piece') {\r\n                return c;\r\n            }\r\n            const piece = c;\r\n            const sprite = state.sprites[piece.sides[0]];\r\n            return Object.assign({}, c, { location: {\r\n                    rotation: c.location.rotation,\r\n                    position: {\r\n                        x: c.location.position.x + Math.round(sprite.width / 2),\r\n                        y: c.location.position.y + Math.round(sprite.height / 2),\r\n                        z: c.location.position.z,\r\n                    }\r\n                } });\r\n        }), version: '2' });\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/update-game-json.ts?");

/***/ }),

/***/ "./Engine/vector-3.ts":
/*!****************************!*\
  !*** ./Engine/vector-3.ts ***!
  \****************************/
/*! exports provided: add, subtract, isZero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"subtract\", function() { return subtract; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isZero\", function() { return isZero; });\nfunction add(a, b) {\r\n    return {\r\n        x: a.x + b.x,\r\n        y: a.y + b.y,\r\n        z: a.z + b.z\r\n    };\r\n}\r\nfunction subtract(a, b) {\r\n    return {\r\n        x: a.x - b.x,\r\n        y: a.y - b.y,\r\n        z: a.z - b.z\r\n    };\r\n}\r\nfunction isZero(a) {\r\n    return !a.x && !a.y && !a.z;\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/vector-3.ts?");

/***/ }),

/***/ "./reaction-framework/array-filter.ts":
/*!********************************************!*\
  !*** ./reaction-framework/array-filter.ts ***!
  \********************************************/
/*! exports provided: ArrayFilter, createFilter, createNotNullFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ArrayFilter\", function() { return ArrayFilter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createFilter\", function() { return createFilter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createNotNullFilter\", function() { return createNotNullFilter; });\n/* harmony import */ var _observable_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observable-array */ \"./reaction-framework/observable-array.ts\");\n/* harmony import */ var _utils_array_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/array-utils */ \"./utils/array-utils.ts\");\n\r\n\r\nclass ArrayFilter {\r\n    constructor(array) {\r\n        this.array = array;\r\n        this._result = new _observable_array__WEBPACK_IMPORTED_MODULE_0__[\"ObservableArray\"]([]);\r\n        this.result = this._result;\r\n        array.connect({\r\n            itemAdded: ({ item }) => {\r\n                if (this.filter(item)) {\r\n                    this._result.add(item);\r\n                }\r\n            },\r\n            itemRemoved: ({ item }) => {\r\n                if (Object(_utils_array_utils__WEBPACK_IMPORTED_MODULE_1__[\"contains\"])(this.result.items, item)) {\r\n                    this._result.remove(item);\r\n                }\r\n            }\r\n        });\r\n    }\r\n}\r\nfunction createFilter(array, filter) {\r\n    const Filter = class ConfiguredFilter extends ArrayFilter {\r\n        filter(item) {\r\n            return filter(item);\r\n        }\r\n    };\r\n    return new Filter(array);\r\n}\r\nfunction createNotNullFilter(array) {\r\n    // tslint:disable-next-line:only-arrow-functions\r\n    const filterCallback = function (item) {\r\n        return item != null;\r\n    };\r\n    return createFilter(array, filterCallback);\r\n}\r\n\n\n//# sourceURL=webpack:///./reaction-framework/array-filter.ts?");

/***/ }),

/***/ "./reaction-framework/array-mapper.ts":
/*!********************************************!*\
  !*** ./reaction-framework/array-mapper.ts ***!
  \********************************************/
/*! exports provided: ArrayMapper, createArrayMapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ArrayMapper\", function() { return ArrayMapper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createArrayMapper\", function() { return createArrayMapper; });\n/* harmony import */ var _observable_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observable-array */ \"./reaction-framework/observable-array.ts\");\n/* harmony import */ var _utils_map_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/map-utils */ \"./utils/map-utils.ts\");\n\r\n\r\nclass ArrayMapper {\r\n    constructor(array) {\r\n        this.array = array;\r\n        this.mappedItems = new Map();\r\n        this._result = new _observable_array__WEBPACK_IMPORTED_MODULE_0__[\"ObservableArray\"]([]);\r\n        this.result = this._result;\r\n        const connector = {\r\n            itemAdded: ({ item }) => {\r\n                const mapped = this.map(item);\r\n                this.mappedItems.set(item, mapped);\r\n                this._result.add(mapped);\r\n            },\r\n            itemRemoved: ({ item }) => {\r\n                const mapped = this.getMapped(item);\r\n                this.mappedItems.delete(item);\r\n                this._result.remove(mapped);\r\n            }\r\n        };\r\n        const extractor = this.getExtractor();\r\n        if (extractor != null) {\r\n            connector.itemConnector = {\r\n                extractObservables: extractor,\r\n                update: (item, parameters) => {\r\n                    const previouslyMapped = this.getMapped(item);\r\n                    const updater = this.getUpdater();\r\n                    const mapped = updater == null\r\n                        ? this.map(item)\r\n                        : updater(item, previouslyMapped, parameters);\r\n                    if (previouslyMapped !== mapped) {\r\n                        this.mappedItems.set(item, mapped);\r\n                        this._result.replace(previouslyMapped, mapped);\r\n                    }\r\n                }\r\n            };\r\n        }\r\n        array.connect(connector);\r\n    }\r\n    getMapped(item) {\r\n        return Object(_utils_map_utils__WEBPACK_IMPORTED_MODULE_1__[\"getStrict\"])(this.mappedItems, item, () => new Error('Severe state exception: removed item was never added'));\r\n    }\r\n    getExtractor() {\r\n        return null;\r\n    }\r\n    getUpdater() {\r\n        return null;\r\n    }\r\n}\r\nfunction createArrayMapper(config) {\r\n    const { map, updaterConfig } = config;\r\n    const extractObservables = updaterConfig\r\n        ? updaterConfig.extractObservables\r\n        : null;\r\n    const update = updaterConfig\r\n        ? updaterConfig.update\r\n        : null;\r\n    const ArrayMapperClass = class ConfigurableArrayMapper extends ArrayMapper {\r\n        map(item) {\r\n            return config.map(item);\r\n        }\r\n        getExtractor() {\r\n            return extractObservables;\r\n        }\r\n        getUpdater() {\r\n            return update;\r\n        }\r\n    };\r\n    return ArrayMapperClass;\r\n}\r\n\n\n//# sourceURL=webpack:///./reaction-framework/array-mapper.ts?");

/***/ }),

/***/ "./reaction-framework/emitter.ts":
/*!***************************************!*\
  !*** ./reaction-framework/emitter.ts ***!
  \***************************************/
/*! exports provided: Source, ExposedSource, mergeEmitters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Source\", function() { return Source; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ExposedSource\", function() { return ExposedSource; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mergeEmitters\", function() { return mergeEmitters; });\n/* harmony import */ var _utils_array_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/array-utils */ \"./utils/array-utils.ts\");\n\r\nclass Source {\r\n    constructor() {\r\n        this.observers = [];\r\n    }\r\n    subscribe(observer) {\r\n        this.observers.push(observer);\r\n    }\r\n    unsubscribe(observer) {\r\n        Object(_utils_array_utils__WEBPACK_IMPORTED_MODULE_0__[\"remove\"])(this.observers, observer);\r\n    }\r\n    dispatch(event) {\r\n        this.observers.forEach(observer => observer(event));\r\n    }\r\n}\r\nclass ExposedSource extends Source {\r\n    dispatch(value) {\r\n        super.dispatch(value);\r\n    }\r\n    initialize() {\r\n    }\r\n    destroy() {\r\n    }\r\n}\r\nfunction mergeEmitters(sourceA, sourceB, combine) {\r\n    let a = null;\r\n    let b = null;\r\n    const result = new ExposedSource();\r\n    const handleUpdate = () => result.dispatch(combine(a, b));\r\n    sourceA.subscribe(value => {\r\n        a = value;\r\n        handleUpdate();\r\n    });\r\n    sourceB.subscribe(value => {\r\n        b = value;\r\n        handleUpdate();\r\n    });\r\n    return result;\r\n}\r\n\n\n//# sourceURL=webpack:///./reaction-framework/emitter.ts?");

/***/ }),

/***/ "./reaction-framework/observable-array.ts":
/*!************************************************!*\
  !*** ./reaction-framework/observable-array.ts ***!
  \************************************************/
/*! exports provided: ObservableArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ObservableArray\", function() { return ObservableArray; });\n/* harmony import */ var _utils_array_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/array-utils */ \"./utils/array-utils.ts\");\n/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emitter */ \"./reaction-framework/emitter.ts\");\n/* harmony import */ var _observable_variable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./observable-variable */ \"./reaction-framework/observable-variable.ts\");\n/* harmony import */ var _array_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./array-filter */ \"./reaction-framework/array-filter.ts\");\n/* harmony import */ var _array_mapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./array-mapper */ \"./reaction-framework/array-mapper.ts\");\n\r\n\r\n\r\n\r\n\r\nclass ObservableArray {\r\n    constructor(items) {\r\n        this._itemRemoved = new _emitter__WEBPACK_IMPORTED_MODULE_1__[\"ExposedSource\"]();\r\n        this.itemRemoved = this._itemRemoved;\r\n        this._itemAdded = new _emitter__WEBPACK_IMPORTED_MODULE_1__[\"ExposedSource\"]();\r\n        this.itemAdded = this._itemAdded;\r\n        this._items = items.slice();\r\n        this.items = this._items;\r\n    }\r\n    add(...items) {\r\n        items.forEach(item => {\r\n            this._items.push(item);\r\n            this._itemAdded.dispatch({\r\n                item,\r\n                location: this._items.length - 1\r\n            });\r\n        });\r\n    }\r\n    insert(item, location) {\r\n        this._items.splice(location, 0, item);\r\n        this._itemAdded.dispatch({\r\n            item,\r\n            location\r\n        });\r\n    }\r\n    pop() {\r\n        const item = this._items.pop();\r\n        if (item == null) {\r\n            return null;\r\n        }\r\n        this._itemRemoved.dispatch({\r\n            item,\r\n            location: this._items.length + 1\r\n        });\r\n        return item;\r\n    }\r\n    remove(item) {\r\n        const location = Object(_utils_array_utils__WEBPACK_IMPORTED_MODULE_0__[\"strictIndexOf\"])(this._items, item);\r\n        this._items.splice(location, 1);\r\n        this._itemRemoved.dispatch({\r\n            item,\r\n            location\r\n        });\r\n    }\r\n    replace(item, newItem) {\r\n        const location = Object(_utils_array_utils__WEBPACK_IMPORTED_MODULE_0__[\"strictIndexOf\"])(this._items, item);\r\n        this._items.splice(location, 1, newItem);\r\n        this._itemRemoved.dispatch({\r\n            item,\r\n            location\r\n        });\r\n        this._itemAdded.dispatch({\r\n            item: newItem,\r\n            location\r\n        });\r\n    }\r\n    removeByIndex(index) {\r\n        if (index < 0 || index >= this._items.length) {\r\n            throw new Error('Index is out of bounds');\r\n        }\r\n        else {\r\n            const item = this._items[index];\r\n            this.remove(item);\r\n        }\r\n    }\r\n    find(checker) {\r\n        const result = new _observable_variable__WEBPACK_IMPORTED_MODULE_2__[\"Variable\"](null);\r\n        const filter = Object(_array_filter__WEBPACK_IMPORTED_MODULE_3__[\"createFilter\"])(this, checker);\r\n        const updateResult = () => {\r\n            const oldResult = result.get();\r\n            const newResult = filter.result.items[0];\r\n            if (oldResult !== newResult) {\r\n                result.set(newResult);\r\n            }\r\n        };\r\n        filter.result.connect({\r\n            itemAdded: updateResult,\r\n            itemRemoved: updateResult\r\n        });\r\n        return result;\r\n    }\r\n    map(config) {\r\n        return new (Object(_array_mapper__WEBPACK_IMPORTED_MODULE_4__[\"createArrayMapper\"])(config))(this).result;\r\n    }\r\n    filter(filter) {\r\n        return Object(_array_filter__WEBPACK_IMPORTED_MODULE_3__[\"createFilter\"])(this, filter).result;\r\n    }\r\n    connect(connector) {\r\n        const { itemAdded, itemRemoved, itemConnector } = connector;\r\n        if (itemAdded != null) {\r\n            this._itemAdded.subscribe(itemAdded);\r\n            this._items.forEach((item, location) => {\r\n                itemAdded({\r\n                    item,\r\n                    location\r\n                });\r\n            });\r\n        }\r\n        if (itemRemoved != null) {\r\n            this._itemRemoved.subscribe(itemRemoved);\r\n        }\r\n        if (itemConnector != null) {\r\n            const itemObserversMap = new Map();\r\n            this.itemAdded.subscribe(details => {\r\n                const { update, extractObservables } = itemConnector;\r\n                const parameters = {};\r\n                const observables = extractObservables(details.item);\r\n                Object\r\n                    .keys(observables)\r\n                    .map(name => {\r\n                    const observable = observables[name];\r\n                    const observer = (value) => {\r\n                        parameters[name] = value;\r\n                        update(details.item, parameters);\r\n                    };\r\n                    parameters[name] = observable.get();\r\n                    observable.subscribe(observer);\r\n                    return {\r\n                        observable,\r\n                        observer\r\n                    };\r\n                });\r\n            });\r\n            this.itemRemoved.subscribe(details => {\r\n                const subscriptions = itemObserversMap.get(details.item);\r\n                if (subscriptions != null) {\r\n                    subscriptions.forEach(subscription => {\r\n                        subscription.observable.unsubscribe(subscription.observer);\r\n                    });\r\n                }\r\n                itemObserversMap.delete(details.item);\r\n            });\r\n        }\r\n        return {\r\n            destroy: () => {\r\n                if (itemAdded) {\r\n                    this._itemAdded.unsubscribe(itemAdded);\r\n                }\r\n                if (itemRemoved != null) {\r\n                    this._itemRemoved.unsubscribe(itemRemoved);\r\n                }\r\n            }\r\n        };\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./reaction-framework/observable-array.ts?");

/***/ }),

/***/ "./reaction-framework/observable-variable.ts":
/*!***************************************************!*\
  !*** ./reaction-framework/observable-variable.ts ***!
  \***************************************************/
/*! exports provided: Variable, combineValues, computeIfPresent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Variable\", function() { return Variable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"combineValues\", function() { return combineValues; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"computeIfPresent\", function() { return computeIfPresent; });\n/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emitter */ \"./reaction-framework/emitter.ts\");\n\r\nclass Variable extends _emitter__WEBPACK_IMPORTED_MODULE_0__[\"Source\"] {\r\n    constructor(value, _previousValue) {\r\n        super();\r\n        this.value = value;\r\n        this._previousValue = _previousValue;\r\n        if (typeof _previousValue === 'undefined') {\r\n            this._previousValue = value;\r\n        }\r\n    }\r\n    get() {\r\n        return this.value;\r\n    }\r\n    bind(binder) {\r\n        binder(this.value);\r\n        this.subscribe(value => binder(value));\r\n    }\r\n    getPreviousValue() {\r\n        return this._previousValue;\r\n    }\r\n    set(value) {\r\n        this._previousValue = this.value;\r\n        this.value = value;\r\n        this.dispatch(value);\r\n    }\r\n    update(updater) {\r\n        this.set(updater(this.get()));\r\n    }\r\n    map(mapper) {\r\n        const result = new Variable(mapper(this.get()));\r\n        this.subscribe(value => result.set(mapper(value)));\r\n        return result;\r\n    }\r\n    initialize() {\r\n    }\r\n    destroy() {\r\n    }\r\n}\r\nfunction combineValues(values, combine) {\r\n    const compute = () => combine(...values.map(v => v.get()));\r\n    const result = new Variable(compute());\r\n    const handleUpdate = () => result.set(compute());\r\n    values.forEach(v => v.subscribe(handleUpdate));\r\n    return result;\r\n}\r\nfunction computeIfPresent(a, compute) {\r\n    const result = new Variable(null);\r\n    let lastB = null;\r\n    const listener = (b) => result.set(b);\r\n    const handleNewValue = (value) => {\r\n        if (value != null) {\r\n            if (lastB != null) {\r\n                lastB.unsubscribe(listener);\r\n            }\r\n            lastB = compute(value);\r\n            lastB.subscribe(listener);\r\n        }\r\n        else {\r\n            if (lastB != null) {\r\n                lastB.unsubscribe(listener);\r\n                lastB = null;\r\n                result.set(null);\r\n            }\r\n        }\r\n    };\r\n    handleNewValue(a.get());\r\n    a.subscribe(handleNewValue);\r\n    return result;\r\n}\r\n\n\n//# sourceURL=webpack:///./reaction-framework/observable-variable.ts?");

/***/ }),

/***/ "./utils/array-utils.ts":
/*!******************************!*\
  !*** ./utils/array-utils.ts ***!
  \******************************/
/*! exports provided: contains, remove, fromRange, find, strictIndexOf, join, removeDuplicates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"contains\", function() { return contains; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"remove\", function() { return remove; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fromRange\", function() { return fromRange; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"find\", function() { return find; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"strictIndexOf\", function() { return strictIndexOf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"join\", function() { return join; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeDuplicates\", function() { return removeDuplicates; });\nfunction contains(array, item) {\r\n    return array.indexOf(item) !== -1;\r\n}\r\nfunction remove(array, item) {\r\n    const location = array.indexOf(item);\r\n    if (location === -1) {\r\n        throw new Error('Item was not found in an array');\r\n    }\r\n    else {\r\n        array.splice(location, 1);\r\n        return array;\r\n    }\r\n}\r\nfunction fromRange(from, to, creator) {\r\n    const increment = from < to ? 1 : -1;\r\n    const array = [];\r\n    let index = from;\r\n    array.push(creator(index));\r\n    while (index !== to) {\r\n        index += increment;\r\n        array.push(creator(index));\r\n    }\r\n    return array;\r\n}\r\nfunction find(items, functor) {\r\n    return items.filter(functor)[0];\r\n}\r\nfunction strictIndexOf(items, item, errorConstructor = () => new Error('Item not found in the array')) {\r\n    const index = items.indexOf(item);\r\n    if (index === -1) {\r\n        throw errorConstructor();\r\n    }\r\n    else {\r\n        return index;\r\n    }\r\n}\r\nfunction join(arrays) {\r\n    return arrays.reduce((result, array) => result.concat(array), []);\r\n}\r\nfunction removeDuplicates(array) {\r\n    return array.filter((item, index) => array.indexOf(item) === index);\r\n}\r\n\n\n//# sourceURL=webpack:///./utils/array-utils.ts?");

/***/ }),

/***/ "./utils/map-utils.ts":
/*!****************************!*\
  !*** ./utils/map-utils.ts ***!
  \****************************/
/*! exports provided: getStrict */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStrict\", function() { return getStrict; });\nfunction getStrict(map, key, errorConstructor = () => new Error('Item not present in the map')) {\r\n    if (!map.has(key)) {\r\n        throw errorConstructor();\r\n    }\r\n    else {\r\n        return map.get(key);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./utils/map-utils.ts?");

/***/ })

/******/ });