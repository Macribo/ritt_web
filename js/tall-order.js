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
        } else if (locationID === 'carlow6') {
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
    //setLocation(locationID);
    //problem starts here:

    let currentCounty;

    getCountyLocation = locationID => {
        var tempLocationID = locationID;
        return String(tempLocationID.slice(-1));
    };
    getCurrentCounty = locationID => {
        return String(locationID.substring(0, locationID.length - 1));
    };

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
        updatePlayerLocation();
    };
    updateMap = (currentCounty, countyLocation, lastPressed) => {
        //the sea!

        if (currentCounty === 'antrim') {
            if (countyLocation == 1 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'derry5';
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                //    setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'antrim1';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                //    setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'antrim1';

                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');

                locationID = 'armagh3';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'monaghan6';

                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                //sea
                //   alert('new current location will be loch erne');

            } else if (countyLocation == 5 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'armagh3';
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'louth2';
                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'armagh2';

                setLocation(locationID);
                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'carlow6';

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'carlow4';

                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'kilkenny2';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'carlow1';

                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'wexford4';

                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                alert("//TODO  nasc go kildare F");
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'carlow2';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'louth5';
                setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'cavan1';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'meath5';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'cavan6';
                setLocation(locationID);


                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'fermanagh2';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                alert('TODO nasc go leitrim c')
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'cavan4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                locationID = ''; //sea

                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                locationID = ''; //sea

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'tipperary1';
                setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'galway5';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'clare1';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'clare5';
                setLocation(locationID);


                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'clare6';
                setLocation(locationID);



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'clare1';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea

                setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'right') {
                locationID = 'clare3';
                //   alert('new current location will be loch erne');
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'clare1';
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'clare3';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'tipperary1';
                setLocation(locationID);


                // setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'waterford2';
                setLocation(locationID);

                //    setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'limerick5';
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'cork5';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                //sea
                locationID = '';

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'cork1';
                setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'limerick4';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'cork6';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'cork4';
                setLocation(locationID);


                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'cork6';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'cork3';
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'cork2';
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea

                setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'cork4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'derry4';
                setLocation(locationID);

                //    setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'derry2';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'tyrone2';

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'antrim5';
                setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'derry3';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'derry5';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'derry2';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'antrim4';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                alert('ToDo: nasc ar lár.')
                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'donegal4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                locationID = ''; //sea

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'donegal3';
                setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'donegal1';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'fermanagh5';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'donegal2';
                setLocation(locationID);


                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'tyrone4';
                setLocation(locationID);



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea'
                locationID = 'donegal4';
                setLocation(locationID);;


                // setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'right') {
                locationID = ''; //sea
                //   alert('new current location will be loch erne');
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'donegal4';
                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';



                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'donegal1';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'antrim1';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'down3';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'down4';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                locationID = ''; //sea

                setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'armagh2';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                //    setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'dublin6';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'dublin5';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea'                ;
                locationID = 'kildare3';
                setLocation(locationID);


                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'dublin4';
                setLocation(locationID);



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                locationID = ''; //sea
                //   alert('new current location will be loch erne');
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'dublin4';
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'dublin1';
                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'meath3';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'fermanagh1';
                setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'fermanagh3';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'cavan';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                alert('TODO fermanagh3a or fermanagh3b?')


                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                alert('TODO fermanagh3a or fermanagh3b?')

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                alert('TODO fermanagh3a or fermanagh3b?')

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = '';
                setLocation(locationID);
                alert('TODO fermanagh3a or fermanagh3b?')

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                alert('TODO fermanagh3a or fermanagh3b?')


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                alert('TODO fermanagh3a or fermanagh3b?')


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = '';
                setLocation(locationID);
                alert('TODO fermanagh3a or fermanagh3b?')

            } else if (countyLocation == 6 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');

                locationID = '';
                setLocation(locationID);
                alert('TODO fermanagh3a or fermanagh3b?')
            }

        } else if (currentCounty === 'galway') {

            if (countyLocation == 1 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'galway2';
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'galway5';
                setLocation(locationID);
                //    setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'mayo5';
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'galway4';

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'galway1';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'mayo5';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'galway4';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'galway3';
                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');

                locationID = '';
                setLocation(locationID);
                //sea
            }

        } else if (currentCounty === 'kerry') {


            if (countyLocation == 1 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'kerry2';
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                locationID = '';
                //sea
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'kerry1';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'kerry1';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'kerry5';
                setLocation(locationID);
                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'kerry4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'kerry5';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'kerry3';
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                locationID = 'kerry6';
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'right') {
                locationID = 'kerry3';
                //   alert('new current location will be loch erne');
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'kerry4';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'cork2';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'wicklow4';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'kildare1';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'carlow5';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'kildare4';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'dublin3';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'kildare5';
                setLocation(locationID);
                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);

                locationID = 'carlow2';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'laois4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'kilkenny3';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'kilkenny6';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                locationID = 'carlow2';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'tipperary4';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);

                locationID = 'laois4';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'laois3';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'kilkenny1';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'offaly5';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'laois5';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                alert('ToDo: replace laois D')
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                locationID = 'kildare2';
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = '';
                alert('todo: replace laois E')
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'laois5';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'fermanagh3';
                setLocation(locationID);
                //    setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'leitrim6';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'leitrim5';

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'roscommon5';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'cavan5';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                alert('todo: roscommon E')
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'sligo4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                alert('todo: limerick6 or limerick6?')
            } else if (countyLocation == 2 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = '';

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                alert('todo: limerick6 or limerick6?')

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                alert('todo: limerick6 or limerick6?')


                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                alert('todo: limerick6 or limerick6?')

                locationID = '';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'kerry1';
                setLocation(locationID);
                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'limerick5';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                alert('todo: tipperary C')
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                alert('todo: limerick6 or limerick6?')


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                alert('todo: limerick6 or limerick6?')


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                alert('todo: limerick6 or limerick6?')

                locationID = '';
                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                alert('todo: limerick6 or limerick6?')

                locationID = '';
                setLocation(locationID);

            }
        } else if (currentCounty === 'longford') {

            if (countyLocation == 1 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'longford3';
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'longford6';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'leitrim4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'longford3';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'roscommon5';
                setLocation(locationID);


                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'longford1';
                setLocation(locationID);



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'longford2';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'louth4';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'louth5';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'louth6';
                setLocation(locationID);



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'louth3';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                locationID = ''; //sea

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'mayo1';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'mayo3';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'galway4';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'mayo4';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'mayo6';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'mayo5';
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                locationID = 'mayo3';
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 4 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'mayo3';
                setLocation(locationID);
                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'sligo3';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
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
                alert('todo: meath2 or meath2?')
            } else if (countyLocation == 1 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                //    setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = '';
                alert('todo: meath2 or meath2?')
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = '';
                alert('todo: meath2 or meath2?')
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = '';
                alert('todo: meath2 or meath2?')
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                alert('todo: meath2 or meath2?')
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                alert('todo: meath2 or meath2?')

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = '';
                alert('todo: meath2 or meath2?')
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'meath6';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'dublin3';
                setLocation(locationID);



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'westmeath1';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'monaghan1';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'monaghan5';
                setLocation(locationID);
                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'cavan3';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'fermanagh1';
                setLocation(locationID);
                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'monaghan5';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'monaghan2';
                setLocation(locationID);
                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'offaly4';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'offaly4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'offaly3';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'tipperary1';
                setLocation(locationID);
                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'offaly4';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'offaly4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'roscommon5';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'roscommon6';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'roscommon1';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                locationID = 'mayo6';
                setLocation(locationID);
                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'roscommon4';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'roscommon4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'sligo4';
                setLocation(locationID);
                //    setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                //sea;
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
                //   alert('new current location will be loch erne');
                //sea
                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');

                locationID = 'sligo2';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                //sea

                // setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
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
                alert('todo : link to correct roscommon location')
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'mayo6';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'tipperary4';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'tipperary1';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'tipperary4';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'tipperary5';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'kilkenny5';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'limerick1';

                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

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
                alert('todo: link to correct cork location')
                setLocation(locationID);

            }
        } else if (currentCounty === 'tyrone') {

            if (countyLocation == 1 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'fermanagh5';
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'derry5';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'derry2';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'tyrone3';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'tyrone1';
                setLocation(locationID);
                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'armagh4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                alert("todo: link to derry C")
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'tyrone1';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'waterford1';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'tipperary6';
                setLocation(locationID);
                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'waterford4';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'waterford6';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'kilkenny5';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
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
                locationID = ''; //sea
                //   alert('new current location will be loch erne');
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'waterford1';
                setLocation(locationID);
            } else if (countyLocation == 5 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'waterford2';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);
                locationID = 'westmeath1';
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'cavan5';
                setLocation(locationID);
                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'weestmeath6';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'westmeath4';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'westmeath1';
                alert('todo: fix westmeath3 right + up links')
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'westmeath1';
                alert('todo: fix westmeath3 right + up links')
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'westmeath5';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'wexford3';
                setLocation(locationID);
                //    setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'wexford5';
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'wicklow1';

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'wicklow6';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'waterford6';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'wexford1';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';



                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'wexford5';
                setLocation(locationID);
                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = '';
                //sea
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'wexford4';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                // setLocation(locationID);
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'wicklow6';
                setLocation(locationID);
                //    setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'wicklow2';
                setLocation(locationID);
            } else if (countyLocation == 1 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = ''; //sea
                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                locationID = 'wicklow3';

                setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                // setLocation(locationID);

            } else if (countyLocation == 2 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'dublin1';
                setLocation(locationID);

                // setLocation(locationID);
            } else if (countyLocation == 2 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');
                locationID = 'wicklow6';
                setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'left') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'kildare6';
                setLocation(locationID);

                //        setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
                locationID = 'wicklow2';
                setLocation(locationID);


                // setLocation(locationID);
            } else if (countyLocation == 3 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';
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
                //   alert('new current location will be loch erne');
                // locationID = 'sea';

                locationID = 'wicklow1';
                setLocation(locationID);
                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'right') {
                //   alert('new current location will be loch erne');
                // locationID = 'sea';


                // setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'up') {
                //   alert('new current location will be loch erne');
                locationID = 'wicklow2';
                setLocation(locationID);
            } else if (countyLocation == 6 && lastPressed === 'down') {
                //   alert('new current location will be loch erne');

                locationID = '';
                setLocation(locationID);

            }
        };
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