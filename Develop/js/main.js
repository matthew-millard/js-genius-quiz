// Questions Array
var questions = [
	{
		question: 'which method do we use to store values in the localStorage object?',
		answers: [
			{ text: 'setItem(key, value)', correct: true },
			{ text: 'getItem(key, value)', correct: false },
			{ text: 'removeItem(key)', correct: false },
			{ text: 'clear()', correct: false },
		],
	},
	{
		question: 'Which method is one way to set a custom data attribute on a element?',
		answers: [
			{ text: 'getAttribute()', correct: false },
			{ text: 'removeAttribute()', correct: false },
			{ text: 'setAttribute()', correct: true },
			{ text: 'JSON.stringify()', correct: false },
		],
	},
	{
		question: 'Which is a method that can be used to convert a string into a JavaScript object?',
		answers: [
			{ text: 'stringify.JSON()', correct: false },
			{ text: 'JSON.parse()', correct: true },
			{ text: 'parse.JSON()', correct: false },
			{ text: 'JSON.stringify()', correct: false },
		],
	},
	{
		question: 'True or False. Functions are allowed in JSON?',
		answers: [
			{ text: 'True', correct: false },
			{ text: 'False', correct: true },
		],
	},
	{
		question: 'Which is a method that can be used to convert a JavaScript object into a data string?',
		answers: [
			{ text: 'JSON.stringify()', correct: true },
			{ text: 'JSON.parse()', correct: false },
			{ text: 'parse.JSON()', correct: false },
			{ text: 'stringify.JSON()', correct: false },
		],
	},
	{
		question: 'Function expressions are hoisted?',
		answers: [
			{ text: 'True', correct: false },
			{ text: 'False', correct: true },
		],
	},
	{
		question: 'The querySelector() method always returns the first element it finds that matches the selector?',
		answers: [
			{ text: 'True', correct: true },
			{ text: 'False', correct: false },
		],
	},
	{
		question: 'The querySelectorAll() method returns a live HTMLCollection?',
		answers: [
			{ text: 'True', correct: false },
			{ text: 'False', correct: true },
		],
	},
	{
		question: 'The getElementsByClassName() method returns a live HTMLCollection?',
		answers: [
			{ text: 'True', correct: true },
			{ text: 'False', correct: false },
		],
	},
	{
		question: 'The element.children selects all child elements of the current element?',
		answers: [
			{ text: 'True', correct: true },
			{ text: 'False', correct: false },
		],
	},
	{
		question: 'Which array method can iterate through an array, and then, return a new array?',
		answers: [
			{ text: 'forEach()', correct: false },
			{ text: 'map()', correct: true },
			{ text: 'for in loop', correct: false },
			{ text: 'for of loop', correct: false },
		],
	},
	{
		question: 'Which array method can add one or more elements to the end of an array and returns the new length of the array?',
		answers: [
			{ text: 'unshift()', correct: false },
			{ text: 'shift()', correct: false },
			{ text: 'pop()', correct: false },
			{ text: 'push()', correct: true },
		],
	},
	{
		question: 'Which array method returns a boolean value if the array contains a certain value?',
		answers: [
			{ text: 'entries()', correct: false },
			{ text: 'find()', correct: false },
			{ text: 'includes()', correct: true },
			{ text: 'contains()', correct: false },
		],
	},
	{
		question: 'Which array method returns a boolean value if the array contains a certain value?',
		answers: [
			{ text: 'entries()', correct: false },
			{ text: 'find()', correct: false },
			{ text: 'includes()', correct: true },
			{ text: 'contains()', correct: false },
		],
	},
	{
		question: '$() is the shorthand for jQuery()?',
		answers: [
			{ text: 'True', correct: true },
			{ text: 'False', correct: false },
		],
	},
]

var scoreboardModal = document.querySelector('.scoreboard')
var viewScoreBoard = document.querySelector('[data-scoreboard*="open-scoreboard"]')
var closeScoreBoardModal = document.querySelector('[data-scoreboard*="close"]')
var form = document.getElementById('form')
var submitButton = form.querySelector('button')
var pointsScored = document.getElementById('points-scored')
var score = document.getElementById('user-score')
var timeUp = document.querySelector('.time-up')
var quizBox = document.querySelector('.quiz-box')
var questionsBox = document.querySelector('.quiz-box__questions')
var startButton = document.querySelector('.start-button')
var displayTimer = document.querySelector('#timer')
var quizIntro = document.querySelector('.quizIntro')
var questionElement = document.getElementById('question')
var answersButtons = document.getElementById('answers')
var message = document.getElementById('message')
var messageElement = document.createElement('p')
var nextButton = document.getElementById('next-button')
var numQuestion = document.getElementById('question-number')
var timeLeft = 60
var userScore = 0
var questionIndex = 0

var numOfHighScores = 5
var highScores = 'High Scores'
var highScoreString = localStorage.getItem(highScores)
var allHighScores = JSON.parse(highScoreString) ?? []
showHighScores()

function startQuiz() {
	quizIntro.classList.add('hide') // Hide rules
	startButton.classList.add('hide') // Hide start button
	questionsBox.classList.remove('hide') // Show question container
	setNextQuestion(questions) // Sets up the next question
	startTimer() // Starts timer
}

