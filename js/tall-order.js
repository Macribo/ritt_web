/*credit - Rex van der Spuy, "Foundation Game Design with HTML Javascript" */
console.log('rex');

// alert(Cookies.get('place'));

$('.levelDescription').text(Cookies.get('place'));
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
  [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var lastPressed = ''; //what was the last key pressed?

//Map code
var EMPTY = 0;
var LAND = 1;
var MAGIC_TREE = 2;
var HOME = 3;
var sheep = 4;
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

//An automatic way of setting the sheep's start position
var sheepRow;
var sheepColumn;
var monsterColumn;
var monsterRow;

for (var row = 0; row < ROWS; row++) {
  for (var column = 0; column < COLUMNS; column++) {
    if (gameObjects[row][column] === sheep) {
      sheepRow = row;
      sheepColumn = column;
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
      //Find out if the sheep's move will
      //be within the playing field
      if (sheepRow > 0) {
        //first buffer sheep position to simulate blocked squares
        lastPressed = 'up';

        //If it is, clear the sheep's current cell
        gameObjects[sheepRow][sheepColumn] = 0;

        //Subract 1 from the sheep's row
        //to move it up one row on the map
        sheepRow--;

        //Apply the sheep's new updated position to the array
        gameObjects[sheepRow][sheepColumn] = sheep;
      }
      break;

    case DOWN:
      if (sheepRow < ROWS - 1) {
        lastPressed = 'down';
        gameObjects[sheepRow][sheepColumn] = ROWS - 0;
        sheepRow++;
        gameObjects[sheepRow][sheepColumn] = sheep;
      }
      break;

    case LEFT:
      if (sheepColumn > 1) {
        gameObjects[sheepRow][sheepColumn] = 1;
        sheepColumn--;
        gameObjects[sheepRow][sheepColumn] = sheep;
        lastPressed = 'left';
      }
      break;

    case RIGHT:
      if (sheepColumn < COLUMNS - 1) {
        gameObjects[sheepRow][sheepColumn] = 0;
        sheepColumn++;
        gameObjects[sheepRow][sheepColumn] = sheep;
      }
      lastPressed = 'right';
      break;
  }
  //find out what kind of cell the sheep is on
  switch (map[sheepRow][sheepColumn]) {
    case EMPTY:
      gameMessage = 'You sail the open seas.';
      break;

    case MAGIC_TREE:
      // fight();
      break;

    case LAND:
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
        gameObjects[sheepRow][sheepColumn] = BLOCKED;

        sheepRow--;

        //Apply the sheep's new updated position to the array
        gameObjects[sheepRow][sheepColumn] = sheep;

        break;

      case 'up':
        gameObjects[sheepRow][sheepColumn] = BLOCKED;

        sheepRow++;
        gameObjects[sheepRow][sheepColumn] = sheep;

        break;

      case 'right':
        gameObjects[sheepRow][sheepColumn] = BLOCKED;

        sheepColumn--;
        gameObjects[sheepRow][sheepColumn] = sheep;

        break;

      case 'left':
        gameObjects[sheepRow][sheepColumn] = BLOCKED;

        sheepColumn++;
        gameObjects[sheepRow][sheepColumn] = sheep;
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

        case LAND:
          cell.src = './images/talamh.png';
          break;

        case MAGIC_TREE:
          cell.src = './images/geaga.png';
          break;

        case HOME:
          cell.src = './images/folamh.png';
          break;

        case BLOCKED:
          cell.src = './images/folamh.png';
      }

      if (gameObjects[sheepRow][sheepColumn] === MONSTER) {
        alert('collision!');
      }

      //Add the sheep from the gameObjects array
      switch (gameObjects[row][column]) {
        case sheep:
          cell.src = './images/sheep.png';
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
