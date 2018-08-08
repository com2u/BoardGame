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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ContainerView\", function() { return ContainerView; });\n/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ \"./Engine/Views/CreateElement.ts\");\n\r\nclass ContainerView {\r\n    constructor(root, _content, className = null) {\r\n        this.root = root;\r\n        this._content = _content;\r\n        this.className = className;\r\n        this.container = Object(_CreateElement__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])('div', ['container-view', className]);\r\n        Object.keys(_content).forEach(key => {\r\n            this.container.appendChild(_content[key].element);\r\n        });\r\n        if (this.root != null) {\r\n            this.root.appendChild(this.container);\r\n        }\r\n    }\r\n    get content() {\r\n        return this._content;\r\n    }\r\n    get element() {\r\n        return this.container;\r\n    }\r\n    destroy() {\r\n        Object.keys(this._content).forEach(key => {\r\n            this.container.removeChild(this._content[key].element);\r\n            this._content[key].destroy();\r\n        });\r\n        if (this.root != null && this.root.contains(this.container)) {\r\n            this.root.removeChild(this.container);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/Container.ts?");

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

/***/ "./Engine/Views/Game.ts":
/*!******************************!*\
  !*** ./Engine/Views/Game.ts ***!
  \******************************/
/*! exports provided: GameView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameView\", function() { return GameView; });\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./Engine/Views/Sprite.ts\");\n/* harmony import */ var _JSON__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JSON */ \"./Engine/Views/JSON.ts\");\n/* harmony import */ var _CheckBoxField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckBoxField */ \"./Engine/Views/CheckBoxField.ts\");\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Button */ \"./Engine/Views/Button.ts\");\n/* harmony import */ var _download_file__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../download-file */ \"./Engine/download-file.ts\");\n/* harmony import */ var _update_game_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../update-game-json */ \"./Engine/update-game-json.ts\");\n/* harmony import */ var _MovablePiece__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MovablePiece */ \"./Engine/Views/MovablePiece.ts\");\n/* harmony import */ var _MultiSidedSprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MultiSidedSprite */ \"./Engine/Views/MultiSidedSprite.ts\");\n/* harmony import */ var _PieceContainer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PieceContainer */ \"./Engine/Views/PieceContainer.ts\");\n/* harmony import */ var _random_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../random-utils */ \"./Engine/random-utils.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass GameView {\r\n    constructor(loader, gameId, root) {\r\n        this.loader = loader;\r\n        this.gameId = gameId;\r\n        this.root = root;\r\n        this.pieces = [];\r\n        this.containers = [];\r\n        this.background = null;\r\n        this.gameState = null;\r\n        this.containerToPieceMap = new Map();\r\n        this.pieceToContainerMap = new Map();\r\n        this.board = document.createElement('div');\r\n        this.board.classList.add('game-view__board');\r\n        this.root.appendChild(this.board);\r\n        this.currentActorLabel = document.createElement('div');\r\n        this.currentActorLabel.classList.add('game-view__current-actor');\r\n        this.root.appendChild(this.currentActorLabel);\r\n        this.showJSONViewField = new _CheckBoxField__WEBPACK_IMPORTED_MODULE_2__[\"CheckBoxField\"](this.root, 'Show game state: ', showJSON => {\r\n            if (showJSON) {\r\n                this.root.classList.add('game-view--show-game-state-json');\r\n            }\r\n            else {\r\n                this.root.classList.remove('game-view--show-game-state-json');\r\n            }\r\n        });\r\n        this.JSONView = new _JSON__WEBPACK_IMPORTED_MODULE_1__[\"JSONView\"](root, {\r\n            version: '2',\r\n            sprites: {},\r\n            components: []\r\n        }, newConfig => {\r\n            this.destroyBoard();\r\n            this.gameState = newConfig;\r\n            this.createBoard(newConfig);\r\n        });\r\n        this.saveButton = new _Button__WEBPACK_IMPORTED_MODULE_3__[\"ButtonView\"](this.root, 'Save', () => Object(_download_file__WEBPACK_IMPORTED_MODULE_4__[\"downloadJsonFile\"])(`${this.gameId}.json`, JSON.stringify(this.gameState, null, 2)));\r\n        this\r\n            .loader\r\n            .loadJSON(`Games/${this.gameId}/components.json`)\r\n            .then(result => {\r\n            let gameConfig;\r\n            if (result.version == null) {\r\n                gameConfig = Object(_update_game_json__WEBPACK_IMPORTED_MODULE_5__[\"updateGameStateFromV1ToV2\"])(Object(_update_game_json__WEBPACK_IMPORTED_MODULE_5__[\"updateGameStateFromV0ToV1\"])(result));\r\n            }\r\n            else if (result.version === '1') {\r\n                gameConfig = Object(_update_game_json__WEBPACK_IMPORTED_MODULE_5__[\"updateGameStateFromV1ToV2\"])(result);\r\n            }\r\n            else if (result.version === '2') {\r\n                gameConfig = result;\r\n            }\r\n            else {\r\n                throw new Error('Unsupported game config loaded');\r\n            }\r\n            this.gameState = gameConfig;\r\n            this.JSONView.setValue(gameConfig);\r\n            this.createBoard(gameConfig);\r\n        });\r\n    }\r\n    createBoard(config) {\r\n        const componentsSpriteSheet = `Games/${this.gameId}/components.png`;\r\n        this.background = document.createElement('img');\r\n        this.background.src = `Games/${this.gameId}/board.png`;\r\n        this.background.setAttribute('draggable', 'false');\r\n        this.board.appendChild(this.background);\r\n        const sprites = config\r\n            .components\r\n            .filter(component => component.type == 'piece')\r\n            .map((c, index) => {\r\n            const component = c;\r\n            const sprite = new _MultiSidedSprite__WEBPACK_IMPORTED_MODULE_7__[\"MultiSidedSpriteView\"](this.board, component, config.sprites, componentsSpriteSheet, component.sides, component.currentSide, () => {\r\n                const newSide = (component.currentSide + 1) % component.sides.length;\r\n                component.currentSide = newSide;\r\n                this.updateJSONView();\r\n                sprite.currentSide = newSide;\r\n            });\r\n            const piece = new _MovablePiece__WEBPACK_IMPORTED_MODULE_6__[\"MovablePieceView\"](this.board, `[${index}] ${component.name}`, component.location, sprite, newLocation => {\r\n                component.location = newLocation;\r\n                this.updateJSONView();\r\n                piece.setLocation(newLocation);\r\n                this.updateItemsAssignedToContainers();\r\n            }, piece => {\r\n                this.currentActorLabel.innerHTML = `Current component - ${piece.name}`;\r\n                this.bringToTop(piece);\r\n            }, 1);\r\n            return piece;\r\n        });\r\n        const pieceContainers = config\r\n            .components\r\n            .filter(c => c.type === 'container')\r\n            .map(c => {\r\n            const container = c;\r\n            const sprite = new _Sprite__WEBPACK_IMPORTED_MODULE_0__[\"SpriteView\"](null, componentsSpriteSheet, config.sprites[container.backgroundSprite], container.backgroundSprite);\r\n            const piece = new _MovablePiece__WEBPACK_IMPORTED_MODULE_6__[\"MovablePieceView\"](this.board, container.name, container.location, new _PieceContainer__WEBPACK_IMPORTED_MODULE_8__[\"PieceContainerView\"](this.board, sprite, container, 0, () => this.shufflePieces(piece), () => this.resetPieces(piece)), newLocation => {\r\n                container.location = newLocation;\r\n                this.updateJSONView();\r\n                piece.setLocation(newLocation);\r\n                this.updateItemsAssignedToContainers();\r\n            }, () => { });\r\n            return piece;\r\n        });\r\n        this.containers.push(...pieceContainers);\r\n        this.pieces.push(...sprites);\r\n    }\r\n    updateJSONView() {\r\n        if (this.gameState != null) {\r\n            this.JSONView.setValue(this.gameState);\r\n        }\r\n    }\r\n    updateItemsAssignedToContainers() {\r\n        this.containerToPieceMap = new Map();\r\n        this.pieces.forEach(piece => {\r\n            for (let container of this.containers) {\r\n                let assignedItems;\r\n                if (this.containerToPieceMap.has(container)) {\r\n                    assignedItems = this.containerToPieceMap.get(container);\r\n                }\r\n                else {\r\n                    assignedItems = [];\r\n                    this.containerToPieceMap.set(container, assignedItems);\r\n                }\r\n                if (this.pieceBelongsToContainer(container.content.containerComponent, piece.content.renderedObject)) {\r\n                    assignedItems.push(piece);\r\n                    this.pieceToContainerMap.set(piece, container);\r\n                }\r\n            }\r\n        });\r\n        this.containers.forEach(c => {\r\n            const items = this.containerToPieceMap.get(c);\r\n            if (items == null) {\r\n                throw new Error('Items were not assigned for container');\r\n            }\r\n            c.content.itemsCount = items.length;\r\n        });\r\n    }\r\n    pieceBelongsToContainer(container, piece) {\r\n        if (this.gameState == null) {\r\n            throw new Error('Game state is not initialized');\r\n        }\r\n        const containerSprite = this.gameState.sprites[container.backgroundSprite];\r\n        const position = piece.location.position;\r\n        return (position.x >= (container.location.position.x - containerSprite.width / 2) &&\r\n            position.x <= (container.location.position.x + containerSprite.width / 2) &&\r\n            position.y >= (container.location.position.y - containerSprite.height / 2) &&\r\n            position.y <= (container.location.position.y + containerSprite.height / 2));\r\n    }\r\n    resetPieces(container) {\r\n        this.pieces.forEach(piece => {\r\n            if (piece.content.renderedObject.category === container.content.containerComponent.category) {\r\n                const newLocation = {\r\n                    rotation: container.location.rotation,\r\n                    position: Object.assign({}, container.location.position, { z: Math.max(piece.content.renderedObject.location.position.z, container.location.position.z + 1) })\r\n                };\r\n                piece.content.renderedObject.location = newLocation;\r\n                piece.setLocation(newLocation);\r\n            }\r\n        });\r\n        this.updateItemsAssignedToContainers();\r\n        this.updateJSONView();\r\n    }\r\n    shufflePieces(container) {\r\n        const items = this.containerToPieceMap.get(container);\r\n        if (items == null) {\r\n            throw new Error('Items were not assigned to the container');\r\n        }\r\n        Object(_random_utils__WEBPACK_IMPORTED_MODULE_9__[\"shuffle\"])(items).forEach((item, index) => item.setLocation({\r\n            rotation: item.location.rotation,\r\n            position: Object.assign({}, item.location.position, { z: index + container.location.position.z + 1 })\r\n        }));\r\n        this.updateJSONView();\r\n        this.updateItemsAssignedToContainers();\r\n    }\r\n    bringToTop(piece) {\r\n        this\r\n            .pieces\r\n            .sort((elementA, elementB) => {\r\n            const a = elementA.location.position;\r\n            const b = elementB.location.position;\r\n            if (a.z > b.z) {\r\n                return 1;\r\n            }\r\n            if (a.z < b.z) {\r\n                return -1;\r\n            }\r\n            return 0;\r\n        })\r\n            .forEach((element, index) => {\r\n            const newLocation = {\r\n                position: Object.assign({}, element.location.position, { z: index }),\r\n                rotation: element.location.rotation\r\n            };\r\n            element.setLocation(newLocation);\r\n        });\r\n        piece.setLocation({\r\n            rotation: piece.location.rotation,\r\n            position: Object.assign({}, piece.location.position, { z: this.pieces.length })\r\n        });\r\n    }\r\n    destroy() {\r\n        this.JSONView.destroy();\r\n        this.showJSONViewField.destroy();\r\n        this.saveButton.destroy();\r\n        this.root.removeChild(this.board);\r\n        this.root.removeChild(this.currentActorLabel);\r\n        this.destroyBoard();\r\n    }\r\n    destroyBoard() {\r\n        if (this.background != null) {\r\n            this.board.removeChild(this.background);\r\n        }\r\n        // this.root.removeChild(this.board)\r\n        this.pieces.forEach(element => element.destroy());\r\n        this.containers.forEach(container => container.destroy());\r\n        this.pieces = [];\r\n        this.containers = [];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/Game.ts?");

