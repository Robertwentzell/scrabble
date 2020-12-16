/*
homework 8, scrabble
Robert Wentzell, UMass Lowell Computer Science, rwentzel@cs.uml.edu
Copyright (c) 2020 by Robert Wentzell. All rights reserved. May be
freely
copied or excerpted for educational purposes with credit to the
author.
updated by Robert Wentzell 12/15/2020
*/
// moved the array here because its easier than linking this and im already behind on this assignment
var pieces = [
  {"letter":"A", "value":1,  "amount":9},
  {"letter":"B", "value":3,  "amount":2},
  {"letter":"C", "value":3,  "amount":2},
  {"letter":"D", "value":2,  "amount":4},
  {"letter":"E", "value":1,  "amount":12},
  {"letter":"F", "value":4,  "amount":2},
  {"letter":"G", "value":2,  "amount":3},
  {"letter":"H", "value":4,  "amount":2},
  {"letter":"I", "value":1,  "amount":9},
  {"letter":"J", "value":8,  "amount":1},
  {"letter":"K", "value":5,  "amount":1},
  {"letter":"L", "value":1,  "amount":4},
  {"letter":"M", "value":3,  "amount":2},
  {"letter":"N", "value":1,  "amount":6},
  {"letter":"O", "value":1,  "amount":8},
  {"letter":"P", "value":3,  "amount":2},
  {"letter":"Q", "value":10, "amount":1},
  {"letter":"R", "value":1,  "amount":6},
  {"letter":"S", "value":1,  "amount":4},
  {"letter":"T", "value":1,  "amount":6},
  {"letter":"U", "value":1,  "amount":4},
  {"letter":"V", "value":4,  "amount":2},
  {"letter":"W", "value":4,  "amount":2},
  {"letter":"X", "value":8,  "amount":1},
  {"letter":"Y", "value":4,  "amount":2},
  {"letter":"Z", "value":10, "amount":1},
  {"letter":"_", "value":0,  "amount":2}
];

var game_tiles = [
  {"id": "piece0", "letter": "A"},
  {"id": "piece1", "letter": "B"},
  {"id": "piece2", "letter": "C"},
  {"id": "piece3", "letter": "D"},
  {"id": "piece4", "letter": "E"},
  {"id": "piece5", "letter": "F"},
  {"id": "piece6", "letter": "G"}
]

var game_board = [
  {"id": "drop0",  "tile": "pieceX"},
  {"id": "drop1",  "tile": "pieceX"},
  {"id": "drop2",  "tile": "pieceX"},
  {"id": "drop3",  "tile": "pieceX"},
  {"id": "drop4",  "tile": "pieceX"},
  {"id": "drop5",  "tile": "pieceX"},
  {"id": "drop6",  "tile": "pieceX"},
  {"id": "drop7",  "tile": "pieceX"},
  {"id": "drop8",  "tile": "pieceX"},
  {"id": "drop9",  "tile": "pieceX"},
  {"id": "drop10", "tile": "pieceX"},
  {"id": "drop11", "tile": "pieceX"},
  {"id": "drop12", "tile": "pieceX"},
  {"id": "drop13", "tile": "pieceX"},
  {"id": "drop14", "tile": "pieceX"}
]
var images = "";


function newGame()
{
    restart();
    document.getElementById('score').innerHTML = "";
}
function restart() {
    load_scrabble_pieces();

    console.log(images);

    document.getElementById('rack').innerHTML = string;
    load_droppable_targets();

    document.getElementById('score').innerHTML = " ";
    document.getElementById('word').innerHTML = " ";
    document.getElementById('messages').innerHTML = " ";

}

function newTiles() {
    if (document.getElementById('messages').innerHTML === "valid word") {
        score += parseInt(document.getElementById('score').innerHTML);
        document.getElementById('totalscore').innerHTML = "Total score: " + score;
        restart();
    } else {
        alert("invalid word");
    }

}

function continuePlaying() {
    if (document.getElementById('messages').innerHTML === "valid word") {
        score += parseInt(document.getElementById('score').innerHTML);
        document.getElementById('totalscore').innerHTML = "Total score: " + score;
        populateBoard();
    } else {
        alert("invalid word");
    }
}

function find_word() {
  var word = "";
  var score = 0;
  for(var i = 0; i < 15; i++) {
    if(game_board[i].tile != "pieceX") {
      word += find_letter(game_board[i].tile);
      score += find_score(game_board[i].tile);
    }
  }

  score += (score * should_double());

  // update score
  $("#score").html(score);

  // update the word if it isnt empty
  if(word != "") {
    $("#word").html(word);
    return;
  }

  // if not update word blank
  $("#word").html("____");
}

// doubling function
function should_double() {
  if(game_board[2].tile != "pieceX") {
    return 1;
  }
  if(game_board[12].tile != "pieceX") {
    return 1;
  }

  // Otherwise return 0.
  return 0;
}

