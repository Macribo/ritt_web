/*credit - Rex van der Spuy, "Foundation Game Design with HTML Javascript" */
console.log('rex');
$(document).ready(function() {
  // alert(Cookies.get('place'));
  var locationID = Cookies.get('locationID');
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
  //   alert('old state branch loaded');
  $('.levelDescription').text(Cookies.get('place'));
  let placeName = Cookies.get('place');
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
    [
      7,
      '^',
      '^',
      '^',
      '^',
      '^',
      '^',
      '^',
      '^',
      '^',
      '^',
      '^',
      '^',
      '^',
      '^',
      7
    ],
    [7, '^', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, '^'],
    [7, '^', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, '^'],
    [7, '^', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, '^'],
    [7, 3, '^', '^', '^', '^', '^', '^', '^', '^', '^', '^', '^', '^', '^', 7],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
  ];

  //The game objects map
  var gameObjects = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  var lastPressed = ''; //what was the last key pressed?

  //Map code
  var SUAS = '^';
  var SIOS = 'v';
  var CLÉ = '<';
  var DEAS = '>';
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
        blockPath();
        $('#back-to-county').fadeOut('slow');
        $('.modal').css('display', 'flex');
        // $('.btn-panel').css('display', 'none');
        $('.btn-menu').css('pointer-events', 'none');

        //   alert('show btn!');
        break;

      case LAND:
        // trade();
        break;

      case SUAS:
        changeLocation(locationID);

        // alert('suas');
        break;

      case SIOS:
        // alert('sios');
        changeLocation(locationID);

        break;

      case CLÉ:
        // alert('clé');
        changeLocation(locationID);
        break;

      case DEAS:
        // alert('deas');
        changeLocation(locationID);

        break;

      case BLOCKED:
        //Undo last key press
        //   alert('blocked!');
        console.log(lastPressed);
        alert('Blocked' + lastPressed + Cookies.get('locationID'));
        blockPath();
        break;
      case WAVES:
        blockPath();
        break;
    }

    //Render the game
    render();
  }

  setBG = placeName => {
    //refactor these if statements:
  };

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

          case SUAS:
            cell.src = './images/folamh.png';
            break;
          case SIOS:
            cell.src = './images/folamh.png';
            break;
          case CLÉ:
            cell.src = './images/folamh.png';
            break;
          case DEAS:
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

  $('#back-to-county').click(function() {
    location.href = './locations.html';
    // alert('see u');
  });
  setLocation = locationID => {
    // checkForSeaTile = currentCounty.substring(0, currentCounty.length);
    // if ((checkForSeaTile = 'sea')) {
    //   alert('uisce!');
    // }
    if (locationID === 'antrim1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/1.png")'
      );
    } else if (locationID === 'antrim2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/2.png")'
      );
    } else if (locationID === 'antrim3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/3.png")'
      );
    } else if (locationID === 'antrim4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/4.png")'
      );
    } else if (locationID === 'antrim5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/5.png")'
      );
    }
    //cavan
    else if (locationID === 'antrim6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/6.png")'
      );
    } else if (locationID === 'armagh1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/7.png")'
      );
    } else if (locationID === 'armagh2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/8.png")'
      );
    } else if (locationID === 'armagh3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/9.png")'
      );
    } else if (locationID === 'armagh4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/10.png")'
      );
    } else if (locationID === 'armagh5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/11.png")'
      );
    } else if (locationID === 'armagh6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/12.png")'
      );
    } else if (locationID === 'carlow1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/13.png")'
      );
    } else if (locationID === 'carlow2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/14.png")'
      );
    } else if (locationID === 'carlow3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/15.png")'
      );
    } else if (locationID === 'carlow4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/16.png")'
      );
    } else if (locationID === 'carlow5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/17.png")'
      );
    } else if (locationID === 'carlow6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/18.png")'
      );
    } else if (locationID === 'cavan1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/19.png")'
      );
    } else if (locationID === 'cavan2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/20.png")'
      );
    } else if (locationID === 'cavan3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/21.png")'
      );
    } else if (locationID === 'cavan4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/22.png")'
      );
    } else if (locationID === 'cavan5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/23.png")'
      );
    }
    //derry
    else if (locationID === 'cavan6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/24.png")'
      );
    } else if (locationID === 'clare1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/25.png")'
      );
    } else if (locationID === 'clare2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/26.png")'
      );
    } else if (locationID === 'clare3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/27.png")'
      );
    } else if (locationID === 'clare4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/28.png")'
      );
    } else if (locationID === 'clare5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/29.png")'
      );
    } else if (locationID === 'clare6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/30.png")'
      );
    } else if (locationID === 'cork1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/31.png")'
      );
    } else if (locationID === 'cork2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/32.png")'
      );
    } else if (locationID === 'cork3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/33.png")'
      );
    } else if (locationID === 'cork4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/34.png")'
      );
    } else if (locationID === 'cork5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/36.png")'
      );
    } else if (locationID === 'cork6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/37.png")'
      );
    } else if (locationID === 'derry1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/38.png")'
      );
    } else if (locationID === 'derry2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/39.png")'
      );
    } else if (locationID === 'derry3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/40.png")'
      );
    } else if (locationID === 'derry4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/41.png")'
      );
    } else if (locationID === 'derry5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/42.png")'
      );
    } else if (locationID === 'derry6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/43.png")'
      );
    } else if (locationID === 'donegal1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/44.png")'
      );
    } else if (locationID === 'donegal2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/45.png")'
      );
    } else if (locationID === 'donegal3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/46.png")'
      );
    } else if (locationID === 'donegal4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/47.png")'
      );
    } else if (locationID === 'donegal5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/48.png")'
      );
    } else if (locationID === 'donegal6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/49.png")'
      );
    } else if (locationID === 'down1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/50.png")'
      );
    } else if (locationID === 'down2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/51.png")'
      );
    } else if (locationID === 'down3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/52.png")'
      );
    } else if (locationID === 'down4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/53.png")'
      );
    } else if (locationID === 'down5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/54.png")'
      );
    } else if (locationID === 'down6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/55.png")'
      );
    } else if (locationID === 'dublin1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/56.png")'
      );
    } else if (locationID === 'dublin2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/57.png")'
      );
    } else if (locationID === 'dublin3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/58.png")'
      );
    } else if (locationID === 'dublin4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/59.png")'
      );
    } else if (locationID === 'dublin5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/60.png")'
      );
    } else if (locationID === 'dublin6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/61.png")'
      );
    } else if (locationID === 'fermanagh1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/62.png")'
      );
    } else if (locationID === 'fermanagh2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/63.png")'
      );
    } else if (locationID === 'fermanagh3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/64.png")'
      );
    } else if (locationID === 'fermanagh4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/65.png")'
      );
    } else if (locationID === 'fermanagh5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/66.png")'
      );
    } else if (locationID === 'fermanagh6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/67.png")'
      );
    } else if (locationID === 'galway1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/68.png")'
      );
    } else if (locationID === 'galway2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/69.png")'
      );
    } else if (locationID === 'galway3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/70.png")'
      );
    } else if (locationID === 'galway4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/71.png")'
      );
    } else if (locationID === 'galway5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/72.png")'
      );
    } else if (locationID === 'galway6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/73.png")'
      );
    } else if (locationID === 'kerry1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/74.png")'
      );
    } else if (locationID === 'kerry2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/75.png")'
      );
    } else if (locationID === 'kerry3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/76.png")'
      );
    } else if (locationID === 'kerry4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/77.png")'
      );
    } else if (locationID === 'kerry5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/78.png")'
      );
    } else if (locationID === 'kildare6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/79.png")'
      );
    } else if (locationID === 'kildare1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/80.png")'
      );
    } else if (locationID === 'kildare2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/81.png")'
      );
    } else if (locationID === 'kildare3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/82.png")'
      );
    } else if (locationID === 'kildare4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/83.png")'
      );
    } else if (locationID === 'kildare5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/84.png")'
      );
    } else if (locationID === 'kilkenny6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/85.png")'
      );
    } else if (locationID === 'kilkenny1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/86.png")'
      );
    } else if (locationID === 'kilkenny2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/87.png")'
      );
    } else if (locationID === 'kilkenny3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/89.png")'
      );
    } else if (locationID === 'kilkenny4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/90.png")'
      );
    } else if (locationID === 'kilkenny5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/91.png")'
      );
    } else if (locationID === 'kilkenny6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/92.png")'
      );
    } else if (locationID === 'laois1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/93.png")'
      );
    } else if (locationID === 'laois2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/94.png")'
      );
    } else if (locationID === 'laois3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/95.png")'
      );
    } else if (locationID === 'laois4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/96.png")'
      );
    } else if (locationID === 'laois5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/97.png")'
      );
    } else if (locationID === 'laois6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/98.png")'
      );
    } else if (locationID === 'leitrim1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/99.png")'
      );
    } else if (locationID === 'leitrim2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/100.png")'
      );
    } else if (locationID === 'leitrim3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/101.png")'
      );
    } else if (locationID === 'leitrim4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/102.png")'
      );
    } else if (locationID === 'leitrim5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/103.png")'
      );
    } else if (locationID === 'leitrim6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/104.png")'
      );
    } else if (locationID === 'limerick1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/105.png")'
      );
    } else if (locationID === 'limerick2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/106.png")'
      );
    } else if (locationID === 'limerick3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/107.png")'
      );
    } else if (locationID === 'limerick4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/108.png")'
      );
    } else if (locationID === 'limerick5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/109.png")'
      );
    } else if (locationID === 'limerick6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/110.png")'
      );
    } else if (locationID === 'longford1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/111.png")'
      );
    } else if (locationID === 'longford2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/112.png")'
      );
    } else if (locationID === 'longford3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/113.png")'
      );
    } else if (locationID === 'longford4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/114.png")'
      );
    } else if (locationID === 'longford5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/115.png")'
      );
    } else if (locationID === 'longford6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/116.png")'
      );
    } else if (locationID === 'louth1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/117.png")'
      );
    } else if (locationID === 'louth2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/118.png")'
      );
    } else if (locationID === 'louth3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/119.png")'
      );
    } else if (locationID === 'louth4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/120.png")'
      );
    } else if (locationID === 'louth5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/121.png")'
      );
    } else if (locationID === 'louth6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/122.png")'
      );
    } else if (locationID === 'mayo1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/123.png")'
      );
    } else if (locationID === 'mayo2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/124.png")'
      );
    } else if (locationID === 'mayo3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/125.png")'
      );
    } else if (locationID === 'mayo4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/126.png")'
      );
    } else if (locationID === 'mayo5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/127.png")'
      );
    } else if (locationID === 'mayo6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/128.png")'
      );
    } else if (locationID === 'meath1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/129.png")'
      );
    } else if (locationID === 'meath2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/130.png")'
      );
    } else if (locationID === 'meath3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/131.png")'
      );
    } else if (locationID === 'meath4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/132.png")'
      );
    } else if (locationID === 'meath5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/133.png")'
      );
    } else if (locationID === 'meath6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/134.png")'
      );
    } else if (locationID === 'monaghan1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/135.png")'
      );
    } else if (locationID === 'monaghan2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/136.png")'
      );
    } else if (locationID === 'monaghan3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/137.png")'
      );
    } else if (locationID === 'monaghan4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/138.png")'
      );
    } else if (locationID === 'monaghan5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/139.png")'
      );
    } else if (locationID === 'monaghan6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/140.png")'
      );
    } else if (locationID === 'offaly1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/141.png")'
      );
    } else if (locationID === 'offaly2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/142.png")'
      );
    } else if (locationID === 'offaly3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/143.png")'
      );
    } else if (locationID === 'offaly4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/144.png")'
      );
    } else if (locationID === 'offaly5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/145.png")'
      );
    } else if (locationID === 'offaly6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/146.png")'
      );
    } else if (locationID === 'roscommon1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/147.png")'
      );
    } else if (locationID === 'roscommon2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/148.png")'
      );
    } else if (locationID === 'roscommon3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/149.png")'
      );
    } else if (locationID === 'roscommon4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/150.png")'
      );
    } else if (locationID === 'roscommon5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/151.png")'
      );
    } else if (locationID === 'roscommon6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/152.png")'
      );
    } else if (locationID === 'sligo1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/153.png")'
      );
    } else if (locationID === 'sligo2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/154.png")'
      );
    } else if (locationID === 'sligo3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/155.png")'
      );
    } else if (locationID === 'sligo4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/156.png")'
      );
    } else if (locationID === 'sligo5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/157.png")'
      );
    } else if (locationID === 'sligo6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/158.png")'
      );
    } else if (locationID === 'tipperary1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/159.png")'
      );
    } else if (locationID === 'tipperary2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/160.png")'
      );
    } else if (locationID === 'tipperary3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/161.png")'
      );
    } else if (locationID === 'tipperary4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/162.png")'
      );
    } else if (locationID === 'tipperary5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/163.png")'
      );
    } else if (locationID === 'tipperary6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/164.png")'
      );
    } else if (locationID === 'tyrone1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/165.png")'
      );
    } else if (locationID === 'tyrone2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/166.png")'
      );
    } else if (locationID === 'tyrone3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/167.png")'
      );
    } else if (locationID === 'tyrone4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/168.png")'
      );
    } else if (locationID === 'tyrone5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/169.png")'
      );
    } else if (locationID === 'tyrone6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/170.png")'
      );
    } else if (locationID === 'waterford1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/171.png")'
      );
    } else if (locationID === 'waterford2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/172.png")'
      );
    } else if (locationID === 'waterford3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/173.png")'
      );
    } else if (locationID === 'waterford4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/174.png")'
      );
    } else if (locationID === 'waterford5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/175.png")'
      );
    } else if (locationID === 'waterford6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/176.png")'
      );
    } else if (locationID === 'westmeath1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/177.png")'
      );
    } else if (locationID === 'westmeath2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/178.png")'
      );
    } else if (locationID === 'westmeath3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/179.png")'
      );
    } else if (locationID === 'westmeath4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/180.png")'
      );
    } else if (locationID === 'westmeath5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/181.png")'
      );
    } else if (locationID === 'westmeath6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/182.png")'
      );
    } else if (locationID === 'wexford1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/183.png")'
      );
    } else if (locationID === 'wexford2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/184.png")'
      );
    } else if (locationID === 'wexford3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/185.png")'
      );
    } else if (locationID === 'wexford4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/186.png")'
      );
    } else if (locationID === 'wexford5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/187.png")'
      );
    } else if (locationID === 'wexford6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/188.png")'
      );
    } else if (locationID === 'wicklow1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/189.png")'
      );
    } else if (locationID === 'wicklow2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/190.png")'
      );
    } else if (locationID === 'wicklow3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/191.png")'
      );
    } else if (locationID === 'wicklow4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/192.png")'
      );
    } else if (locationID === 'wicklow5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/193.png")'
      );
    } else if (locationID === 'wicklow6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/194.png")'
      );
    } else {
      //random
      $('#stageBG').css('background-image', randMap);
      // alert(randMap);
    }
    // alert('location set for ' + locationID);
  };

  var bg = $('#stageBG').css('background-image');
  //   alert(bg);
  if (bg === 'none') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg171.png")'
    );
  }

  getCountyLocation = locationID => {
    var tempLocationID = locationID;
    return String(tempLocationID.slice(-1));
  };
  getCurrentCounty = locationID => {
    return String(locationID.substring(0, locationID.length - 1));
  };

  updateProvincialEmblem = () => {
    currentCounty = getCurrentCounty(locationID);
    if (
      currentCounty === 'antrim' ||
      currentCounty === 'armagh' ||
      currentCounty === 'cavan' ||
      currentCounty === 'donegal' ||
      currentCounty === 'down' ||
      currentCounty === 'fermanagh' ||
      currentCounty === 'derry' ||
      currentCounty === 'monaghan' ||
      currentCounty === 'tyrone'
    ) {
      //   alert(currentCounty);
      $('#province-emblem').css('background-image', 'url("./images/a2.png")');
      $('#province-title').text('Ulaidh');
    } else if (
      currentCounty === 'carlow' ||
      currentCounty === 'dublin' ||
      currentCounty === 'kildare' ||
      currentCounty === 'kilkenny' ||
      currentCounty === 'laois' ||
      currentCounty === 'longford' ||
      currentCounty === 'louth' ||
      currentCounty === 'meath' ||
      currentCounty === 'offaly' ||
      currentCounty === 'westmeath' ||
      currentCounty === 'wexford' ||
      currentCounty === 'wicklow'
    ) {
      $('#province-emblem').css('background-image', 'url("./images/a1.png")');
      $('#province-title').text('Laighin');
    } else if (
      currentCounty === 'clare' ||
      currentCounty === 'cork' ||
      currentCounty === 'kerry' ||
      currentCounty === 'limerick' ||
      currentCounty === 'tipperary' ||
      currentCounty === 'waterford'
    ) {
      $('#province-emblem').css('background-image', 'url("./images/a3.png")');
      $('#province-title').text('an Mhumhain');
    } else if (
      currentCounty === 'Galway' ||
      currentCounty === 'leitrim' ||
      currentCounty === 'mayo' ||
      currentCounty === 'roscommon' ||
      currentCounty === 'sligo'
    ) {
      $('#province-emblem').css('background-image', 'url("./images/a4.png")');
      $('#province-title').text('Connachta');
    }
  };
  updateCountyEmblem = () => {
    currentCounty = getCurrentCounty(locationID);
    if (currentCounty === 'antrim') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/antrim.png")'
      );
      $('#county-title').text(countyDetails.antrim[0]);
    } else if (currentCounty === 'armagh') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/armagh.png")'
      );
      $('#county-title').text(countyDetails.armagh[0]);
    } else if (currentCounty === 'carlow') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/carlow.png")'
      );
      $('#county-title').text(countyDetails.carlow[0]);
    } else if (currentCounty === 'cavan') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/cavan.png")'
      );
      $('#county-title').text(countyDetails.cavan[0]);
    } else if (currentCounty === 'clare') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/clare.png")'
      );
      $('#county-title').text(countyDetails.clare[0]);
    } else if (currentCounty === 'cork') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/cork.png")'
      );
      $('#county-title').text(countyDetails.cork[0]);
    } else if (currentCounty === 'derry') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/derry.png")'
      );
      $('#county-title').text(countyDetails.derry[0]);
    } else if (currentCounty === 'donegal') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/donegal.png")'
      );
      $('#county-title').text(countyDetails.donegal[0]);
    } else if (currentCounty === 'down') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/down.png")'
      );
      $('#county-title').text(countyDetails.down[0]);
    } else if (currentCounty === 'dublin') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/dublin.png")'
      );
      $('#county-title').text(countyDetails.dublin[0]);
    } else if (currentCounty === 'fermanagh') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/fermanagh.png")'
      );
      $('#county-title').text(countyDetails.fermanagh[0]);
    } else if (currentCounty === 'galway') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/galway.png")'
      );
      $('#county-title').text(countyDetails.galway[0]);
    } else if (currentCounty === 'kerry') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/kerry.png'
      );
      $('#county-title').text(countyDetails.kerry[0]);
    } else if (currentCounty === 'kildare') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/kildare.png'
      );
      $('#county-title').text(countyDetails.kildare[0]);
    } else if (currentCounty === 'kilkenny') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/kilkenny.png'
      );
      $('#county-title').text(countyDetails.kilkenny[0]);
    } else if (currentCounty === 'laois') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/laois.png'
      );
      $('#county-title').text(countyDetails.laois[0]);
    } else if (currentCounty === 'leitrim') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/leitrim.png'
      );
      $('#county-title').text(countyDetails.leitrim[0]);
    } else if (currentCounty === 'limerick') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/limerick.png'
      );
      $('#county-title').text(countyDetails.limerick[0]);
    } else if (currentCounty === 'longford') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/longford.png'
      );
      $('#county-title').text(countyDetails.longford[0]);
    } else if (currentCounty === 'louth') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/louth.png'
      );
      $('#county-title').text(countyDetails.louth[0]);
    } else if (currentCounty === 'mayo') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/mayo.png'
      );
      $('#county-title').text(countyDetails.mayo[0]);
    } else if (currentCounty === 'meath') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/meath.png'
      );
      $('#county-title').text(countyDetails.meath[0]);
    } else if (currentCounty === 'monaghan') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/monaghan.png'
      );
      $('#county-title').text(countyDetails.monaghan[0]);
    } else if (currentCounty === 'offaly') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/offaly.png'
      );
      $('#county-title').text(countyDetails.offaly[0]);
    } else if (currentCounty === 'roscommon') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/roscommon.png'
      );
      $('#county-title').text(countyDetails.roscommon[0]);
    } else if (currentCounty === 'sligo') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/sligo.png'
      );
      $('#county-title').text(countyDetails.sligo[0]);
    } else if (currentCounty === 'tipperary') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/tipperary.png'
      );
      $('#county-title').text(countyDetails.tipperary[0]);
    } else if (currentCounty === 'tyrone') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/tyrone.png")'
      );
      $('#county-title').text(countyDetails.tyrone[0]);
    } else if (currentCounty === 'waterford') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/waterford.png")'
      );
      $('#county-title').text(countyDetails.waterford[0]);
    } else if (currentCounty === 'westmeath') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/westmeath.png")'
      );
      $('#county-title').text(countyDetails.westmeath[0]);
    } else if (currentCounty === 'wexford') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/wexford.png")'
      );
      $('#county-title').text(countyDetails.wexford[0]);
    } else if (currentCounty === 'wicklow') {
      $('#county-emblem').css(
        'background-image',
        'url("./images/emblems/wicklow.png")'
      );
      $('#county-title').text(countyDetails.wicklow[0]);
    }
  };
  updateCountyName = () => {};

  changeLocation = () => {
    let currentCounty = getCurrentCounty(locationID);
    let countyLocation = getCountyLocation(locationID);
    // currentCounty = String(locationID);

    // alert(
    //   'locationID: ' +
    //     locationID +
    //     ' countyName: ' +
    //     currentCounty +
    //     ' location in County: ' +
    //     countyLocation +
    //     ' last keypress : ' +
    //     lastPressed
    // );
    updateMap(currentCounty, countyLocation, lastPressed);
    updateLocationDescription(locationID);

    updateProvincialEmblem();
    updateCountyEmblem();
    updateCountyName();
    //todo don't run if sea location
    updatePlayerLocation();
  };

  seaHandler = () => {
    alert('Níl bád agat.');
  };
  updateMap = (currentCounty, countyLocation, lastPressed) => {
    //the sea!

    if (currentCounty === 'antrim') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'derry5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'down2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim5';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim1';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'derry3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim5';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'derry2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'antrim2';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim4';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'antrim4';
        setLocation(locationID);
      }
    }

    ///////////////
    ////////////////
    else if (currentCounty === 'armagh') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh6';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim1';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh3';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan4';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'armagh6';

        setLocation(locationID);
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'antrim1';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        locationID = 'armagh3';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'monaghan6';

        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'armagh6';

        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh4';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'louth1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh4';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'louth2';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'armagh2';

        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'armagh1';

        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'armagh3';
        setLocation(locationID);
      }
    } else if (currentCounty === 'carlow') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'carlow3';

        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow6';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny1';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'carlow6';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'carlow4';

        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny2';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'carlow1';

        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'wexford4';

        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'carlow5';

        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'laois6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = ''; //TODO  nasc go kildare F
        alert('//TODO  nasc go kildare F');
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow4';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'wicklow1';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'carlow2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'wexford4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'wexford1';
        setLocation(locationID);
      }
    } else if (currentCounty === 'cavan') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');

        locationID = 'monaghan1';
        setLocation(locationID);

        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan5';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'louth5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'cavan1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'meath5';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'cavan6';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'fermanagh2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');

        locationID = 'fermanagh3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('TODO nasc go leitrim c');
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim5';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'cavan2';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath2';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'cavan4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'fermanagh2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'longford6';
        setLocation(locationID);
      }
    } else if (currentCounty === 'clare') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        seaHandler();
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'clare4';
        setLocation(locationID);

        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'clare2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'clare3';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'tipperary1';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'galway5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'clare1';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'clare5';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'clare6';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'clare1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'clare1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'galway5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'clare6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'clare3';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'clare1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'clare3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'tipperary1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'clare4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'limerick4';
        setLocation(locationID);
      }
    } else if (currentCounty === 'cork') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'cork2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'waterford2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'limerick5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cork5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'cork1';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'limerick4';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cork6';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'cork4';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'cork6';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'cork3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'cork2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'cork6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'waterford2';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'cork1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cork6';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'cork4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'cork5';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'cork3';
        setLocation(locationID);
      }
    } else if (currentCounty === 'derry') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'derry6';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'derry4';
        setLocation(locationID);

        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'derry2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone2';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'antrim5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'derry3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'derry5';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'derry2';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'antrim4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'derry4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'derry2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'derry1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'derry3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'derry1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'derry2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'antrim5';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'derry2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('ToDo: nasc ar lár.');
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'donegal4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'derry1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'donegal5';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'tyrone5';
        setLocation(locationID);
      }
    } else if (currentCounty === 'donegal') {
      if (countyLocation == 1 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'donegal4';
        setLocation(locationID);

        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'donegal6';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'donegal2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'donegal3';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'donegal1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh5';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'donegal2';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'tyrone4';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'donegal4';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone4';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'donegal1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'derry6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'donegal5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'donegal3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'donegal4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'donegal1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'donegal1';
        setLocation(locationID);
      }
    } else if (currentCounty === 'down') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'down5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'down2';
        setLocation(locationID);

        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim1';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'down4';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'down1';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'antrim1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'down3';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'down4';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'down2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'down4';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'louth2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'down5';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'down1';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'down4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'armagh2';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'down5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'antrim1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'down4';
        setLocation(locationID);
      }
    } else if (currentCounty === 'dublin') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare3';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'dublin5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'dublin4';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'dublin6';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'dublin5';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'kildare3';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'dublin4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'dublin6';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'dublin5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'dublin3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'dublin2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'dublin6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'dublin5';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'dublin4';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'dublin1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'meath3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'meath3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'dublin4';
        setLocation(locationID);
      }
    } else if (currentCounty === 'fermanagh') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'monaghan3';
        setLocation(locationID);

        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh4';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan6';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim2';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'fermanagh1';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'fermanagh3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        alert('TODO fermanagh3a or fermanagh3b?');

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        alert('TODO fermanagh3a or fermanagh3b?');

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        alert('TODO fermanagh3a or fermanagh3b?');

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = '';
        setLocation(locationID);
        alert('TODO fermanagh3a or fermanagh3b?');
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh5';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'tyrone4';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        alert('TODO fermanagh3a or fermanagh3b?');

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        alert('TODO fermanagh3a or fermanagh3b?');

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = '';
        setLocation(locationID);
        alert('TODO fermanagh3a or fermanagh3b?');
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = '';
        setLocation(locationID);
        alert('TODO fermanagh3a or fermanagh3b?');
      }
    } else if (currentCounty === 'galway') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'galway2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'galway5';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'mayo5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'galway4';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'galway1';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'mayo5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'galway4';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'mayo2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'galway6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'galway3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'galway2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'mayo1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'galway3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'galway1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'roscommon1';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'clare4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        seaHandler();

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        seaHandler();

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'galway3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        seaHandler();
      }
    } else if (currentCounty === 'kerry') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'kerry2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'cork2';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'kerry6';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kerry2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'kerry1';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'kerry1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'kerry5';
        setLocation(locationID);
        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'kerry4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'kerry5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'kerry3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'kerry6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        seaHandler();
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'kerry3';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'kerry4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'cork2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kerry1';
        setLocation(locationID);
      }
    } else if (currentCounty === 'kildare') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'laois6';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'wicklow5';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare3';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'laois5';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'wicklow4';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'kildare1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow5';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'kildare4';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'dublin3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'kildare6';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly5';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'kildare6';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'meath6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'kildare5';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'dublin3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'meath3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'kildare3';
        setLocation(locationID);
      }
    } else if (currentCounty === 'kilkenny') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary1';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'kilkenny4';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'laois4';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford3';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny4';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'carlow2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'laois4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny3';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'kilkenny6';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'carlow2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'kilkenny2';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'wexford1';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'tipperary4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'kilkenny3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'waterford3';
        setLocation(locationID);
      }
    } else if (currentCounty === 'laois') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'laois2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'kildare4';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('TODO convert laois C');
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'laois4';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary1';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'laois4';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'laois3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny1';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'offaly5';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'laois5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'offaly6';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'laois2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('ToDo: replace laois D');
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('todo: replace laois E');
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'laois3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'laois6';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'laois6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'laois1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'laois5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'kildare4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly6';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'laois5';
        setLocation(locationID);
      }
    } else if (currentCounty === 'leitrim') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo4';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'fermanagh3';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim6';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim5';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'cavan6';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        // locationID = 'sea';

        locationID = 'cavan4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim3';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'roscommon5';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'cavan5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'leitrim2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim4';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('todo: roscommon E');
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'longford6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'leitrim2';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon5';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'sligo4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'fermanagh5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'leitrim5';
        setLocation(locationID);
      }
    } else if (currentCounty === 'limerick') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'limerick3';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'tipperary6';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'limerick2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'limerick5';
        setLocation(locationID);
        alert('todo: limerick6 or limerick6?');
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = '';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        alert('todo: limerick6 or limerick6?');
      } else if (countyLocation == 2 && lastPressed === 'up') {
        alert('todo: limerick6 or limerick6?');

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        alert('todo: limerick6 or limerick6?');

        locationID = '';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'kerry1';
        setLocation(locationID);
        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'limerick5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'limerick2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'limerick5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'limerick6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('todo: tipperary C');
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'clare6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cork1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'limerick3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'tipperary6';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'limerick1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cork';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        alert('todo: limerick6 or limerick6?');

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        alert('todo: limerick6 or limerick6?');

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        alert('todo: limerick6 or limerick6?');

        locationID = '';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        alert('todo: limerick6 or limerick6?');

        locationID = '';
        setLocation(locationID);
      }
    } else if (currentCounty === 'longford') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'longford3';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'longford4';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'longford2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon6';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'longford6';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'leitrim4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'longford3';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'roscommon5';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'longford1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'longford2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'longford1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'longford6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'longford6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'meath5';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan5';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath2';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'longford2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'longford5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'longford4';
        setLocation(locationID);
      }
    } else if (currentCounty === 'louth') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan6';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'louth4';
        setLocation(locationID);

        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'louth3';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'louth4';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'louth4';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'louth5';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'louth6';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'louth1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'meath2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'louth1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'louth2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'louth2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'louth5';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'meath2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'louth3';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'louth1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'meath2';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'louth3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'louth1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'meath2';
        setLocation(locationID);
      }
    } else if (currentCounty === 'mayo') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'mayo2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'mayo5';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'mayo3';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'galway5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'mayo1';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'mayo3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'galway4';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'mayo4';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'mayo6';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'mayo5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'mayo3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 4 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'mayo1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'roscommon1';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'mayo6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'galway5';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'mayo3';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'sligo3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'mayo5';
        setLocation(locationID);
      }
    } else if (currentCounty === 'meath') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = '';
        setLocation(locationID);
        alert('todo: meath2 or meath2?');
      } else if (countyLocation == 1 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('todo: meath2 or meath2?');
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('todo: meath2 or meath2?');
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('todo: meath2 or meath2?');
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        alert('todo: meath2 or meath2?');
      } else if (countyLocation == 2 && lastPressed === 'up') {
        alert('todo: meath2 or meath2?');

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = '';
        alert('todo: meath2 or meath2?');
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'meath6';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'dublin3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'meath1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'meath5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'meath2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'meath5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'meath6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'meath4';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'meath4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'westmeath1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'meath3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'meath4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'kildare5';
        setLocation(locationID);
      }
    } else if (currentCounty === 'monaghan') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'louth1';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan6';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'meath2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan6';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'monaghan1';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'monaghan5';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cavan3';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'fermanagh1';
        setLocation(locationID);
        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'monaghan5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'monaghan3';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'monaghan6';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan2';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'monaghan2';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'armagh4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'armagh4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'monaghan1';
        setLocation(locationID);
      }
    } else if (currentCounty === 'offaly') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon1';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'offaly5';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'galway5';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'offaly4';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'offaly4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly3';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'tipperary1';
        setLocation(locationID);
        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'offaly4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'offaly2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'kildare5';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly6';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'offaly4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'kildare4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly5';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'laois6';
        setLocation(locationID);
      }
    } else if (currentCounty === 'roscommon') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'galway5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'westmeath4';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'galway5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon4';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'roscommon5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'roscommon6';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon1';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'mayo6';
        setLocation(locationID);
        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'roscommon4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'sligo6';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'galway5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'mayo5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'galway5';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'longford3';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'roscommon4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'leitrim4';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim5';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'roscommon5';
        setLocation(locationID);
      }
    } else if (currentCounty === 'sligo') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'mayo6';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'sligo4';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo3';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo4';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo5';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');

        locationID = 'sligo2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'leitrim6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        seaHandler();
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'roscommon1';
        alert('todo : link to correct roscommon location');
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon6';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'mayo6';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'sligo5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'sligo3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'mayo5';
        setLocation(locationID);
      }
    } else if (currentCounty === 'tipperary') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'clare4';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'offaly3';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'galway2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary2';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary5';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'tipperary4';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'tipperary1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary4';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'tipperary5';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'kilkenny5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'tipperary4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'tipperary2';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary2';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary6';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'limerick1';

        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'tipperary5';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary5';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'cork1';
        alert('todo: link to correct cork location');
        setLocation(locationID);
      }
    } else if (currentCounty === 'tyrone') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'tyrone6';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone4';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'fermanagh4';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone6';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'derry5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'derry2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone3';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'tyrone1';
        setLocation(locationID);
        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'armagh4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'tyrone2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'monaghan4';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'donegal3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'donegal4';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone4';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'derry1';
        alert('todo: link to derry C');
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'derry6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone6';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'tyrone1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'tyrone2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'tyrone5';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'tyrone3';
        setLocation(locationID);
      }
    } else if (currentCounty === 'waterford') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford4';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'waterford1';
        setLocation(locationID);

        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford6';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford5';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'cork1';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'waterford1';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'tipperary6';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford4';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'waterford6';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 3 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        // locationID = 'sea';
        locationID = 'kilkenny5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'cork5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford2';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford5';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford4';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        seaHandler();
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        seaHandler();

        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        seaHandler();
        locationID = 'waterford2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'waterford3';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'tipperary3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'waterford1';
        setLocation(locationID);
      }
    } else if (currentCounty === 'westmeath') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'meath5';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath6';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath3';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        locationID = 'westmeath1';
        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'cavan5';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'weestmeath6';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'westmeath4';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'westmeath1';
        alert('todo: fix westmeath3 right + up links');
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'westmeath1';
        alert('todo: fix westmeath3 right + up links');
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'roscommon6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'longford4';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'westmeath6';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'offaly1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'westmeath5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        locationID = 'westmeath1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'westmeath1';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'offaly5';
        setLocation(locationID);
      }
    } else if (currentCounty === 'wexford') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'kilkenny3';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'wexford3';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'wexford5';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow1';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'wicklow6';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'waterford6';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'wexford1';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        seaHandler();

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        seaHandler();

        locationID = 'wexford5';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        seaHandler();
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'carlow3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'wexford5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'wexford6';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'wexford3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'wexford4';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'wexford6';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'wexford6';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'wexford3';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'wexford4';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'wexford2';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        locationID = 'wexford5';
        setLocation(locationID);
      }
    } else if (currentCounty === 'wicklow') {
      if (countyLocation == 1 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow4';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        locationID = 'wicklow6';
        setLocation(locationID);
        //    setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow2';
        setLocation(locationID);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        seaHandler();

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow3';

        setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 2 && lastPressed === 'up') {
        locationID = 'dublin1';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow6';
        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        locationID = 'kildare6';
        setLocation(locationID);

        //        setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        locationID = 'wicklow2';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        locationID = 'dublin5';
        setLocation(locationID);

        // setLocation(locationID);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare3';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow1';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow5';
        setLocation(locationID);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow1';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        locationID = 'kildare3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        locationID = 'wicklow3';
        //   alert('new current location will be loch erne');
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow3';
        setLocation(locationID);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow4';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        locationID = 'wicklow1';
        setLocation(locationID);
        // setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        seaHandler();
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        locationID = 'wicklow2';
        setLocation(locationID);
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        seaHandler();
      }
    }
  };
  //   alert('go');

  updatePlayerLocation = () => {
    console.log('updatePlayerLocation on map');
    if (lastPressed === 'up') {
      //clear the sheep's current cell
      gameObjects[sheepRow][sheepColumn] = 0;

      //
      // move it to bottom of map the map
      sheepRow = 4;

      //Apply the sheep's new updated position to the array
      gameObjects[sheepRow][sheepColumn] = sheep;
    }

    if (lastPressed === 'down') {
      //clear the sheep's current cell
      gameObjects[sheepRow][sheepColumn] = 0;

      //
      // move it to bottom of map the map
      sheepRow = 1;

      //Apply the sheep's new updated position to the array
      gameObjects[sheepRow][sheepColumn] = sheep;
    }

    if (lastPressed === 'right') {
      //clear the sheep's current cell
      gameObjects[sheepRow][sheepColumn] = 0;

      //
      // move it to bottom of map the map
      sheepRow = 2;

      //Apply the sheep's new updated position to the array
      gameObjects[sheepRow][sheepColumn] = sheep;
    }

    if (lastPressed === 'left') {
      //clear the sheep's current cell
      gameObjects[sheepRow][sheepColumn] = 0;

      //
      // move it to bottom of map the map
      sheepColumn = 14;

      //Apply the sheep's new updated position to the array
      gameObjects[sheepRow][sheepColumn] = sheep;
    }
  };

  updateLocationDescription = locationID => {
    var varNum = Number(getCountyLocation(locationID)) - 1; //array value
    let newLocationName;

    var co = getCurrentCounty(locationID);
    if (co === 'antrim') {
      newLocationName = countyDetails.antrim[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'armagh') {
      newLocationName = countyDetails.armagh[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'carlow') {
      newLocationName = countyDetails.carlow[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'cavan') {
      newLocationName = countyDetails.cavan[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'clare') {
      newLocationName = countyDetails.clare[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'cork') {
      newLocationName = countyDetails.cork[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'derry') {
      newLocationName = countyDetails.derry[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'donegal') {
      newLocationName = countyDetails.donegal[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'down') {
      newLocationName = countyDetails.down[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'dublin') {
      newLocationName = countyDetails.dublin[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'fermanagh') {
      newLocationName = countyDetails.fermanagh[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'galway') {
      newLocationName = countyDetails.galway[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'kerry') {
      newLocationName = countyDetails.kerry[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'kildare') {
      newLocationName = countyDetails.kildare[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'kilkenny') {
      newLocationName = countyDetails.kilkenny[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'laois') {
      newLocationName = countyDetails.laois[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'leitrim') {
      newLocationName = countyDetails.leitrim[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'limerick') {
      newLocationName = countyDetails.limerick[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'longford') {
      newLocationName = countyDetails.longford[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'louth') {
      newLocationName = countyDetails.louth[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'mayo') {
      newLocationName = countyDetails.mayo[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'meath') {
      newLocationName = countyDetails.meath[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'monaghan') {
      newLocationName = countyDetails.monaghan[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'offaly') {
      newLocationName = countyDetails.offaly[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'roscommon') {
      newLocationName = countyDetails.roscommon[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'sligo') {
      newLocationName = countyDetails.sligo[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'tiperary') {
      newLocationName = countyDetails.tiperary[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'tyrone') {
      newLocationName = countyDetails.tyrone[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'westmeath') {
      newLocationName = countyDetails.westmeath[1][varNum];
      $('.levelDescription').html(newLocationName);
    }

    if (co === 'wexford') {
      newLocationName = countyDetails.wexford[1][varNum];
      $('.levelDescription').html(newLocationName);
    }
    if (co === 'wicklow') {
      newLocationName = countyDetails.wickow[1][varNum];
      $('.levelDescription').html(newLocationName);
    }

    // alert('no : ' + varNum);
  };
});
let rando = Math.floor(Math.random() * 40 + 150);
let randMap = 'url("./images/maps/localMaps/bg' + rando + '.png")';

////////////

let countyDetails = {
  antrim: [
    `Co. Aontroma`,
    [
      `Béal Feiriste`,
      `Carraig Ḟearġais`,
      `Reaċlainn`,
      `Aċaḋ Eoċaille`,
      `Carn Ṁéaḃla`,
      `Dearḃóg`
    ],
    //left
    [314, 353, 234, 237, 275, 218],
    //top
    [353, 273, 5, 201, 299, 47]
  ],
  armagh: [
    `Co. Ard Ṁaċa`,
    [
      `Port An Dúnáin`,
      `Sráid na nAlbanach`,
      `Baile an Ṁuilinn`,
      `Baile Úr`,
      `Lios Liath`,
      `Craigavon`
    ], //left
    [313, 233, 243, 217, 308, 291],
    //top
    [9, 14, 166, 290, 333, 25]
  ],
  carlow: [
    `Co. Ċeaṫarlaċ`,
    [
      `Baile Haicéid`,
      `An Ḃuiríos`,
      `Miseal`,
      `Cill Deirge`,
      `Baile Uí Ṁurċú`,
      `Cill Daṁáin`
    ], //left
    [274, 198, 342, 225, 328, 330],
    //top
    [172, 215, 200, 64, 21, 250]
  ],
  cavan: [
    `Co. An Caḃáin`,
    [
      `Dún an Rí`,
      `Lios Cré`,
      `Béal Tairbirt`,
      `Doire na Criaḋ`,
      `An Dromainn`,
      `An Cnoc Rua`
    ], //left
    [463, 428, 340, 138, 380, 278],
    //top
    [275, 340, 149, 58, 300, 108]
  ],
  clare: [
    `Co. An Ċláir`,
    [
      `Fíoch Rua`,
      `Ceann Boirne`,
      `Leaba Ṡíoda`,
      `An Tulach`,
      `Cill Rois`,
      `Bun Raite`
    ], //left
    [159, 125, 163, 344, 110, 321],
    //top
    [195, 21, 341, 193, 371, 270]
  ],
  cork: [
    `Co. Ċorcaí `,
    [
      `Sliabh an Nóglaigh`,
      `Cill na Mallaċ`,
      `Cionn tSáile`,
      `An Sciobairín`,
      `Gleann an Ṗreaċáin`,
      `Beal na mḂláth`
    ], //left
    [405, 346, 378, 191, 404, 362],
    //top
    [123, 90, 286, 345, 156, 246]
  ],
  derry: [
    `Co. Ḋoire`,
    [
      `Léim an Ṁadaiḋ`,
      `Maċaire Ráṫa`,
      `An Seanṁullach`,
      `Droichead Fíolta`,
      `Muine Mór`,
      `Doire`
    ], //left
    [234, 370, 411, 267, 389, 80],
    //top
    [112, 294, 247, 155, 368, 139]
  ],
  donegal: [
    `Co. Ḋún na nGall`,
    [
      `Sléiḃte Ḋoire Ḃeatha`,
      `Na Cruaċa`,
      `Bealach Féich`,
      `Leitir Ceanainn`,
      `Cionn Dhún Damh`,
      `Bun na hAḃann`
    ], //left
    [214, 189, 270, 305, 382, 234],
    //top
    [127, 268, 247, 191, 18, 81]
  ],
  down: [
    `Co. An Dúin`,
    [
      `An Caisleán Riaḃach`,
      `An Ṁainistir Liath`,
      `Dún Pádraig`,
      `Cill Ċaoil`,
      `Lios na gCearrḃach`,
      `An Lorgain`
    ],
    [281, 412, 393, 222, 230, 123],
    //top
    [103, 117, 242, 401, 114, 177]
  ],
  dublin: [
    `Co. Ḃaile Átha Ċliath`,
    [
      `Deilginis`,
      `Binn Éadair`,
      `Cluain Dolcáin`,
      `Cluain Tarbh`,
      `Dún Laoiġaire`,
      `Fionnġlas`
    ],
    [303, 303, 240, 281, 271, 254],
    //top
    [319, 250, 256, 254, 297, 190]
  ],
  fermanagh: [
    `Co. Ḟear Manaċ`,
    [
      `Inis Ceiṫleann`,
      `Scriobaċ`,
      `An Garastún `,
      `Lios na Daróg`,
      `Eadarnaiḋ`,
      `Paiteagó`
    ],
    [273, 132, 19, 257, 258, 148],
    //top
    [213, 196, 84, 106, 20, 35]
  ],
  galway: [
    `Co. na Gailliṁe`,
    [
      `Cill Cais`,
      `An Spidéal `,
      `An Ċeaṫrú Rua`,
      `An Teach Dóite`,
      `Poll an Phúca`,
      `Inis Meáin `
    ],
    [246, 215, 122, 168, 341, 111],
    //top
    [217, 233, 236, 198, 146, 299]
  ],
  kerry: [
    `Co. Ċiarraí`,
    [
      `Na Cruaċa Duḃa`,
      `An tSnaidhm`,
      `An Daingean`,
      `Gleann na bPúcaí`,
      `Cathair Saiḋḃín`,
      `Sliabh Mis`
    ],
    [235, 123, 17, 111, 9, 234],
    //top
    [268, 374, 159, 159, 118, 110]
  ],
  kildare: [
    `Co. Ċill Dara`,
    [
      `An Currach`,
      `Léim an Ḃradáin`,
      `Maigh Nuad`,
      `Fioḋ Alúine`,
      `Cairbre`,
      `Na Solláin`
    ],
    [329, 334, 368, 254, 239, 372],
    //top
    [268, 374, 159, 159, 118, 110]
  ],
  kilkenny: [
    `Co. Ċill Ċainniġ`,
    [
      `Ġráinseaċ Ċuffe`,
      `Baile Ṁic Andáin`,
      `Dún Garḃáin`,
      `Bearna na Gaoiṫe`,
      `Sliaḃ Rua`,
      `Baile an Ṗoill`
    ],
    [157, 272, 274, 207, 274, 215],
    //top
    [228, 295, 334, 300, 397, 361]
  ],
  laois: [
    `Co. Laoise`,
    [
      `Cúil an tSúdaire`,
      `Baile Átha Í`,
      `Eiréil `,
      `Buiríos Mór Osraí`,
      `Darú`,
      `An Baile Fionn`
    ],
    [249, 109, 161, 275, 265, 298],
    //top
    [316, 285, 119, 255, 121, 84]
  ],
  leitrim: [
    `Co. Liatroma`,
    [
      `Gleann Éada`,
      `Aċaḋ na Síleann`,
      `Fíonach`,
      `Dromad`,
      `Droim Seanḃó`,
      `Garḃach`
    ],
    [182, 302, 310, 272, 222, 202],
    //top
    [47, 215, 278, 347, 208, 126]
  ],
  limerick: [
    `Co. Luimnigh`,
    [
      `Brú Rí`,
      `Pailis Ċaonraí`,
      `Áth na bḞuinseog`,
      `Caisleán Uí Ċonaill`,
      `An Ḟeoṫanaċ`,
      `Poll an Phúca`
    ],
    [220, 198, 98, 376, 151, 284],
    //top
    [178, 64, 247, 19, 268, 46]
  ],
  longford: [
    `Co. An LongFoirt`,
    [
      `Maiġ Duṁa`,
      `An Lios Breac`,
      `Cluain Dá Ráth`,
      `An Ċarraig Ḃuí`,
      `Gránard`,
      `Meathais Troim`
    ],
    [232, 197, 166, 306, 393, 300],
    //top
    [231, 154, 245, 232, 154, 171]
  ],
  louth: [
    `Co.Lú`,
    [
      `Dún Dealgan`,
      `Ceann Ċloċair`,
      `Poll an Phúca`,
      `An Grianfort`,
      `Baile Átha Ḟirdia`,
      `Baile an Ġearlánaigh`
    ],
    [287, 450, 254, 370, 187, 323],
    //top
    [87, 53, 254, 137, 286, 236]
  ],
  mayo: [
    `Co. Mhaigh Eo`,
    [
      `An Éill`,
      `An Caoláire Rua`,
      `Caisleán an Ḃarraiġ`,
      `Baile Ui Ḟiacáin`,
      `Lios an tSaṁaiḋ`,
      `Cill Ala`
    ],
    [251, 196, 235, 155, 366, 380],
    //top
    [335, 341, 172, 196, 350, 108]
  ],
  meath: [
    `Co. Na Mí`,
    [
      `Teamhair`,
      `An Uaimh`,
      `Tigh na Sióg`,
      `Cill Ḃríde`,
      `Ráth Ċairn`,
      `Buaile na Bréachṁaí `
    ],
    [298, 274, 349, 206, 172, 122],
    //top
    [240, 187, 356, 224, 203, 387]
  ],
  monaghan: [
    `Co. Ṁuineaċáin`,
    [
      `Carraig Ṁaċaire Rois`,
      `Teach an Scotaigh`,
      `Cluain Eois`,
      `Scairbh na gCaorach`,
      `Einistir Ḃuithe`,
      `Crícheán Rua`
    ],
    [383, 132, 191, 249, 234, 380],
    //top
    [402, 281, 73, 17, 148, 200]
  ],
  offaly: [
    `Co. Uíḃ Ḟailí`,
    [
      `Cluain Ṁic Nóis`,
      `Biorra`,
      `Suí an Róin`,
      `Cionn Eitigh`,
      `Éadan Doire`,
      `Ráth Iomġáin`
    ],
    [133, 143, 141, 222, 442, 432],
    //top
    [88, 215, 284, 253, 76, 154]
  ],
  roscommon: [
    `Co. Ros Comáin`,
    [
      `Corr na Fola`,
      `Scramóg`,
      `Cluain Fada`,
      `Baile an Tobair`,
      `Loch Bó Dearge`,
      `Loch Bó Finne`
    ],
    [328, 316, 164, 240, 353, 357],
    //top
    [354, 211, 215, 191, 212, 124]
  ],
  sligo: [
    `Co. Shligigh`,
    [
      `Gob Reaċla`,
      `An Mullach Mór`,
      `Baile Uí Ḋálaigh`,
      `Béal Átha na gCarraigíní`,
      `An Ċéis`,
      `Tobar an Ċoire`
    ],
    [261, 295, 204, 306, 375, 195],
    //top
    [98, 190, 166, 110, 315, 324]
  ],
  tipperary: [
    `Co. Ṫiobraid Árann`,
    [
      `Ros Cré`,
      `Durlas`,
      `Tigh na Naoi Míle`,
      `Faiċe Ró`,
      `Sliabh na mBan`,
      `Cluain Meala`
    ],
    [293, 332, 363, 358, 282, 259],
    //top
    [102, 263, 309, 285, 307, 342]
  ],
  tyrone: [
    `Co. Ṫír Eoghain`,
    [
      `An Ómaigh`,
      `An Ċorr Ċríochach`,
      `Dún Geanainn`,
      `Caisleán na Deirge`,
      `Baile Mhic Gofraidh`,
      `An Caisleán Glas`
    ],
    [211, 386, 426, 157, 268, 302],
    //top
    [221, 161, 306, 113, 103, 175]
  ],
  waterford: [
    `Co. Ṗort Láirge`,
    [
      `Dún Garḃán`,
      `An Baile Dubh`,
      `Cill Ṁíodáin`,
      `Tullach an Iarainn`,
      `Cluain Ḟia`,
      `Sléiḃte an Ċomaraigh`
    ],
    [251, 103, 406, 85, 185, 261],
    //top
    [257, 188, 169, 266, 357, 138]
  ],
  westmeath: [
    `Co. Na hIarṁí`,
    [
      `Ráth Ḟearna`,
      `Baile na gCailleach`,
      `Na Colúir`,
      `An Teanga`,
      `Cill Ḃeagáin`,
      `An Muileann gCearr`
    ],
    [467, 393, 74, 14, 223, 374],
    //top
    [166, 48, 221, 178, 314, 252]
  ],
  wexford: [
    `Co. Loch Garman`,
    [
      `An Abhainn Dubh`,
      `Coill an Iarainn`,
      `Dún Ċormaic`,
      `Poll an Phúca`,
      `Maolán na nGaḃar`,
      `Inis Córṫaidh`
    ],
    [118, 393, 301, 236, 288, 345],
    //top
    [308, 17, 352, 152, 181, 123]
  ],
  wicklow: [
    `Co. Ċill Ṁantáin`,
    [
      `An tInḃear Mór`,
      `Na Cloċa Liaṫa`,
      `Poll an Ṗúca`,
      `Dún Ard`,
      `Siol Éalaiġ`,
      `Aḃóca`
    ],
    //left
    [329, 374, 216, 155, 164, 360],
    //top
    [293, 70, 69, 185, 125, 293]
  ]
};
