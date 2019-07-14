/*credit - Rex van der Spuy, "Foundation Game Design with HTML Javascript" */
console.log('rex');
$(document).ready(function() {
  // alert(Cookies.get('place'));

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
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
    [7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
    [7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7],
    [7, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 7],
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
  if (placeName === 'Carraig Ḟearġais') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg159.png")'
    );
  } else if (placeName === 'Reaċlainn') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg160.png")'
    );
  } else if (placeName === 'Aċaḋ Eoċaille') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg161.png")'
    );

    console.log('acadheocaille');
  } else if (placeName === 'Carn Ṁéaḃla') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg162.png")'
    );
  } else if (placeName === 'Dearḃóg') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg163.png")'
    );
  }
  //Ard Mhaca
  else if (placeName === 'Port An Dúnáin') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg164.png")'
    );
  } else if (placeName === 'Sráid na nAlbanach') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg165.png")'
    );
  } else if (placeName === 'Baile an Ṁuilinn') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg166.png")'
    );
  } else if (placeName === 'Baile Úr') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg167.png")'
    );
  } else if (placeName === 'Lios Liath') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg168.png")'
    );
  } else if (placeName === 'Craigavon') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg169.png")'
    );
  }

  //carlow
  else if (placeName === 'Baile Haicéid') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg170.png")'
    );
  } else if (placeName === 'An Ḃuiríos') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg171.png")'
    );
  } else if (placeName === 'Miseal') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg172.png")'
    );
  } else if (placeName === 'Cill Deirge') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg173.png")'
    );
  } else if (placeName === 'Baile Uí Ṁurċú') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg174.png")'
    );
  } else if (placeName === 'Cill Daṁáin') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg175.png")'
    );
  }
  //cavan
  else if (placeName === 'Dún an Rí') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg176.png")'
    );
  } else if (placeName === 'Lios Cré') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg177.png")'
    );
  } else if (placeName === 'Béal Tairbirt') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg178.png")'
    );
  } else if (placeName === 'Doire na Criaḋ') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg179.png")'
    );
  } else if (placeName === 'An Dromainn') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg180.png")'
    );
  } else if (placeName === 'An Cnoc Rua') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg181.png")'
    );
  }

  //clare
  else if (placeName === 'Fíoch Rua') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg182.png")'
    );
  } else if (placeName === 'Ceann Boirne') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg183.png")'
    );
  } else if (placeName === 'Leaba Ṡíoda') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg184.png")'
    );
  } else if (placeName === 'An Tulach') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg185.png")'
    );
  } else if (placeName === 'Cill Rois') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg186.png")'
    );
  } else if (placeName === 'Bun Raite') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg187.png")'
    );
  }
  //cork
  else if (placeName === 'Sliabh an Nóglaigh') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg188.png")'
    );
  } else if (placeName === 'Cill na Mallaċ') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg189.png")'
    );
  } else if (placeName === 'Cionn tSáile') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg190.png")'
    );
  } else if (placeName === 'An Sciobairín') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg191.png")'
    );
  } else if (placeName === 'Gleann an Ṗreaċáin') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg192.png")'
    );
  } else if (placeName === 'Beal na mḂláth') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg158.png")'
    );
  }
  //derry
  else if (placeName === 'Léim an Ṁadaiḋ') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg157.png")'
    );
  } else if (placeName === 'Maċaire Ráṫa') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg156.png")'
    );
  } else if (placeName === 'An Seanṁullach') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg155.png")'
    );
  } else if (placeName === 'Droichead Fíolta') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg154.png")'
    );
  } else if (placeName === 'Muine Mór') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg153.png")'
    );
  } else if (placeName === 'Doire') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg152.png")'
    );
  }

  //donegal
  else if (placeName === 'Sléiḃte Ḋoire Ḃeatha') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg151.png")'
    );
  } else if (placeName === 'Na Cruaċa') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg150.png")'
    );
  } else if (placeName === 'Bealach Féich') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg149.png")'
    );
  } else if (placeName === 'Leitir Ceanainn') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg148.png")'
    );
  } else if (placeName === 'Cionn Dhún Damh') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg147.png")'
    );
  } else if (placeName === 'Bun na hAḃann') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg146.png")'
    );
  }

  //down
  else if (placeName === 'An Caisleán Riaḃach') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg145.png")'
    );
  } else if (placeName === 'An Ṁainistir Liath') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg144.png")'
    );
  } else if (placeName === 'Dún Pádraig') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg143.png")'
    );
  } else if (placeName === 'Cill Ċaoil') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg142.png")'
    );
  } else if (placeName === 'Lios na gCearrḃach') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg141.png")'
    );
  } else if (placeName === 'An Lorgain') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg140.png")'
    );
  }
  //Dublin
  else if (placeName === 'Deilginis') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg139.png")'
    );
  } else if (placeName === 'Binn Éadair') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg138.png")'
    );
  } else if (placeName === 'Cluain Dolcáin') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg137.png")'
    );
  } else if (placeName === 'Cluain Tarbh') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg156.png")'
    );
  } else if (placeName === 'Dún Laoiġaire') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg155.png")'
    );
  } else if (placeName === 'Fionnġlas') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg154.png")'
    );
  }
  //fermanagh
  else if (placeName === 'Inis Ceiṫleann') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg153.png")'
    );
  } else if (placeName === 'Scriobaċ') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg152.png")'
    );
  } else if (placeName === 'An Garastún ') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg151.png")'
    );
  } else if (placeName === 'Lios na Daróg') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg150.png")'
    );
  } else if (placeName === 'Eadarnaiḋ') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg179.png")'
    );
  } else if (placeName === 'Paiteagó') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg178.png")'
    );
  }
  //galway
  else if (placeName === 'Cill Cais') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg177.png")'
    );
  } else if (placeName === 'An Spidéal') {
    $('#stageBG').css(
      'background-image',
      'url("./images/maps/localMaps/bg176.png")'
    );
  } else {
    //random
    $('#stageBG').css('background-image', randMap);
    // alert(randMap);
  }
  //   alert('go');
});
let rando = Math.floor(Math.random() * 40 + 150);
let randMap = 'url("./images/maps/localMaps/bg' + rando + '.png")';
