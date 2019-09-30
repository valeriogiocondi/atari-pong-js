"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 *	MATHEMATICS
 */
var Mathematics =
/*#__PURE__*/
function () {
  function Mathematics() {
    _classCallCheck(this, Mathematics);
  }

  _createClass(Mathematics, null, [{
    key: "getNum",
    value: function getNum(str) {
      return parseInt(str.substr(0, str.length - 2));
    }
  }]);

  return Mathematics;
}();
/*
 *	GAME
 */


var Game =
/*#__PURE__*/
function () {
  function Game() {
    _classCallCheck(this, Game);

    this.isPause = 0;
    this.numGames = 0;
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      this.isPause = 0;

      if (this.numGames % 2 == 0) {
        ball.directionX = 'sx';
        ball.moveLeft(tab1, tab2);
      } else {
        ball.directionX = 'dx';
        ball.moveRight(tab1, tab2);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.isPause = 1;
      this.numGames += 1;
      game = this;
      setTimeout(function () {
        ball.init();
        tab1.init();
        tab2.init();
        game.start();
      }, 1500);
      sound('game-over');
    }
  }, {
    key: "pause",
    value: function pause() {
      this.isPause = 1;
    }
  }, {
    key: "restart",
    value: function restart() {
      this.isPause = 0;
      if (this.numGames % 2 == 0) ball.moveLeft(tab1, tab2);else ball.moveRight(tab1, tab2);
    }
  }], [{
    key: "getWidth",
    value: function getWidth() {
      return window.innerWidth;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return window.innerHeight;
    }
  }]);

  return Game;
}();
/*
 *	AREA
 */


var Area =
/*#__PURE__*/
function () {
  function Area() {
    _classCallCheck(this, Area);

    this.css = document.getElementById('area');
    this.messageArea = document.getElementById('message');
    this.init();
  }

  _createClass(Area, [{
    key: "init",
    value: function init() {
      this.areaLimitHeight = [0, Game.getHeight()];
      this.areaLimitWidth = [0, Game.getWidth()];
      this.css.style.width = this.getRightLimit() + "px";
      this.css.style.height = this.getBottomLimit() + "px";
    }
  }, {
    key: "getTopLimit",
    value: function getTopLimit() {
      return this.areaLimitHeight[0];
    }
  }, {
    key: "getBottomLimit",
    value: function getBottomLimit() {
      return this.areaLimitHeight[1];
    }
  }, {
    key: "getLeftLimit",
    value: function getLeftLimit() {
      return this.areaLimitWidth[0];
    }
  }, {
    key: "getRightLimit",
    value: function getRightLimit() {
      return this.areaLimitWidth[1];
    }
  }]);

  return Area;
}();
/*
 *	TABS
 */


var Tab =
/*#__PURE__*/
function () {
  function Tab() {
    _classCallCheck(this, Tab);

    this.score = 0;
    this.moveGapTab = 20;
  }

  _createClass(Tab, [{
    key: "getScore",
    value: function getScore() {
      return this.score;
    }
  }, {
    key: "setScore",
    value: function setScore(point) {
      this.score += point;
    }
  }, {
    key: "getRightSide",
    value: function getRightSide() {
      return Mathematics.getNum(this.css.style.width);
    }
  }, {
    key: "getTopSide",
    value: function getTopSide() {
      return Mathematics.getNum(this.css.style.top);
    }
  }, {
    key: "getBottomSide",
    value: function getBottomSide() {
      return Mathematics.getNum(this.css.style.top) + Mathematics.getNum(this.css.style.height);
    }
  }, {
    key: "getMiddlePoint",
    value: function getMiddlePoint() {
      return this.getTopSide() + Mathematics.getNum(this.css.style.height) / 2;
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      this.setPosition(-this.moveGapTab);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.setPosition(+this.moveGapTab);
    }
  }, {
    key: "setPosition",
    value: function setPosition(gap) {
      var margin = Mathematics.getNum(this.css.style.top) + gap;
      if (margin > areaObj.getTopLimit() && margin < areaObj.getBottomLimit()) this.css.style.top = margin + "px";
    }
  }, {
    key: "scoreUpdate",
    value: function scoreUpdate(point) {
      this.setScore(point);
      this.messageScore.innerHTML = this.getScore();
    }
  }]);

  return Tab;
}();

var Tab1 =
/*#__PURE__*/
function (_Tab) {
  _inherits(Tab1, _Tab);

  function Tab1() {
    var _this;

    _classCallCheck(this, Tab1);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tab1).call(this));
    _this.keyList = [83, 88];
    _this.css = document.getElementById('tab1');
    _this.messageScore = document.getElementById('score-tab1');

    _this.init();

    return _this;
  }

  _createClass(Tab1, [{
    key: "init",
    value: function init() {
      this.css.style.width = "15px";
      this.css.style.height = "80px";
      this.css.style.top = areaObj.getBottomLimit() / 2 - Mathematics.getNum(this.css.style.height) / 2 + 'px';
      this.css.style.left = "0px";
    }
  }, {
    key: "getLeftSide",
    value: function getLeftSide() {
      return Mathematics.getNum(this.css.style.left);
    }
  }]);

  return Tab1;
}(Tab);

