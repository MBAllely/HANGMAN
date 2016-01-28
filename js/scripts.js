//ideas for added functions:
  //alert if they've already guessed that letter.
  //condition for winning w/ alert
  //ability to guess the whole word

var Game = {
  guessedLetters: [],
};

// function Game(guessedLetters, score)
//   this.guessedLetters = guessedLetters;
//   // this.score = score;
//   // this.word = word;
// }
//
// function Player(wins, losses) {
//   this.wins = wins;
//   this.losses = losses;
// }

var board = [
'  +---+   \n  |   |   \n      |   \n      |   \n      |   \n      |   \n========= \n',
'  +---+   \n  |   |   \n  0   |   \n      |   \n      |   \n      |   \n========= \n',
'  +---+   \n  |   |   \n  0   |   \n  |   |   \n      |   \n      |   \n========= \n',
'  +---+   \n  |   |   \n  0   |   \n /|   |   \n      |   \n      |   \n========= \n',
'  +---+   \n  |   |   \n  0   |   \n /|\\  |   \n      |   \n      |   \n========= \n',
'  +---+   \n  |   |   \n  0   |   \n /|\\  |   \n /    |   \n      |   \n========= \n',
'  +---+   \n  |   |   \n  0   |   \n /|\\  |   \n / \\  |   \n      |   \n========= \n'
];

// for i in range(len(borad)):
// 	print board[i]

//global variables//

var words = ["hello","goodbye", "marmalade"] //library of words//
var wordSplit = [];    //word split into array of letters//
var puzzleArray = [];  //array of blanks//
var score = 0;         //user score//

//generates random word from words array and splits the characters up in its own array called wordSplit; then pushes the corresponding amount of underscores to the puzzleArray//

function getRandomWord() {
var randomWordIndex = Math.floor(Math.random() * (3 - 0)) + 0;
  var word = words[randomWordIndex];
  wordSplit = word.split('');
    for (var i = 0; i < wordSplit.length; i++) {
      puzzleArray.push("_");
    }
    return puzzleArray;
}


//finds user input letter in the wordSplit and returns indexes of all matches. Then replaces matching indexes on puzzleArray with the guessed letter//

var letterQuest = function(wordSplit, searchLetter){
    for (var i = 0; i <= wordSplit.length; ++i) {
      if (wordSplit.slice (i, i + searchLetter.length) == searchLetter) { //finds the index positions of letters that match the user input//
        puzzleArray[i] = searchLetter; //replaces the blanks in the puzzle array with the matching index//
      }
    }
    if (puzzleArray.indexOf(searchLetter) === -1) {
      score += 1;
    }
    var puzzleString = puzzleArray.join(" ");
    return puzzleString;
  }


// User Interface Logic
$(document).ready(function() {
  getRandomWord(); //chooses random word on page load//
  var puzzleString = puzzleArray.join(" ");
  $("span#puzzle-array").text(puzzleString);
    $("form#hangman").submit(function(event) {
      var searchLetter = $("input#letter").val(); //uses user input to define the letter to search//
      var searchLetter = searchLetter.toLowerCase(); //forces input to be lowercase//

      if(searchLetter) {
        if (searchLetter.length > 1) {
          alert("Input invalid!  One at a time, punk.");
        } else if ((searchLetter === " ") || (isNaN(searchLetter) === false)) {
          alert("Invalid input!");
        } else {
          Game.guessedLetters.push(" " + searchLetter); //adds guessed letter to array of previous guesses//
          var results = letterQuest(wordSplit, searchLetter);
        } // end if input > 1 conditional
      } else {
        alert("Enter a letter jackass");
      }



      $("span#puzzle-array").text(results);
      $("span#guessed-letters").text(Game.guessedLetters);
      $("span#guesses-left").text("You have " + (6 - score) + " tries left");

      //if you wanna watch...
      // console.log(results);
      console.log(wordSplit);
      console.log(Game.guessedLetters);
      console.log(score);

      event.preventDefault();
      $("span#image").text(board[score]);

      if (score >= 6) {
        alert("YOU LOSE, CHUMP");
      }

      if (puzzleArray.indexOf("_") === -1) {
        alert("YOU WIN!!");
      }
    $("input#letter").val("");

  });
});
