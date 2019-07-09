/*credit - Rex van der Spuy, "Foundation Game Design with HTML Javascript" */
console.log('rex');

//Get a reference to the stage and output
var stage = document.querySelector('#stage');
var output = document.querySelector('#output');

//Add a keyboard listener
window.addEventListener('keydown', keydownHandler, false);

//set level description:
// let place = Cookies.get('playerCounty');
console.log(Cookies.get());
// $('.levelDescription').text(place);
//The game map
var map = [
  [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  [7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
  [7, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
  [7, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
  [7, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 7],
  [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
];

//The game objects map
var gameObjects = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 4, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var lastPressed = ''; //what was the last key pressed?

//Map code
var EMPTY = 0;
var ISLAND = 1;
var PIRATE = 2;
var HOME = 3;
var SHIP = 4;
var BLOCKED = 7;
var WAVES = 5;
var MONSTER = 6;
//The size of each cell
var SIZE = 64;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

//An automatic way of setting the ship's start position
var shipRow;
var shipColumn;
var monsterColumn;
var monsterRow;

for (var row = 0; row < ROWS; row++) {
  for (var column = 0; column < COLUMNS; column++) {
    if (gameObjects[row][column] === SHIP) {
      shipRow = row;
      shipColumn = column;
    }
    if (gameObjects[row][column] === MONSTER) {
      monsterRow = row;
      monsterColumn = column;
    }
  }
}

render();

function keydownHandler(event) {
  switch (event.keyCode) {
    case UP:
      //Find out if the ship's move will
      //be within the playing field
      if (shipRow > 0) {
        //first buffer ship position to simulate blocked squares
        lastPressed = 'up';

        //If it is, clear the ship's current cell
        gameObjects[shipRow][shipColumn] = 0;

        //Subract 1 from the ship's row
        //to move it up one row on the map
        shipRow--;

        //Apply the ship's new updated position to the array
        gameObjects[shipRow][shipColumn] = SHIP;
      }
      break;

    case DOWN:
      if (shipRow < ROWS - 1) {
        lastPressed = 'down';
        gameObjects[shipRow][shipColumn] = ROWS - 0;
        shipRow++;
        gameObjects[shipRow][shipColumn] = SHIP;
      }
      break;

    case LEFT:
      if (shipColumn > 1) {
        gameObjects[shipRow][shipColumn] = 1;
        shipColumn--;
        gameObjects[shipRow][shipColumn] = SHIP;
        lastPressed = 'left';
      }
      break;

    case RIGHT:
      if (shipColumn < COLUMNS - 1) {
        gameObjects[shipRow][shipColumn] = 0;
        shipColumn++;
        gameObjects[shipRow][shipColumn] = SHIP;
      }
      lastPressed = 'right';
      break;
  }
  //find out what kind of cell the ship is on
  switch (map[shipRow][shipColumn]) {
    case EMPTY:
      gameMessage = 'You sail the open seas.';
      break;

    case PIRATE:
      // fight();
      break;

    case ISLAND:
      // trade();
      break;

    case BLOCKED:
      //Undo last key press
      //   alert('blocked!');
      console.log(lastPressed);
      blockPath();
      break;
    case WAVES:
      blockPath();
      break;
  }

  blockPath = () => {
    switch (lastPressed) {
      case 'down':
        gameObjects[shipRow][shipColumn] = BLOCKED;

        shipRow--;

        //Apply the ship's new updated position to the array
        gameObjects[shipRow][shipColumn] = SHIP;

        break;

      case 'up':
        gameObjects[shipRow][shipColumn] = BLOCKED;

        shipRow++;
        gameObjects[shipRow][shipColumn] = SHIP;

        break;

      case 'right':
        gameObjects[shipRow][shipColumn] = BLOCKED;

        shipColumn--;
        gameObjects[shipRow][shipColumn] = SHIP;

        break;

      case 'left':
        gameObjects[shipRow][shipColumn] = BLOCKED;

        shipColumn++;
        gameObjects[shipRow][shipColumn] = SHIP;
        break;
    }
    render();
  };
  //Render the game
  render();
}

function render() {
  //Clear the stage of img cells
  //from the previous turn

  if (stage.hasChildNodes()) {
    for (var i = 0; i < ROWS * COLUMNS; i++) {
      stage.removeChild(stage.firstChild);
    }
  }

  //make a random wave
  randWave = () => {
    let waveNum = Math.floor(Math.random() * 8);
    console.log(waveNum);
    if (waveNum === 0) {
      return './images/tonnta0.png';
    }
    if (waveNum === 1) {
      return './images/tonnta1.gif';
    }

    if (waveNum === 2) {
      return './images/tonnta2.gif';
    }

    if (waveNum === 3) {
      return './images/tonnta3.gif';
    }
    if (waveNum === 4) {
      return './images/tonnta0.png';
    }
    if (waveNum === 5) {
      return './images/tonnta0.png';
    }
    if (waveNum === 6) {
      return './images/tonnta0.png';
    }
    if (waveNum === 7) {
      return './images/tonnta0.png';
    }
  };

  //Render the game by looping through the map arrays
  for (var row = 0; row < ROWS; row++) {
    for (var column = 0; column < COLUMNS; column++) {
      //Create a img tag called cell
      var cell = document.createElement('img');

      //Set it's CSS class to "cell"
      cell.setAttribute('class', 'cell');

      //Add the img tag to the <div id="stage"> tag
      stage.appendChild(cell);

      //Find the correct image for this map cell
      switch (map[row][column]) {
        case EMPTY:
          cell.src = './images/water.png';
          break;

        case WAVES:
          cell.src = randWave();
          break;

        case ISLAND:
          cell.src = './images/talamh.png';
          break;

        case PIRATE:
          cell.src = './images/geaga.png';
          break;

        case HOME:
          cell.src = './images/folamh.png';
          break;

        case BLOCKED:
          cell.src = './images/folamh.png';
      }

      if (gameObjects[shipRow][shipColumn] === MONSTER) {
        alert('collision!');
      }

      //Add the ship from the gameObjects array
      switch (gameObjects[row][column]) {
        case SHIP:
          cell.src = './images/ship.png';
          break;
        // case MONSTER:
        //   cell.src = './images/geaga.png';
        //   break;
      }
      //Position the cell
      cell.style.top = row * SIZE + 'px';
      cell.style.left = column * SIZE + 'px';
    }
  }
}
$(document).ready(function() {
  //   alert('go');
});
