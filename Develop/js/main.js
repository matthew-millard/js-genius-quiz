// Questions Array
var questions = [
	{
		question: 'which method do we use to store values in the localStorage object?',
		answers: [
			{ text: 'localStorage.setItem(key, value)', correct: true },
			{ text: 'localStorage.getItem(key, value)', correct: false },
			{ text: 'localStorage.removeItem(key)', correct: false },
			{ text: 'localStorage.clear()', correct: false },
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
]

var questionsBox = document.querySelector('.quiz-box__questions')
var startButton = document.querySelector('.start-button')
var displayTimer = document.querySelector('#timer')
var rules = document.querySelector('.rules')
var questionElement = document.getElementById('question')
var answersButtons = document.getElementById('answers')
var message = document.getElementById('message')
var messageElement = document.createElement('p')
var timeLeft = 60

function startQuiz() {
	rules.classList.add('hidden') // Hide rules
	startButton.classList.add('hidden') // Hide start button
	questionsBox.classList.remove('hidden') // Show question container
	setNextQuestion(questions) // Sets up the next question
	startTimer() // Starts timer
}

startButton.addEventListener('click', startQuiz) // Starts quiz function

// Timer Function
function startTimer() {
	var timer = setInterval(() => {
		if (timeLeft === 0) {
			clearInterval(timer)
			console.log('Game Over!')
		} else {
			timeLeft = timeLeft - 1
			displayTimer.innerHTML = `${timeLeft}s`
		}
		return
	}, 1000)
}

// Set Next Question Function
function setNextQuestion(questions) {
	questionElement.innerText = questions[0].question
	questions[0].answers.forEach(answer => {
		var button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('answer-button')
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
		answersButtons.appendChild(button)
	})
}

// Selected Answer
function selectAnswer(e) {
	const selectedAnswer = e.target
	const correct = selectedAnswer.dataset.correct
	clearMessage()
	displayMessage(correct)
	Array.from(answersButtons.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
}

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
		messageElement.innerText = 'That is wrong!'
	}
	message.appendChild(messageElement)
}

// Prevents multiple messages being displayed if the user clicks multiple times
function clearMessage() {
	while (message.children[0] != null) {
		message.removeChild(messageElement)
	}
}

// When Start Button is 'click'ed => the startQuiz
// function is called.
// 1.Timer should begin counting down.
// 2. Display questions.
// 3. Notify user if the answer is correct.
// 4. Add points to the users score card.
// 5. Deduct time if the user answers incorrectly.
// 6. Display next question
// 7. Repeat steps 3 to 6 until the timer reaches zero.
// 8. Ask the user for there name, and store the name and score.
// 9. Rank the scoreboard in order of who currently has the most points.
