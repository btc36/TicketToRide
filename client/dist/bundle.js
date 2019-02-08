!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=React},function(e,t,n){"use strict";var a,r=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var l=n(0),o=n(2),s=n(3),i=n(6),u=n(9);t.initialState={page:"loginRegister"};var c=function(e){function n(n){var a=e.call(this,n)||this;return a.state=t.initialState,a}return r(n,e),n.prototype.render=function(){return"loginRegister"==this.state.page?l.createElement(s.default,{main:this}):"gameList"==this.state.page?l.createElement(i.default,{main:this}):"gameLobby"==this.state.page?l.createElement(u.default,{main:this}):void 0},n}(l.Component);o.render(l.createElement(c,null),document.getElementById("example"))},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";var a,r=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var l=n(0),o=n(4),s=n(5),i=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state=s.initialState,t.update=function(e,n){"transitionPage"==e&&t.props.main.setState({page:n})},t.onLoginButtonPressed=function(e){e.preventDefault(),alert(t.state.loginUserName+"\n"+t.state.loginPassword)},t.onRegisterButtonPressed=function(e){e.preventDefault(),alert(t.state.registerUserName+"\n"+t.state.registerPassword+"\n"+t.state.registerConfirmPassword)},t.onLoginUserNameChange=function(e){t.setState({loginUserName:e.target.value})},t.onLoginPasswordChange=function(e){t.setState({loginPassword:e.target.value})},t.onRegisterUserNameChange=function(e){t.setState({registerUserName:e.target.value})},t.onRegisterPasswordChange=function(e){t.setState({registerPassword:e.target.value})},t.onRegisterConfirmPasswordChange=function(e){t.setState({registerConfirmPassword:e.target.value})},t}return r(t,e),t.prototype.render=function(){return o.default(this)},t}(l.Component);t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0);t.default=function(e){return a.createElement("div",{className:"view"},a.createElement("div",{className:"half-partition"},a.createElement("h1",null,"Login"),a.createElement("form",{onSubmit:e.onLoginButtonPressed},a.createElement("p",null,a.createElement("label",null,"User Name:",a.createElement("br",null),a.createElement("input",{type:"text",name:"login-username",value:e.state.loginUserName,onChange:e.onLoginUserNameChange}))),a.createElement("p",null,a.createElement("label",null,"Password:",a.createElement("br",null),a.createElement("input",{type:"text",name:"login-password",value:e.state.loginPassword,onChange:e.onLoginPasswordChange}))),a.createElement("p",null,a.createElement("input",{type:"submit",value:"Log in"})))),a.createElement("div",{className:"half-partition"},a.createElement("h1",null,"Register"),a.createElement("form",{onSubmit:e.onRegisterButtonPressed},a.createElement("p",null,a.createElement("label",null,"User Name:",a.createElement("br",null),a.createElement("input",{type:"text",name:"register-username",value:e.state.registerUserName,onChange:e.onRegisterUserNameChange}))),a.createElement("p",null,a.createElement("label",null,"Password:",a.createElement("br",null),a.createElement("input",{type:"text",name:"register-password",value:e.state.registerPassword,onChange:e.onRegisterPasswordChange}))),a.createElement("p",null,a.createElement("label",null,"Confirm password:",a.createElement("br",null),a.createElement("input",{type:"text",name:"register-confirm-password",value:e.state.registerConfirmPassword,onChange:e.onRegisterConfirmPasswordChange}))),a.createElement("input",{type:"submit",value:"Register"}))))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initialState={loginUserName:"",loginPassword:"",registerUserName:"",registerPassword:"",registerConfirmPassword:"",errorMessage:""}},function(e,t,n){"use strict";var a,r=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var l=n(0),o=n(7),s=n(8),i=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state=s.initialState,t.update=function(e,n){"transitionPage"==e&&t.props.main.setState({page:n})},t.createGameButtonPressed=function(e){e.preventDefault(),alert(t.state.createGameName+"\n"+t.state.createGameNumPlayers)},t.joinGameButtonPressed=function(e){e.preventDefault(),alert("join game: "+t.state.gameList[t.state.selectedGame].id)},t.tableRowPressed=function(e){t.setState({selectedGame:e})},t.onCreateGameNameChange=function(e){t.setState({createGameName:e.target.value})},t.onCreateGameNumPlayersChange=function(e){t.setState({createGameNumPlayers:e.target.value})},t.isJoinGameButtonDisabled=function(){return-1!=t.state.selectedGame},t}return r(t,e),t.prototype.render=function(){return o.default(this)},t}(l.Component);t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0);t.default=function(e){for(var t=[],n=e.state.gameList,r=function(r){t.push(a.createElement("tr",{onClick:function(){return e.tableRowPressed(r)},className:e.state.selectedGame==r?"active":"",key:r},a.createElement("td",null,n[r].id),a.createElement("td",null,n[r].name),a.createElement("td",null,n[r].maxPlayers),a.createElement("td",null,n[r].activePlayers,"/",n[r].maxPlayers)))},l=0;l<n.length;l++)r(l);return a.createElement("div",{className:"view"},a.createElement("div",{className:"half-partition"},a.createElement("table",null,a.createElement("tbody",null,a.createElement("tr",null,a.createElement("th",null,"#"),a.createElement("th",null,"Name"),a.createElement("th",null,"Players"),a.createElement("th",null,"In-Game")),t)),a.createElement("p",null,a.createElement("button",{onClick:e.joinGameButtonPressed,disabled:-1==e.state.selectedGame},"Join Game"))),a.createElement("div",{className:"half-partition"},a.createElement("form",{onSubmit:e.createGameButtonPressed},a.createElement("p",null,a.createElement("label",null,"Name:",a.createElement("br",null),a.createElement("input",{type:"text",value:e.state.createGameName,onChange:e.onCreateGameNameChange}))),a.createElement("p",null,a.createElement("label",null,"Number of players:",a.createElement("br",null),a.createElement("input",{type:"text",value:e.state.createGameNumPlayers,onChange:e.onCreateGameNumPlayersChange}))),a.createElement("input",{type:"submit",value:"Create Game",className:"wide-button"}))))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.initialState={gameList:[{id:0,name:"Name numero uno",maxPlayers:3,activePlayers:0},{id:1,name:"Dos tacos amigo",maxPlayers:4,activePlayers:1},{id:2,name:"Tres musketeers",maxPlayers:2,activePlayers:2}],selectedGame:-1,createGameName:"",createGameNumPlayers:""}},function(e,t,n){"use strict";var a,r=this&&this.__extends||(a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var l=n(0),o=n(10),s=n(11),i=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state=s.initialState,t.update=function(e,n){"transitionPage"==e&&t.props.main.setState({page:n})},t.startGameButtonPressed=function(e){e.preventDefault(),alert("starting game...")},t}return r(t,e),t.prototype.render=function(){return o.default(this)},t}(l.Component);t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0);t.default=function(e){for(var t=[],n=e.state.playerList,r=0;r<n.length;r++)t.push(a.createElement("li",null,n[r]));return a.createElement("div",{className:"view"},a.createElement("div",{className:"half-partition"},a.createElement("p",null,a.createElement("b",null,a.createElement("u",null,"Players"))),a.createElement("ul",null,t),a.createElement("p",null,a.createElement("button",{onClick:e.startGameButtonPressed,disabled:n.length<2},"Start Game"))))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.initialState={playerList:[]}}]);
//# sourceMappingURL=bundle.js.map