var hitCounts = 1;
var counter = 0;
var time;

//getting time signature
function getTime() {
    var elTime = document.querySelector('.time');
    counter += 0.1;
    elTime.innerHTML = `<span>Time:</span> <span>${counter.toFixed(3)}</span>`;
}

//dificulties buttons
function Difficulties() {
    var elTime = document.querySelector('.time');
    elTime.innerHTML = `<span>Time: </span><span>${counter.toFixed(3)}</span>`;
    var elDiff = document.querySelector('.difficulties')
    var strHTML = `<div class="levels"><h2>Please choose the difficulty</h2>
                   <button onclick="easyRenderBoard(16)">Easy</button>
                   <button onclick="mediumRenderBoard(25)">Medium</button>
                   <button onclick="hardRenderBoard(36)">Hard</button></div>`
    elDiff.innerHTML = strHTML;
}

//make array and send to shuffle, returns shuffled array.
function shuffeledArray(boardSize) {
    var shuffledArray = [];
    for (var i = 1; i <= boardSize; i++) {
        shuffledArray.push(i);
    }
    shuffledArray = shuffle(shuffledArray)
    return shuffledArray;
}

//shuffle the array.
function shuffle(numsArray) {
    for (var i = 0; i < numsArray.length; i++) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = numsArray[randomIndex];

        numsArray[randomIndex] = numsArray[i];
        numsArray[i] = itemAtIndex;
    }
    return numsArray;
}


function checkAnswer(boardSize, tdValue) {
    var num = +tdValue.innerHTML;
    if (hitCounts <= boardSize && hitCounts === num) {
        tdValue.innerHTML = '';
        tdValue.style.background = 'rgb(211, 33, 33)';
        hitCounts++;
        if (hitCounts > boardSize) {
            clearInterval(time);
            var elTime = document.querySelector('.time');
            elTime.innerHTML = `Time: ${counter.toFixed(3)}`;
        }
    }
}

function easyRenderBoard(boardSize) {
    clearInterval(time);
    counter = 0;
    hitCounts = 1;
    var numsArray = shuffeledArray(boardSize)
    var rowLength = numsArray.length ** 0.5;
    var elBoard = document.querySelector('.table');
    elBoard.innerHTML = '';
    var strHTML = '';
    for (var i = 0; i < rowLength; i++) {
        strHTML += '<tr>'
        strHTML += '<td onclick="checkAnswer(16,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(16,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(16,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(16,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '</tr>';
    }
    time = setInterval(getTime, 100)
    elBoard.innerHTML += strHTML;
}

function mediumRenderBoard(boardSize) {
    clearInterval(time);
    counter = 0;
    hitCounts = 1;
    var numsArray = shuffeledArray(boardSize)
    var rowLength = numsArray.length ** 0.5;
    var elBoard = document.querySelector('.table');
    elBoard.innerHTML = '';
    var strHTML = '';
    for (var i = 0; i < rowLength; i++) {
        strHTML += '<tr>'
        strHTML += '<td onclick="checkAnswer(25,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(25,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(25,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(25,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(25,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '</tr>';
    }
    time = setInterval(getTime, 100)
    elBoard.innerHTML += strHTML;
}

function hardRenderBoard(boardSize) {
    clearInterval(time);
    counter = 0;
    hitCounts = 1;
    var numsArray = shuffeledArray(boardSize)
    var rowLength = numsArray.length ** 0.5;
    var elBoard = document.querySelector('.table');
    elBoard.innerHTML = '';
    var strHTML = '';
    for (var i = 0; i < rowLength; i++) {
        strHTML += '<tr>'
        strHTML += '<td onclick="checkAnswer(36,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(36,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(36,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(36,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(36,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '<td onclick="checkAnswer(36,this)">'
        strHTML += numsArray.pop();
        strHTML += '</td>'
        strHTML += '</tr>';
    }
    time = setInterval(getTime, 100)
    elBoard.innerHTML += strHTML;
}


