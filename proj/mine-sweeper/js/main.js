// CR: In renderBoard() you wrote a for loop without declaring i.
// CR: because you didn't write 'use strict' you missed it.
// CR: Also in several places in js and html files the code was not indent.
// CR: alt + shift + f in visual code fixes it automatically.
// CR: Some points from your grade that is really sad to skip.
// CR: The same goes with naming of variables and functions.
"use strict";

const MINE = '<img src="img/mine.png">';
const FLAG = '<img src="img/flag.png">';
const ONE = '<img src="img/1.png">';
const TWO = '<img src="img/2.png">';
const THREE = '<img src="img/3.png">';
const FOUR = '<img src="img/4.png">';
const FIVE = '<img src="img/5.png">';
const SIX = '<img src="img/6.png">';
const SEVEN = '<img src="img/7.svg">';
const EIGHT = '<img src="img/8.svg">';
const EMPTY = '<img src="img/empty.svg">';
// CR: Couldn't find where 'SMILE' is in use, but vs code isn't alerting for it.
const SMILEY = 'img/smile.png';
const SMILE_DEAD = 'img/dead.png';
const SMILE_WIN = 'img/win.png';


// CR: Bad naming: gTimeInterval, gRecordEasy, gFlagCount....
// CR: I would use the flagCount and count inside gState.
// CR: Better use one object gRecordTime.
var timeInterval;
// CR: Double ;; ?
var flagCount;
// CR: Where are 7 and 8?
var numbersMap = {
    0: "",
    1: ONE,
    2: TWO,
    3: THREE,
    4: FOUR,
    5: FIVE,
    6: SIX,
    7: SEVEN,
    8: EIGHT,
}

var gBoard;
//FIXED
// CR: Bad naming. Count of what?
var countOfRounds = 0;
var gLevel = {};
var gState = {
    isGameOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


//cancel the right click menu
var elContainer = document.querySelector('.container')
elContainer.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);

//FIXED
// CR: Better name is reset since it's not the initial func.
function reset() {
    gState.shownCount = 0;
    clearInterval(timeInterval)
    gState.markedCount = 0;
    gState.secsPassed = 0;
    renderTime()
    countOfRounds = 0;
    gState.isGameOn = true;
    gBoard = buildBoard()
    renderBoard(gBoard)
    renderSmileyPicture()
    flagCount = gLevel.MINES
    renderFlagCount()
}


function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
        }
    }
    return board;
}

function renderBoard(board) {
    var elTable = document.querySelector('.board');
    var strHTML = '<table border="1"><tbody><tr>';
    //FIXED
    // CR: var i = 0
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            //FIXED
            // CR: Unnecessary var.
            // CR: You have a warning: 'cell' is declared but its value is never read.
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + '" onmousedown="handleClick(this,' + i + ',' + j + ')"">' + EMPTY + '</td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    elTable.innerHTML = strHTML;
}

function renderMines(gBoard, length, i, j) {
    var mineCount = 0;
    while (mineCount < length) {
        var randomI = Math.floor(Math.random() * (gLevel.SIZE)) + 0
        var randomJ = Math.floor(Math.random() * (gLevel.SIZE)) + 0
        //FIXED
        // CR: !==
        if (!gBoard[randomI][randomJ].isMine && gBoard[randomI][randomJ] !== gBoard[i][j]) {
            gBoard[randomI][randomJ].isMine = true;
            mineCount++
        }
    }
    return gBoard;
}



function countMines(cellI, cellJ, board) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine) neighborsSum++;
        }
    }
    return neighborsSum;
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine) continue;
            var numOfMines = countMines(i, j, board);
            board[i][j].minesAroundCount = numOfMines;
        }
    }
    return board;
}

//FIXED
// CR: Bad naming: handleClick is better.
// CR: I did like the use case for each mouse click,
// CR: but again better naming: 'handleLeftClick' and 'handleRightClick'.
//what keys do
function handleClick(cell, i, j) {
    // CR: Another warning, 'eventMouse' is declared but never read.
    countOfRounds++
    if (countOfRounds === 1) {
        renderMines(gBoard, gLevel.MINES, i, j)
        setMinesNegsCount(gBoard)
        timeInterval = setInterval(renderTime, 1000)
    }
    //FIXED
    // CR: Not indent.
    if (gState.isGameOn) {
        switch (event.which) {
            //1 = left click
            case 1:
                if (!gBoard[i][j].isMarked)
                    cellClicked(cell, i, j)
                break;

            //3 = right click
            case 3:
                flag(cell, i, j)
                break;
        }
    }
}

function cellClicked(elCell, i, j) {
    var currCell = gBoard[i][j]
    if (currCell.isMine) {
        elCell.classList.add("mine");
        elCell.innerHTML = MINE
        gState.isGameOn = false;
        revealAllMines()
        clearInterval(timeInterval)
        renderSmileyPicture()
    } else {
        //FIXED
        // CR: Unnecessary if.
        // CR: You already checked 'isGameOn' before the switch case above.
        var currCell = gBoard[i][j]
        // CR: Better check '!currCell.isMine' before setting unnecessary innerHTML. 
        elCell.innerHTML = numbersMap[currCell.minesAroundCount]
        currCell.isShown = true;
        if (!numbersMap[currCell.minesAroundCount].length) {
            expandCells(i, j)
        }
        gState.shownCount++
    }
    renderFlagCount()
    checkWin()
}


