var count = 30;
var interval;

var startBtn = document.getElementById('start');
var questionContainer = document.getElementById('question-container');
var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choice-text'));
var scoreList = document.getElementById('score-list');

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
	{
		question: "Inside which HTML element do we put in the JavaScrpt?",
		choice1: "<script>",
		choice2: "<javascript>",
		choice3: "<js>",
		choice4: "<scripting>",
		answer:1

	},
	{
		question: "JavaScript File has an Extension of:",
		choice1: ".Java",
		choice2: ".js",
		choice3: ".javascript",
		choice4: ".script",
		answer:2

	},
	{
		question: "A Function associated with an object is called",
		choice1: "Function",
		choice2: "Method",
		choice3: "Link",
		choice4: "None",
		answer:2
	},
	{
		question: "If Button is clicked.... Event Handler is invoked",
		choice1: "onSubmit()",
		choice2: "onLoad()",
		choice3: "isPostBack()",
		choice4: "onClick()",
		answer:4
	},
	{
		question: "How can you add a comment in a JavaScript?",
		choice1: "'This is a comment'",
		choice2: "//This is a comment",
		choice3: "/*This is a comment*/",
		choice4: "<!--This is a comment-->",
		answer:2
	}

];

var CORRECT_BONUS = 10;
var Max_Questions = 5;

showScores = () => {
	scoreList.innerHTML="";
	var scores = JSON.parse(localStorage.getItem('scores' ));
			if (!scores){
				scores = [];
			};
	for ( var score of scores){
		var li = document.createElement("li");
		li.innerHTML = score
		scoreList.append(li);
	}


}

endGame = () =>{
	clearInterval(interval);
	showScores();

	var saveScoreBtn = document.getElementById("save-score");
	var initialsEl = document.getElementById("initials");

	questionContainer.classList.add("hidden");
	document.getElementById('score-container').classList.remove("hidden");
	document.getElementById('count').classList.add("hidden");

	saveScoreBtn.addEventListener('click', ()=>{
		var initials = initialsEl.value;
		
		if (initials){
			var score = initials + " - " + count;

			saveScoreBtn.classList.add("hidden");
			initialsEl.classList.add("hidden");

			var scores = JSON.parse(localStorage.getItem('scores' ));
			if (!scores){
				scores = [];
			}
			scores.push(score);
			localStorage.setItem('scores', JSON.stringify(scores));

			showScores();
		}

	
	});

}

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [ ...questions];
	
	getNewQuestion();

	interval = setInterval(function(){
		document.getElementById('count').innerHTML=count;
		count--;
		if (count <= 0){
			document.getElementById('count').innerHTML='Done';
			 return endGame();
		}
	}, 1000);

	questionContainer.classList.remove("hidden");
	startBtn.classList.add("hidden");
};

startBtn.addEventListener('click', startGame);


getNewQuestion = () => {

	if(availableQuestions.length === 0 || questionCounter >= Max_Questions){
		return endGame();
	}
	questionCounter++;
	var questionIndex = Math.floor(Math.random() *availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];
	question.innerText = currentQuestion.question;

	choices.forEach( choice =>{
		var number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	});

	availableQuestions.splice(questionIndex, 1);

	acceptingAnswers = true;
};

choices.forEach(choice => {
	choice.addEventListener('click', e => {
		if(!acceptingAnswers) return;

		acceptingAnswers = false;
		var selectedChoice = e.target;
		var selectedAnswer = selectedChoice.dataset["number"];

		var classToApply = 'incorrect';
		  if (selectedAnswer == currentQuestion.answer){
			classToApply = 'correct';
		}
		  else {
			  count = count - 5;
		  }
		
		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout( () => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();

		}, 1000);


		
	});
})