var Tab2 =
/*#__PURE__*/
function (_Tab2) {
  _inherits(Tab2, _Tab2);

  function Tab2() {
    var _this2;

    _classCallCheck(this, Tab2);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Tab2).call(this));
    _this2.keyList = [37, 39];
    _this2.css = document.getElementById('tab2');
    _this2.messageScore = document.getElementById('score-tab2');

    _this2.init();

    return _this2;
  }

  _createClass(Tab2, [{
    key: "init",
    value: function init() {
      this.css.style.width = "15px";
      this.css.style.height = "80px";
      this.css.style.top = areaObj.getBottomLimit() / 2 - Mathematics.getNum(this.css.style.height) / 2 + 'px';
      this.css.style.right = "0px";
    }
  }, {
    key: "getLeftSide",
    value: function getLeftSide() {
      return areaObj.getRightLimit() - Mathematics.getNum(this.css.style.width);
    }
  }]);

  return Tab2;
}(Tab);
/*
 *	BALL
 */


var Ball =
/*#__PURE__*/
function () {
  function Ball() {
    _classCallCheck(this, Ball);

    this.css = document.getElementById('ball');
    this.init();
  }

  _createClass(Ball, [{
    key: "init",
    value: function init() {
      this.ballDestX = 0;
      this.ballDestY = this.css.style.top;
      this.directionX = 'sx';
      this.directionY = 'top';
      this.moveGapBall = 3;
      this.coeff = 0;
      this.css.style.width = "20px";
      this.css.style.height = "20px";
      this.css.style.top = parseInt(Game.getHeight() / 2) + "px";
      this.css.style.left = parseInt(Game.getWidth() / 2) + "px";
    }
  }, {
    key: "getLeftSide",
    value: function getLeftSide() {
      return Mathematics.getNum(this.css.style.left);
    }
  }, {
    key: "getRightSide",
    value: function getRightSide() {
      return Mathematics.getNum(this.css.style.left) + Mathematics.getNum(this.css.style.width);
    }
  }, {
    key: "getTopSide",
    value: function getTopSide() {
      return Mathematics.getNum(this.css.style.top);
    }
  }, {
    key: "getMiddlePoint",
    value: function getMiddlePoint() {
      return Mathematics.getNum(this.css.style.top) - Mathematics.getNum(this.css.style.height) / 2;
    }
  }, {
    key: "getBottomSide",
    value: function getBottomSide() {
      return Mathematics.getNum(this.css.style.top) + Mathematics.getNum(this.css.style.height);
    }
  }, {
    key: "stepToLeft",
    value: function stepToLeft() {
      // WHEN BALL AND TAB HAS TOUCH
      if (this.coeff != 0) {
        // moving vertically
        if (this.directionY == 'top') this.css.style.top = this.getTopSide() - parseInt(this.moveGapBall + 1 / Math.abs(this.coeff)) + "px";else this.css.style.top = this.getTopSide() + parseInt(this.moveGapBall + 1 / Math.abs(this.coeff)) + "px"; // moving horizzontally

        this.css.style.left = Mathematics.getNum(this.css.style.left) - this.moveGapBall + "px";
      } else {
        // moving just horizzontally
        this.css.style.left = Mathematics.getNum(this.css.style.left) - this.moveGapBall + "px";
      }
    }
  }, {
    key: "stepToRight",
    value: function stepToRight() {
      // WHEN BALL AND TAB HAS TOUCH
      if (this.coeff != 0) {
        // moving vertically
        if (this.directionY == 'top') this.css.style.top = this.getTopSide() - parseInt(this.moveGapBall + 1 / Math.abs(this.coeff)) + "px";else this.css.style.top = this.getTopSide() + parseInt(this.moveGapBall + 1 / Math.abs(this.coeff)) + "px"; // moving horizzontally

        this.css.style.left = Mathematics.getNum(this.css.style.left) + this.moveGapBall + "px";
      } else {
        // moving just horizzontally
        this.css.style.left = Mathematics.getNum(this.css.style.left) + this.moveGapBall + "px";
      }
    }
  }, {
    key: "getDestination",
    value: function getDestination() {
      if (this.ballDestX === '') this.ballDestX = 0;
      if (this.ballDestY === '') this.ballDestY = 0;
      return [this.ballDestX, this.ballDestY, this.directionX, this.directionY];
    }
  }, {
    key: "setDestination",
    value: function setDestination(destX, destY, dirX, dirY) {
      if (destX) this.ballDestX = destX;
      if (destY) this.ballDestY = destY;
      if (dirX) this.directionX = dirX;
      if (dirY) this.directionY = dirY;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft(tab1, tab2) {
      var side = this.getLeftSide();
      var speed = 0;
      var ball = this; // BALL is moving
      // CHECK!!!!

      if (!game.isPause
      /*side > areaObj.getLeftLimit() || */

      /*&& side >= tab1.getRightSide()*/
      ) {
          setTimeout(function () {
            var dest = ball.getDestination();

            if (dest[2] === 'sx' && ball.getLeftSide() > tab1.getRightSide()) {
              ball.stepToLeft();
              ball.moveLeft(tab1, tab2);
            } else {
              // IF THE BALL HAS TOUCH THE TAB1
              // are BALL and TAB touched?
              if (tab1.getBottomSide() < ball.getTopSide() || tab1.getTopSide() > ball.getBottomSide()) {
                // no
                tab2.scoreUpdate(+1);
                game.stop();
              } else {
                // yes
                sound('tab');
                ball.coeff = ball.getMiddlePoint() - tab1.getMiddlePoint();
                if (ball.coeff > 0) ball.directionY = 'bottom';else ball.directionY = 'top';
                ball.directionX = 'dx';
                ball.moveRight(tab1, tab2);
              }
            } // CHECK THE BALL IS NOT OVER TOP AND BOTTOM AREA, THEN INVERT VERTICAL-DIRECTION


            if (ball.getTopSide() <= areaObj.getTopLimit()) ball.directionY = 'bottom';else if (ball.getBottomSide() >= areaObj.getBottomLimit()) ball.directionY = 'top';
          }, speed);
        }
    }
  }, {
    key: "moveRight",
    value: function moveRight(tab1, tab2) {
      var side = this.getRightSide();
      var speed = 0;
      var ball = this; // BALL is moving

      if (!game.isPause
      /*&& side < tab2.getLeftSide()*/
      ) {
          setTimeout(function () {
            var dest = ball.getDestination();

            if (dest[2] === 'dx' && ball.getRightSide() < tab2.getLeftSide()) {
              ball.stepToRight();
              ball.moveRight(tab1, tab2);
            } else {
              // IF THE BALL HAS TOUCH THE TAB2
              // are BALL and TAB touched?
              if (tab2.getBottomSide() < ball.getTopSide() || tab2.getTopSide() > ball.getBottomSide()) {
                // no
                tab1.scoreUpdate(+1);
                game.stop();
              } else {
                // yes
                sound('tab');
                ball.coeff = ball.getMiddlePoint() - tab2.getMiddlePoint();
                if (ball.coeff > 0) ball.directionY = 'bottom';else ball.directionY = 'top';
                ball.directionX = 'sx';
                ball.moveLeft(tab1, tab2);
              }
            } // CHECK THE BALL IS NOT OVER TOP AND BOTTOM AREA, THEN INVERT VERTICAL-DIRECTION


            if (ball.getTopSide() <= areaObj.getTopLimit()) ball.directionY = 'bottom';else if (ball.getBottomSide() >= areaObj.getBottomLimit()) ball.directionY = 'top';
          }, speed);
        }
    }
  }]);

  return Ball;
}();

var areaObj, game, tab1, tab2, ball;

window.onload = function () {
  areaObj = new Area();
  tab1 = new Tab1();
  tab2 = new Tab2();
  ball = new Ball();
  game = new Game();

  if (!isMobileBrowser()) {
    sound('intro');
    setCommands();
    game.start();
  } else {
    document.getElementById('mobile-message').style.display = 'inLine';
  }
}; // END window.onload


var setCommands = function setCommands() {
  // MOVE TAB
  document.addEventListener("keydown", function (e) {
    switch (e.which) {
      case tab1.keyList[0]:
        {
          tab1.moveUp();
          break;
        }

      case tab1.keyList[1]:
        {
          tab1.moveDown();
          break;
        }

      case tab2.keyList[0]:
        {
          tab2.moveUp();
          break;
        }

      case tab2.keyList[1]:
        {
          tab2.moveDown();
          break;
        }

      case 27:
        {
          game.pause();
          break;
        }

      case 13:
        {
          // game.restart();
          break;
        }
    }
  });
};

var isMobileBrowser = function isMobileBrowser() {
  return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i);
};

var sound = function sound(typeEvent) {
  var audioSrc = '';

  switch (typeEvent) {
    case 'intro':
      {
        audioSrc = 'freesound.org-458416_9461949-lq.mp3';
        break;
      }

    case 'tab':
      {
        audioSrc = 'freesound.org-4359_4948-lq.mp3';
        break;
      }

    case 'game-over':
      {
        audioSrc = 'freesound.org-76376_877451-lq.mp3';
        break;
      }

    default:
      {
        break;
      }
  }

  var audio = new Audio('sounds/' + audioSrc);
  audio.play();
};
