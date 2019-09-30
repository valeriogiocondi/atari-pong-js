/*
 *	MATHEMATICS
 */

class Mathematics {

	constructor() {

	}

	static getNum(str) {

		return parseInt(str.substr(0, str.length-2));
	}
}


/*
 *	GAME
 */

class Game {

	constructor() {

		this.isPause = 0;
		this.numGames = 0;
	}

	start() {
		
		this.isPause = 0;

		if (this.numGames % 2 == 0) {

			ball.directionX = 'sx';
			ball.moveLeft(tab1, tab2);
		
		} else {

			ball.directionX = 'dx';
			ball.moveRight(tab1, tab2);
		}
	}

	stop() {

		this.isPause = 1;
		this.numGames += 1;
		game = this;

		setTimeout(function() {

			ball.init();
			tab1.init();
			tab2.init();
			game.start();

		}, 1500);

		sound('game-over');
	}

	pause() {
		this.isPause = 1;
	}
	
	restart() {
		
		this.isPause = 0;

		if (this.numGames % 2 == 0)
			ball.moveLeft(tab1, tab2);		
		else 
			ball.moveRight(tab1, tab2);
	}

	static getWidth() {

		return window.innerWidth;
	}

	static getHeight() {

		return window.innerHeight;
	}
}


/*
 *	AREA
 */

class Area {

	constructor() {

		this.css = document.getElementById('area');
		this.messageArea = document.getElementById('message');
		this.init();
	}

	init() {

		this.areaLimitHeight = [0, Game.getHeight()];
		this.areaLimitWidth = [0, Game.getWidth()];
		this.css.style.width = this.getRightLimit() + "px";
		this.css.style.height = this.getBottomLimit() + "px";
	}

	getTopLimit() {

		return this.areaLimitHeight[0];
	}

	getBottomLimit() {

		return this.areaLimitHeight[1];
	}

	getLeftLimit() {

		return this.areaLimitWidth[0];
	}

	getRightLimit() {

		return this.areaLimitWidth[1];
	}
}

/*
 *	TABS
 */

class Tab {

	constructor() {

		this.score = 0;
		this.moveGapTab = 20;
	}

	getScore() {

		return this.score;
	}

	setScore(point) {

		this.score += point;
	}

	getRightSide() {

		return Mathematics.getNum(this.css.style.width);
	}
	getTopSide() {

		return Mathematics.getNum(this.css.style.top);
	}
	getBottomSide() {

		return Mathematics.getNum(this.css.style.top) + Mathematics.getNum(this.css.style.height);
	}
	getMiddlePoint() {

		return this.getTopSide() + Mathematics.getNum(this.css.style.height)/2;
	}

	moveUp() {

		this.setPosition(-this.moveGapTab);
	}

	moveDown() {

		this.setPosition(+this.moveGapTab);
	}
	
	setPosition(gap) {

		let margin = Mathematics.getNum(this.css.style.top) + gap;

		if (margin > areaObj.getTopLimit() && margin < areaObj.getBottomLimit())
			this.css.style.top = margin + "px";
	}

	scoreUpdate(point) {

		this.setScore(point);
		this.messageScore.innerHTML = this.getScore();
	}

}

class Tab1 extends Tab {

	constructor() {
		super();
		this.keyList = [83, 88];
		this.css = document.getElementById('tab1');
		this.messageScore = document.getElementById('score-tab1');
		this.init();
	}

	init() {

		this.css.style.width = "15px";
		this.css.style.height = "80px";
		this.css.style.top = areaObj.getBottomLimit()/2 - Mathematics.getNum(this.css.style.height)/2 + 'px';
		this.css.style.left = "0px";
	}

	getLeftSide() {

		return Mathematics.getNum(this.css.style.left);
	}
}

class Tab2 extends Tab {

	constructor() {
		super();
		this.keyList = [37, 39];
		this.css = document.getElementById('tab2');
		this.messageScore = document.getElementById('score-tab2');
		this.init();
	}

	init() {

		this.css.style.width = "15px";
		this.css.style.height = "80px";
		this.css.style.top = areaObj.getBottomLimit()/2 - Mathematics.getNum(this.css.style.height)/2 + 'px';
		this.css.style.right = "0px";
	}

	getLeftSide() {

		return areaObj.getRightLimit() - Mathematics.getNum(this.css.style.width);
	}
}


/*
 *	BALL
 */

class Ball {

 	constructor() {

		this.css = document.getElementById('ball');
		this.init();
 	}

	init() {

		this.ballDestX = 0;
		this.ballDestY = this.css.style.top;
		this.directionX = 'sx';
		this.directionY = 'top';
		this.moveGapBall = 3;
		this.coeff = 0;
		this.css.style.width = "20px";
		this.css.style.height = "20px";
		this.css.style.top = parseInt(Game.getHeight()/2)+"px";
		this.css.style.left = parseInt(Game.getWidth()/2)+"px";
	}

	getLeftSide() {

		return Mathematics.getNum(this.css.style.left);
	}

	getRightSide() {
		
		return Mathematics.getNum(this.css.style.left) + Mathematics.getNum(this.css.style.width);
	}

	getTopSide() {

		return Mathematics.getNum(this.css.style.top);
	}

	getMiddlePoint() {
		
		return Mathematics.getNum(this.css.style.top) - Mathematics.getNum(this.css.style.height)/2;
	}

