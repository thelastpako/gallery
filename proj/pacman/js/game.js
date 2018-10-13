'use strict';
var audioDeath = new Audio('sound/death.mp3');
var audioPower = new Audio('sound/intermission.mp3');

var WALL = '¤'.fontcolor('blue');
var FOOD = '.'.fontcolor('yellow');
var EMPTY = ' ';
var POWER = '•'
var CHERRY = 'CHERRY';

var CHERRY_IMG = '<img src="img/cherry.png">';


var cherryInterval;
var foodOnBoard = 0;
var COLUMN = 18;
var ROW = 28;
var gBoard;
var gState = {
  score: 0,
  isGameDone: false
};

function init() {
  //reset gamer state and score
  gState.score = 0;
  gState.isGameDone = false;
  document.querySelector('header > h3 > span').innerText = gState.score;

  //change the btn to hidden
  var elBtn = document.querySelector('.restart-button')
  elBtn.style.display = '';

  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  cherryInterval = setInterval(createCherry, 15000)
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < COLUMN; i++) {
    board.push([]);
    for (var j = 0; j < ROW; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === COLUMN - 1 ||
        j === 0 || j === ROW - 1 ||
        i > 3 && j > 1 && j < 5 && i < 7 ||
        j > 3 && j < 7 && i > 1 && i < 7 ||
        i > 10 && j > 1 && j < 5 && i < 14 ||
        j > 3 && j < 7 && i > 10 && i < 16 ||
        i > 3 && j > 22 && j < 26 && i < 7 ||
        j > 20 && j < 24 && i > 1 && i < 7 ||
        i > 10 && j > 20 && j < 26 && i < 14 ||
        j > 20 && j < 24 && i > 10 && i < 16 ||
        // i > 3 && i < 6 && j > 15 && j < 17 ||
        // i > 3 && i < 6 && j > 10 && j < 12 ||
        // i > 4 && i < 6 && j > 10 && j < 17 ||
        j > 7 && j < 20 && i > 13 ||
        i > 7 && i < 11 && j > 9 && j < 18) {
        board[i][j] = WALL;
      }
    }
  }
  board[2][2] = POWER;
  board[COLUMN - 3][ROW - 3] = POWER;
  board[2][ROW - 3] = POWER;
  board[COLUMN - 3][2] = POWER;
  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent) {
  if (cell === opponent) {
    //superfood support**************************
    if (gPacman.isSuper) {
    } else {
      clearInterval(gIntervalGhosts);
      gState.isGameDone = true;
      audioDeath.play()
      clearInterval(cherryInterval)
      var elBtn = document.querySelector('.restart-button')
      elBtn.style.display = 'block';
      return true;
    }
  }
  //count food left and check if win.
  countFoodLeft()
  if (foodOnBoard === 0) {
    var elBtn = document.querySelector('.restart-button')
    elBtn.style.display = 'block';
    var elFinish = document.querySelector('.finish-massage')
    elFinish.innerHTML = 'Victory!'
    clearInterval(gIntervalGhosts);
    clearInterval(cherryInterval)
    gState.isGameDone = true;
  }
  return false;
}


// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  document.querySelector('header > h3 > span').innerText = gState.score;
}

function buttonRestart() {
  var elBtn = document.querySelector('.restart-button')
  elBtn.style.display = block;
}

function countFoodLeft() {
  foodOnBoard = 0;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === FOOD)
        foodOnBoard++
    }
  }
  return foodOnBoard;
}

function createCherry() {
  var randomI = Math.floor(Math.random() * (COLUMN - 1)) + 1;
  var randomj = Math.floor(Math.random() * (ROW - 1)) + 1;
  var cherryPop = gBoard[randomI][randomj]
  var cherryClassName = 'cell' + randomI + '-' + randomj;
  var elCherry = document.querySelector(`.${cherryClassName}`);
  if (cherryPop === FOOD || cherryPop === EMPTY) {
    cherryPop = CHERRY;
    elCherry.innerHTML = CHERRY_IMG;
  }
  // setTimeout(function(){elCherry.innerHTML = FOOD;
  //   cherryPop = FOOD},4000)
}