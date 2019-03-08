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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Models/ChatRoom.ts":
/*!********************************!*\
  !*** ./src/Models/ChatRoom.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ChatRoom = /** @class */ (function () {
    function ChatRoom(gameID, chatHistory) {
        this.gameID = gameID;
        this.chatHistory = chatHistory;
    }
    ChatRoom.prototype.getChatHistory = function () {
        return this.chatHistory;
    };
    ChatRoom.prototype.setChatHistory = function (chats) {
        this.chatHistory = chats;
    };
    return ChatRoom;
}());
exports.ChatRoom = ChatRoom;


/***/ }),

/***/ "./src/Models/ClientRoot.ts":
/*!**********************************!*\
  !*** ./src/Models/ClientRoot.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameList_1 = __webpack_require__(/*! ./GameList */ "./src/Models/GameList.ts");
var Player_1 = __webpack_require__(/*! ./Player */ "./src/Models/Player.ts");
var Session_1 = __webpack_require__(/*! ./Session */ "./src/Models/Session.ts");
var ClientRoot = /** @class */ (function () {
    function ClientRoot() {
        this.gameList = new GameList_1.GameList();
        this.myPlayer = null;
        this.lobby = null;
        this.session = new Session_1.Session();
        this.observers = new Array();
    }
    ClientRoot.prototype.attach = function (o) {
        this.observers.push(o);
    };
    ClientRoot.prototype.detach = function (o) {
    };
    ClientRoot.prototype.notify = function (updateType, data) {
        var e_1, _a;
        try {
            for (var _b = __values(this.observers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var o = _c.value;
                if (o != null) {
                    o.update(updateType, data);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ClientRoot.prototype.transitionPage = function (pageName) {
        this.session.setCurrentPage(pageName);
        this.notify("transitionPage", pageName);
    };
    ClientRoot.prototype.getGameList = function () {
        var games = this.gameList.getGames();
        return games;
    };
    ClientRoot.prototype.getGameIdForUsername = function (username) {
        var games = this.gameList.getGames();
        for (var i = 0; i < games.length; i++) {
            for (var j = 0; j < games[i].playerList.length; j++) {
                if (games[i].playerList[j].username == username) {
                    return games[i].gameID;
                }
            }
        }
    };
    ClientRoot.prototype.getPlayerList = function (gameId) {
        var game = this.gameList.findGameById(gameId);
        return game.getPlayerList();
    };
    ClientRoot.prototype.joinGame = function (gameId) {
        var game = this.gameList.findGameById(gameId);
        game.addPlayer(this.myPlayer);
        this.transitionPage("lobbyGame");
    };
    ClientRoot.prototype.getCurrentUser = function () {
        return this.myPlayer.getUsername();
    };
    ClientRoot.prototype.updateGameList = function (wasSuccessful, gameList, errorMessage) {
        if (wasSuccessful) {
            this.gameList.replaceGameList(gameList.getGames());
            this.notify("updateGameList", this.gameList);
        }
        else {
            this.notify("error", errorMessage);
        }
    };
    ClientRoot.prototype.startGame = function (gameId) {
        this.notify("startGame", gameId);
    };
    ClientRoot.prototype.loginResults = function (wasSuccessful, data) {
        if (wasSuccessful) {
            this.myPlayer = new Player_1.Player(data);
            this.session.setLoggedInUser(this.myPlayer);
            this.transitionPage("gameList");
        }
        else {
            this.notify("error", data);
        }
    };
    ClientRoot.prototype.registerResults = function (wasSuccessful, data) {
        if (wasSuccessful) {
            this.myPlayer = new Player_1.Player(data);
            this.session.setLoggedInUser(this.myPlayer);
            this.transitionPage("gameList");
        }
        else {
            this.notify("error", data);
        }
    };
    return ClientRoot;
}());
exports.ClientRoot = ClientRoot;


/***/ }),

/***/ "./src/Models/FaceUpCards.ts":
/*!***********************************!*\
  !*** ./src/Models/FaceUpCards.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FaceUpCards = /** @class */ (function () {
    function FaceUpCards(faceUpCards) {
        this.faceUpCards = faceUpCards;
    }
    FaceUpCards.prototype.getCards = function () {
        return this.faceUpCards;
    };
    //Whenever a a card is drawn, it is replaced with a new card in it's spot
    FaceUpCards.prototype.drawCard = function (index, newCard) {
        var cardDrawn = this.faceUpCards[index];
        this.faceUpCards[index] = newCard;
        return cardDrawn;
    };
    //This is for use when all 5 cards need to be replaced at once
    FaceUpCards.prototype.replaceDeck = function (newSet) {
        var oldSetofFive = this.faceUpCards;
        this.faceUpCards = newSet;
        return oldSetofFive;
    };
    FaceUpCards.prototype.isThreeOrMoreWildCard = function () {
        var e_1, _a;
        var numWild = 0;
        try {
            for (var _b = __values(this.faceUpCards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                if (card.color == "wild") {
                    numWild += 1;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (numWild >= 3) {
            return true;
        }
        else {
            return false;
        }
    };
    return FaceUpCards;
}());
exports.FaceUpCards = FaceUpCards;


/***/ }),

/***/ "./src/Models/Game.ts":
/*!****************************!*\
  !*** ./src/Models/Game.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game(players, whoseTurn, map, numDestinationCardsRemaining, numTrainCardsRemaining, faceUpCards, chatRoom) {
        this.players = players;
        this.whoseTurn = whoseTurn;
        this.map = map;
        this.numDestinationCardsRemaining = numDestinationCardsRemaining;
        this.numTrainCardsRemaining = numTrainCardsRemaining;
        this.faceUpCards = faceUpCards;
        this.chatRoom = chatRoom;
    }
    Game.prototype.checkWinCondition = function () {
        var maxPoints = 0;
        var winningPlayer = null;
        this.players.forEach(function (player) {
            var score = player.getScore();
            if (score > maxPoints) {
                maxPoints = score;
                winningPlayer = player;
            }
        });
        return winningPlayer;
    };
    Game.prototype.getChatHistory = function () {
        return this.chatRoom.getChatHistory();
    };
    Game.prototype.setChatHistory = function (chats) {
        this.chatRoom.setChatHistory(chats);
    };
    Game.prototype.getPlayerList = function () {
        return this.players;
    };
    Game.prototype.getCurrentTurnIndex = function () {
        return this.whoseTurn;
    };
    Game.prototype.getMap = function () {
        return this.map;
    };
    Game.prototype.getNumDestinationCardsRemaining = function () {
        return this.numDestinationCardsRemaining;
    };
    Game.prototype.getNumTrainCardsRemaining = function () {
        return this.numTrainCardsRemaining;
    };
    Game.prototype.getFaceUpCards = function () {
        return this.faceUpCards;
    };
    Game.prototype.claimRoute = function (player, route) {
        var username = player.getUsername;
        this.players.forEach(function (player) {
            if (player.getUsername == username) {
                player.claimRoute(route);
                return;
            }
        });
    };
    Game.prototype.useTrainCard = function (player, trainCard, numUsed) {
        var username = player.getUsername;
        this.players.forEach(function (player) {
            if (player.getUsername == username) {
                player.useTrainCard(trainCard, numUsed);
                return;
            }
        });
    };
    Game.prototype.addTrainCard = function (player, trainCard) {
        var username = player.getUsername;
        this.players.forEach(function (player) {
            if (player.getUsername == username) {
                player.drawTrainCard(trainCard);
                return;
            }
        });
    };
    Game.prototype.addDestinationCard = function (username, destinationCard) {
        this.players.forEach(function (thisPlayer) {
            if (thisPlayer.getUsername() == username) {
                thisPlayer.drawDestinationCard(destinationCard);
                return;
            }
        });
    };
    Game.prototype.setFaceUpCards = function (faceUpCards) {
        this.faceUpCards = faceUpCards;
    };
    Game.prototype.updatePlayerPoints = function (player, points) {
        var username = player.getUsername;
        this.players.forEach(function (player) {
            if (player.getUsername == username) {
                player.setScore(points);
                return;
            }
        });
    };
    Game.prototype.updateNumTrainCars = function (player, numUsed) {
        var username = player.getUsername;
        this.players.forEach(function (player) {
            if (player.getUsername == username) {
                player.setNumTrainCars(numUsed);
                return;
            }
        });
    };
    Game.prototype.setNumDestinationCardsRemaining = function (newNum) {
        this.numDestinationCardsRemaining = newNum;
    };
    Game.prototype.setNumTrainCardsRemaining = function (newNum) {
        this.numTrainCardsRemaining = newNum;
    };
    Game.prototype.setNumTrainCards = function (player, numCards) {
        var username = player.getUsername;
        this.players.forEach(function (player) {
            if (player.getUsername == username) {
                player.setNumTrainCars(numCards);
                return;
            }
        });
    };
    Game.prototype.setNumDestinationCards = function (player, numCards) {
        var username = player.getUsername;
        this.players.forEach(function (player) {
            if (player.getUsername == username) {
                player.setNumDestinationCards(numCards);
                return;
            }
        });
    };
    Game.prototype.presentDestinationCard = function (destinationCards) {
        this.potentialDestinationCards = destinationCards;
    };
    Game.prototype.discardDestinationCard = function () {
        this.potentialDestinationCards.length = 0;
    };
    Game.prototype.changeTurn = function (player) {
        var username = player.getUsername;
        this.players.forEach(function (player) {
            if (player.getUsername == username) {
                player.setTurn(true);
            }
            else {
                player.setTurn(false);
            }
        });
    };
    return Game;
}());
exports.Game = Game;


/***/ }),

/***/ "./src/Models/GameList.ts":
/*!********************************!*\
  !*** ./src/Models/GameList.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameList = /** @class */ (function () {
    function GameList() {
        this.games = new Array();
    }
    GameList.prototype.addGame = function (game) {
        this.games.push(game);
    };
    GameList.prototype.removeGame = function (gameId) {
        for (var i = this.games.length - 1; i >= 0; --i) {
            if (this.games[i].getGameID() == gameId) {
                this.games.splice(i, 1);
            }
        }
    };
    GameList.prototype.findGameById = function (gameId) {
        for (var i = 0; i < this.games.length; i++) {
            if (this.games[i].getGameID() == gameId) {
                return this.games[i];
            }
        }
    };
    GameList.prototype.replaceGameList = function (newGameList) {
        this.games = newGameList;
    };
    GameList.prototype.getGames = function () {
        return this.games;
    };
    return GameList;
}());
exports.GameList = GameList;


/***/ }),

/***/ "./src/Models/GameMap.ts":
/*!*******************************!*\
  !*** ./src/Models/GameMap.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameMap = /** @class */ (function () {
    function GameMap() {
    }
    GameMap.prototype.getRouteByIndex = function (index) {
        return this.routes[index];
    };
    return GameMap;
}());
exports.GameMap = GameMap;


/***/ }),

