var game = {
  count: 0,
  possibilities: [
    "zorro",
    "caballo",
    "gallina",
    "panda",
    "rana",
    "mapache",
    "unicornio",
    "perro",
    "conejo"
  ],
  currentGame: [],
  player: [],
  strict: false
};

function clearGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}

function newGame() {
  clearGame();
}

function showMoves() {
  var i = 0;
  var moves = setInterval(function() {
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 600);

  clearPlayer();
}

function playGame(field) {
  $(field).addClass("circleColor");
  setTimeout(function() {
    $(field).removeClass("circleColor");
  }, 8000);
}

function clearPlayer() {
  game.player = [];
}

function addToPlayer(id) {
  var field = id;
  console.log("field", field);
  game.player.push(field);
  playerTurn(field);
}

function playerTurn(x) {
  if (
    game.player[game.player.length - 1] !==
    game.currentGame[game.player.length - 1]
  ) {
    if (game.strict) {
      alert("Se reinicia de cero");
      newGame();
    } else {
      alert("Intentar de nuevo");
      showMoves();
    }
  } else {
    console.log("Bien");
    var check = game.player.length === game.currentGame.length;
    if (check) {
      if (game.count == 20) {
        alert("You won! Congrats.");
      } else {
        alert("Next round!");
        nextLevel();
      }
    }
  }
}

function nextLevel() {
  addCount();
}

function generateMove() {
  var random = Math.random();
  var multiplicacion = random * 9;
  var floor = Math.floor(multiplicacion);
  console.log(`Número random: ${random}`);
  console.log(`Random multiplicado: ${multiplicacion}`);
  console.log(`Posición del arreglo: ${floor}`);

  game.currentGame.push(game.possibilities[floor]);
  console.log(game.possibilities);
  console.log(game.currentGame);
  //alert(game.currentGame.length);
  console.log(game.currentGame.length);
  showMoves();
}

function addCount() {
  game.count++;
  $("#clickNumber").addClass("animated fadeOutDown");

  setTimeout(function() {
    $("#clickNumber")
      .removeClass("fadeOutDown")
      .html(game.count)
      .addClass("fadeInDown");
  }, 200);

  generateMove();
}

newGame();