	getBottomSide() {

		return Mathematics.getNum(this.css.style.top) + Mathematics.getNum(this.css.style.height);
	}

	stepToLeft() {

		// WHEN BALL AND TAB HAS TOUCH
		if (this.coeff != 0) {

			// moving vertically
			if (this.directionY == 'top')
				this.css.style.top = this.getTopSide() - parseInt(this.moveGapBall + 1/Math.abs(this.coeff)) + "px";
			else
				this.css.style.top = this.getTopSide() + parseInt(this.moveGapBall + 1/Math.abs(this.coeff)) + "px";
		
			// moving horizzontally
			this.css.style.left = Mathematics.getNum(this.css.style.left) - this.moveGapBall + "px";

		} else {

			// moving just horizzontally
			this.css.style.left = Mathematics.getNum(this.css.style.left) - this.moveGapBall + "px";
		}
	}

	stepToRight() {

		// WHEN BALL AND TAB HAS TOUCH
		if (this.coeff != 0) {

			// moving vertically
			if (this.directionY == 'top')
				this.css.style.top = this.getTopSide() - parseInt(this.moveGapBall + 1/Math.abs(this.coeff)) + "px";
			else
				this.css.style.top = this.getTopSide() + parseInt(this.moveGapBall + 1/Math.abs(this.coeff)) + "px";
		
			// moving horizzontally
			this.css.style.left = Mathematics.getNum(this.css.style.left) + this.moveGapBall + "px";

		} else {

			// moving just horizzontally
			this.css.style.left = Mathematics.getNum(this.css.style.left) + this.moveGapBall + "px";
		}
	}

	getDestination() {

		if (this.ballDestX === '')
			this.ballDestX = 0;

		if (this.ballDestY === '')
			this.ballDestY = 0;

		return [this.ballDestX, this.ballDestY, this.directionX, this.directionY];
	}

	setDestination(destX, destY, dirX, dirY) {

		if (destX) this.ballDestX = destX;
		if (destY) this.ballDestY = destY;
		if (dirX) this.directionX = dirX;
		if (dirY) this.directionY = dirY;
	}

	moveLeft(tab1, tab2) {

		let side = this.getLeftSide();
		let speed = 0;
		var ball = this;

		// BALL is moving
		if (!game.isPause) {

			setTimeout(function() {

				let dest = ball.getDestination();

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

						if (ball.coeff > 0)
							ball.directionY = 'bottom';
						else
							ball.directionY = 'top';

						ball.directionX = 'dx';

						ball.moveRight(tab1, tab2);
					}
				}

				// CHECK THE BALL IS NOT OVER TOP AND BOTTOM AREA, THEN INVERT VERTICAL-DIRECTION
				if (ball.getTopSide() <= areaObj.getTopLimit())
					ball.directionY = 'bottom';

				else if (ball.getBottomSide() >= areaObj.getBottomLimit())
					ball.directionY = 'top';

			}, speed);
		}
	}

	moveRight(tab1, tab2) {
					
		let side = this.getRightSide();
		let speed = 0;
		var ball = this;

		// BALL is moving
		if (!game.isPause) {

			setTimeout(function() {

				let dest = ball.getDestination();

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

						if (ball.coeff > 0)
							ball.directionY = 'bottom';
						else
							ball.directionY = 'top';
					
						ball.directionX = 'sx';
					
						ball.moveLeft(tab1, tab2);
					}
				}

				// CHECK THE BALL IS NOT OVER TOP AND BOTTOM AREA, THEN INVERT VERTICAL-DIRECTION
				if (ball.getTopSide() <= areaObj.getTopLimit())
					ball.directionY = 'bottom';

				else if (ball.getBottomSide() >= areaObj.getBottomLimit())
					ball.directionY = 'top';

			}, speed);
		}
	}
}


var areaObj, game, tab1, tab2, ball;

window.onload = function() {

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
};
// END window.onload


var setCommands = () => {

	// MOVE TAB
	document.addEventListener("keydown", function(e) {

		switch(e.which) {

			case tab1.keyList[0]: {
				
				tab1.moveUp();
				break;					
			}
			case tab1.keyList[1]: {
				
				tab1.moveDown();
				break;					
			}
			case tab2.keyList[0]: {
				
				tab2.moveUp();
				break;					
			}
			case tab2.keyList[1]: {
				
				tab2.moveDown();
				break;					
			}
			case 27: {
				
				game.pause();
				break;					
			}
			case 13: {

				// game.restart();
				break;					
			}
		}
	});
}

var isMobileBrowser = () => {

	return (
		navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
		navigator.userAgent.match(/Opera Mini/i) ||
		navigator.userAgent.match(/IEMobile/i)
	);
}

var sound = (typeEvent) => {

	var audioSrc = '';

	switch(typeEvent) {

		case 'intro': {

			audioSrc = 'freesound.org-458416_9461949-lq.mp3';
			break;
		}
		case 'tab': {

			audioSrc = 'freesound.org-4359_4948-lq.mp3';
			break;
		}
		case 'game-over': {

			audioSrc = 'freesound.org-76376_877451-lq.mp3';
			break;
		}
		default: {
			break;
		}
	}
	
	var audio = new Audio('sounds/' + audioSrc);
	audio.play();
}