/***/ "./src/Models/IngameClientRoot.ts":
/*!****************************************!*\
  !*** ./src/Models/IngameClientRoot.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Models/Game.ts");
var TrainCard_1 = __webpack_require__(/*! ./TrainCard */ "./src/Models/TrainCard.ts");
var GameMap_1 = __webpack_require__(/*! ./GameMap */ "./src/Models/GameMap.ts");
var FaceUpCards_1 = __webpack_require__(/*! ./FaceUpCards */ "./src/Models/FaceUpCards.ts");
var ChatRoom_1 = __webpack_require__(/*! ./ChatRoom */ "./src/Models/ChatRoom.ts");
var IngameClientRoot = /** @class */ (function () {
    function IngameClientRoot() {
        var players = new Array();
        var whoseTurn = 0;
        var map = new GameMap_1.GameMap();
        var numDestinationCardsRemaining = 1;
        var numTrainCardsRemaining = 1;
        var trainCards = Array();
        trainCards.push(new TrainCard_1.TrainCard("green"));
        trainCards.push(new TrainCard_1.TrainCard("blue"));
        trainCards.push(new TrainCard_1.TrainCard("black"));
        trainCards.push(new TrainCard_1.TrainCard("rainbow"));
        trainCards.push(new TrainCard_1.TrainCard("blue"));
        var faceUpCards = new FaceUpCards_1.FaceUpCards(trainCards);
        var chatRoom = new ChatRoom_1.ChatRoom("", new Array());
        this.game = new Game_1.Game(players, whoseTurn, map, numDestinationCardsRemaining, numTrainCardsRemaining, faceUpCards, chatRoom);
        this.observers = new Array();
    }
    IngameClientRoot.prototype.transitionPage = function (pageName) {
        this.session.setCurrentPage(pageName);
        this.notify("transitionPage", pageName);
    };
    IngameClientRoot.prototype.notify = function (updateType, data) {
        var e_1, _a;
        try {
            for (var _b = __values(this.observers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var o = _c.value;
                if (o != null) {
                    o.update(updateType, data);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    IngameClientRoot.prototype.attach = function (o) {
        this.observers.push(o);
    };
    IngameClientRoot.prototype.detach = function (o) {
    };
    IngameClientRoot.prototype.claimRoute = function (player, route) {
        this.game.claimRoute(player, route);
    };
    /* useTrainCard(trainCard: TrainCard): void {
       this.game.useTrainCard(trainCard);
     }
   
     addTrainCard(trainCard: TrainCard): void {
       this.game.addTrainCard(trainCard);
     }*/
    IngameClientRoot.prototype.addDestinationCard = function (username, destinationCard) {
        this.game.addDestinationCard(username, destinationCard);
    };
    IngameClientRoot.prototype.checkWinCondition = function () {
        return this.game.checkWinCondition();
    };
    IngameClientRoot.prototype.getPlayerList = function () {
        return this.game.getPlayerList();
    };
    IngameClientRoot.prototype.getCurrentTurnIndex = function () {
        return this.game.getCurrentTurnIndex();
    };
    IngameClientRoot.prototype.getMap = function () {
        return this.game.getMap();
    };
    IngameClientRoot.prototype.getFaceUpCards = function () {
        return this.game.getFaceUpCards();
    };
    IngameClientRoot.prototype.getNumTrainCardsRemaining = function () {
        return this.game.getNumTrainCardsRemaining();
    };
    IngameClientRoot.prototype.getNumDestinationCardsRemaining = function () {
        return this.game.getNumDestinationCardsRemaining();
    };
    IngameClientRoot.prototype.setFaceUpCards = function (faceUpCards) {
        this.game.setFaceUpCards(faceUpCards);
        this.notify("setFaceUpCards", faceUpCards);
    };
    IngameClientRoot.prototype.updatePlayerPoints = function (player, points) {
        this.game.updatePlayerPoints(player, points);
    };
    /*removeTrainCard(trainCard: TrainCard): void {
      this.game.removeTrainCard(trainCard);
    }*/
    IngameClientRoot.prototype.updateNumTrainCars = function (player, numUsed) {
        this.game.updateNumTrainCars(player, numUsed);
    };
    IngameClientRoot.prototype.updateNumberOfDestinationCards = function (player, numCards) {
        this.game.setNumDestinationCards(player, numCards);
    };
    IngameClientRoot.prototype.setNumTrainCards = function (player, numCards) {
        this.game.setNumTrainCards(player, numCards);
    };
    IngameClientRoot.prototype.updateNumInDeck = function (newNum) {
        this.game.setNumTrainCardsRemaining(newNum);
    };
    IngameClientRoot.prototype.changeTurn = function (player) {
        this.game.changeTurn(player);
    };
    IngameClientRoot.prototype.receiveChatCommand = function (gameid, chats) {
        this.game.setChatHistory(chats);
    };
    IngameClientRoot.prototype.presentDestinationCard = function (destinationCards) {
        this.game.presentDestinationCard(destinationCards);
    };
    IngameClientRoot.prototype.discardDestinationCard = function () {
        this.game.discardDestinationCard();
    };
    IngameClientRoot.prototype.removeTrainCard = function (trainCard) {
    };
    IngameClientRoot.prototype.addTrainCard = function (trainCard) {
    };
    return IngameClientRoot;
}());
exports.IngameClientRoot = IngameClientRoot;


/***/ }),

/***/ "./src/Models/LobbyGame.ts":
/*!*********************************!*\
  !*** ./src/Models/LobbyGame.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LobbyGame = /** @class */ (function () {
    function LobbyGame(gameID, host, name, maxPlayers) {
        this.gameID = gameID;
        this.host = host;
        this.gamename = name;
        this.maxPlayer = maxPlayers;
        this.playerList = new Array();
    }
    LobbyGame.prototype.getPlayerList = function () {
        return this.playerList;
    };
    LobbyGame.prototype.getGameID = function () {
        return this.gameID;
    };
    LobbyGame.prototype.getGameName = function () {
        return this.gamename;
    };
    LobbyGame.prototype.getMaxPlayers = function () {
        return this.maxPlayer;
    };
    LobbyGame.prototype.getNumPlayers = function () {
        return this.playerList.length;
    };
    LobbyGame.prototype.addPlayer = function (player) {
        //If this would push it over the max, throw an error
        if (this.getNumPlayers() == this.maxPlayer) {
            throw Error("You already have the maximum number of Players");
        }
        this.playerList.push(player);
    };
    LobbyGame.prototype.removePlayer = function (username) {
        for (var i = this.playerList.length - 1; i >= 0; --i) {
            if (this.playerList[i].getUsername() == username) {
                this.playerList.splice(i, 1);
            }
        }
    };
    return LobbyGame;
}());
exports.LobbyGame = LobbyGame;


/***/ }),

/***/ "./src/Models/Player.ts":
/*!******************************!*\
  !*** ./src/Models/Player.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(username) {
        this.username = username;
    }
    Player.prototype.getUsername = function () {
        return this.username;
    };
    //Acts as a constructor for when actual gameplay starts
    Player.prototype.initiateGame = function (myHand, trainCards, color, numTrainCards, numDestinationCards, isOtherPlayer) {
        this.myHand = myHand;
        this.trainCars = trainCards;
        this.color = color;
        this.numTrainCards = numTrainCards;
        this.numDestinationCards = numDestinationCards;
        this.isOtherPlayer = isOtherPlayer;
        this.connectedCities = new Array();
        this.ownedRoutes = new Array();
        this.myTurn = false;
    };
    Player.prototype.claimRoute = function (route) {
        this.ownedRoutes.push(route);
        var length = route.getLength();
        if (length == 1) {
            this.score += 1;
        }
        else if (length == 2) {
            this.score += 2;
        }
        else if (length == 3) {
            this.score += 4;
        }
        else if (length == 4) {
            this.score += 7;
        }
        else if (length == 5) {
            this.score += 10;
        }
        else if (length == 6) {
            this.score += 15;
        }
    };
    Player.prototype.drawTrainCard = function (trainCard) {
        this.myHand.addTrainCard(trainCard);
    };
    Player.prototype.drawDestinationCard = function (destinationCard) {
        this.myHand.addDestinationCard(destinationCard);
    };
    Player.prototype.getScore = function () {
        return this.score;
    };
    Player.prototype.setScore = function (newScore) {
        this.score = newScore;
    };
    Player.prototype.useTrainCard = function (trainCard, numUsed) {
    };
    Player.prototype.setNumTrainCars = function (numCars) {
        this.trainCars -= numCars;
    };
    Player.prototype.setTurn = function (isMyTurn) {
        this.myTurn = isMyTurn;
    };
    Player.prototype.setNumTrainCards = function (numCards) {
        this.numTrainCards = numCards;
    };
    Player.prototype.setNumDestinationCards = function (numCards) {
        this.numDestinationCards = numCards;
    };
    return Player;
}());
exports.Player = Player;


/***/ }),