/***/ }),

/***/ "./Engine/Views/GameSelection.ts":
/*!***************************************!*\
  !*** ./Engine/Views/GameSelection.ts ***!
  \***************************************/
/*! exports provided: GameSelectionView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameSelectionView\", function() { return GameSelectionView; });\nclass GameSelectionView {\r\n    constructor(root, games, onSelect) {\r\n        this.root = root;\r\n        this.games = games;\r\n        this.onSelect = onSelect;\r\n        this.changeListener = () => {\r\n            if (this.select.value !== '') {\r\n                this.onSelect(this.select.value);\r\n            }\r\n        };\r\n        this.select = document.createElement('select');\r\n        games.forEach(game => {\r\n            const option = document.createElement('option');\r\n            option.value = game;\r\n            option.innerText = game;\r\n            this.select.appendChild(option);\r\n        });\r\n        this.select.addEventListener('change', this.changeListener);\r\n        root.appendChild(this.select);\r\n    }\r\n    destroy() {\r\n        this.select.removeEventListener('change', this.changeListener);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/GameSelection.ts?");

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

/***/ "./Engine/Views/Main.ts":
/*!******************************!*\
  !*** ./Engine/Views/Main.ts ***!
  \******************************/
/*! exports provided: MainView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MainView\", function() { return MainView; });\n/* harmony import */ var _GameSelection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameSelection */ \"./Engine/Views/GameSelection.ts\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game */ \"./Engine/Views/Game.ts\");\n\r\n\r\nclass MainView {\r\n    constructor(loader, root) {\r\n        this.loader = loader;\r\n        this.root = root;\r\n        this.Game = null;\r\n        const menuElement = document.createElement('div');\r\n        menuElement.classList.add('main-menu');\r\n        root.appendChild(menuElement);\r\n        this.gameElement = document.createElement('div');\r\n        this.gameElement.classList.add('game-view');\r\n        root.appendChild(this.gameElement);\r\n        loader\r\n            .loadJSON('games.json')\r\n            .then(gamesConfig => {\r\n            const GameSelection = new _GameSelection__WEBPACK_IMPORTED_MODULE_0__[\"GameSelectionView\"](menuElement, gamesConfig.gameFolders, game => this.selectGame(game));\r\n            const firstGame = gamesConfig.gameFolders[0];\r\n            if (firstGame == null) {\r\n                throw new Error(`No games found in games.json`);\r\n            }\r\n            this.selectGame(firstGame);\r\n        });\r\n    }\r\n    selectGame(gameId) {\r\n        if (this.Game != null) {\r\n            this.Game.destroy();\r\n        }\r\n        this.Game = new _Game__WEBPACK_IMPORTED_MODULE_1__[\"GameView\"](this.loader, gameId, this.gameElement);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/Main.ts?");