startButton.addEventListener('click', startQuiz) // Starts quiz function
nextButton.addEventListener('click', () => {
	questionIndex++
	nextButton.classList.add('hide')
	clearAnswers()
	clearMessage()
	setNextQuestion()
})

// Open scoreboard modal
viewScoreBoard.addEventListener('click', () => {
	scoreboardModal.classList.toggle('hide')
})

// Close scoreboard modal
closeScoreBoardModal.addEventListener('click', () => {
	scoreboardModal.classList.add('hide')
})

submitButton.addEventListener('click', e => {
	var error = form.querySelector('label')
	var input = form.querySelector('input')
	var userName = input.value.toLowerCase().trim()
	if (userName === '') {
		e.preventDefault()
		clearErrorMessages(error)
		var errorMessage = document.createElement('small')
		errorMessage.innerText = 'Please enter your name.'
		error.appendChild(errorMessage)
	} else {
		var score = userScore
		var name = userName.charAt(0).toUpperCase() + userName.slice(1)
		var newScore = { score, name }
		allHighScores.push(newScore)
		allHighScores.sort((a, b) => b.score - a.score)
		allHighScores.splice(numOfHighScores)
		localStorage.setItem(highScores, JSON.stringify(allHighScores))
		location.reload()
	}
})

// Timer Function
function startTimer() {
	var timer = setInterval(() => {
		if (timeLeft <= 0) {
			clearInterval(timer)
			timeIsUp()
		} else {
			timeLeft = timeLeft - 1
			displayTimer.innerHTML = `${timeLeft}s`
		}
		return
	}, 1000)
}

// Set Next Question Function
function setNextQuestion() {
	numQuestion.innerHTML = questionIndex + 1
	questionElement.innerText = questions[questionIndex].question
	questions[questionIndex].answers.forEach(answer => {
		var button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('answer-button')

		if (answer.correct) {
			button.setAttribute('data-correct', 'true')
		} else {
			button.setAttribute('data-incorrect', 'false')
		}
		button.addEventListener('click', selectAnswer)
		answersButtons.appendChild(button)
	})
}

// Selected Answer
function selectAnswer(e) {
	var selectedAnswer = e.target
	updateScore(selectedAnswer)
	var correct = selectedAnswer.getAttribute('data-correct')
	var incorrect = selectedAnswer.getAttribute('data-incorrect')
	clearMessage()
	displayMessage(correct)
	timePenalty(incorrect)
	Array.from(answersButtons.children).forEach(button => {
		setStatusClass(button, button.getAttribute('data-correct'))
		removeEventListener(button, selectAnswer)
	})

	// This will prevent showing the next question button if the user is on the last question.
	if (questions.length > questionIndex + 1 && selectAnswer != null) {
		nextButton.classList.remove('hide')
	}
}

// Change the color of the answer buttons based on whether they are true or false. Add one point to the user's score if answered correctly.
function setStatusClass(element, correct) {
	if (correct) {
		element.classList.add('correct')
	} else {
		element.classList.add('wrong')
	}
}

// Will display message to user based on whether their answer is wrong or correct.
function displayMessage(correct) {
	if (correct) {
		messageElement.innerText = 'That is correct!'
	} else {
		messageElement.innerText = 'Incorrect answer.'
	}
	message.appendChild(messageElement)
}

// Prevents multiple messages being displayed if the user clicks multiple times
function clearMessage() {
	while (message.children[0] != null) {
		message.removeChild(messageElement)
	}
}

// Clears previous answers
function clearAnswers() {
	answersButtons.innerHTML = ''
}

// 5 second time penalty for every mistake
function timePenalty(incorrect) {
	if (incorrect != null && timeLeft > 0) {
		timeLeft -= 5
		return timeLeft
	}
}

// Time is up window.
function timeIsUp() {
	quizBox.classList.add('hide')
	timeUp.classList.remove('hide')
	pointsScored.innerText = userScore
	form.addEventListener('submit', e => {
		e.preventDefault()
	})
}

// If the user's answer is correct, will add one point to the user's score.
function updateScore(selectedAnswer) {
	if (selectedAnswer.getAttribute('data-correct')) {
		userScore++
		score.innerText = userScore
	}
	return
}

// After the user has selected their answer, this function removes the option to click again.
function removeEventListener(element, callback) {
	element.removeEventListener('click', callback)
}

// Check for a high score

// function checkHighScore(score) {
// 	var highScores = JSON.parse(localStorage.getItem(highScores)) ?? []
// 	var lowestScore = highScores[numOfHighScores - 1]?.score ?? 0

// 	if (score > lowestScore) {
// 		saveHighScore(score, allHighScores)
// 		showHighScores()
// 	}
// }

function showHighScores() {
	var highScoreList = document.getElementById('high-scores')
	allHighScores.forEach((highScore, index) => {
		var li = document.createElement('li')
		li.innerText = `${index + 1}. ${highScore.name} - ${highScore.score} points`
		highScoreList.appendChild(li)
	})
}

function clearErrorMessages(error) {
	while (error.children[0] != null) {
		error.innerHTML = ''
	}
}