/***/ "./src/Models/Session.ts":
/*!*******************************!*\
  !*** ./src/Models/Session.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Session = /** @class */ (function () {
    function Session() {
        //this.authToken = auth;
        this.currentPage = "Login";
        this.loggedInUser = null;
    }
    Object.defineProperty(Session.prototype, "getCurrentPage", {
        /* get getAuth(): string {
              return this.authToken;
          }
      
          set setAuth(auth: string) {
              this.authToken = auth;
          }
         */
        get: function () {
            return this.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Session.prototype.setCurrentPage = function (page) {
        this.currentPage = page;
    };
    Object.defineProperty(Session.prototype, "getLoggedInUser", {
        get: function () {
            return this.loggedInUser;
        },
        enumerable: true,
        configurable: true
    });
    Session.prototype.setLoggedInUser = function (player) {
        this.loggedInUser = player;
    };
    return Session;
}());
exports.Session = Session;


/***/ }),

/***/ "./src/Models/TrainCard.ts":
/*!*********************************!*\
  !*** ./src/Models/TrainCard.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TrainCard = /** @class */ (function () {
    function TrainCard(color) {
        this.color = color;
    }
    TrainCard.prototype.getColor = function () {
        return this.color;
    };
    return TrainCard;
}());
exports.TrainCard = TrainCard;


/***/ }),

