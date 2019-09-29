<p id="wins-text">Wins: </p>;
    <p id="losses-text">Losses: </p>;
    <p id="guessesleft-text">Guesses Left: </p>;
    <p id="yourguess-text">Your Guesses so far: </p>;
var computerChoices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var wins = 0;
var losses = 0;
var guess = 9;
var guessLeft = 9;
var yourGuessesLetters = [];

var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var guessesLeft = document.getElementById("guessesleft-text");
var yourguesses = document.getElementById("yourguess-text");

document.onkeyup = function(event) {
    var userGuess = event.key;
    var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    var updateguessLeft = function() {
        document.querySelector('#guessesLeft-text').innerHTML = + guessesLeft;

        var updateLetterToGuess = function() {
          this.letterToGuess = this.computerChoices[Math.floor(Math.random() * this.computerChoices.length)];
        };
        
        var updateGuessedLetters = function() {
            document.querySelector('#yourguess-text').innerHTML = guessedLetters;
        
        };
        
        var reset = function() {
            totalGuesses = 9;
            guessesLeft = 9;
            yourGuessedLetters = [];
        
            updateGuessesLeft();
            updateGuessedLetters();
            updateLetterToGuess();
        }
    };   

    if ((userGuess === "a") || (userGuess === "b") || (userGuess === "c") || (userGuess === "d") || (userGuess === "e") || (userGuess === "f") || (userGuess === "g") || (userGuess === "h") || (userGuess === "i") || (userGuess === "j") || (userGuess === "k") || (userGuess === "l") || (userGuess === "m") || (userGuess === "n") || (userGuess === "o") || (userGuess === "p") || (userGuess === "q") || (userGuess === "r") || (userGuess === "s") || (userGuess === "t") || (userGuess === "u") || (userGuess === "v") || (userGuess === "w") || (userGuess === "x") || (userGuess === "y") || (userGuess === "z")) {
        if ((userGuess === "a" && computerGuess === "a") || 
        (userGuess === "b" && computerGuess === "b") ||
        (userGuess === "c" && computerGuess === "c") ||
        (userGuess === "d" && computerGuess === "d") ||
        (userGuess === "e" && computerGuess === "e") ||
        (userGuess === "f" && computerGuess === "f") ||
        (userGuess === "g" && computerGuess === "g") ||
        (userGuess === "h" && computerGuess === "h") ||
        (userGuess === "i" && computerGuess === "i") ||
        (userGuess === "j" && computerGuess === "j") ||
        (userGuess === "k" && computerGuess === "k") ||
        (userGuess === "l" && computerGuess === "l") ||
        (userGuess === "m" && computerGuess === "m") ||
        (userGuess === "n" && computerGuess === "n") ||
        (userGuess === "o" && computerGuess === "o") ||
        (userGuess === "p" && computerGuess === "p") ||
        (userGuess === "q" && computerGuess === "q") ||
        (userGuess === "r" && computerGuess === "r") ||
        (userGuess === "s" && computerGuess === "s") ||
        (userGuess === "t" && computerGuess === "t") ||
        (userGuess === "u" && computerGuess === "u") ||
        (userGuess === "v" && computerGuess === "v") ||
        (userGuess === "w" && computerGuess === "w") ||
        (userGuess === "x" && computerGuess === "x") ||
        (userGuess === "y" && computerGuess === "y") ||
        (userGuess === "z" && computerGuess === "z")) {
            wins++;
        }else {
            losses++;
        }
    }

}
