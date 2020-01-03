/*credit - Rex van der Spuy, "Foundation Game Design with HTML Javascript" */
$(document).ready(function() {
  let upHasBeenPressed = false;
  $('.cubes').fadeTo(2000, 0);
 

//   alert(Cookies.get('place'));
  var locationID = Cookies.get('locationID');
//   alert(locationID);

  blockPath = () => {
      // switch (lastPressed) {
      //     case 'down':
      //         gameObjects[sheepRow][sheepColumn] = BLOCKED;
      //         // alert();
      //         sheepRow--;

      //         //Apply the sheep's new updated position to the array
      //         gameObjects[sheepRow][sheepColumn] = sheep;

      //         break;

      //     case 'up':
      //         gameObjects[sheepRow][sheepColumn] = BLOCKED;

      //         sheepRow++;
      //         gameObjects[sheepRow][sheepColumn] = sheep;

      //         break;

      //     case 'right':
      //         gameObjects[sheepRow][sheepColumn] = BLOCKED;

      //         sheepColumn--;
      //         gameObjects[sheepRow][sheepColumn] = sheep;

      //         break;

      //     case 'left':
      //         gameObjects[sheepRow][sheepColumn] = BLOCKED;

      //         sheepColumn++;
      //         gameObjects[sheepRow][sheepColumn] = sheep;
      //         break;
      // }
      // render();
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
  //   console.log(Cookies.get());
  // $('.levelDescription').text(place);
  //The game map
  var map = [
    [
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v'
    ],
    [
      'v',
      'v',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      'v',
      'v'
    ],
    [
      'v',
      'v',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      'v',
      'v'
    ],
    [
      'v',
      'v',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      'v',
      'v'
    ],
    [
      'v',
      'v',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      '.',
      'v',
      'v'
    ],
    [
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v',
      'v'
    ]
  ];

  //The game objects map
  var gameObjects = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
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
  var EMPTY = '.';
  var LAND = 1;
  var MAGIC_TREE = 2;
  var KRUGER = 'kr';
  var HOME = 3;
  var sheep = 4;
  var BLOCKED = 7;
  var WAVES = 5;
  var MONSTER = 6;

  var STANDINGSTONE = 's';
  var LITTLETOWN = 'l';
  var BEALNABLATH = 'b';
  var BLARNEYCASTLE = 'c';
  var NORMANKEEP = 'n';
  var STATUE = 't';
  var CRANNOG = 'r';
  var CASTLE = 'a';
  var HILLFORT = 'h';
  var STILL = 'i';
  var CHURCH = 'u';
  var GRAVES = 'm';
  var RUIN = 'j';
  var TOWER = 'o';
  var FAIRYFORT = 'd';
  var TRALEE = 'ee';
  var MOUNTAIN = 'M';
  var TEAMHAIR = 'x';

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
  // jQuery.fx.off = false;
  animatePlayer = () => {
      setTimeout(function() {
          // alert('waiting...')
          // sheep.appendChild(`<div id="player-in-motion"></div>`)
          render();
      }, 110);
      if (lastPressed === 'left') {
          $('#hero').animate({
              left: sheepColumn * 64
          }, 100, 'linear');
      } else if (lastPressed === 'right') {
          $('#hero').animate({
              left: sheepColumn * 64
          }, 100, 'linear');
      } else if (lastPressed === 'up') {
          $('#hero').animate({
              top: sheepRow * 64
          }, 100, 'linear');
      } else if (lastPressed === 'down') {
          $('#hero').animate({
              top: sheepRow * 64
          }, 100, 'linear');
      }

      gameObjects[sheepRow][sheepColumn] = sheep;
  };
  goUp = () => {
      upHasBeenPressed = true;
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
          animatePlayer();

          //Apply the sheep's new updated position to the array
          // gameObjects[sheepRow][sheepColumn] = sheep;
      }
  }

  goDown = () => {
      if (sheepRow < ROWS - 1) {
          lastPressed = 'down';
          gameObjects[sheepRow][sheepColumn] = ROWS - 0;
          sheepRow++;
          animatePlayer();
      }
    
  }
  goLeft = () => {
      if (sheepColumn > 1) {
          gameObjects[sheepRow][sheepColumn] = 1;
          sheepColumn--;
          lastPressed = 'left';
          animatePlayer();
          // gameObjects[sheepRow][sheepColumn] = sheep;
      }
    
  }
  goRight = () => {
      if (sheepColumn < COLUMNS - 1) {
          gameObjects[sheepRow][sheepColumn] = 0;
          sheepColumn++;
          // gameObjects[sheepRow][sheepColumn] = sheep;

          lastPressed = 'right';
          animatePlayer();
      }
    
  }

  // var UP = 38;
  // var DOWN = 40;
  // var RIGHT = 39;
  // var LEFT = 37;
  let underfoot;
  $('#up').on('touchend', function() {
      // goUp();
      keydownHandler(38);
   
  });
  $('#down').on('touchend', function() {
      // goDown();
      keydownHandler(40);

  });
  $('#right').on('touchend', function() {
    // goRight();
    keydownHandler(39);
  });
          $('#left').on('touchend', function() {
              // goLeft();
              keydownHandler(37);
        
          });

  function keydownHandler(event) {
      if (keyboardActive) {
          switch (event.keyCode) {
              case UP:
                  goUp();
                  break;

              case DOWN:
                  goDown();
                  break;

              case LEFT:
                  goLeft();
                  break;

              case RIGHT:
                  goRight();
                  break;
          }
      }
      //find out what kind of cell the sheep is on
      if (!mapMenuIsVisible) {
          switch (map[sheepRow][sheepColumn]) {
              case EMPTY:
                  gameMessage = 'You sail the open seas.';
                  break;
              case KRUGER:
                  window.location.replace(
                      'https://macribo.github.io/kruger-haus/index.html'
                  );
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
                  loadDestinations(locationID);
                  console.log('suas');

                  changeLocation(locationID);

                  // alert('suas');
                  break;

              case SIOS:
                  // alert('sios');
                  loadDestinations(locationID);
                  console.log('sios');

                  changeLocation(locationID);

                  break;

              case CLÉ:
                  // alert('clé');
                  loadDestinations(locationID);
                  console.log('clé');
                  changeLocation(locationID);
                  break;

              case DEAS:
                  console.log('deas');

                  // alert('deas');
                  loadDestinations(locationID);

                  changeLocation(locationID);

                  break;
              case BLOCKED:
                  //Undo last key press
                  //   alert('blocked!');
                  // alert('Blocked' + lastPressed + Cookies.get('locationID'));
                  blockPath();
                  break;
              case WAVES:
                  blockPath();
                  break;
          }
      }

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
                      cell.src = './images/folamh.png';
                      break;

                  case STANDINGSTONE:
                      cell.src = './images/locations/AnBhograchBeag.png';
                      break;
                  case LITTLETOWN:
                      cell.src = './images/locations/BallyLickeyBeag';
                      break;
                  case BEALNABLATH:
                      cell.src = './images/locations/BealNaBlathBeag.png';
                      break;
                  case BLARNEYCASTLE:
                      cell.src = './images/locations/BlarneyBeag.png';
                      break;
                  case NORMANKEEP:
                      cell.src = './images/locations/CillNaMallachBeag.png';
                      break;
                  case STATUE:
                      cell.src = './images/locations/Cloidigh.png';
                      break;
                  case CRANNOG:
                      cell.src = './images/locations/Corcu_Dhuibhne.png';
                      break;
                  case CASTLE:
                      cell.src = './images/locations/Dun_Geimhin.png';
                      break;
                  case HILLFORT:
                      cell.src = './images/locations/Lios.png';
                      break;
                  case STILL:
                      cell.src = './images/locations/MainistirNaCorranBeag.png';
                      break;
                  case CHURCH:
                      cell.src = './images/locations/MainistirFhearMhaighBeag.png';
                      break;
                  case GRAVES:
                      cell.src = './images/locations/Muine_Mor.png';
                      break;
                  case RUIN:
                      cell.src = './images/locations/SkibbereenBeag.png';
                      break;
                  case TOWER:
                      cell.src = './images/locataions/Sprite3.png';
                      break;
                  case FAIRYFORT:
                      cell.src = './images/locations/TighNuaNaDhaPhotaBeag.png';
                      break;
                  case TRALEE:
                      cell.src = './images/locations/ee.png';
                      break;
                  case MOUNTAIN:
                      cell.src = './images/locations/Na_Cruacha.png';
                      break;
                  case WAVES:
                      cell.src = randWave();
                      break;
                  case KRUGER:
                      cell.src = './images/locations/kruger.png';
                      break;
                  case TEAMHAIR:
                      cell.src = './images/locations/teamhair_0.png';
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
                      cell.src = './images/imreoir.gif';
                      cell.id = 'hero';
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

  //   $('#back-to-county').click(function() {
  //     location.href = './locations.html';
  //     // alert('see u');
  //   });
  $('#close-map-menu-button').click(function() {
      goBackOneSquare();
      keyboardActive = true;
      $('#map-menu').fadeOut();
      mapMenuIsVisible = false;
      gameObjects[sheepRow][sheepColumn] = sheep;
  });
  showMapMenu = () => {
      $('#map-menu').fadeIn();
      mapMenuIsVisible = !mapMenuIsVisible;

      gameObjects[sheepRow][sheepColumn] = 0;
      $('#map-info-btns').empty();
      for (var i = 0; i < destinations.length; i++) {
          $('#map-info-btns').append(
              `<button class="btn destination-button btn-info btn-lg mr-5" id=` +
              destinations[i] +
              `>` +
              updateLocationDescription(destinations[i]) +
              `</button>`
          );

          $('.destination-button').click(function(e) {
              locationID = this.id;
              destinations = [];
              destinations.push(locationID);
              changeLocation(locationID);
              gameObjects[sheepRow][sheepColumn] = sheep;
              render();
              // locationID = destinations[0];
              // keyboardActive = true;
              // updatePlayerLocation();
              // updateBGImage();
              // $('.levelDescription').html(
              //     updateLocationDescription(locationID)
              // );
              // updateCountyEmblem();
              // updateProvincialEmblem();
              setLocalMapObjects(locationID);
              $('#map-menu').fadeOut();
              mapMenuIsVisible = false;
              //   destinations.length = 0;

              // alert(destinations)

              // loadDestinations(locationID)
              // // loadDestinations(locationID);
              // console.log("current location: "+updateLocationDescription(locationID));
              // console.log("Player can go up to: "+locationMapExitPoints[0][locationID]['up']);
              // console.log("Player can go down to: "+locationMapExitPoints[0][locationID]['down']);
              // console.log("Player can go left to: "+locationMapExitPoints[0][locationID]['left']);
              // console.log("Player can go right to: "+locationMapExitPoints[0][locationID]['right']);
              //     alert(map)
          });
          $('.levelDescription').html(updateLocationDescription(locationID));
      }
      gameObjects[sheepRow][sheepColumn] = 0;
  };
  let keyboardActive = true;
  toggleKeyboardInput = () => {
      keyboardActive = !keyboardActive;
  };
  var locationMapInfo = (function() {
      locationMapExitPoints = [{
          antrim1: {
              left: [],
              right: [],
              up: [],
              down: ['antrim2'],
              bgImage: `url("./images/maps/localMaps/u48.png")`
          },
          antrim2: {
              left: ['derry3'],
              right: [],
              up: ['antrim1'],
              down: ['antrim3'],
              bgImage: `url("./images/maps/localMaps/u56.png")`
          },
          antrim3: {
              left: ['derry4'],
              right: ['antrim5'],
              up: ['antrim2'],
              down: ['antrim4'],
              bgImage: `url("./images/maps/localMaps/202.png")`
          },
          antrim4: {
              left: ['derry4', 'derry5', 'derry6'],
              right: ['antrim5'],
              up: ['antrim3'],
              down: ['antrim6'],
              bgImage: `url("./images/maps/localMaps/200.png")`
          },
          antrim5: {
              left: ['antrim4', 'antrim6'],
              right: [],
              up: ['antrim3'],
              down: ['antrim6'],
              bgImage: `url("./images/maps/localMaps/u51.png")`
          },
          antrim6: {
              left: ['antrim4'],
              right: ['antrim5'],
              up: ['antrim4', 'antrim5'],
              down: ['down2', 'down3', 'armagh3'],
              bgImage: `url("./images/maps/localMaps/5.png")`
          },

          armagh1: {
              left: ['tyrone6'],
              right: ['armagh2'],
              up: ['derry6'],
              down: ['armagh5'],
              bgImage: `url("./images/maps/localMaps/4.png")`
          },
          armagh2: {
              left: ['armagh1'],
              right: ['armagh3'],
              up: [],
              down: ['armagh5', 'derry4'],
              bgImage: `url("./images/maps/localMaps/u125.png")`
          },
          armagh3: {
              left: ['armagh2'],
              right: ['down1'],
              up: [],
              down: ['down1', 'armagh5'],
              bgImage: `url("./images/maps/localMaps/u128.png")`
          },
          armagh4: {
              left: ['monaghan5'],
              right: ['armagh6'],
              up: ['tyrone6'],
              down: ['monaghan5'],
              bgImage: `url("./images/maps/localMaps/5.png")`
          },
          armagh5: {
              left: ['armagh1', 'armagh4'],
              right: ['down1'],
              up: ['armagh2', 'armagh3'],
              down: ['armagh6'],
              bgImage: `url("./images/maps/localMaps/20.png")`
          },
          armagh6: {
              left: ['monaghan5'],
              right: ['down6'],
              up: ['armagh5'],
              down: ['monaghan6', 'louth1'],
              bgImage: `url("./images/maps/localMaps/10.png")`
          },
          carlow1: {
              left: ['laois6'],
              right: ['laois2'],
              up: ['kildare6'],
              down: ['carlow3'],
              bgImage: `url("./images/maps/localMaps/12.png")`
          },
          carlow2: {
              left: ['carlow1'],
              right: ['wicklow5'],
              up: ['wicklow4'],
              down: ['carlow3'],
              bgImage: `url("./images/maps/localMaps/13.png")`
          },
          carlow3: {
              left: ['carlow4'],
              right: ['carlow2', 'carlow5'],
              up: ['carlow1'],
              down: ['carlow5'],
              bgImage: `url("./images/maps/localMaps/14.png")`
          },
          carlow4: {
              left: ['kilkenny2'],
              right: ['carlow5'],
              up: ['laois6', 'carlow3'],
              down: ['carlow6'],
              bgImage: `url("./images/maps/localMaps/15.png")`
          },
          carlow5: {
              left: ['carlow4', 'carlow3'],
              right: ['wexford2', 'wexford1'],
              up: ['carlow3'],
              down: ['wexford3'],
              bgImage: `url("./images/maps/localMaps/16.png")`
          },
          carlow6: {
              left: ['kilkenny2'],
              right: ['wexford3'],
              up: ['carlow4'],
              down: ['wexford5'],
              bgImage: `url("./images/maps/localMaps/17.png")`
          },
          cavan1: {
              left: ['leitrim4', 'leitrim3'],
              right: ['cavan2', 'monaghan3'],
              up: ['fermanagh5', 'fermanagh6'],
              down: ['leitrim4', 'cavan1'],
              bgImage: `url("./images/maps/localMaps/18.png")`
          },
          cavan2: {
              left: ['cavan1', 'leitrim5'],
              right: ['cavan3'],
              up: ['fermanagh6'],
              down: ['cavan4', 'longford2', 'longford3'],
              bgImage: `url("./images/maps/localMaps/19.png")`
          },
          cavan3: {
              left: ['cavan2'],
              right: ['monaghan6'],
              up: ['monaghan4'],
              down: ['cavan4', 'cavan5'],
              bgImage: `url("./images/maps/localMaps/17.png")`
          },
          cavan4: {
              left: ['cavan2'],
              right: ['cavan5'],
              up: ['cavan2', 'cavan3'],
              down: ['cavan6'],
              bgImage: `url("./images/maps/localMaps/20.png")`
          },
          cavan5: {
              left: ['cavan4'],
              right: ['monaghan6'],
              up: ['cavan3'],
              down: ['cavan6'],
              bgImage: `url("./images/maps/localMaps/23.png")`
          },
          cavan6: {
              left: ['westmeath1'],
              right: ['meath1'],
              up: ['cavan4', 'cavan5'],
              down: ['meath2'],
              bgImage: `url("./images/maps/localMaps/21.png")`
          },
          clare1: {
              left: [],
              right: ['galway4'],
              up: [],
              down: ['clare2'],
              bgImage: `url("./images/maps/localMaps/u155.png")`
          },
          clare2: {
              left: ['clare4'],
              right: ['clare3'],
              up: ['clare1'],
              down: ['clare5'],
              bgImage: `url("./images/maps/localMaps/22.png")`
          },
          clare3: {
              left: ['clare2'],
              right: ['tipperary1'],
              up: ['galway4'],
              down: ['clare6'],
              bgImage: `url("./images/maps/localMaps/23.png")`
          },
          clare4: {
              left: ['kerry4'],
              right: ['clare2', 'clare5'],
              up: ['clare2'],
              down: ['limerick1'],
              bgImage: `url("./images/maps/localMaps/24.png")`
          },
          clare5: {
              left: ['clare4'],
              right: ['clare5'],
              up: ['clare2'],
              down: ['limerick1'],
              bgImage: `url("./images/maps/localMaps/28.png")`
          },
          clare6: {
              left: ['clare5'],
              right: ['limerick3'],
              up: ['clare3'],
              down: ['limerick2', 'limerick3'],
              bgImage: `url("./images/maps/localMaps/30.png")`
          },
          cork1: {
              left: ['limerick4', 'limerick5'],
              right: ['cork2', 'cork3'],
              up: ['limerick6', 'limerick5'],
              down: ['cork4', 'cork2'],
              bgImage: `url("./images/maps/localMaps/31.png")`
          },
          cork2: {
              left: ['cork1'],
              right: ['tipperary5', 'waterford2', 'waterford3'],
              up: ['cork1'],
              down: ['cork3'],
              bgImage: `url("./images/maps/localMaps/79.png")`
          },
          cork3: {
              left: ['cork1', 'cork4'],
              right: ['waterford3'],
              up: ['cork2'],
              down: ['cork5'],
              bgImage: `url("./images/maps/localMaps/80.png")`
          },
          cork4: {
              left: ['cork6'],
              right: ['cork5', 'cork3'],
              up: ['cork1'],
              down: ['cork5'],
              bgImage: `url("./images/maps/localMaps/35.png")`
          },
          cork5: {
              left: ['cork6'],
              right: [],
              up: ['cork4'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u185.png")`
          },
          cork6: {
              left: ['kerry6'],
              right: ['cork4', 'cork5'],
              up: ['limerick4', 'kerry6'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u27.png")`
          },
          derry1: {
              left: ['donegal4'],
              right: ['derry2'],
              up: ['donegal1'],
              down: ['tyrone2', 'tyrone1'],
              bgImage: `url("./images/maps/localMaps/36.png")`
          },
          derry2: {
              left: ['derry1'],
              right: ['derry3'],
              up: [],
              down: ['derry3'],
              bgImage: `url("./images/maps/localMaps/u38.png")`
          },
          derry3: {
              left: ['derry2'],
              right: ['antrim2', 'derry4'],
              up: ['antrim2'],
              down: ['derry5'],
              bgImage: `url("./images/maps/localMaps/8.png")`
          },
          derry4: {
              left: ['derry3'],
              right: ['antrim3', 'antrim4'],
              up: ['antrim2'],
              down: ['derry5'],
              bgImage: `url("./images/maps/localMaps/81.png")`
          },
          derry5: {
              left: ['tyrone5'],
              right: ['antrim4'],
              up: ['derry4', 'derry3'],
              down: ['derry6'],
              bgImage: `url("./images/maps/localMaps/39.png")`
          },
          derry6: {
              left: ['tyrone5'],
              right: ['antrim4'],
              up: ['derry5'],
              down: ['tyrone6', 'armagh1', 'tyrone5'],
              bgImage: `url("./images/maps/localMaps/40.png")`
          },
          donegal1: {
              left: [],
              right: [],
              up: [],
              down: ['derry1'],
              bgImage: `url("./images/maps/localMaps/u48.png")`
          },
          donegal2: {
              left: ['donegal3'],
              right: ['donegal4'],
              up: [],
              down: ['donegal3'],
              bgImage: `url("./images/maps/localMaps/u38.png")`
          },
          donegal3: {
              left: [],
              right: ['donegal2'],
              up: ['donegal2'],
              down: ['donegal6', 'donegal5'],
              bgImage: `url("./images/maps/localMaps/209.png")`
          },
          donegal4: {
              left: ['donegal5'],
              right: ['derry1'],
              up: [],
              down: ['donegal5'],
              bgImage: `url("./images/maps/localMaps/u125.png")`
          },
          donegal5: {
              left: ['donegal6'],
              right: ['donegal4'],
              up: ['donegal3', 'donegal4'],
              down: ['tyrone1'],
              bgImage: `url("./images/maps/localMaps/41.png")`
          },
          donegal6: {
              left: [],
              right: ['donegal5', 'fermanagh3'],
              up: ['donegal3'],
              down: ['fermanagh1', 'fermanagh2', 'fermanagh3'],
              bgImage: `url("./images/maps/localMaps/42.png")`
          },
          down1: {
              left: ['armagh3'],
              right: ['down2'],
              up: ['armagh3'],
              down: ['armagh5'],
              bgImage: `url("./images/maps/localMaps/43.png")`
          },
          down2: {
              left: ['down1'],
              right: ['down3'],
              up: ['antrim6'],
              down: ['down6'],
              bgImage: `url("./images/maps/localMaps/44.png")`
          },
          down3: {
              left: ['down2'],
              right: ['down4', 'down5'],
              up: ['antrim6'],
              down: ['down5'],
              bgImage: `url("./images/maps/localMaps/86.png")`
          },
          down4: {
              left: ['down3'],
              right: [],
              up: [],
              down: [],
              bgImage: `url("./images/maps/localMaps/u118.png")`
          },
          down5: {
              left: ['down6', 'down3'],
              right: [],
              up: ['down3'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u175.png")`
          },
          down6: {
              left: ['armagh6'],
              right: [],
              up: ['down5', 'down2'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u173.png")`
          },
          dublin1: {
              left: ['meath4'],
              right: [],
              up: [],
              down: ['dublin3', 'dublin2', 'dublin4'],
              bgImage: `url("./images/maps/localMaps/u26.png")`
          },
          dublin2: {
              left: ['meath6'],
              right: ['dublin3', 'dublin5'],
              up: ['dublin1'],
              down: ['dublin5'],
              bgImage: `url("./images/maps/localMaps/46.png")`
          },
          dublin3: {
              left: ['dublin2'],
              right: ['dublin4'],
              up: ['dublin1'],
              down: ['dublin5'],
              bgImage: `url("./images/maps/localMaps/47.png")`
          },
          dublin4: {
              left: ['dublin3'],
              right: [],
              up: ['dublin1'],
              down: ['dublin6'],
              bgImage: `url("./images/maps/localMaps/u57.png")`
          },
          dublin5: {
              left: ['kildare2', 'dublin2'],
              right: ['dublin6'],
              up: ['dublin3'],
              down: ['dublin6'],
              bgImage: `url("./images/maps/localMaps/82.png")`
          },
          dublin6: {
              left: ['dublin5', 'wicklow1'],
              right: [],
              up: ['dublin5', 'dublin4'],
              down: ['wicklow2'],

              bgImage: `url("./images/maps/localMaps/u56.png")`
          },
          fermanagh1: {
              left: ['leitrim1'],
              right: ['fermanagh2'],
              up: ['donegal1'],
              down: ['fermanagh5'],
              bgImage: `url("./images/maps/localMaps/158.png")`
          },
          fermanagh2: {
              left: ['fermanagh1'],
              right: ['fermanagh3'],
              up: ['donegal6'],
              down: ['fermanagh5'],
              bgImage: `url("./images/maps/localMaps/50.png")`
          },
          fermanagh3: {
              left: ['fermanagh2'],
              right: ['tyrone3'],
              up: ['donegal6', 'tyrone3', 'tyrone1'],
              down: ['fermanagh4'],
              bgImage: `url("./images/maps/localMaps/83.png")`
          },
          fermanagh4: {
              left: ['fermanagh5'],
              right: ['tyrone6'],
              up: ['fermanagh3'],
              down: ['fermanagh6'],
              bgImage: `url("./images/maps/localMaps/84.png")`
          },
          fermanagh5: {
              left: ['leitrim2'],
              right: ['fermanagh4', 'fermanagh6'],
              up: ['fermanagh2'],
              down: ['cavan1'],
              bgImage: `url("./images/maps/localMaps/80.png")`
          },
          fermanagh6: {
              left: ['leitrim4', 'cavan1'],
              right: ['tyrone4', 'monaghan2'],
              up: ['fermanagh6'],
              down: ['cavan3'],
              bgImage: `url("./images/maps/localMaps/54.png")`
          },
          galway1: {
              left: ['mayo6'],
              right: ['roscommon2'],
              up: ['roscommon1'],
              down: ['galway3'],
              bgImage: `url("./images/maps/localMaps/55.png")`
          },
          galway2: {
              left: [],
              right: ['galway3'],
              up: ['mayo5'],
              down: ['galway5'],
              bgImage: `url("./images/maps/localMaps/u32.png")`
          },
          galway3: {
              left: ['galway2'],
              right: ['roscommon6'],
              up: ['galway1'],
              down: ['galway4'],
              bgImage: `url("./images/maps/localMaps/136.png")`
          },
          galway4: {
              left: ['clare1'],
              right: ['galway3', 'offaly3', 'offaly6'],
              up: ['galway2'],
              down: ['clare3'],
              bgImage: `url("./images/maps/localMaps/87.png")`
          },
          galway5: {
              left: [],
              right: ['galway2'],
              up: ['mayo4'],
              down: ['galway6'],
              bgImage: `url("./images/maps/localMaps/u124.png")`
          },
          galway6: {
              left: [],
              right: [],
              up: ['galway5'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u73.png")`
          },
          kerry1: {
              left: [],
              right: [],
              up: [],
              down: ['kerry2'],
              bgImage: `url("./images/maps/localMaps/u48.png")`
          },
          kerry2: {
              left: [],
              right: ['kerry3'],
              up: ['kerry1'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u75.png")`
          },
          kerry3: {
              left: ['kerry2'],
              right: ['kerry4'],
              up: [],
              down: ['kerry5', 'kerry6'],
              bgImage: `url("./images/maps/localMaps/u153.png")`
          },
          kerry4: {
              left: ['kerry3'],
              right: ['limerick4'],
              up: ['clare4'],
              down: ['kerry5'],
              bgImage: `url("./images/maps/localMaps/58.png")`
          },
          kerry5: {
              left: ['kerry3'],
              right: ['limerick4'],
              up: ['kerry4'],
              down: ['kerry6'],
              bgImage: `url("./images/maps/localMaps/59.png")`
          },
          kerry6: {
              left: [],
              right: ['kerry5', 'cork6'],
              up: ['kerry3'],
              down: ['cork6'],
              bgImage: `url("./images/maps/localMaps/u25.png")`
          },
          kildare1: {
              left: ['offaly2'],
              right: ['kildare2'],
              up: ['meath4', 'meath5'],
              down: ['kildare3'],
              bgImage: `url("./images/maps/localMaps/88.png")`
          },
          kildare2: {
              left: ['kildare1', 'kildare3'],
              right: ['dublin5'],
              up: ['meath4', 'meath6'],
              down: ['kildare4'],
              bgImage: `url("./images/maps/localMaps/89.png")`
          },
          kildare3: {
              left: ['offaly5'],
              right: ['kildare2'],
              up: ['kildare1'],
              down: ['kildare5'],
              bgImage: `url("./images/maps/localMaps/62.png")`
          },
          kildare4: {
              left: ['kildare5'],
              right: ['wicklow1'],
              up: ['kildare2'],
              down: ['kildare3'],
              bgImage: `url("./images/maps/localMaps/63.png")`
          },
          kildare5: {
              left: ['laois3'],
              right: ['wicklow3', 'kildare4'],
              up: ['kildare3', 'kildare4'],
              down: ['wicklow4', 'kildare6'],
              bgImage: `url("./images/maps/localMaps/64.png")`
          },
          kildare6: {
              left: ['carlow1'],
              right: ['wicklow4'],
              up: ['kildare5'],
              down: ['carlow1'],
              bgImage: `url("./images/maps/localMaps/65.png")`
          },
          kilkenny1: {
              left: ['tipperary3'],
              right: ['kilkenny2'],
              up: ['laois5'],
              down: ['kilkenny3'],
              bgImage: `url("./images/maps/localMaps/66.png")`
          },
          kilkenny2: {
              left: ['kilkenny3', 'kilkenny1'],
              right: ['carlow6'],
              up: ['carlow4'],
              down: ['kilkenny4'],
              bgImage: `url("./images/maps/localMaps/67.png")`
          },
          kilkenny3: {
              left: ['tipperary6'],
              right: ['kilkenny2'],
              up: ['kilkenny1'],
              down: ['kilkenny5'],
              bgImage: `url("./images/maps/localMaps/71.png")`
          },
          kilkenny4: {
              left: ['kilkenny5'],
              right: ['wexford5'],
              up: ['kilkenny2'],
              down: ['kilkenny6'],
              bgImage: `url("./images/maps/localMaps/81.png")`
          },
          kilkenny5: {
              left: ['waterford1'],
              right: ['kilkenny4', 'kilkenny6'],
              up: ['kilkenny3'],
              down: ['waterford6'],
              bgImage: `url("./images/maps/localMaps/64.png")`
          },
          kilkenny6: {
              left: ['kilkenny5', 'waterford6'],
              right: ['wexford5'],
              up: ['kilkenny4'],
              down: ['waterford6'],
              bgImage: `url("./images/maps/localMaps/71.png")`
          },
          laois1: {
              left: ['offaly6'],
              right: ['laois2'],
              up: ['offaly4'],
              down: ['laois5', 'laois2'],
              bgImage: `url("./images/maps/localMaps/72.png")`
          },
          laois2: {
              left: ['laois1'],
              right: ['laois3'],
              up: ['laois1'],
              down: ['laois5', 'laois6'],
              bgImage: `url("./images/maps/localMaps/90.png")`
          },
          laois3: {
              left: ['laois2'],
              right: ['kildare5'],
              up: ['offaly5'],
              down: ['laois6'],
              bgImage: `url("./images/maps/localMaps/74.png")`
          },
          laois4: {
              left: ['tipperary1'],
              right: ['laois5'],
              up: ['laois1', 'offaly6'],
              down: ['laois5'],
              bgImage: `url("./images/maps/localMaps/91.png")`
          },
          laois5: {
              left: ['laois4'],
              right: ['laois6'],
              up: ['laois1', 'laois2', 'laois4'],
              down: ['kilkenny1'],
              bgImage: `url("./images/maps/localMaps/92.png")`
          },
          laois6: {
              left: ['laois5'],
              right: ['carlow1'],
              up: ['laois3', 'laois2'],
              down: ['carlow4'],
              bgImage: `url("./images/maps/localMaps/161.png")`
          },
          leitrim1: {
              left: ['sligo1'],
              right: ['fermanagh1'],
              up: [],
              down: ['leitrim2'],
              bgImage: `url("./images/maps/localMaps/u125.png")`
          },
          leitrim2: {
              left: ['sligo1', 'sligo2'],
              right: ['fermanagh5'],
              up: ['leitrim1'],
              down: ['leitrim3'],
              bgImage: `url("./images/maps/localMaps/92.png")`
          },
          leitrim3: {
              left: ['sligo2'],
              right: ['cavan1'],
              up: ['leitrim2'],
              down: ['sligo3'],
              bgImage: `url("./images/maps/localMaps/93.png")`
          },
          leitrim4: {
              left: ['roscommon3', 'sligo3'],
              right: ['cavan1'],
              up: ['cavan1'],
              down: ['leitrim5', 'roscommon3'],
              bgImage: `url("./images/maps/localMaps/94.png")`
          },
          leitrim5: {
              left: ['leitrim6'],
              right: ['cavan2'],
              up: ['leitrim4'],
              down: ['leitrim6', 'longford1'],
              bgImage: `url("./images/maps/localMaps/95.png")`
          },
          leitrim6: {
              left: ['roscommon3'],
              right: ['leitrim5'],
              up: ['leitrim5'],
              down: ['roscommon5'],
              bgImage: `url("./images/maps/localMaps/96.png")`
          },
          limerick1: {
              left: ['clare5'],
              right: ['limerick2'],
              up: [],
              down: ['limerick5'],
              bgImage: `url("./images/maps/localMaps/u99.png")`
          },
          limerick2: {
              left: ['limerick1'],
              right: ['limerick3'],
              up: ['clare6'],
              down: ['limerick6'],
              bgImage: `url("./images/maps/localMaps/98.png")`
          },
          limerick3: {
              left: ['limerick2'],
              right: ['tipperary2'],
              up: ['clare6'],
              down: ['limerick6'],
              bgImage: `url("./images/maps/localMaps/100.png")`
          },
          limerick4: {
              left: ['kerry4'],
              right: ['limerick5'],
              up: ['clare4'],
              down: ['kerry5', 'cork1', 'cork6'],
              bgImage: `url("./images/maps/localMaps/101.png")`
          },
          limerick5: {
              left: ['limerick4'],
              right: ['limerick6'],
              up: ['limerick1'],
              down: ['cork1'],
              bgImage: `url("./images/maps/localMaps/102.png")`
          },
          limerick6: {
              left: ['limerick5'],
              right: ['limerick3'],
              up: ['limerick2'],
              down: ['cork1'],
              bgImage: `url("./images/maps/localMaps/103.png")`
          },
          longford1: {
              left: ['roscommon5'],
              right: ['longford2'],
              up: ['leitim5'],
              down: ['longford5', 'longford4'],
              bgImage: `url("./images/maps/localMaps/104.png")`
          },
          longford2: {
              left: ['longford1'],
              right: ['longford3'],
              up: ['cavan2'],
              down: ['longford6'],
              bgImage: `url("./images/maps/localMaps/105.png")`
          },
          longford3: {
              left: ['longford2'],
              right: ['westmeath1'],
              up: ['cavan2'],
              down: ['westmeath1'],
              bgImage: `url("./images/maps/localMaps/106.png")`
          },
          longford4: {
              left: ['roscommon5'],
              right: ['longford5'],
              up: ['longford1', 'roscommon5'],
              down: ['westmeath3'],
              bgImage: `url("./images/maps/localMaps/107.png")`
          },
          longford5: {
              left: ['longford4'],
              right: ['longford6'],
              up: ['longford1', 'longford2'],
              down: ['westmeath3'],
              bgImage: `url("./images/maps/localMaps/108.png")`
          },
          longford6: {
              left: ['longford5'],
              right: ['westmeath1'],
              up: ['longford2'],
              down: ['westmeath5'],
              bgImage: `url("./images/maps/localMaps/109.png")`
          },
          louth1: {
              left: ['monaghan6'],
              right: ['louth3', 'louth2'],
              up: ['armagh6'],
              down: ['louth5', 'louth2', 'louth4'],
              bgImage: `url("./images/maps/localMaps/111.png")`
          },
          louth2: {
              left: ['louth1'],
              right: ['louth3'],
              up: ['louth1'],
              down: ['louth6'],
              bgImage: `url("./images/maps/localMaps/112.png")`
          },
          louth3: {
              left: ['louth2'],
              right: [],
              up: [],
              down: [],
              bgImage: `url("./images/maps/localMaps/u118.png")`
          },
          louth4: {
              left: ['meath1'],
              right: ['louth5'],
              up: ['louth1'],
              down: ['meath1'],
              bgImage: `url("./images/maps/localMaps/113.png")`
          },
          louth5: {
              left: ['louth4'],
              right: ['louth6'],
              up: ['louth1'],
              down: ['meath1'],
              bgImage: `url("./images/maps/localMaps/114.png")`
          },

          louth6: {
              left: ['louth5'],
              right: [],
              up: ['louth2'],
              down: ['meath1'],
              bgImage: `url("./images/maps/localMaps/u53.png")`
          },
          mayo1: {
              left: ['mayo2'],
              right: ['sligo6'],
              up: ['sligo6'],
              down: ['mayo6', 'roscommon1'],
              bgImage: `url("./images/maps/localMaps/114.png")`
          },
          mayo2: {
              left: ['mayo3'],
              right: ['mayo1'],
              up: ['mayo1'],
              down: ['mayo3', 'mayo5'],
              bgImage: `url("./images/maps/localMaps/115.png")`
          },
          mayo3: {
              left: ['mayo4'],
              right: ['mayo2'],
              up: ['mayo2'],
              down: ['mayo4'],
              bgImage: `url("./images/maps/localMaps/116.png")`
          },
          mayo4: {
              left: [],
              right: ['mayo5'],
              up: ['mayo3'],
              down: ['galway5'],
              bgImage: `url("./images/maps/localMaps/u70.png")`
          },
          mayo5: {
              left: ['mayo4'],
              right: ['mayo6'],
              up: ['mayo2'],
              down: ['galway2'],
              bgImage: `url("./images/maps/localMaps/119.png")`
          },
          mayo6: {
              left: ['galway5'],
              right: ['roscommon1'],
              up: ['mayo1'],
              down: ['galway1'],
              bgImage: `url("./images/maps/localMaps/120.png")`
          },
          meath1: {
              left: ['cavan6'],
              right: ['louth4'],
              up: ['louth4', 'louth5', 'louth6', 'monaghan6'],
              down: ['meath3', 'meath4'],
              bgImage: `url("./images/maps/localMaps/121.png")`
          },
          meath2: {
              left: ['westmeath2'],
              right: ['meath3'],
              up: ['cavan6'],
              down: ['westmeath2', 'meath5', 'meath3'],
              bgImage: `url("./images/maps/localMaps/127.png")`
          },
          meath3: {
              left: ['meath2'],
              right: ['meath4'],
              up: ['meath2'],
              down: ['meath4'],

              bgImage: `url("./images/maps/localMaps/129.png")`
          },
          meath4: {
              left: ['meath3', 'meath5'],
              right: ['dublin1', 'meath6'],
              up: ['meath1'],
              down: ['meath4', 'meath5', 'kildare1', 'kildare2', 'meath6'],
              bgImage: `url("./images/maps/localMaps/130.png")`
          },
          meath5: {
              left: ['westmeath6'],
              right: ['meath4'],
              up: ['meath2'],
              down: ['kildare1'],
              bgImage: `url("./images/maps/localMaps/131.png")`
          },
          meath6: {
              left: ['meath4'],
              right: ['dublin2'],
              up: ['meath4'],
              down: ['kildare2'],
              bgImage: `url("./images/maps/localMaps/132.png")`
          },
          monaghan1: {
              left: ['monaghan2'],
              right: ['tyrone6'],
              up: ['tyrone4'],
              down: ['monaghan2'],

              bgImage: `url("./images/maps/localMaps/133.png")`
          },
          monaghan2: {
              left: ['fermanagh6'],
              right: ['monaghan1'],
              up: ['monaghan1'],
              down: ['monaghan3'],
              bgImage: `url("./images/maps/localMaps/134.png")`
          },
          monaghan3: {
              left: ['cavan1', 'monaghan4'],
              right: ['monaghan5'],
              up: ['monaghan2'],
              down: ['monaghan4'],
              bgImage: `url("./images/maps/localMaps/135.png")`
          },
          monaghan4: {
              left: ['cavan2'],
              right: ['monaghan3'],
              up: ['monaghan3'],
              down: ['cavan3'],
              bgImage: `url("./images/maps/localMaps/136.png")`
          },

          monaghan5: {
              left: ['monaghan3'],
              right: ['armagh6', 'armagh4'],
              up: ['armagh4'],
              down: ['monaghan6'],
              bgImage: `url("./images/maps/localMaps/137.png")`
          },
          monaghan6: {
              left: ['cavan5', 'cavan3'],
              right: ['armagh6'],
              up: ['monaghan5'],
              down: ['meath1'],
              bgImage: `url("./images/maps/localMaps/138.png")`
          },
          offaly1: {
              left: ['roscommon6'],
              right: ['westmeath5', 'offaly1'],
              up: ['westmeath3', 'westmeath4'],
              down: ['offaly3'],
              bgImage: `url("./images/maps/localMaps/139.png")`
          },
          offaly2: {
              left: ['offaly1'],
              right: ['kildare1'],
              up: ['westmeath6'],
              down: ['offaly5'],
              bgImage: `url("./images/maps/localMaps/140.png")`
          },
          offaly3: {
              left: ['galway4'],
              right: ['offaly4'],
              up: ['offaly1', 'roscommon6'],
              down: ['offaly6'],
              bgImage: `url("./images/maps/localMaps/141.png")`
          },
          offaly4: {
              left: ['offaly3'],
              right: ['laois1'],
              up: ['westmeath5'],
              down: ['laois1'],
              bgImage: `url("./images/maps/localMaps/142.png")`
          },
          offaly5: {
              left: ['offaly4'],
              right: ['kildare3'],
              up: ['offaly2'],
              down: ['laois3'],
              bgImage: `url("./images/maps/localMaps/143.png")`
          },
          offaly6: {
              left: ['galway4'],
              right: ['offaly4', 'laois1'],
              up: ['offaly3'],
              down: ['laois4', 'tipperary1'],
              bgImage: `url("./images/maps/localMaps/144.png")`
          },
          roscommon1: {
              left: ['mayo6'],
              right: ['roscommon2'],
              up: ['mayo1'],
              down: ['galway1'],
              bgImage: `url("./images/maps/localMaps/145.png")`
          },
          roscommon2: {
              left: ['roscommon1'],
              right: ['roscommon3', 'roscommon4'],
              up: ['sligo3'],
              down: ['roscommon4'],
              bgImage: `url("./images/maps/localMaps/146.png")`
          },
          roscommon3: {
              left: ['sligo3', 'roscommon2'],
              right: ['leitrim6', 'leitrim4'],
              up: ['leitrim4'],
              down: ['roscommon4'],
              bgImage: `url("./images/maps/localMaps/147.png")`
          },
          roscommon4: {
              left: ['roscommon2'],
              right: ['roscommon5'],
              up: ['roscommon3'],
              down: ['roscommon6'],
              bgImage: `url("./images/maps/localMaps/148.png")`
          },
          roscommon5: {
              left: ['roscommon4'],
              right: ['longford1'],
              up: ['leitrim6'],
              down: ['longford4'],
              bgImage: `url("./images/maps/localMaps/149.png")`
          },
          roscommon6: {
              left: ['galway3'],
              right: ['offaly1'],
              up: ['roscommon4'],
              down: ['offaly3'],
              bgImage: `url("./images/maps/localMaps/150.png")`
          },
          sligo1: {
              left: ['sligo4'],
              right: ['leitrim1', 'leitrim2'],
              up: [],
              down: ['sligo2'],
              bgImage: `url("./images/maps/localMaps/u110.png")`
          },
          sligo2: {
              left: ['sligo5'],
              right: ['leitrim3'],
              up: ['sligo1'],
              down: ['sligo3'],
              bgImage: `url("./images/maps/localMaps/151.png")`
          },
          sligo3: {
              left: ['sligo5'],
              right: ['leitrim4'],
              up: ['sligo2', 'sligo5'],
              down: ['roscommon2', 'roscommon3'],
              bgImage: `url("./images/maps/localMaps/152.png")`
          },
          sligo4: {
              left: [],
              right: ['sligo1'],
              up: [],
              down: [],
              bgImage: `url("./images/maps/localMaps/u78.png")`
          },
          sligo5: {
              left: ['sligo6'],
              right: ['sligo2'],
              up: [],
              down: ['sligo3', 'sligo6'],
              bgImage: `url("./images/maps/localMaps/u38.png")`
          },
          sligo6: {
              left: ['mayo1'],
              right: ['sligo5'],
              up: ['sligo5'],
              down: ['mayo1'],
              bgImage: `url("./images/maps/localMaps/154.png")`
          },
          tipperary1: {
              left: ['clare3'],
              right: ['laois4'],
              up: ['offaly6'],
              down: ['tipperary3'],
              bgImage: `url("./images/maps/localMaps/157.png")`
          },
          tipperary2: {
              left: ['limerick3', 'tipperary4'],
              right: ['tipperary3'],
              up: ['tipperary1'],
              down: ['tipperary3', 'tipperary4'],
              bgImage: `url("./images/maps/localMaps/158.png")`
          },
          tipperary3: {
              left: ['tipperary2'],
              right: ['kilkenny1'],
              up: ['tipperary2', 'tipperary1'],
              down: ['tipperary6'],
              bgImage: `url("./images/maps/localMaps/159.png")`
          },
          tipperary4: {
              left: ['tipperary5'],
              right: ['tipperary2', 'tipperary6'],
              up: ['tipperary2'],
              down: ['tipperary5'],
              bgImage: `url("./images/maps/localMaps/160.png")`
          },
          tipperary5: {
              left: ['cork2'],
              right: ['tipperary4'],
              up: ['tipperary4'],
              down: ['waterford2'],
              bgImage: `url("./images/maps/localMaps/161.png")`
          },
          tipperary6: {
              left: ['tipperary4'],
              right: ['kilkenny3'],
              up: ['tipperary3'],
              down: ['waterford1'],
              bgImage: `url("./images/maps/localMaps/162.png")`
          },
          tyrone1: {
              left: ['donegal5'],
              right: ['tyrone2'],
              up: ['derry1'],
              down: ['tyrone3'],
              bgImage: `url("./images/maps/localMaps/163.png")`
          },
          tyrone2: {
              left: ['tyrone1'],
              right: ['tyrone5'],
              up: ['derry1'],
              down: ['tyrone4'],
              bgImage: `url("./images/maps/localMaps/164.png")`
          },
          tyrone3: {
              left: ['fermanagh3'],
              right: ['tyrone4'],
              up: ['tyrone1'],
              down: ['fermanagh3'],
              bgImage: `url("./images/maps/localMaps/165.png")`
          },
          tyrone4: {
              left: ['tyrone3'],
              right: ['tyrone5'],
              up: ['tyrone2'],
              down: ['fermanagh6', 'monaghan1'],
              bgImage: `url("./images/maps/localMaps/166.png")`
          },
          tyrone5: {
              left: ['tyrone4'],
              right: ['derry6'],
              up: ['derry6', 'derry5', 'tyrone2'],
              down: ['tyrone6'],
              bgImage: `url("./images/maps/localMaps/167.png")`
          },
          tyrone6: {
              left: ['fermanagh4', 'monaghan1'],
              right: ['armagh1'],
              up: ['tyrone5', 'derry6'],
              down: ['armagh6'],
              bgImage: `url("./images/maps/localMaps/168.png")`
          },
          waterford1: {
              left: ['waterford2'],
              right: ['kilkenny5'],
              up: ['tipperary6'],
              down: ['waterford5', 'waterford4'],
              bgImage: `url("./images/maps/localMaps/169.png")`
          },

          waterford2: {
              left: ['cork2'],
              right: ['waterford1'],
              up: ['tipperary6'],
              down: ['waterford5'],
              bgImage: `url("./images/maps/localMaps/170.png")`
          },
          waterford3: {
              left: ['cork3'],
              right: ['waterford4'],
              up: ['waterford2'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u69.png")`
          },
          waterford4: {
              left: ['waterford3'],
              right: ['waterford5'],
              up: ['waterford1'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u68.png")`
          },
          waterford5: {
              left: ['waterford4'],
              right: ['waterford6'],
              up: ['waterford1'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u185.png")`
          },
          waterford6: {
              left: ['waterford5'],
              right: ['kilkenny6'],
              up: ['kilkenny5'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u183.png")`
          },
          westmeath1: {
              left: ['longford3', 'longford6'],
              right: ['cavan6', 'westmeath2'],
              up: ['longford3', 'cavan2'],
              down: ['westmeath2'],
              bgImage: `url("./images/maps/localMaps/171.png")`
          },
          westmeath2: {
              left: ['westmeath1'],
              right: ['meath2'],
              up: ['cavan6', 'westmeath1'],
              down: ['westmeath6'],
              bgImage: `url("./images/maps/localMaps/172.png")`
          },
          westmeath3: {
              left: ['roscommon6'],
              right: ['westmeath4'],
              up: ['longford5', 'longford4'],
              down: ['westmeath4'],
              bgImage: `url("./images/maps/localMaps/174.png")`
          },
          westmeath4: {
              left: ['westmeath3'],
              right: ['westmeath5'],
              up: ['westmeath3'],
              down: ['offaly1'],
              bgImage: `url("./images/maps/localMaps/176.png")`
          },
          westmeath5: {
              left: ['westmeath4', 'offaly1'],
              right: ['westmeath2', 'westmeath6'],
              up: ['longford6'],
              down: ['offaly4'],
              bgImage: `url("./images/maps/localMaps/177.png")`
          },
          westmeath6: {
              left: ['westmeath5'],
              right: ['meath5'],
              up: ['westmeath2'],
              down: ['offaly2'],
              bgImage: `url("./images/maps/localMaps/178.png")`
          },
          wexford1: {
              left: ['carlow5'],
              right: ['wicklow6'],
              up: ['wicklow5'],
              down: ['wexford2'],
              bgImage: `url("./images/maps/localMaps/180.png")`
          },
          wexford2: {
              left: ['carlow5', 'wexford3'],
              right: [],
              up: ['wexford1'],
              down: ['wexford4'],
              bgImage: `url("./images/maps/localMaps/u26.png")`
          },
          wexford3: {
              left: ['carlow6'],
              right: ['wexford2', 'wexford4'],
              up: ['carlow5'],
              down: ['wexford5'],
              bgImage: `url("./images/maps/localMaps/181.png")`
          },
          wexford4: {
              left: ['wexford3'],
              right: [],
              up: ['wexford2'],
              down: ['wexford6'],
              bgImage: `url("./images/maps/localMaps/u53.png")`
          },
          wexford5: {
              left: ['kilkenny4', 'kilkenny6'],
              right: ['wexford6'],
              up: ['carlow6'],
              down: ['wexford6'],
              bgImage: `url("./images/maps/localMaps/182.png")`
          },
          wexford6: {
              left: ['wexford5'],
              right: [],
              up: ['wexford5', 'wexford4'],
              down: [],
              bgImage: `url("./images/maps/localMaps/u118.png")`
          },
          wicklow1: {
              left: ['kildare4', 'wicklow3'],
              right: ['wicklow2', 'dublin6'],
              up: ['kildare4'],
              down: ['wicklow5'],
              bgImage: `url("./images/maps/localMaps/186.png")`
          },
          wicklow2: {
              left: ['wicklow1'],
              right: [],
              up: ['wicklow6'],
              down: ['wicklow6'],
              bgImage: `url("./images/maps/localMaps/u37.png")`
          },
          wicklow3: {
              left: ['kildare5', 'wicklow4'],
              right: ['wicklow1'],
              up: ['kildare4'],
              down: ['wiklow4'],
              bgImage: `url("./images/maps/localMaps/188.png")`
          },
          wicklow4: {
              left: ['kildare6'],
              right: ['wicklow3'],
              up: ['wicklow3'],
              down: ['carlow2'],
              bgImage: `url("./images/maps/localMaps/191.png")`
          },
          wicklow5: {
              left: ['carlow2'],
              right: ['wicklow6', 'wicklow2'],
              up: ['wicklow1'],
              down: ['wexford1'],
              bgImage: `url("./images/maps/localMaps/192.png")`
          },
          wicklow6: {
              left: ['wicklow5', 'wexford1'],
              right: [],
              up: ['wicklow2'],
              down: ['wexford1'],
              bgImage: `url("./images/maps/localMaps/u1.png")`
          }
      }];

      function getAll() {
          return locationMapExitPoints;
      }

      return {
          getAll: getAll
      };
  })();
  var destinations = [];
  loadDestinations = locationID => {
      // destinations.length = 0;
      locationMapInfo.getAll().forEach(function(location) {
          // //
          // if (locationMapExitPoints[0].hasOwnProperty(locationID)){
          destinations = locationMapExitPoints[0][locationID][lastPressed];
          console.log(destinations);
          //   alert(keyboardActive)
      });
  };

  updateBGImage = () => {
      var bg;
      locationMapInfo.getAll().forEach(function(location) {
        bg = locationMapExitPoints[0][locationID].bgImage;
        //   alert(bg);
        $('#stageBG').css('background-image', bg);
        console.log('bg:  ' + bg);
      });
  };
  // updateLocationName = ()=>{

  // }

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
  changeLocation = () => {
    // loadDestinations(locationID);
    let oldProv = $('#province-title').text();
    let oldCounty = $('#county-title').text();
    // alert(oldProv)
    if (destinations.length === 0) {
      // alert(sea);
      seaHandler();
    } else if (destinations.length === 1) {
      // alert('going!');

      keyboardActive = true;
      updatePlayerLocation();
      locationID = destinations[0];
      updateBGImage();
      $('.levelDescription').html(updateLocationDescription(locationID));
      //indicate new county
      updateCountyEmblem();

      updateProvincialEmblem();
      setLocalMapObjects(locationID);
      // loadDestinations(locationID);
      var original_color = $('#county-emblem').css('border-left-color');
      //notify user on enter new province
      if ($('#province-title').text() != oldProv) {
        $('.cubes')
          .fadeTo(100, 0.9)
          .delay(2500)
          .fadeOut(1000);
        $('.cubes').html(
          `<br><br><h2>Tá Cúige ` +
            oldProv +
            ` fágtha agat. <br><br> Fáilte go Cúige ` +
            $('#province-title').text() +
            `!</h2>`
        );
      }
    } else {
      showMapMenu();
    }
    // destinations.length = 0;
    console.log('current locationID: ' + locationID);
    console.log('current location: ' + updateLocationDescription(locationID));
    console.log(
      'Player can go up to: ' + locationMapExitPoints[0][locationID]['up']
    );
    console.log(
      'Player can go down to: ' + locationMapExitPoints[0][locationID]['down']
    );
    console.log(
      'Player can go left to: ' + locationMapExitPoints[0][locationID]['left']
    );
    console.log(
      'Player can go right to: ' + locationMapExitPoints[0][locationID]['right']
    );
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
  setLocalMapObjects = locationID => {
    if (locationID === 'meath4') {
      $.ajax({
        beforeSend: function(xhr) {
          xhr.overrideMimeType('text/plain; charset=x-user-defined');
        },
        url: './js/data.json',
        datatype: 'text',
        success: function(result) {
          var obj = JSON.parse(result);
          //   alert(obj.meath4.a);
          map = [];
          map.push(obj.meath4.a);
          map.push(obj.meath4.b);
          map.push(obj.meath4.c);
          map.push(obj.meath4.d);
          map.push(obj.meath4.e);
          map.push(obj.meath4.f);

          //   alert(map);
          render();
        }
      });
      //   alert('meath4');
      //   $('#div1').load('./js/data.json');
      //   var cat = JSON.parse($('#div1'));
      //   map = cat.meath4;
      //   console.log('this is the map:' + map);
    } else if (locationID === 'meath6') {
      map = [
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'kr',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ]
      ];
    } else if (locationID === 'donegal5') {
      map = [
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          5,
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          5,
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ]
      ];
    }

    //   else if (locationID === 'donegal2') {}
    //   else if (locationID === 'donegal3') {}
    //   else if (locationID === 'donegal4') {}
    //   else if (locationID === 'donegal5') {}
    //   else if (locationID === 'donegal6') {}

    //   else if (locationID === 'dublin1') {

    //   }
    //   else if (locationID === 'dublin2') {}
    //   else if (locationID === 'dublin3') {}
    //   else if (locationID === 'dublin4') {}
    //   else if (locationID === 'dublin5') {}
    //   else if (locationID === 'dublin6') {}

    //   else if (locationID === 'kerry1') {

    //   }
    //   else if (locationID === 'kerry2') {}
    //   else if (locationID === 'kerry3') {}
    else if (locationID === 'kerry4') {
      map = [
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'M',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ]
      ];
    }
    //   else if (locationID === 'kerry5') {}
    //   else if (locationID === 'kerry6') {}

    //   else if (locationID === 'cork1') {}
    //   else if (locationID === 'cork2') {}
    //   else if (locationID === 'cork3') {}
    else if (locationID === 'cork4') {
      map = [
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          'b',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ]
      ];
    } else if (locationID === 'cork5') {
      map = [
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          'u',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ]
      ];
    } else if (locationID === 'cork6') {
      map = [
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          'j',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ]
      ];
    }

    //   else if (locationID === 'waterford') {}
    //   else if (locationID === 'waterford') {}
    //   else if (locationID === 'waterford') {}
    //   else if (locationID === 'waterford') {}
    //   else if (locationID === 'waterford') {}
    //   else if (locationID === 'waterford') {}
    else if (locationID === 'tyrone3') {
      map = [
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          't',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ]
      ];
    }

    //   else if (locationID === '') {}
    else {
      map = [
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          '.',
          'v',
          'v'
        ],
        [
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v',
          'v'
        ]
      ];
    }
  };

  goBackOneSquare = () => {
      if (lastPressed === 'up') {
          gameObjects[sheepRow][sheepColumn] = 0;
          sheepRow++;
          gameObjects[sheepRow][sheepColumn] = sheep;
      } else if (lastPressed === 'down') {
          gameObjects[sheepRow][sheepColumn] = 0;
          sheepRow--;
          gameObjects[sheepRow][sheepColumn] = sheep;
      } else if (lastPressed === 'left') {
          gameObjects[sheepRow][sheepColumn] = 0;
          sheepColumn++;
          gameObjects[sheepRow][sheepColumn] = sheep;
      } else if (lastPressed === 'right') {
          gameObjects[sheepRow][sheepColumn] = 0;
          sheepColumn--;
          gameObjects[sheepRow][sheepColumn] = sheep;
      }
  };

  var mapMenuIsVisible = false;
  seaHandler = () => {
      if (!mapMenuIsVisible) {
          loadDestinations(locationID);
          $('#sea-modal').fadeIn();
          $('#sea-modal').css('pointer-events', 'auto');
          // console.log("Currently locationID:"+locationID );
          gameObjects[sheepRow][sheepColumn] = 0;
          //   gameObjects[2][8] = sheep;
          goBackOneSquare();
      }
  };

  $('#sea-modal-button').click(function() {
      $('#sea-modal').fadeOut();
      $('#sea-modal').css('pointer-events', 'none');
      seaModalOpen = false;
  });

  let seaModalOpen = false;
  updatePlayerLocation = () => {
      if (seaModalOpen === true) {
          return;
      }

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

          sheepColumn = 2;

          //Apply the sheep's new updated position to the array
          gameObjects[sheepRow][sheepColumn] = sheep;
      }

      if (lastPressed === 'left') {
          //clear the sheep's current cell
          gameObjects[sheepRow][sheepColumn] = 0;

          //
          sheepColumn = 13;

          //Apply the sheep's new updated position to the array
          gameObjects[sheepRow][sheepColumn] = sheep;
      }
  };
  getCountyLocation = locationID => {
      var tempLocationID = locationID;
      return String(tempLocationID.slice(-1));
  };
  getCurrentCounty = locationID => {
      return String(locationID.substring(0, locationID.length - 1));
  };
  updateLocationDescription = locationID => {
    var varNum = Number(getCountyLocation(locationID)) - 1; //array value
    let newLocationName;

    var co = getCurrentCounty(locationID);
    if (co === 'antrim') {
      newLocationName = countyDetails.antrim[1][varNum];
      return newLocationName;
    }
    if (co === 'armagh') {
      newLocationName = countyDetails.armagh[1][varNum];
      return newLocationName;
    }
    if (co === 'carlow') {
      newLocationName = countyDetails.carlow[1][varNum];
      return newLocationName;
    }
    if (co === 'cavan') {
      newLocationName = countyDetails.cavan[1][varNum];
      return newLocationName;
    }
    if (co === 'clare') {
      newLocationName = countyDetails.clare[1][varNum];

      return newLocationName;
    }
    if (co === 'cork') {
      newLocationName = countyDetails.cork[1][varNum];
      return newLocationName;
    }
    if (co === 'derry') {
      newLocationName = countyDetails.derry[1][varNum];
      return newLocationName;
    }
    if (co === 'donegal') {
      newLocationName = countyDetails.donegal[1][varNum];
      return newLocationName;
    }
    if (co === 'down') {
      newLocationName = countyDetails.down[1][varNum];
      return newLocationName;
    }
    if (co === 'dublin') {
      newLocationName = countyDetails.dublin[1][varNum];
      return newLocationName;
    }
    if (co === 'fermanagh') {
      newLocationName = countyDetails.fermanagh[1][varNum];
      return newLocationName;
    }
    if (co === 'galway') {
      newLocationName = countyDetails.galway[1][varNum];
      return newLocationName;
    }
    if (co === 'kerry') {
      newLocationName = countyDetails.kerry[1][varNum];
      return newLocationName;
    }
    if (co === 'kildare') {
      newLocationName = countyDetails.kildare[1][varNum];
      return newLocationName;
    }
    if (co === 'kilkenny') {
      newLocationName = countyDetails.kilkenny[1][varNum];
      return newLocationName;
    }
    if (co === 'laois') {
      newLocationName = countyDetails.laois[1][varNum];
      return newLocationName;
    }
    if (co === 'leitrim') {
      newLocationName = countyDetails.leitrim[1][varNum];
      return newLocationName;
    }
    if (co === 'limerick') {
      newLocationName = countyDetails.limerick[1][varNum];
      return newLocationName;
    }
    if (co === 'longford') {
      newLocationName = countyDetails.longford[1][varNum];
      return newLocationName;
    }
    if (co === 'louth') {
      newLocationName = countyDetails.louth[1][varNum];
      return newLocationName;
    }
    if (co === 'mayo') {
      newLocationName = countyDetails.mayo[1][varNum];
      return newLocationName;
    }
    if (co === 'meath') {
      newLocationName = countyDetails.meath[1][varNum];
      return newLocationName;
    }
    if (co === 'monaghan') {
      newLocationName = countyDetails.monaghan[1][varNum];
      return newLocationName;
    }
    if (co === 'offaly') {
      newLocationName = countyDetails.offaly[1][varNum];
      return newLocationName;
    }
    if (co === 'roscommon') {
      newLocationName = countyDetails.roscommon[1][varNum];
      return newLocationName;
    }
    if (co === 'sligo') {
      newLocationName = countyDetails.sligo[1][varNum];
      return newLocationName;
    }
    if (co === 'tiperary') {
      newLocationName = countyDetails.tiperary[1][varNum];
      return newLocationName;
    }
    if (co === 'tyrone') {
      newLocationName = countyDetails.tyrone[1][varNum];
      return newLocationName;
    }
    if (co === 'westmeath') {
      newLocationName = countyDetails.westmeath[1][varNum];
      return newLocationName;
    }

    if (co === 'wexford') {
      newLocationName = countyDetails.wexford[1][varNum];
      return newLocationName;
    }
    if (co === 'wicklow') {
      newLocationName = countyDetails.wickow[1][varNum];
      return newLocationName;
    }

    // alert('no : ' + varNum);
  };


  deactivateKeyboard = () => {
      document.onkeyup = function(e) {
          return false;
      };
      console.log('disable keyboard');
  };
  var bg = $('#stageBG').css('background-image');
  //   alert(bg);
  if (bg === 'none') {
      updateBGImage();
      setLocalMapObjects(locationID);
      updateProvincialEmblem();
      updateCountyEmblem();
      render();

  }



  /////////


  playerShouts = () => {
      //console.log( "Handler for .keypress() called." );
      // alert('kungfu ');
      // $('.playerShout').fadeOut();

  }
  // jQuery('#example2').raindrops({
  //     color: '#27262a',
  //     canvasHeight: 200
  // });


  $('#shout').on('click', function() {
      // alert('hey')
      // setTimeout(function() {
          // $('.playerShout').fadeIn();
          // $('#example2').fadeTo("fast", 1);
          // $('.playerShout').focus();
      // }, 1000);
      // $('.btn').fadeOut();


  });


  ///////////

  setTimeout(function() {

      if ($('#tall-order').is(":visible")) {
          $('.ui').fadeIn();
          console.log('hey')
      }
  }, 6000)




}); //close document ready function
let rando = Math.floor(Math.random() * 40 + 150);
let randMap = 'url("./images/maps/localMaps/bg' + rando + '.png")';

////////////

let countyDetails = {
    antrim: [
      `Co. Aontroma`,
      [
        `Reaċlainn`,
        `Dearḃóg`,
        `Aċaḋ Eoċaille`,
        `Carn Ṁéaḃla`,
        `Carraig Ḟearġais`,
        `Béal Feiriste`
      ],
      //left
      [234, 218, 237, 275, 353, 314],
      //top
      [5, 47, 201, 299, 273, 353]
    ],
    armagh: [
      `Co. Ard Ṁaċa`,
      [
        `Sráid na nAlbanach`,
        `Craigavon`,
        `Port An Dúnáin`,
        `Baile Úr`,
        `Baile an Ṁuilinn`,
        `Lios Liath`
      ], //left
      [233, 291, 313, 217, 243, 308],
      //top
      [14, 25, 9, 290, 166, 333]
    ],
    carlow: [
      `Co. Ċeaṫarlaċ`,
      [
        `Cill Deirge`,
        `Baile Uí Ṁurċú`,
        `Baile Haicéid`,
        `An Ḃuiríos`,
        `Miseal`,
        `Cill Daṁáin`
      ], //left
      [225, 328, 274, 198, 342, 330],
      //top
      [64, 21, 172, 215, 200, 250]
    ],
    cavan: [
      `Co. An Caḃáin`,
      [
        `Doire na Criaḋ`,
        `An Cnoc Rua`,
        `Béal Tairbirt`,
        `An Dromainn`,
        `Dún an Rí`,
        `Lios Cré`
      ], //left
      [138, 278, 340, 380, 463, 428],
      //top
      [58, 108, 149, 300, 275, 340]
    ],
    clare: [
      `Co. An Ċláir`,
      [
        `Ceann Boirne`,
        `Fíoch Rua`,
        `An Tulach`,
        `Cill Rois`,
        `Leaba Ṡíoda`,
        `Bun Raite`
      ], //left
      [125, 159, 344, 110, 163, 321],
      //top
      [21, 195, 193, 371, 341, 270]
    ],
    cork: [
      `Co. Ċorcaí `,
      [
        `Cill na Mallaċ`,
        `Sliabh an Nóglaigh`,
        `Gleann an Ṗreaċáin`,
        `Beal na mḂláth`,
        `Cionn tSáile`,
        `An Sciobairín`
      ], //left
      [346, 405, 404, 362, 378, 191],
      //top
      [90, 123, 156, 246, 286, 345]
    ],
    derry: [
      `Co. Ḋoire`,
      [
        `Doire`,
        `Léim an Ṁadaiḋ`,
        `Droichead Fíolta`,
        `Maċaire Ráṫa`,
        `An Seanṁullach`,
        `Muine Mór`
      ], //left
      [80, 234, 267, 411, 370, 389],
      //top
      [139, 112, 155, 247, 294, 368]
    ],
    donegal: [
      `Co. Ḋún na nGall`,
      [
        `Cionn Dhún Damh`,
        `Bun na hAḃann`,
        `Sléiḃte Ḋoire Ḃeatha`,
        `Leitir Ceanainn`,
        `Bealach Féich`,
        `Na Cruaċa`
      ], //left
      [382, 234, 214, 305, 270, 189],
      //top
      [18, 81, 127, 191, 247, 268]
    ],
    down: [
      `Co. An Dúin`,
      [
        `An Lorgain`,
        `Lios na gCearrḃach`,
        `An Caisleán Riaḃach`,
        `An Ṁainistir Liath`,
        `Dún Pádraig`,
        `Cill Ċaoil`
      ],
      [123, 230, 281, 412, 393, 222],
      //top
      [177, 114, 103, 117, 242, 401]
    ],
    dublin: [
      `Co. Ḃaile Átha Ċliath`,
      [
        `Fionnġlas`,
        `Cluain Dolcáin`,
        `Cluain Tarbh`,
        `Binn Éadair`,
        `Dún Laoiġaire`,
        `Deilginis`
      ],
      [254, 240, 281, 303, 271, 303],
      //top
      [190, 256, 254, 250, 297, 319]
    ],
    fermanagh: [
      `Co. Ḟear Manaċ`,
      [
        `An Garastún `,
        `Paiteagó`,
        `Eadarnaiḋ`,
        `Lios na Daróg`,
        `Scriobaċ`,
        `Inis Ceiṫleann`
      ],
      [19, 148, 258, 257, 132, 273],
      //top
      [84, 35, 20, 106, 196, 213]
    ],
    galway: [
      `Co. na Gailliṁe`,
      [
        `Poll an Phúca`,
        `Cill Cais`,
        `An Spidéal `,
        `An Teach Dóite`,
        `An Ċeaṫrú Rua`,
        `Inis Meáin `
      ],
      [341, 215, 246, 338, 122, 111],
      //top
      [146, 233, 217, 280, 236, 299]
    ],
    kerry: [
      `Co. Ċiarraí`,
      [
        `Cathair Saiḋḃín`,
        `An Daingean`,
        `Gleann na bPúcaí`,
        `Sliabh Mis`,
        `Na Cruaċa Duḃa`,
        `An tSnaidhm`
      ],
      [9, 17, 111, 234, 235, 123],
      //top
      [118, 159, 159, 110, 268, 374]
    ],
    kildare: [
      `Co. Ċill Dara`,
      [
        `Cairbre`,
        `Na Solláin`,
        `Fioḋ Alúine`,
        `Maigh Nuad`,
        `An Currach`,
        `Léim an Ḃradáin`
      ],
      [239, 372, 254, 368, 329, 334],
      //top
      [118, 110, 159, 159, 268, 374]
    ],
    kilkenny: [
      `Co. Ċill Ċainniġ`,
      [
        `Ġráinseaċ Ċuffe`,
        `Baile Ṁic Andáin`,
        `Bearna na Gaoiṫe`,
        `Dún Garḃáin`,
        `Baile an Ṗoill`,
        `Sliaḃ Rua`
      ],
      [157, 272, 207, 274, 215, 274],
      //top
      [228, 295, 300, 334, 361, 397]
    ],
    laois: [
      `Co. Laoise`,
      [
        `Eiréil `,
        `Darú`,
        `An Baile Fionn`,
        `Baile Átha Í`,
        `Cúil an tSúdaire`,
        `Buiríos Mór Osraí`
      ],
      [161, 265, 298, 109, 249, 275],
      //top
      [119, 121, 84, 285, 316, 255]
    ],
    leitrim: [
      `Co. Liatroma`,
      [
        `Gleann Éada`,
        `Garḃach`,
        `Droim Seanḃó`,
        `Aċaḋ na Síleann`,
        `Fíonach`,
        `Dromad`
      ],
      [182, 202, 222, 302, 310, 272],
      //top
      [47, 126, 208, 215, 278, 347]
    ],
    limerick: [
      `Co. Luimnigh`,
      [
        `Pailis Ċaonraí`,
        `Poll an Phúca`,
        `Caisleán Uí Ċonaill`,
        `Áth na bḞuinseog`,
        `An Ḟeoṫanaċ`,
        `Brú Rí`
      ],
      [198, 284, 376, 98, 151, 220],
      //top
      [64, 46, 19, 247, 268, 178]
    ],
    longford: [
      `Co. An LongFoirt`,
      [
        `An Lios Breac`,
        `Meathais Troim`,
        `Gránard`,
        `Cluain Dá Ráth`,
        `Maiġ Duṁa`,
        `An Ċarraig Ḃuí`
      ],
      [197, 300, 393, 166, 232, 306],
      [154, 171, 154, 245, 231, 232]
    ],
    louth: [
      `Co.Lú`,
      [
        `Dún Dealgan`,
        `An Grianfort`,
        `Ceann Ċloċair`,
        `Baile Átha Ḟirdia`,
        `Poll an Phúca`,
        `Baile an Ġearlánaigh`
      ],
      [287, 370, 450, 187, 254, 323],
      //top
      [87, 137, 53, 286, 254, 236]
    ],
    mayo: [
      `Co. Mhaigh Eo`,
      [
        `Cill Ala`,
        `Caisleán an Ḃarraiġ`,
        `Baile Ui Ḟiacáin`,
        `An Caoláire Rua`,
        `Lios an tSaṁaiḋ`,
        `An Éill`
      ],
      [380, 235, 155, 196, 366, 251],
      //top
      [108, 172, 196, 341, 350, 335]
    ],
    meath: [
      `Co. Na Mí`,
      [
        `An Uaimh`,
        `Ráth Ċairn`,
        `Cill Ḃríde`,
        `Teamhair`,
        `Buaile na Bréachṁaí `,
        `Tigh na Sióg`
      ],
      [274, 206, 240, 298, 122, 349],
      //top
      [187, 203, 240, 224, 387, 356]
    ],
    monaghan: [
      `Co. Ṁuineaċáin`,
      [
        `Scairbh na gCaorach`,
        `Cluain Eois`,
        `Einistir Ḃuithe`,
        `Teach an Scotaigh`,
        `Crícheán Rua`,
        `Carraig Ṁaċaire Rois`
      ],
      [249, 191, 234, 132, 380, 383],
      //top
      [17, 73, 148, 281, 200, 402]
    ],
    offaly: [
      `Co. Uíḃ Ḟailí`,
      [
        `Cluain Ṁic Nóis`,
        `Éadan Doire`,
        `Biorra`,
        `Cionn Eitigh`,
        `Ráth Iomġáin`,
        `Suí an Róin`
      ],
      [133, 442, 143, 222, 432, 141],
      //top
      [88, 76, 215, 253, 154, 284]
    ],
    roscommon: [
      `Co. Ros Comáin`,
      [
        `Cluain Fada`,
        `Baile an Tobair`,
        `Loch Bó Finne`,
        `Scramóg`,
        `Loch Bó Dearge`,
        `Corr na Fola`
      ],
      [164, 240, 357, 316, 353, 328],
      //top
      [215, 191, 124, 211, 212, 354]
    ],
    sligo: [
      `Co. Shligigh`,
      [
        `Béal Átha na gCarraigíní`,
        `An Mullach Mór`,
        `An Ċéis`,
        `Gob Reaċla`,
        `Baile Uí Ḋálaigh`,
        `Tobar an Ċoire`
      ],
      [306, 295, 375, 261, 204, 195],
      //top
      [110, 190, 315, 98, 166, 324]
    ],
    tipperary: [
      `Co. Ṫiobraid Árann`,
      [
        `Ros Cré`,
        `Durlas`,
        `Faiċe Ró`,
        `Sliabh na mBan`,
        `Cluain Meala`,
        `Tigh na Naoi Míle`
      ],
      [293, 332, 358, 282, 259, 363],
      //top
      [102, 263, 285, 307, 342, 309]
    ],
    tyrone: [
      `Co. Ṫír Eoghain`,
      [
        `Caisleán na Deirge`,
        `Baile Mhic Gofraidh`,
        `An Ómaigh`,
        `An Caisleán Glas`,
        `An Ċorr Ċríochach`,
        `Dún Geanainn`
      ],
      [157, 268, 211, 302, 426, 386],
      //top
      [113, 103, 161, 175, 221, 306]
    ],
    waterford: [
      `Co. Ṗort Láirge`,
      [
        `Sléiḃte an Ċomaraigh`,
        `An Baile Dubh`,
        `Tullach an Iarainn`,
        `Cluain Ḟia`,
        `Dún Garḃán`,
        `Cill Ṁíodáin`
      ],
      [261, 103, 85, 185, 251, 406],
      //top
      [138, 188, 266, 357, 257, 169]
    ],
    westmeath: [
      `Co. Na hIarṁí`,
      [
        `Baile na gCailleach`,
        `Ráth Ḟearna`,
        `An Teanga`,
        `Na Colúir`,
        `Cill Ḃeagáin`,
        `An Muileann gCearr`
      ],
      [393, 467, 14, 74, 223, 374],
      //top
      [48, 166, 178, 221, 314, 252]
    ],
    wexford: [
      `Co. Loch Garman`,
      [
        `Coill an Iarainn`,
        `Inis Córṫaidh`,
        `Poll an Phúca`,
        `Maolán na nGaḃar`,
        `An Abhainn Dubh`,
        `Dún Ċormaic`
      ],
      [393, 345, 236, 288, 118, 301],
      //top
      [17, 123, 152, 181, 308, 352]
    ],
    wicklow: [
      `Co. Ċill Ṁantáin`,
      [
        `Poll an Ṗúca`,
        `Na Cloċa Liaṫa`,
        `Siol Éalaiġ`,
        `Dún Ard`,
        `An tInḃear Mór`,
        `Aḃóca`
      ],
      //left
      [216, 374, 164, 155, 329, 360],
      //top
      [69, 70, 125, 185, 293, 293]
    ]
  };
  