/***/ "./src/Server/ClientCommandObjects.ts":
/*!********************************************!*\
  !*** ./src/Server/ClientCommandObjects.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClientCommandObjects = /** @class */ (function () {
    function ClientCommandObjects(classNameIn, methodNameIn, paramTypesIn, paramValuesIn) {
        this._className = classNameIn;
        this._methodName = methodNameIn;
        this._paramTypes = paramTypesIn;
        this._paramValues = paramValuesIn;
    }
    return ClientCommandObjects;
}());
exports.ClientCommandObjects = ClientCommandObjects;


/***/ }),

/***/ "./src/Server/ClientCommunicator.ts":
/*!******************************************!*\
  !*** ./src/Server/ClientCommunicator.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameList_1 = __webpack_require__(/*! ../Models/GameList */ "./src/Models/GameList.ts");
var Player_1 = __webpack_require__(/*! ../Models/Player */ "./src/Models/Player.ts");
var LobbyGame_1 = __webpack_require__(/*! ../Models/LobbyGame */ "./src/Models/LobbyGame.ts");
var ClientCommunicator = /** @class */ (function () {
    function ClientCommunicator(serverUrlIn, serverPortIn, serialIn, facadeIn, inGameECFIn) {
        this.serverUrlIn = serverUrlIn;
        this.serverPortIn = serverPortIn;
        this.serialIn = serialIn;
        this.facadeIn = facadeIn;
        this.inGameECFIn = inGameECFIn;
        this.serverUrl = serverUrlIn;
        this.serverPort = serverPortIn;
        this.serializer = serialIn;
        this.clientFacade = facadeIn;
        this.inGameClientFacade = inGameECFIn;
    }
    ClientCommunicator.prototype.sendCommand = function (command) {
        var data = this.serializer.toJSON(command);
        var request = new XMLHttpRequest();
        request.open('POST', "/command", true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        var that = this;
        var serial = this.serializer;
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var result = serial.parseJSON(request.responseText);
                that.executeCommands(result);
            }
            else {
                // We reached our target server, but it returned an error
            }
        };
        request.onerror = function () {
            // There was a connection error of some sort
        };
        request.send(data);
    };
    ClientCommunicator.prototype.executeCommands = function (commands) {
        for (var i = 0; i < commands.length; i++) {
            if (commands[i]._methodName == "loginStatus") {
                this.clientFacade.loginResults(commands[i]._paramValues[0], commands[i]._paramValues[1]);
            }
            else if (commands[i]._methodName == "registerStatus") {
                this.clientFacade.registerResults(commands[i]._paramValues[0], commands[i]._paramValues[1]);
            }
            else if (commands[i]._methodName == "updateGameList") {
                var games = commands[i]._paramValues[2];
                var gameList = new GameList_1.GameList();
                for (var i_1 = 0; i_1 < games.length; i_1++) {
                    var gameID = games[i_1].gameID;
                    var name_1 = games[i_1].gamename;
                    var host = new Player_1.Player(games[i_1].host);
                    var maxPlayers = games[i_1].maxPlayer;
                    var game = new LobbyGame_1.LobbyGame(gameID, host, name_1, maxPlayers);
                    var players = games[i_1].playerList.playerList;
                    for (var j = 0; j < players.length; j++) {
                        var player = new Player_1.Player(players[j].username);
                        game.addPlayer(player);
                    }
                    gameList.addGame(game);
                }
                this.clientFacade.updateGameList(commands[i]._paramValues[0], gameList, commands[i]._paramValues[1]);
            }
            else if (commands[i]._methodName == "joinGame") {
                this.clientFacade.joinGame(commands[i]._paramValues[2]);
            }
            else if (commands[i]._methodName == "startGame") {
                this.clientFacade.startGame(commands[i]._paramValues[2]);
            }
            else if (commands[i]._methodName == "receiveChatCommand") {
                this.inGameClientFacade.receiveChatCommand(commands[i]._paramValues[0], commands[i]._paramValues[1], commands[i]._paramValues[2], commands[i]._paramValues[3]);
            }
            else if (commands[i]._methodName == "potentialDestinationCard") {
                this.inGameClientFacade.presentDestinationCard(commands[i]._paramValues[0], commands[i]._paramValues[1], commands[i]._paramValues[4]);
            }
            else if (commands[i]._methodName == "discardDestinationCard") {
                this.inGameClientFacade.discardDestinationCard(commands[i]._paramValues[0], commands[i]._paramValues[1], commands[i]._paramValues[4]);
            }
            else if (commands[i]._methodName == "drawDestinationCard") {
                this.inGameClientFacade.addDestinationCard(commands[i]._paramValues[0], commands[i]._paramValues[1], commands[i]._paramValues[3], commands[i]._paramValues[4]);
            }
        }
    };
    return ClientCommunicator;
}());
exports.ClientCommunicator = ClientCommunicator;


/***/ }),

/***/ "./src/Server/IngameServerProxy.ts":
/*!*****************************************!*\
  !*** ./src/Server/IngameServerProxy.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClientCommandObjects_1 = __webpack_require__(/*! ./ClientCommandObjects */ "./src/Server/ClientCommandObjects.ts");
//This sends commands to the Server
var IngameServerProxy = /** @class */ (function () {
    function IngameServerProxy() {
        this.serverClass = "server.ServerFacade";
        this.gameClass = "server.GameFacade";
        this.paramTypeString = "java.lang.String";
        this.paramTypeInteger = "java.lang.Integer";
        this.paramTypeDouble = "java.lang.Double";
        this.paramTypeList = "java.util.List";
        this.paramTypeDate = "java.util.Date";
    }
    IngameServerProxy.prototype.DrawDestinationCard = function (gameId, username) {
        var command = new ClientCommandObjects_1.ClientCommandObjects(this.gameClass, "drawDestinatGameFacadeionCard", [this.paramTypeString, this.paramTypeString], [gameId, username]);
        this.communicator.sendCommand(command);
    };
    IngameServerProxy.prototype.SendChat = function (message, time, username, gameId) {
        var command = new ClientCommandObjects_1.ClientCommandObjects(this.serverClass, "sendChat", [this.paramTypeString, this.paramTypeDate, this.paramTypeString, this.paramTypeString], [message, time, username, gameId]);
        this.communicator.sendCommand(command);
    };
    /**
     *
     * @param gameId
     * @param username
     * @param destinationCards
     * @return gameID, username,
     */
    IngameServerProxy.prototype.DiscardDestinationCard = function (gameId, username, destinationCards) {
        var command = new ClientCommandObjects_1.ClientCommandObjects(this.gameClass, "discardDestinationCard", [this.paramTypeString, this.paramTypeList], [gameId, username, destinationCards]);
        this.communicator.sendCommand(command);
    };
    /**
     *
     * @param gameId
     * @param username
     * @return retrieves upto three cards from the server
     */
    IngameServerProxy.prototype.PotentialDestinationCard = function (gameId, username) {
        var command = new ClientCommandObjects_1.ClientCommandObjects(this.gameClass, "potentialDestinationCard", [this.paramTypeString], [gameId, username]);
        this.communicator.sendCommand(command);
    };
    return IngameServerProxy;
}());
exports.IngameServerProxy = IngameServerProxy;


/***/ }),