/***/ }),

/***/ "./Engine/Views/MovablePiece.ts":
/*!**************************************!*\
  !*** ./Engine/Views/MovablePiece.ts ***!
  \**************************************/
/*! exports provided: MovablePieceView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MovablePieceView\", function() { return MovablePieceView; });\n/* harmony import */ var _vector_3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vector-3 */ \"./Engine/vector-3.ts\");\n\r\nclass MovablePieceView {\r\n    constructor(root, name, location, _content, onLocationInput, bringToTop, zIndex = 0) {\r\n        this.root = root;\r\n        this.name = name;\r\n        this.location = location;\r\n        this._content = _content;\r\n        this.onLocationInput = onLocationInput;\r\n        this.bringToTop = bringToTop;\r\n        this.zIndex = zIndex;\r\n        this._showRotationHandle = false;\r\n        this.rotationInProgress = false;\r\n        this.rotationStartElementLocation = null;\r\n        this.rotationStartEventLocation = null;\r\n        this._draggingInProgress = false;\r\n        this.dragStartEventLocation = null;\r\n        this.onElementPointerDown = (event) => {\r\n            this.draggingInProgress = true;\r\n            this.dragStartEventLocation = {\r\n                x: event.pageX,\r\n                y: event.pageY\r\n            };\r\n        };\r\n        this.onRotationHandlePointerDown = (event) => {\r\n            event.stopPropagation();\r\n            const rect = this.element.getBoundingClientRect();\r\n            this.rotationStartEventLocation = {\r\n                x: event.pageX,\r\n                y: event.pageY\r\n            };\r\n            this.rotationStartElementLocation = {\r\n                x: rect.left + rect.width / 2,\r\n                y: rect.top + rect.height / 2\r\n            };\r\n            this.rotationInProgress = true;\r\n        };\r\n        this.onDocumentPointerMove = (event) => {\r\n            const updatedRotation = this.getUpdatedRotation(event);\r\n            if (updatedRotation != null) {\r\n                this.updateElementLocation({\r\n                    rotation: updatedRotation,\r\n                    position: this.location.position\r\n                });\r\n                return;\r\n            }\r\n            if (this.dragStartEventLocation == null || !this.draggingInProgress) {\r\n                return;\r\n            }\r\n            this.updateElementLocation({\r\n                rotation: this.location.rotation,\r\n                position: {\r\n                    x: this.location.position.x + event.pageX - this.dragStartEventLocation.x,\r\n                    y: this.location.position.y + event.pageY - this.dragStartEventLocation.y,\r\n                    z: this.location.position.z\r\n                }\r\n            });\r\n        };\r\n        this.onDocumentPointerDown = (event) => {\r\n            if (event.target != this.element) {\r\n                this.showRotationHandle = false;\r\n            }\r\n        };\r\n        this.onDocumentPointerUp = (event) => {\r\n            if (this.rotationInProgress) {\r\n                const updatedRotation = this.getUpdatedRotation(event);\r\n                if (updatedRotation != null) {\r\n                    this.onLocationInput({\r\n                        rotation: updatedRotation,\r\n                        position: this.location.position\r\n                    });\r\n                }\r\n                this.rotationInProgress = false;\r\n            }\r\n            if (this.dragStartEventLocation == null || !this.draggingInProgress) {\r\n                return;\r\n            }\r\n            this.showRotationHandle = true;\r\n            this.onLocationInput({\r\n                rotation: this.location.rotation,\r\n                position: Object(_vector_3__WEBPACK_IMPORTED_MODULE_0__[\"add\"])(this.location.position, {\r\n                    x: event.pageX - this.dragStartEventLocation.x,\r\n                    y: event.pageY - this.dragStartEventLocation.y,\r\n                    z: 0\r\n                })\r\n            });\r\n            this.dragStartEventLocation = null;\r\n            this.draggingInProgress = false;\r\n        };\r\n        this.element = document.createElement('div');\r\n        this.element.classList.add('movable-piece-view');\r\n        this.element.appendChild(this._content.element);\r\n        root.appendChild(this.element);\r\n        this.rotationHandle = document.createElement('div');\r\n        this.rotationHandle.classList.add('movable-piece-view__rotation-handle');\r\n        this.rotationHandle.style.display = 'none';\r\n        this.element.appendChild(this.rotationHandle);\r\n        this.element.addEventListener('pointerdown', this.onElementPointerDown);\r\n        this.rotationHandle.addEventListener('pointerdown', this.onRotationHandlePointerDown);\r\n        document.addEventListener('pointerdown', this.onDocumentPointerDown);\r\n        document.addEventListener('pointermove', this.onDocumentPointerMove);\r\n        document.addEventListener('pointerup', this.onDocumentPointerUp);\r\n        this.updateElementLocation(location);\r\n    }\r\n    get content() {\r\n        return this._content;\r\n    }\r\n    get showRotationHandle() {\r\n        return this._showRotationHandle;\r\n    }\r\n    set showRotationHandle(value) {\r\n        this.rotationHandle.style.display = value ? 'block' : 'none';\r\n        this._showRotationHandle = value;\r\n        this.updateZIndex();\r\n    }\r\n    set draggingInProgress(value) {\r\n        this._draggingInProgress = value;\r\n        if (value) {\r\n            this.showRotationHandle = value;\r\n        }\r\n    }\r\n    get draggingInProgress() {\r\n        return this._draggingInProgress;\r\n    }\r\n    updateZIndex() {\r\n        this.element.style.zIndex = this.showRotationHandle ? '10' : this.zIndex.toString();\r\n    }\r\n    getUpdatedRotation(event) {\r\n        if (this.rotationInProgress && this.rotationStartElementLocation != null && this.rotationStartEventLocation != null) {\r\n            const offset = {\r\n                x: event.pageX - this.rotationStartElementLocation.x,\r\n                y: event.pageY - this.rotationStartElementLocation.y,\r\n            };\r\n            const vectorToStartEventPosition = {\r\n                x: this.rotationStartEventLocation.x - this.rotationStartElementLocation.x,\r\n                y: this.rotationStartEventLocation.y - this.rotationStartElementLocation.y,\r\n            };\r\n            const vectorToNewEventPosition = {\r\n                x: event.pageX - this.rotationStartElementLocation.x,\r\n                y: event.pageY - this.rotationStartElementLocation.y,\r\n            };\r\n            const a = vectorToStartEventPosition;\r\n            const b = vectorToNewEventPosition;\r\n            const angle = Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x);\r\n            return this.location.rotation + Math.round(angle * 180 / Math.PI);\r\n        }\r\n    }\r\n    setLocation(location) {\r\n        this.location = location;\r\n        this.updateElementLocation(location);\r\n    }\r\n    updateElementLocation(location) {\r\n        const p = location.position;\r\n        this.element.style.transform = `translate3d(${p.x - Math.round(this.element.clientWidth / 2)}px, ${p.y - Math.round(this.element.clientHeight / 2)}px, ${p.z}px) rotateZ(${location.rotation}deg)`;\r\n    }\r\n    destroy() {\r\n        this.element.removeChild(this._content.element);\r\n        this._content.destroy();\r\n        this.element.removeEventListener('pointerdown', this.onElementPointerDown);\r\n        document.removeEventListener('pointermove', this.onDocumentPointerMove);\r\n        document.removeEventListener('pointerup', this.onDocumentPointerUp);\r\n        this.root.removeChild(this.element);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/MovablePiece.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PieceContainerView\", function() { return PieceContainerView; });\n/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container */ \"./Engine/Views/Container.ts\");\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button */ \"./Engine/Views/Button.ts\");\n/* harmony import */ var _Label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Label */ \"./Engine/Views/Label.ts\");\n\r\n\r\n\r\nclass PieceContainerView {\r\n    constructor(root, backgroundSprite, containerConfig, _itemsCount, onShuffle, onReset) {\r\n        this.root = root;\r\n        this.backgroundSprite = backgroundSprite;\r\n        this.containerConfig = containerConfig;\r\n        this._itemsCount = _itemsCount;\r\n        this.onShuffle = onShuffle;\r\n        this.onReset = onReset;\r\n        this.controls = new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](null, {\r\n            reset: new _Button__WEBPACK_IMPORTED_MODULE_1__[\"ButtonView\"](null, 'reset', () => this.onReset()),\r\n            shuffle: new _Button__WEBPACK_IMPORTED_MODULE_1__[\"ButtonView\"](null, 'shuffle', () => this.onShuffle())\r\n        }, 'piece-container-view__controls');\r\n        this.container = new _Container__WEBPACK_IMPORTED_MODULE_0__[\"ContainerView\"](this.root, {\r\n            itemsCountLabel: new _Label__WEBPACK_IMPORTED_MODULE_2__[\"LabelView\"](this.getItemsLabel(this._itemsCount), 'piece-container-view__items-count-label'),\r\n            sprite: this.backgroundSprite,\r\n            controls: this.controls\r\n        }, 'piece-container-view');\r\n    }\r\n    get containerComponent() {\r\n        return this.containerConfig;\r\n    }\r\n    set itemsCount(newValue) {\r\n        this.container.content.itemsCountLabel.text = `${newValue} items`;\r\n    }\r\n    getItemsLabel(count) {\r\n        return `${count} items`;\r\n    }\r\n    get element() {\r\n        return this.container.element;\r\n    }\r\n    destroy() {\r\n        this.container.destroy();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/Views/PieceContainer.ts?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _json_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./json-loader */ \"./Engine/json-loader.ts\");\n/* harmony import */ var _Views_Main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Views/Main */ \"./Engine/Views/Main.ts\");\n\r\n\r\nconst loader = new _json_loader__WEBPACK_IMPORTED_MODULE_0__[\"JSONLoader\"](window.location.href.substring(0, window.location.href.lastIndexOf('/')));\r\nconst root = document.getElementById('root');\r\nif (root == null) {\r\n    throw new Error('Required elements are nor found');\r\n}\r\nconst game = new _Views_Main__WEBPACK_IMPORTED_MODULE_1__[\"MainView\"](loader, root);\r\n\n\n//# sourceURL=webpack:///./Engine/index.ts?");

/***/ }),

/***/ "./Engine/json-loader.ts":
/*!*******************************!*\
  !*** ./Engine/json-loader.ts ***!
  \*******************************/
/*! exports provided: JSONLoader, loadJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"JSONLoader\", function() { return JSONLoader; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadJSON\", function() { return loadJSON; });\nclass JSONLoader {\r\n    constructor(baseUrl) {\r\n        this.baseUrl = baseUrl;\r\n    }\r\n    loadJSON(relativeUrl) {\r\n        return loadJSON(`${this.baseUrl}/${relativeUrl}`);\r\n    }\r\n}\r\nfunction loadJSON(url) {\r\n    return fetch(url).then(response => response.json());\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/json-loader.ts?");

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
/*! exports provided: add, subtract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"subtract\", function() { return subtract; });\nfunction add(a, b) {\r\n    return {\r\n        x: a.x + b.x,\r\n        y: a.y + b.y,\r\n        z: a.z + b.z\r\n    };\r\n}\r\nfunction subtract(a, b) {\r\n    return {\r\n        x: a.x - b.x,\r\n        y: a.y - b.y,\r\n        z: a.z - b.z\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./Engine/vector-3.ts?");

/***/ })

/******/ });