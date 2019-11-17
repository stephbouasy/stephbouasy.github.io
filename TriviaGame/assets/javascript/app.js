var card = $("#quiz-area");
var countStartNumber = 30;

var questions = [{
  question: "Which of the four houses is represented by a snake?",
  answers: ["Ravenclaw", "Slytherin", "Gryffindor", "Hufflepuff"],
  correctAnswer: "Slytherin",
  image: "assets/images/slytherin.jpg"
}, {
  question: "What are the names of Harry Potter's parents",
  answers: ["Unknown", "Severus Snape & Lily Potter", "James & Lily Potter", "Voldemort"],
  correctAnswer: "James & Lily Potter",
  image: "assets/images/jameslily.jpg"
}, {
  question: "What position does Harry play in Quidditch?",
  answers: ["Chaser", "Keeper", "Bludger", "Seeker"],
  correctAnswer: "Seeker",
  image: "assets/images/seeker.jpg"
}, {
  question: "How did Harry get the scar on his forehead?",
  answers: ["Voldemort tried to kill him when he was a baby", "He was attacked by a Basilisk", "In a quidditch accident", "He crashed The Weasley's car into The Whomping Tree"],
  correctAnswer: "Voldemort tried to kill him when he was a baby",
  image: "assets/images/scar.jpg"
}, {
  question: "How are Hogwarts students sorted to their houses?",
  answers: ["They're assigned by Professor Dumbledore", "They get to pick which house they want to be in", "The Sorting Hat", "They're legacies, they're in the same house as their parents"],
  correctAnswer: "The Sorting Hat",
  image: "assets/images/hat.jpg"
}, {
  question: "What power do the dementors have over people?",
  answers: ["They drain them of all happiness", "They make them go crazy", "They cause them to harm one another", "They make them do their bidding"],
  correctAnswer: "They drain them of all happiness",
  image: "assets/images/dementors.webp"
}, {
  question: "Before his second year at Hogwarts, how do the Weasley's save Harry from the Dursley's house?",
  answers: ["A portkey", "An enchanted room", "Floo Powder", "A flying car"],
  correctAnswer: "A flying car",
  image: "assets/images/car.jpg"
}, {
  question: "What does the Marauder's Map show?",
  answers: ["The location of everyone at Hogwarts", "The room of requirement", "The password to Dumbledore's office", "Hidden treasure"],
  correctAnswer: "The location of everyone at Hogwarts",
  image: "assets/images/map.jpg"
}];

var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function () {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function () {

    timer = setInterval(this.countdown.bind(this), 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
        + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function () {
    this.counter = window.countStartNumber;
    $("#counter-number").text(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function () {

    clearInterval(window.timer);

    $("#counter-number").text(this.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function () {

    clearInterval(window.timer);

    card.html("<h2>All done, here's how you did!</h2>");

    $("#counter-number").text(this.counter);

    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function (e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function () {

    this.incorrect++;

    clearInterval(window.timer);

    card.html("<h2>Nope!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function () {

    clearInterval(window.timer);

    this.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function () {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function (e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function () {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});