/***/ "./src/Server/Poller.ts":
/*!******************************!*\
  !*** ./src/Server/Poller.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Poller = /** @class */ (function () {
    function Poller(methodIn, argsIn, frequencyIn, facadeIn) {
        this.method = methodIn;
        this.args = argsIn;
        this.frequency = frequencyIn;
        this.facade = facadeIn;
        this.polling = null;
    }
    Poller.prototype.start = function () {
        if (this.method == "getGameList") {
            var that_1 = this;
            //this.polling = setInterval(that.facade.getGameList, that.frequency);
            this.polling = setInterval(function () { that_1.facade.getGameList(); }, that_1.frequency);
        }
    };
    Poller.prototype.stop = function () {
        clearInterval(this.polling);
    };
    return Poller;
}());
exports.Poller = Poller;


/***/ }),

/***/ "./src/Server/Serializer.ts":
/*!**********************************!*\
  !*** ./src/Server/Serializer.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Serializer = /** @class */ (function () {
    function Serializer() {
    }
    Serializer.prototype.toJSON = function (command) {
        var myCommand = JSON.stringify([command]);
        return myCommand;
    };
    Serializer.prototype.parseJSON = function (command) {
        var myCommand = JSON.parse(command);
        return myCommand;
    };
    Serializer.prototype.parseJSONGames = function (games) {
        var gameList = JSON.parse(games);
        return gameList;
    };
    return Serializer;
}());
exports.Serializer = Serializer;


/***/ }),

/***/ "./src/Server/ServerProxy.ts":
/*!***********************************!*\
  !*** ./src/Server/ServerProxy.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ClientCommandObjects_1 = __webpack_require__(/*! ./ClientCommandObjects */ "./src/Server/ClientCommandObjects.ts");
//import { Serializer } from "./serializer";
var ServerProxy = /** @class */ (function () {
    function ServerProxy(commIn) {
        this.commIn = commIn;
        this.communicator = commIn;
    }
    ServerProxy.prototype.register = function (username, password, confirm) {
        var command = new ClientCommandObjects_1.ClientCommandObjects("server.ServerFacade", "register", ["java.lang.String", "java.lang.String"], [username, password]);
        this.communicator.sendCommand(command);
    };
    ServerProxy.prototype.login = function (username, password) {
        var command = new ClientCommandObjects_1.ClientCommandObjects("server.ServerFacade", "login", ["java.lang.String", "java.lang.String"], [username, password]);
        this.communicator.sendCommand(command);
    };
    ServerProxy.prototype.createGame = function (username, numPlayers, gameName) {
        var command = new ClientCommandObjects_1.ClientCommandObjects("server.ServerFacade", "createGame", ["java.lang.String", "java.lang.String", "java.lang.String"], [username, gameName, String(numPlayers)]);
        this.communicator.sendCommand(command);
    };
    ServerProxy.prototype.joinGame = function (username, gameName, gameId) {
        var command = new ClientCommandObjects_1.ClientCommandObjects("server.ServerFacade", "joinGame", ["java.lang.String", "java.lang.String"], [username, gameId]);
        this.communicator.sendCommand(command);
    };
    ServerProxy.prototype.startGame = function (gameId) {
        var command = new ClientCommandObjects_1.ClientCommandObjects("server.ServerFacade", "startGame", ["java.lang.String"], [gameId]);
        this.communicator.sendCommand(command);
    };
    ServerProxy.prototype.getGameList = function () {
        var command = new ClientCommandObjects_1.ClientCommandObjects("server.ServerFacade", "getGameList", [], []);
        this.communicator.sendCommand(command);
    };
    ServerProxy.prototype.drawDestinationCard = function (destinationCards) {
        var command = new ClientCommandObjects_1.ClientCommandObjects("server.GameFacade", "drawDestinationCard", [[]], [destinationCards]);
        this.communicator.sendCommand(command);
    };
    ServerProxy.prototype.discardDestinationCard = function (destinationCards, gameID) {
        var command = new ClientCommandObjects_1.ClientCommandObjects("server.GameFacade", "discardDestinationCard", ["java.lang.String", []], [gameID, destinationCards]);
        this.communicator.sendCommand(command);
    };
    ServerProxy.prototype.sendChat = function (message, time, username, gameID) {
        var command = new ClientCommandObjects_1.ClientCommandObjects("server.ServerFacade", "sendChat", ["java.lang.String", "java.lang.Date", "java.lang.String"], [message, time, username, gameID]);
        this.communicator.sendCommand(command);
    };
    return ServerProxy;
}());
exports.ServerProxy = ServerProxy;


/***/ }),

/***/ "./src/Services/ExternalClientFacade.ts":
/*!**********************************************!*\
  !*** ./src/Services/ExternalClientFacade.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExternalClientFacade = /** @class */ (function () {
    function ExternalClientFacade(root) {
        this.root = root;
    }
    ExternalClientFacade.prototype.loginResults = function (wasSuccessful, errorMessage) {
        this.root.loginResults(wasSuccessful, errorMessage);
    };
    ExternalClientFacade.prototype.registerResults = function (wasSuccessful, errorMessage) {
        this.root.registerResults(wasSuccessful, errorMessage);
    };
    ExternalClientFacade.prototype.updateGameList = function (wasSuccessful, games, errorMessage) {
        this.root.updateGameList(wasSuccessful, games, errorMessage);
    };
    ExternalClientFacade.prototype.transitionPage = function (pageName) {
        this.root.transitionPage(pageName);
    };
    ExternalClientFacade.prototype.getGameList = function () {
        var gameList = this.root.getGameList();
        return gameList;
    };
    ExternalClientFacade.prototype.joinGame = function (gameId) {
        this.root.joinGame(gameId);
    };
    ExternalClientFacade.prototype.startGame = function (gameId) {
        this.root.startGame(gameId);
    };
    return ExternalClientFacade;
}());
exports.ExternalClientFacade = ExternalClientFacade;


/***/ }),

