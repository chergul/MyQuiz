//My variables are here
var startQuiz = document.querySelector('#startBtn');
var scoreList = document.querySelector('#highScores')
var frontContent = document.getElementById('initialContent');
var time = document.querySelector('#counter');
var questionList = document.querySelector("#questionsBox");
var secondsLeft = 60; 
var questionIndex = 0;
var questionText = document.getElementById('question');
var answerText = document.querySelectorAll('.btn')
var scorePage = document.querySelector('#finalContent')
var initialsInput = document.querySelector('#initialsInput');
var submittedScore = document.querySelector('#submitScore');
var finalScore = document.querySelector('#finalScore');
var highScoreSet = {
    initials: highScoreSet,
    score: submittedScore
}
var lastUser = localStorage.getItem("highscore");
lastUser = JSON.parse(lastUser)
console.log(lastUser)

// List of initials are here ????


function scoreListGenerate() {
    var listItem = document.createElement('li')
    listItem.textContent = "Initials: " + lastUser.initials + " score: " + lastUser.score;
    scoreList.appendChild(listItem)

//appendChildn (lastUser)
    
}
if (lastUser) {
    scoreListGenerate();
}



function endQuiz () {
    scorePage.classList.remove('hide');
    questionList.classList.add('hide');
    time.classList.add('hide');
    finalScore.textContent = score;
    submittedScore.addEventListener('click', function() {
        var highScoreSet = {
            initials: initialsInput.value,
            score: submittedScore.value
        }
        highScoreSet.initials = initialsInput.value
        highScoreSet.score = score
        let userScore = JSON.stringify(highScoreSet)
        localStorage.setItem('highscore', userScore)
        
        console.log(highScoreSet)
    })
    
}

// Questions are here. I gave boolean with the question.
var questions = [
    {question: "What is the capital of Turkey?",
    answers: [
		{text: "Kayseri", correct: false},
        {text: "Ankara", correct: true},
        {text: "Istanbul", correct: false},
        {text: "Trabzon", correct: false} 
    ]},
    
    {question: "What is the capital of China?",
    answers: [
        {text: "Shanghai", correct: false},
        {text: "Tianjin", correct: false},
        {text: "Beijing", correct: true},
        {text: "Guangzhou", correct: false} 
    ]},

    {question: "What is the capital of France?",
    answers: [
        {text: "Paris.", correct: true},
        {text: "Bordeaux", correct: false},
        {text: "Lyon", correct: false},
        {text: "Nantes", correct: false} 
    ]}
];
// We need new var in order to call our questions

var newDiv;

// function for setting and showing the next quesiton
var x = 0;
var score = 0;

function setQuestion() {
    if (x === questions.length) {
        endQuiz()
    }
    console.log(x)
    // We need to append our questionList

    newDiv = document.createElement('div');
    newDiv.classList.add('newQuestion');

    // Empty array to store value

    var questionName = [];

    // grab the index of the questions array and put it on the page

    questionName.push(questions[x].question)
    questionText.innerHTML = questionName;

    // We need to have a loop to add the asnwers to the buttons with if else statement

    for (var i = 0; i < questions[x].answers.length; i++) {
        button = document.createElement('button');
        button.classList.add('btn')

        if (questions[x].answers[i].correct === true) {
            button.dataset.correct = true
        }

        else {
            button.dataset.correct = false
        }
        
        button.innerText = questions[x].answers[i].text;
        newDiv.appendChild(button)
        questionList.appendChild(newDiv)}

//This helps us to go to the next question

    x = x + 1;
    
    questionList.addEventListener("click", selectAnswer)
};
    
function selectAnswer(event){
    newDiv.classList.add('hide');
    if (event.target.matches('Button')) {
        const selectedButton = event.target;
        console.log(selectedButton)
        
        if (selectedButton.dataset.correct === "true") {
           rightAnswer()
        }
        else {
           wrongAnswer()
        }
    }
        setQuestion();
};

function rightAnswer() {
    console.log("This one logged True")
    score = score + 1
}
function wrongAnswer() {
    console.log("This one logged False")
}



// create a start button that needs to start a time and the quiz.

startQuiz.addEventListener('click', function() { 

// start the timer 
    var timerInterval = setInterval(function() {
        secondsLeft--;
        time.textContent = secondsLeft + " seconds left.";
        
        if(secondsLeft === 0) {
        clearInterval(timerInterval);
        endQuiz()
        }
    
    }, 1000);
    console.log(secondsLeft)

//-10 sec on every wrong answer	???????



// hide the initialContent because its in our very first page

    frontContent.classList.add('hide');


	// now call the function to start the questions with remove hide

    questionList.classList.remove('hide');
    setQuestion();


})