// letters score update
function find_score(given_id) {
  // what letter do we have
  var letter = find_letter(given_id);
  var score = 0;

 //search array
  for(var i = 0; i < 27; i++) {
    var obj = pieces[i];
    if(obj.letter == letter) {
      score = obj.value;
      score += (score * should_double_letter(given_id));
      return score;
    }
  }

  // error
  return -1;
}

//double function 2
function should_double_letter(given_id) {
  // Figure out which game tile is dropped on
  var dropID = find_tile_pos(given_id);
  // is this a double 
  if(dropID == "drop6" || dropID == "drop8") {
    // YES, return 1.
    return 1;
  }
  // Otherwise return 0
  return 0;
}

// returns letter given id
function find_letter(given_id) {
  for(var i = 0; i < 7; i++) {
    if(game_tiles[i].id == given_id) {
      return game_tiles[i].letter;
    }
  }
    // error
  return -1;
}


function find_board_pos(given_id) {
  for(var i = 0; i < 15; i++){
    if(game_board[i].id == given_id) {
      return i;
    }
  }

  // Error
  return -1;
}

function find_tile_pos(given_id) {
  for(var i = 0; i < 15; i++){
    if(game_board[i].tile == given_id) {
      return game_board[i].id;
    }
  }

  // Error
  return -1;
}

// 
function load_scrabble_pieces() {
  var base_url = "img/graphics_data/tiles/Scrabble_Tile_";   // base URL 
  var random_num = 1;
  var piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + random_num + ".jpg" + "'></img>";
  var piece_ID = "";
  var what_piece = "";

  // Load up pieces
  for(var i = 0; i < 7; i++) {
    // Get a random number 
    var loop = true;
    while(loop == true){
      random_num = getRandomInt(0, 26);

      // remove the pieces from the data struct
      if(pieces[random_num].amount != 0) {
        loop = false;
        pieces[random_num].amount--;
      }
    }


// easier append 
    piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + pieces[random_num].letter + ".jpg" + "'></img>";
    piece_ID = "#piece" + i;
    game_tiles[i].letter = pieces[random_num].letter;

    // https://stackoverflow.com/questions/885144/how-to-get-current-position-of-an-image-in-jquery
    var pos = $("#the_rack").position();
    var img_left = -165 + (50 * i);
    var img_top = -130;

    /* 
       https://stackoverflow.com/questions/10863658/load-image-with-jquery-and-append-it-to-the-dom
       https://stackoverflow.com/questions/2183863/how-to-set-height-width-to-image-using-jquery
       https://stackoverflow.com/questions/9704087/jquery-add-image-at-specific-co-ordinates

       http://www.w3schools.com/css/css_positioning.asp
    */
    // Add the piece to the screen 
    $("#rack").append(piece);

    // Move the piece to the rack
    $(piece_ID).css("left", img_left).css("top", img_top).css("position", "relative");

    // apply draggable.
    $(piece_ID).draggable();
  }
}

// load droppable targets to apply the letters to later
function load_droppable_targets() {
  var img_url = "img/graphics_data/Scrabble_Blank.png";   // URL of the blank image
  var drop = "<img class='droppable' id='drop" + i + "' src='" + img_url + "'></img>";
  var drop_ID = "#drop" + i;

  for(var i = 0; i < 15; i++) {
      drop = "<img class='droppable' id='drop" + i + "' src='" + img_url + "'></img>";
    drop_ID = "#drop" + i;
    var pos = $("#the_board").position();
    var img_left = 0;
    var img_top = -125;

    // Add the img to the screen.
    $("#board").append(drop);

    // Reposition the img relative to the board.
    $(drop_ID).css("left", img_left).css("top", img_top).css("position", "relative");

    // Make the img droppable
    $(drop_ID).droppable({
        // https://jqueryui.com/droppable/#default
        // https://stackoverflow.com/questions/5562853/jquery-ui-get-id-of-droppable-element-when-dropped-an-item
        // https://api.jqueryui.com/droppable/#event-out

      drop: function(event, ui) {
        var draggableID = ui.draggable.attr("id");
        var droppableID = $(this).attr("id");
        // Mark the game board var
        game_board[find_board_pos(droppableID)].tile = draggableID;
        find_word();
      },
      out: function(event, ui) {
        var draggableID = ui.draggable.attr("id");
        var droppableID = $(this).attr("id");

        // false movement prevention
        if(draggableID != game_board[find_board_pos(droppableID)].tile) {
          console.log("FALSE ALARM DETECTED.");
          return;
        }

        // Mark that a tile was removed 
        game_board[find_board_pos(droppableID)].tile = "pieceX";

        // Update the word
        find_word();
      }
    });
  }
}
//random int
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