/***/ "./src/Services/IngameExternalClientFacade.ts":
/*!****************************************************!*\
  !*** ./src/Services/IngameExternalClientFacade.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IngameExternalClientFacade = /** @class */ (function () {
    function IngameExternalClientFacade() {
    }
    IngameExternalClientFacade.prototype.claimRoute = function (player, route) {
        this.root.claimRoute(player, route);
    };
    /*addTrainCard(trainCard:TrainCard) {
      this.root.addTrainCard(trainCard);
    }*/
    IngameExternalClientFacade.prototype.updatePlayerPoints = function (player, points) {
        this.root.updatePlayerPoints(player, points);
    };
    /*removeTrainCard(trainCard:TrainCard) {
      this.root.removeTrainCard(trainCard);
    }*/
    IngameExternalClientFacade.prototype.updateNumTrainCards = function (player, numUsed) {
        this.root.updateNumTrainCars(player, numUsed);
    };
    IngameExternalClientFacade.prototype.updateNumTrainCars = function (player, numCars) {
        this.root.updateNumTrainCars(player, numCars);
    };
    IngameExternalClientFacade.prototype.updateNumberOfDestinationCards = function (player, numCards) {
        this.root.updateNumberOfDestinationCards(player, numCards);
    };
    IngameExternalClientFacade.prototype.setFaceUpCards = function (faceUpCards) {
        this.root.setFaceUpCards(faceUpCards);
    };
    IngameExternalClientFacade.prototype.updateNumInDeck = function (newNum) {
        this.root.updateNumInDeck(newNum);
    };
    IngameExternalClientFacade.prototype.updateNumDestinationCards = function (player, numCards) {
        this.root.updateNumberOfDestinationCards(player, numCards);
    };
    IngameExternalClientFacade.prototype.changeTurn = function (player) {
        this.root.changeTurn(player);
    };
    IngameExternalClientFacade.prototype.receiveChatCommand = function (success, errorMessage, gameid, chats) {
        //test if it was a success, and if there was an error message
        this.root.receiveChatCommand(gameid, chats);
    };
    IngameExternalClientFacade.prototype.presentDestinationCard = function (success, errorMessage, destinationCards) {
        //test if it was a success, and if there was an error message
        this.root.presentDestinationCard(destinationCards);
    };
    IngameExternalClientFacade.prototype.discardDestinationCard = function (success, errorMessage, destinationCards) {
        //test if it was a success, and if there was an error message
        this.root.discardDestinationCard();
    };
    IngameExternalClientFacade.prototype.addDestinationCard = function (success, errorMessage, username, destinationCards) {
        //test if it was a success, and if there was an error message
        for (var i = 0; i < destinationCards.length; i++) {
            this.root.addDestinationCard(username, destinationCards[i]);
        }
    };
    return IngameExternalClientFacade;
}());
exports.IngameExternalClientFacade = IngameExternalClientFacade;


/***/ }),

/***/ "./src/Services/IngameInternalClientFacade.ts":
/*!****************************************************!*\
  !*** ./src/Services/IngameInternalClientFacade.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IngameInternalClientFacade = /** @class */ (function () {
    function IngameInternalClientFacade(_proxy, _root) {
        this.proxy = _proxy;
        this.root = _root;
    }
    IngameInternalClientFacade.prototype.PresentDestinationCard = function () {
    };
    IngameInternalClientFacade.prototype.NotifyStartGame = function () {
    };
    IngameInternalClientFacade.prototype.RecieveChatCommand = function () {
    };
    IngameInternalClientFacade.prototype.DiscardDestinationCard = function () {
    };
    IngameInternalClientFacade.prototype.getFaceUpCards = function () {
        return this.root.getFaceUpCards();
    };
    IngameInternalClientFacade.prototype.getNumTrainCardsRemaining = function () {
        return this.root.getNumTrainCardsRemaining();
    };
    IngameInternalClientFacade.prototype.getNumDestinationCardsRemaining = function () {
        return this.root.getNumDestinationCardsRemaining();
    };
    return IngameInternalClientFacade;
}());
exports.IngameInternalClientFacade = IngameInternalClientFacade;


/***/ }),

/***/ "./src/Services/InternalClientFacade.ts":
/*!**********************************************!*\
  !*** ./src/Services/InternalClientFacade.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InternalClientFacade = /** @class */ (function () {
    function InternalClientFacade(proxy, root) {
        this.proxy = proxy;
        this.root = root;
    }
    InternalClientFacade.prototype.login = function (username, password) {
        this.proxy.login(username, password);
    };
    InternalClientFacade.prototype.register = function (username, password) {
        this.proxy.register(username, password, "YES");
    };
    InternalClientFacade.prototype.createGame = function (numPlayers, gameName) {
        var me = this.root.getCurrentUser();
        this.proxy.createGame(me, numPlayers, gameName);
    };
    InternalClientFacade.prototype.getGameList = function () {
        this.proxy.getGameList();
    };
    InternalClientFacade.prototype.getPlayerList = function (gameId) {
        return this.root.getPlayerList(gameId);
    };
    InternalClientFacade.prototype.getCurrentGameId = function () {
        return this.root.getGameIdForUsername(this.root.getCurrentUser());
    };
    InternalClientFacade.prototype.joinGame = function (gameName, gameId) {
        var me = this.root.getCurrentUser();
        this.proxy.joinGame(me, gameName, gameId);
    };
    InternalClientFacade.prototype.startGame = function (gameId) {
        this.proxy.startGame(gameId);
    };
    return InternalClientFacade;
}());
exports.InternalClientFacade = InternalClientFacade;


/***/ }),

/***/ "./src/ViewModels/GameListViewModel.ts":
/*!*********************************************!*\
  !*** ./src/ViewModels/GameListViewModel.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var GameListView_1 = __webpack_require__(/*! ../Views/GameListView */ "./src/Views/GameListView.tsx");
var IGameListViewModel_1 = __webpack_require__(/*! ./IGameListViewModel */ "./src/ViewModels/IGameListViewModel.ts");
var Poller_1 = __webpack_require__(/*! ../Server/Poller */ "./src/Server/Poller.ts");
var GameListViewModel = /** @class */ (function (_super) {
    __extends(GameListViewModel, _super);
    function GameListViewModel(props) {
        var _this = _super.call(this, props) || this;
        _this.update = function (updateType, data) {
            if (updateType == "transitionPage") {
                _this.props.main.setState({ "page": data });
            }
            else if (updateType == "updateGameList") {
                _this.setState({ "gameList": data });
            }
            else if (updateType == "error") {
                _this.setState({ "errorMessage": data });
            }
        };
        _this.createGameButtonPressed = function (e) {
            e.preventDefault();
            _this.props.services.createGame(_this.state.createGameNumPlayers, _this.state.createGameName);
        };
        _this.joinGameButtonPressed = function (e) {
            e.preventDefault();
            console.log(_this.state);
            var gameName = String(_this.state.gameList.games[_this.state.selectedGame].gamename);
            var gameId = String(_this.state.gameList.games[_this.state.selectedGame].gameID);
            _this.props.services.joinGame(gameName, gameId);
        };
        _this.tableRowPressed = function (index) {
            _this.setState({ selectedGame: index });
        };
        _this.onCreateGameNameChange = function (e) {
            _this.setState({ createGameName: e.target.value });
        };
        _this.onCreateGameNumPlayersChange = function (e) {
            _this.setState({ createGameNumPlayers: e.target.value });
        };
        _this.isJoinGameButtonDisabled = function () {
            return _this.state.selectedGame != -1;
        };
        _this.state = IGameListViewModel_1.initialState;
        _this.props.services.getGameList();
        _this.poller = new Poller_1.Poller("getGameList", [], 2000, _this.props.services);
        _this.poller.start();
        return _this;
    }
    GameListViewModel.prototype.componentWillUnmount = function () {
        this.poller.stop();
    };
    GameListViewModel.prototype.render = function () {
        return GameListView_1.GameListView(this);
    };
    return GameListViewModel;
}(React.Component));
exports.GameListViewModel = GameListViewModel;


/***/ }),

/***/ "./src/ViewModels/GameLobbyViewModel.ts":
/*!**********************************************!*\
  !*** ./src/ViewModels/GameLobbyViewModel.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var GameLobbyView_1 = __webpack_require__(/*! ../Views/GameLobbyView */ "./src/Views/GameLobbyView.tsx");