function flag(cell, i, j) {
    if (!gBoard[i][j].isShown) {
        if (cell.innerHTML === FLAG) {
            cell.innerHTML = EMPTY;
            flagCount++
            gBoard[i][j].isMarked = false;
        } else {
            if (gBoard[i][j].isMarked === false && !gBoard[i][j].isShown)
                cell.innerHTML = FLAG
            gBoard[i][j].isMarked = true;
            flagCount--
        }
    }
    renderFlagCount()
    checkWin()
}

function setBoardSize(size) {
    gLevel = {};
    switch (size) {
        case 4:
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            reset()
            settingLevelRecord('Easy')
            break;

        case 6:

            gLevel.SIZE = 6;
            gLevel.MINES = 5;
            reset()
            settingLevelRecord('Medium')
            break;

        case 8:
            gLevel.SIZE = 8;
            gLevel.MINES = 15;
            reset()
            settingLevelRecord('Hard')
            break;
    }
}
//FIXED
// CR: Not indent.
// CR: Bad naming: this is expandCells, isn't it?
function expandCells(idxi, idxj) {
    if (gState.isGameOn) {
        for (var i = idxi - 1; i <= idxi + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue;
            for (var j = idxj - 1; j <= idxj + 1; j++) {
                if (idxi === i && idxj === j) continue;
                if (j < 0 || j >= gBoard[0].length) continue;
                if (gBoard[i][j].isMarked) continue;
                if (gBoard[i][j].isShown) continue;
                if (gBoard[i][j].isMine) continue;
                var currCount = gBoard[i][j].minesAroundCount
                setItem(numbersMap[currCount], i, j)
            }
        }
    }
}

function setItem(item, i, j) {
    //FIXED
    // CR: No camelCase naming here.
    var elCellClicked = document.querySelector('.cell' + i + '-' + j)
    elCellClicked.innerHTML = item;
    gBoard[i][j].isShown = true;
    if (!item.length) {
        // CR: Better set it with a class and css.
        elCellClicked.classList.add("cellzero");
        expandCells(i, j)
    }
    gState.shownCount++
}

function checkWin() {
    var boardSize = gLevel.SIZE * gLevel.SIZE
    var cellWithoutMines = boardSize - gLevel.MINES
    //FIXED
    // CR: You don't change gState.shownCount in cellClicked().
    // CR: Better code is to increase it when you reveal a clicked cell.
    // CR: and then you don't need to reset it and run in a loop
    // CR: to re-calc it after every click.
    if (gState.shownCount === cellWithoutMines && flagCount === 0) {
        clearInterval(timeInterval)
        saveBestTime(gLevel.SIZE)
        gState.isGameOn = false;
        renderSmileyPicture()
    }
}


function revealAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var elCell = document.querySelector('.cell' + i + '-' + j)
            if (gBoard[i][j].isMine) {
                elCell.innerHTML = MINE
            }
        }
    }
}

function renderTime() {
    var elCellShown = document.querySelector('.time')
    elCellShown.innerHTML = gState.secsPassed
    gState.secsPassed++
}

//FIXED
// CR: Bad naming. renderFlagCount or renderMinesCount are better.
// CR: This name makes my think the func render flags on gBoard.
function renderFlagCount() {
    // CR: you have only one '.flags' class name, so '.menu' is unnecessary.
    var elFlags = document.querySelector('.flags')
    elFlags.innerHTML = flagCount
}

function renderSmileyPicture() {
    var boardSize = gLevel.SIZE * gLevel.SIZE
    var cellWithoutMines = boardSize - gLevel.MINES
    var elSmiley = document.querySelector('.menu img')
    elSmiley.style.display = 'inline-block';
    elSmiley.src = SMILEY;
    if (!gState.isGameOn)
        elSmiley.src = SMILE_DEAD;
    if (gState.shownCount === cellWithoutMines && flagCount === 0)
        elSmiley.src = SMILE_WIN;
}


function saveBestTime() {
    switch (gLevel.SIZE) {
        case 4:
            setRecord('Easy')
            break;

        case 6:
            setRecord('Medium')
            break;

        case 8:
            setRecord('Hard')
            break;
    }
}
// CR: Not indent.
// CR: There's a bug:
// CR: the 'record' is hard coded as 1000 and it never set by localStorage.getItem().
// CR: Try: play some games and see that the record time is the latest.
//fixed

function setRecord(level) {
    var record = localStorage.getItem(level);
    if (gState.secsPassed < record || !record) {
        record = gState.secsPassed
        localStorage.setItem(level, record);
        var elRecord = document.querySelector('.record span')
        elRecord.innerHTML = record
    }
}

// Bad naming: this func is not choosing but setting level record.
//fixed

function settingLevelRecord(level) {
    var elRecord = document.querySelector('.record span')
    elRecord.innerHTML = localStorage.getItem(level);
    if (!elRecord.innerHTML) {
        elRecord.innerHTML = 'no record yet';
    }
}
