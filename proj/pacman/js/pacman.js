var audioDeath = new Audio('sound/death.mp3');
var audioPower = new Audio('sound/intermission.mp3')

var gPacman;
var PACMAN = '&#9786;';

function createPacman(board) {
  gPacman = {
    location: {
      i: 12,
      j: 14
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  // console.log('eventKeyboard:', eventKeyboard);

  if (gState.isGameDone) return;

  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (eventKeyboard.code) {

    case 'ArrowUp':
      //console.log('Arrow Up!');
      nextLocation.i--;
      break;
    case 'ArrowDown':
      //console.log('Arrow Down!');
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      //console.log('Arrow Left!');
      nextLocation.j--;
      break;
    case 'ArrowRight':
      //console.log('Arrow Right!');
      nextLocation.j++;
      break;

  }

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('Heading: row:', newLocation.i , ' col: ', newLocation.j );
  // console.log('Whats there:', gBoard[newLocation.i][newLocation.j]);

  // hitting a wall, not moving anywhere
  if (nextCell === WALL) return;

  // hitting FOOD
  if (nextCell === FOOD) {
    updateScore(1);
  }

  //support for power-food
  if (nextCell === POWER) {
    gPacman.isSuper = true;
    GHOST = ghostSym.fontcolor('yellow')
    audioPower.play()
    setTimeout(function(){gPacman.isSuper = false;
                          GHOST = ghostSym.fontcolor(gGhosts[0].color)
    },5000)
  }


  // update the model to reflect movement - update gboard
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // render updated model to the DOM - update the table
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;


  // render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

  var isGameOver = checkEngage(nextCell, GHOST);
  if (isGameOver) return;
}