var IGameLobbyViewModel_1 = __webpack_require__(/*! ./IGameLobbyViewModel */ "./src/ViewModels/IGameLobbyViewModel.ts");
var Poller_1 = __webpack_require__(/*! ../Server/Poller */ "./src/Server/Poller.ts");
var GameLobbyViewModel = /** @class */ (function (_super) {
    __extends(GameLobbyViewModel, _super);
    function GameLobbyViewModel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = IGameLobbyViewModel_1.initialState;
        _this.update = function (updateType, data) {
            if (updateType == "transitionPage") {
                _this.props.main.setState({ "page": data });
            }
            else if (updateType == "updateGameList") {
                _this.setState({ "playerList": _this.props.services.getPlayerList(_this.gameId) });
            }
        };
        _this.startGameButtonPressed = function (e) {
            e.preventDefault();
            alert("starting game...");
        };
        _this.gameId = _this.props.services.getCurrentGameId();
        _this.state = {
            playerList: _this.props.services.getPlayerList(_this.gameId)
        };
        _this.props.services.getGameList();
        _this.poller = new Poller_1.Poller("getGameList", [], 2000, _this.props.services);
        _this.poller.start();
        return _this;
    }
    GameLobbyViewModel.prototype.render = function () {
        return GameLobbyView_1.GameLobbyView(this);
    };
    return GameLobbyViewModel;
}(React.Component));
exports.GameLobbyViewModel = GameLobbyViewModel;


/***/ }),

/***/ "./src/ViewModels/GameViewModel.ts":
/*!*****************************************!*\
  !*** ./src/ViewModels/GameViewModel.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/awesome-typescript-loader/dist/entry.js):\nError: ENOENT: no such file or directory, open '/home/jordan/IdeaProjects/TicketToRide/client/src/ViewModels/GameViewModel.ts'");

/***/ }),

/***/ "./src/ViewModels/IGameListViewModel.ts":
/*!**********************************************!*\
  !*** ./src/ViewModels/IGameListViewModel.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameList_1 = __webpack_require__(/*! ../Models/GameList */ "./src/Models/GameList.ts");
var initialGameList = new GameList_1.GameList();
exports.initialState = {
    gameList: initialGameList,
    selectedGame: -1,
    createGameName: "",
    createGameNumPlayers: 0,
    errorMessage: ""
};


/***/ }),

/***/ "./src/ViewModels/IGameLobbyViewModel.ts":
/*!***********************************************!*\
  !*** ./src/ViewModels/IGameLobbyViewModel.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var initialPlayerList = [];
exports.initialState = {
    playerList: initialPlayerList
};


/***/ }),

/***/ "./src/ViewModels/ILoginRegisterViewModel.ts":
/*!***************************************************!*\
  !*** ./src/ViewModels/ILoginRegisterViewModel.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = {
    loginUserName: "",
    loginPassword: "",
    registerUserName: "",
    registerPassword: "",
    registerConfirmPassword: "",
    errorMessage: ""
};


/***/ }),

/***/ "./src/ViewModels/LoginRegisterViewModel.ts":
/*!**************************************************!*\
  !*** ./src/ViewModels/LoginRegisterViewModel.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var LoginRegisterView_1 = __webpack_require__(/*! ../Views/LoginRegisterView */ "./src/Views/LoginRegisterView.tsx");
var ILoginRegisterViewModel_1 = __webpack_require__(/*! ./ILoginRegisterViewModel */ "./src/ViewModels/ILoginRegisterViewModel.ts");
var LoginRegisterViewModel = /** @class */ (function (_super) {
    __extends(LoginRegisterViewModel, _super);
    function LoginRegisterViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = ILoginRegisterViewModel_1.initialState;
        _this.update = function (updateType, data) {
            if (updateType == "transitionPage") {
                _this.props.main.setState({ "page": data });
            }
            else if (updateType == "error") {
                _this.setState({ "errorMessage": data });
            }
        };
        _this.onLoginButtonPressed = function (e) {
            e.preventDefault();
            _this.props.services.login(_this.state.loginUserName, _this.state.loginPassword);
        };
        _this.onRegisterButtonPressed = function (e) {
            e.preventDefault();
            _this.props.services.register(_this.state.registerUserName, _this.state.registerPassword);
        };
        _this.onLoginUserNameChange = function (e) {
            _this.setState({ "loginUserName": e.target.value });
        };
        _this.onLoginPasswordChange = function (e) {
            _this.setState({ "loginPassword": e.target.value });
        };
        _this.onRegisterUserNameChange = function (e) {
            _this.setState({ "registerUserName": e.target.value });
        };
        _this.onRegisterPasswordChange = function (e) {
            _this.setState({ "registerPassword": e.target.value });
        };
        _this.onRegisterConfirmPasswordChange = function (e) {
            _this.setState({ "registerConfirmPassword": e.target.value });
        };
        return _this;
    }
    LoginRegisterViewModel.prototype.render = function () {
        return LoginRegisterView_1.LoginRegisterView(this);
    };
    return LoginRegisterViewModel;
}(React.Component));
exports.LoginRegisterViewModel = LoginRegisterViewModel;


/***/ }),

/***/ "./src/Views/GameListView.tsx":
/*!************************************!*\
  !*** ./src/Views/GameListView.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
exports.GameListView = function (component) {
    var rows = [];
    var gameList = component.state.gameList.getGames();
    var _loop_1 = function (i) {
        rows.push(React.createElement("tr", { onClick: function () { return component.tableRowPressed(i); }, className: component.state.selectedGame == i ? "active" : "", key: i },
            React.createElement("td", null, gameList[i].getGameID()),
            React.createElement("td", null, gameList[i].getGameName()),
            React.createElement("td", null, gameList[i].getMaxPlayers()),
            React.createElement("td", null,
                gameList[i].getNumPlayers(),
                "/",
                gameList[i].maxPlayer)));
    };
    for (var i = 0; i < gameList.length; i++) {
        _loop_1(i);
    }
    return (React.createElement("div", { className: "view" },
        React.createElement("p", null, component.state.errorMessage),
        React.createElement("div", { className: "half-partition" },
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "#"),
                        React.createElement("th", null, "Name"),
                        React.createElement("th", null, "Players"),
                        React.createElement("th", null, "In-Game")),
                    rows)),
            React.createElement("p", null,
                React.createElement("button", { onClick: component.joinGameButtonPressed, disabled: component.state.selectedGame == -1 }, "Join Game"))),
        React.createElement("div", { className: "half-partition" },
            React.createElement("form", { onSubmit: component.createGameButtonPressed },
                React.createElement("p", null,
                    React.createElement("label", null,
                        "Name:",
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", value: component.state.createGameName, onChange: component.onCreateGameNameChange }))),
                React.createElement("p", null,
                    React.createElement("label", null,
                        "Number of players:",
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", value: component.state.createGameNumPlayers, onChange: component.onCreateGameNumPlayersChange }))),
                React.createElement("input", { type: "submit", value: "Create Game", className: "wide-button" })))));
};


/***/ }),

