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
    [7, '<', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, '>'],
    [7, '<', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, '>'],
    [7, '<', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, '>'],
    [7, 3, 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 7],
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
        alert(lastPressed + Cookies.get('locationID'));
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
        'url("./images/maps/localMaps/bg171.png")'
      );
    } else if (locationID === 'antrim2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg172.png")'
      );
    } else if (locationID === 'antrim3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg173.png")'
      );
    } else if (locationID === 'antrim4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg174.png")'
      );
    } else if (locationID === 'antrim5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg175.png")'
      );
    }
    //cavan
    else if (locationID === 'antrim6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'armagh1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg177.png")'
      );
    } else if (locationID === 'armagh2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg178.png")'
      );
    } else if (locationID === 'armagh3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg179.png")'
      );
    } else if (locationID === 'armagh4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg180.png")'
      );
    } else if (locationID === 'armagh5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg181.png")'
      );
    } else if (locationID === 'armagh6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg182.png")'
      );
    } else if (locationID === 'carlow1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg183.png")'
      );
    } else if (locationID === 'carlow2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg184.png")'
      );
    } else if (locationID === 'carlow3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg185.png")'
      );
    } else if (locationID === 'carlow4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg186.png")'
      );
    } else if (locationID === 'carlow5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg187.png")'
      );
    }
    //cork
    else if (locationID === 'carlow6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg188.png")'
      );
    } else if (locationID === 'cavan1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg189.png")'
      );
    } else if (locationID === 'cavan2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg190.png")'
      );
    } else if (locationID === 'cavan3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg191.png")'
      );
    } else if (locationID === 'cavan4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg192.png")'
      );
    } else if (locationID === 'cavan5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg158.png")'
      );
    }
    //derry
    else if (locationID === 'cavan6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg157.png")'
      );
    } else if (locationID === 'clare1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg156.png")'
      );
    } else if (locationID === 'clare2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg155.png")'
      );
    } else if (locationID === 'clare3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg154.png")'
      );
    } else if (locationID === 'clare4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg153.png")'
      );
    } else if (locationID === 'clare5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg152.png")'
      );
    } else if (locationID === 'clare6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg151.png")'
      );
    } else if (locationID === 'cork1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg150.png")'
      );
    } else if (locationID === 'cork2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg149.png")'
      );
    } else if (locationID === 'cork3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg148.png")'
      );
    } else if (locationID === 'cork4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg147.png")'
      );
    } else if (locationID === 'cork5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg146.png")'
      );
    } else if (locationID === 'cork6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg145.png")'
      );
    } else if (locationID === 'derry1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg144.png")'
      );
    } else if (locationID === 'derry2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg143.png")'
      );
    } else if (locationID === 'derry3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg142.png")'
      );
    } else if (locationID === 'derry4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg141.png")'
      );
    } else if (locationID === 'derry5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg140.png")'
      );
    } else if (locationID === 'derry6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg139.png")'
      );
    } else if (locationID === 'donegal1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg138.png")'
      );
    } else if (locationID === 'donegal2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg137.png")'
      );
    } else if (locationID === 'donegal3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg156.png")'
      );
    } else if (locationID === 'donegal4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg155.png")'
      );
    } else if (locationID === 'donegal5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg154.png")'
      );
    } else if (locationID === 'donegal6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg153.png")'
      );
    } else if (locationID === 'down1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg152.png")'
      );
    } else if (locationID === 'down2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg151.png")'
      );
    } else if (locationID === 'down3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg150.png")'
      );
    } else if (locationID === 'down4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg179.png")'
      );
    } else if (locationID === 'down5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg178.png")'
      );
    } else if (locationID === 'down6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg177.png")'
      );
    } else if (locationID === 'dublin1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'dublin2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'dublin3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'dublin4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'dublin5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'dublin6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'fermanagh1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'fermanagh2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'fermanagh3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'fermanagh4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'fermanagh5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'fermanagh6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'galway1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'galway2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'galway3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'galway4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'galway5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'galway6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kerry1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kerry2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kerry3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kerry4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kerry5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kildare6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kildare1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kildare2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kildare3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kildare4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kildare5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kilkenny6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kilkenny1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kilkenny2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kilkenny3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kilkenny4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kilkenny5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'kilkenny6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'laois1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'laois2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'laois3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'laois4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'laois5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'laois6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'leitrim1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'leitrim2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'leitrim3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'leitrim4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'leitrim5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'leitrim6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'limerick1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'limerick2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'limerick3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'limerick4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'limerick5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'limerick6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'longford1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'longford2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'longford3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'longford4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'longford5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'longford6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'louth1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'louth2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'louth3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'louth4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'louth5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'louth6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'mayo1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'mayo2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'mayo3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'mayo4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'mayo5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'mayo6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'meath1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'meath2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'meath3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'meath4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'meath5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'meath6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'monaghan1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'monaghan2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'monaghan3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'monaghan4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'monaghan5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'monaghan6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'offaly1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'offaly2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'offaly3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'offaly4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'offaly5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'offaly6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'roscommon1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'roscommon2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'roscommon3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'roscommon4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'roscommon5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'roscommon6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'sligo1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'sligo2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'sligo3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'sligo4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'sligo5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'sligo6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tipperary1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tipperary2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tipperary3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tipperary4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tipperary5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tipperary6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tyrone1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tyrone2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tyrone3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tyrone4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tyrone5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'tyrone6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'waterford1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'waterford2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'waterford3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'waterford4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'waterford5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'waterford6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'westmeath1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'westmeath2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'westmeath3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'westmeath4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'westmeath5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'westmeath6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wexford1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wexford2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wexford3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wexford4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wexford5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wexford6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wicklow1') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wicklow2') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wicklow3') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wicklow4') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wicklow5') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else if (locationID === 'wicklow6') {
      $('#stageBG').css(
        'background-image',
        'url("./images/maps/localMaps/bg176.png")'
      );
    } else {
      //random
      $('#stageBG').css('background-image', randMap);
      // alert(randMap);
    }
  };
  setLocation(locationID);

  ///changeLocation using "traverse locations" data

  let targetDestination;
  let currentCounty = String(locationID);
  //eg fermanagh1
  let countyLocation = currentCounty.slice(-1);
  //eg 1
  currentCounty = currentCounty.substring(0, currentCounty.length - 1);
  //eg fermanagh

  changeLocation = () => {
    console.log(
      String(
        currentCounty + ' location number: ' + countyLocation + lastPressed
      )
    );

    //player can exit a map left right up or down. This will trigger loading of new map resources, depending on the adjacent map:

    /* 
    TODO - refactor this huge switch statement as a couple of functions:
    switchCounty=(countyFrom,locationFrom,lastPressed)=>{

//also all setLocation() replace with ajax requests
    */
  };
  switch (currentCounty) {
    case 'antrim':
      if (countyLocation == 1 && lastPressed === 'left') {
        alert('new current location will be loch erne');
        targetDestination = 'derry5';
        setLocation(targetDestination);
      } else if (countyLocation == 1 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        targetDestination = 'sea';
        setLocation(targetDestination);
      } else if (countyLocation == 1 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        targetDestination = 'antrim5';
        setLocation(targetDestination);
      } else if (countyLocation == 1 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        targetDestination = 'down2';
        setLocation(targetDestination);
      } else if (countyLocation == 2 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        targetDestination = 'antrim5';

        setLocation(targetDestination);
      } else if (countyLocation == 2 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        targetDestination = 'sea';
        setLocation(targetDestination);
      } else if (countyLocation == 2 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        targetDestination = 'sea';
        setLocation(targetDestination);
      } else if (countyLocation == 2 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        targetDestination = 'antrim1';
        setLocation(targetDestination);
      } else if (countyLocation == 3 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        targetDestination = 'sea';
        setLocation(targetDestination);
      } else if (countyLocation == 3 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        targetDestination = 'sea';
        setLocation(targetDestination);
      } else if (countyLocation == 3 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        targetDestination = 'sea';
        setLocation(targetDestination);
      } else if (countyLocation == 3 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        targetDestination = 'antrim6';
        setLocation(targetDestination);
      } else if (countyLocation == 4 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        targetDestination = 'derry3';
        setLocation(targetDestination);
      } else if (countyLocation == 4 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        targetDestination = 'antrim2';
        setLocation(targetDestination);
      } else if (countyLocation == 4 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        targetDestination = 'antrim6';
        setLocation(targetDestination);
      } else if (countyLocation == 4 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        targetDestination = 'antrim5';
        setLocation(targetDestination);
      } else if (countyLocation == 5 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        targetDestination = 'derry2';
        setLocation(targetDestination);
      } else if (countyLocation == 5 && lastPressed === 'right') {
        targetDestination = 'antrim2';
        //   alert('new current location will be loch erne');
        setLocation(targetDestination);
      } else if (countyLocation == 5 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        targetDestination = 'antrim4';
        setLocation(targetDestination);
      } else if (countyLocation == 5 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');
        targetDestination = 'antrim1';
        setLocation(targetDestination);
      } else if (countyLocation == 6 && lastPressed === 'left') {
        //   alert('new current location will be loch erne');
        targetDestination = 'sea';
        setLocation(targetDestination);
      } else if (countyLocation == 6 && lastPressed === 'right') {
        //   alert('new current location will be loch erne');
        targetDestination = 'sea';
        setLocation(targetDestination);
      } else if (countyLocation == 6 && lastPressed === 'up') {
        //   alert('new current location will be loch erne');
        targetDestination = setLocation(target);
        ('antrim3');
      } else if (countyLocation == 6 && lastPressed === 'down') {
        //   alert('new current location will be loch erne');

        targetDestination = 'antrim4';
        setLocation(targetDestination);
      }
      break;
  }
  //   alert('go');
});
let rando = Math.floor(Math.random() * 40 + 150);
let randMap = 'url("./images/maps/localMaps/bg' + rando + '.png")';
