const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE'

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';
const GLUE_IMG = '<img src="img/glue.png">';

//audio for collecting ball
var audioCollect = new Audio('sound/ballcollect.mp3');

var isGlued = false;
var ballCounter = 0;
var ranBallInterval;
var glueInterval;

var gGamerPos;
var gBoard;

function init() {
	ballCounter = 0;
	var elRestart = document.querySelector('.restart')
	elRestart.style.display = 'none';

	gGamerPos = { i: 2, j: 5 };
	gBoard = buildBoard();
	renderBoard(gBoard);
}

function buildBoard() {
	// Create the Matrix
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}
			board[i][j] = cell;
		}
	}
	// Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;
	board[5][0].type = FLOOR;
	board[5][11].type = FLOOR;
	board[0][5].type = FLOOR;
	board[9][5].type = FLOOR;

	return board;
}

// Render the board to an HTML table
function renderBoard(board) {
	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += '\t' + GAMER_IMG + '\n';
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	elBoard.innerHTML = strHTML;
	ranBallInterval = setInterval(createBall, 3000)
	glueInterval = setInterval(createGlue, 6000)
}

// Move the player to a specific location
function moveTo(i, j) {
	function moving(i, j) {
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '');

		gGamerPos.i = i;
		gGamerPos.j = j;

		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);
	}

	if (i === 5 && j === -1) {
		moving(i, 11)
		return;
	}
	if (i === 5 && j === 12) {
		moving(i, 0)
		return;
	}
	if (i === -1 && j === 5) {
		moving(9, j)
		return;
	}

	if (i === 10 && j === 5) {
		moving(0, j)
		return;
	}

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			ballCounter++;
			countBalls()
			console.log('Collecting!');
			audioCollect.play();
		}
		if (targetCell.gameElement === GLUE) {
			isGlued = true;
			setTimeout(function(){isGlued = false},3000)
		}
		// MOVING
		moving(i, j)

	}
	// else console.log('TOO FAR', iAbsDiff, jAbsDiff);
	checkBallsOnBoard()
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	
	var i = gGamerPos.i;
	var j = gGamerPos.j;
	if(!isGlued){	
	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}
}
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function createBall() {
	var randomI = Math.floor(Math.random() * (8)) + 1;
	var randomj = Math.floor(Math.random() * (8)) + 1;
	var ballPop = gBoard[randomI][randomj]
	var ballClassName = getClassName({ i: randomI, j: randomj })
	var elBall = document.querySelector(`.${ballClassName}`);
	if (!ballPop.gameElement) {
		ballPop.gameElement = BALL;
		elBall.innerHTML += BALL_IMG;
	}
}

function countBalls() {
	var elBallCount = document.querySelector('.balls-counter')
	elBallCount.innerHTML = `Balls collected: ${ballCounter}`
}

function checkBallsOnBoard() {
	var ballsOnBoard = 0;
	for (var i = 1; i < gBoard.length; i++) {
		for (var j = 1; j < gBoard[0].length; j++) {
			var ballPop = gBoard[i][j]
			if (ballPop.gameElement === BALL)
				ballsOnBoard++
		}
	}
	if (ballsOnBoard === 0) {
		clearInterval(ranBallInterval)
		clearInterval(glueInterval)
		var ballsOnBoard = 0;
		var elRestart = document.querySelector('.restart')
		elRestart.style.display = 'block';
		elRestart.innerHTML = 'Play again!';
	}
}

function createGlue() {
	var randomI = Math.floor(Math.random() * (8)) + 1;
	var randomj = Math.floor(Math.random() * (10)) + 1;
	var gluePop = gBoard[randomI][randomj]
	var glueClassName = getClassName({ i: randomI, j: randomj })
	var elGlue = document.querySelector(`.${glueClassName}`);
	if (!gluePop.gameElement) {
		gluePop.gameElement = GLUE;
		elGlue.innerHTML += GLUE_IMG;
	}
	setTimeout(function () {
		if (gluePop.gameElement !== GAMER) {
			gluePop.gameElement = null;
			elGlue.innerHTML = '';
		}
	}, 3000)
}