/***/ "./src/Views/GameLobbyView.tsx":
/*!*************************************!*\
  !*** ./src/Views/GameLobbyView.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
exports.GameLobbyView = function (component) {
    var players = [];
    var playerList = component.state.playerList;
    for (var i = 0; i < playerList.length; i++) {
        players.push(React.createElement("li", { key: i }, playerList[i].username));
    }
    return (React.createElement("div", { className: "view" },
        React.createElement("div", { className: "half-partition" },
            React.createElement("p", null,
                React.createElement("b", null,
                    React.createElement("u", null, "Players"))),
            React.createElement("ul", null, players),
            React.createElement("p", null,
                React.createElement("button", { onClick: component.startGameButtonPressed, disabled: playerList.length < 2 }, "Start Game")))));
};


/***/ }),

/***/ "./src/Views/LoginRegisterView.tsx":
/*!*****************************************!*\
  !*** ./src/Views/LoginRegisterView.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
exports.LoginRegisterView = function (component) {
    return (React.createElement("div", { className: "view" },
        React.createElement("p", null, component.state.errorMessage),
        React.createElement("div", { className: "half-partition" },
            React.createElement("h1", null, "Login"),
            React.createElement("form", { onSubmit: component.onLoginButtonPressed },
                React.createElement("p", null,
                    React.createElement("label", null,
                        "User Name:",
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", name: "login-username", value: component.state.loginUserName, onChange: component.onLoginUserNameChange }))),
                React.createElement("p", null,
                    React.createElement("label", null,
                        "Password:",
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", name: "login-password", value: component.state.loginPassword, onChange: component.onLoginPasswordChange }))),
                React.createElement("p", null,
                    React.createElement("input", { type: "submit", value: "Log in" })))),
        React.createElement("div", { className: "half-partition" },
            React.createElement("h1", null, "Register"),
            React.createElement("form", { onSubmit: component.onRegisterButtonPressed },
                React.createElement("p", null,
                    React.createElement("label", null,
                        "User Name:",
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", name: "register-username", value: component.state.registerUserName, onChange: component.onRegisterUserNameChange }))),
                React.createElement("p", null,
                    React.createElement("label", null,
                        "Password:",
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", name: "register-password", value: component.state.registerPassword, onChange: component.onRegisterPasswordChange }))),
                React.createElement("p", null,
                    React.createElement("label", null,
                        "Confirm password:",
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", name: "register-confirm-password", value: component.state.registerConfirmPassword, onChange: component.onRegisterConfirmPasswordChange }))),
                React.createElement("input", { type: "submit", value: "Register" })))));
};


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
var LoginRegisterViewModel_1 = __webpack_require__(/*! ./ViewModels/LoginRegisterViewModel */ "./src/ViewModels/LoginRegisterViewModel.ts");
var GameListViewModel_1 = __webpack_require__(/*! ./ViewModels/GameListViewModel */ "./src/ViewModels/GameListViewModel.ts");
var GameLobbyViewModel_1 = __webpack_require__(/*! ./ViewModels/GameLobbyViewModel */ "./src/ViewModels/GameLobbyViewModel.ts");
var GameViewModel_1 = __webpack_require__(/*! ./ViewModels/GameViewModel */ "./src/ViewModels/GameViewModel.ts");
var ClientCommunicator_1 = __webpack_require__(/*! ./Server/ClientCommunicator */ "./src/Server/ClientCommunicator.ts");
var Serializer_1 = __webpack_require__(/*! ./Server/Serializer */ "./src/Server/Serializer.ts");
var ExternalClientFacade_1 = __webpack_require__(/*! ./Services/ExternalClientFacade */ "./src/Services/ExternalClientFacade.ts");
var ClientRoot_1 = __webpack_require__(/*! ./Models/ClientRoot */ "./src/Models/ClientRoot.ts");
var InternalClientFacade_1 = __webpack_require__(/*! ./Services/InternalClientFacade */ "./src/Services/InternalClientFacade.ts");
var ServerProxy_1 = __webpack_require__(/*! ./Server/ServerProxy */ "./src/Server/ServerProxy.ts");
var IngameClientRoot_1 = __webpack_require__(/*! ./Models/IngameClientRoot */ "./src/Models/IngameClientRoot.ts");
var IngameInternalClientFacade_1 = __webpack_require__(/*! ./Services/IngameInternalClientFacade */ "./src/Services/IngameInternalClientFacade.ts");
var IngameExternalClientFacade_1 = __webpack_require__(/*! ./Services/IngameExternalClientFacade */ "./src/Services/IngameExternalClientFacade.ts");
var IngameServerProxy_1 = __webpack_require__(/*! ./Server/IngameServerProxy */ "./src/Server/IngameServerProxy.ts");
exports.initialState = {
    "page": "game"
};
var MainComponent = /** @class */ (function (_super) {
    __extends(MainComponent, _super);
    function MainComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = exports.initialState;
        _this.loginRegisterViewModel = React.createElement(LoginRegisterViewModel_1.LoginRegisterViewModel, { ref: function (instance) { return _this.props.root.attach(instance); }, main: _this, services: _this.props.services });
        _this.gameListViewModel = React.createElement(GameListViewModel_1.GameListViewModel, { ref: function (instance) { return _this.props.root.attach(instance); }, main: _this, services: _this.props.services });
        _this.gameLobbyViewModel = React.createElement(GameLobbyViewModel_1.GameLobbyViewModel, { ref: function (instance) { return _this.props.root.attach(instance); }, main: _this, services: _this.props.services });
        _this.gameViewModel = React.createElement(GameViewModel_1.GameViewModel, { ref: function (instance) { return _this.props.root.attach(instance); }, main: _this, services: _this.props.ingameServices });
        return _this;
    }
    MainComponent.prototype.render = function () {
        if (this.state.page == "loginRegister") {
            return this.loginRegisterViewModel;
        }
        else if (this.state.page == "game") {
            return this.gameViewModel;
        }
        else if (this.state.page == "gameList") {
            return this.gameListViewModel;
        }
        else if (this.state.page == "lobbyGame") {
            return this.gameLobbyViewModel;
        }
        else {
            return React.createElement("p", null,
                "Page ",
                this.state.page,
                " not found.");
        }
    };
    return MainComponent;
}(React.Component));
var root = new ClientRoot_1.ClientRoot();
var externalClientFacade = new ExternalClientFacade_1.ExternalClientFacade(root);
var ingameExternalClientFacade = new IngameExternalClientFacade_1.IngameExternalClientFacade();
var serializer = new Serializer_1.Serializer();
var clientCommunicator = new ClientCommunicator_1.ClientCommunicator("localhost", "8080", serializer, externalClientFacade, ingameExternalClientFacade);
var serverProxy = new ServerProxy_1.ServerProxy(clientCommunicator);
var internalClientFacade = new InternalClientFacade_1.InternalClientFacade(serverProxy, root);
var ingameServerProxy = new IngameServerProxy_1.IngameServerProxy();
var ingameRoot = new IngameClientRoot_1.IngameClientRoot();
var ingameInternalClientFacade = new IngameInternalClientFacade_1.IngameInternalClientFacade(ingameServerProxy, ingameRoot);
ReactDOM.render(React.createElement(MainComponent, { services: internalClientFacade, ingameServices: ingameInternalClientFacade, ingameRoot: ingameRoot, root: root }), document.getElementById("example"));


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map