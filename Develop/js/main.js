var questions = [
	{
		question: 'What is 2 + 2',
		answers: [
			{ text: '4', correct: true },
			{ text: '3', correct: false },
			{ text: '22', correct: false },
			{ text: '0', correct: false },
		],
	},
]

var questionsBox = document.querySelector('.quiz-box__questions')
var startButton = document.querySelector('.start-button')
var displayTimer = document.querySelector('#timer')
var rules = document.querySelector('.rules')
var questionElement = document.getElementById('question')
var answersButtons = document.getElementById('answers')
var timeLeft = 60

function startQuiz() {
	rules.classList.add('hidden')
	startButton.classList.add('hidden')
	questionsBox.classList.remove('hidden')
	setNextQuestion(questions)
	startTimer()
}

startButton.addEventListener('click', startQuiz)

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

function setNextQuestion(questions) {
	questionElement.innerText = questions[0].question
	questions[0].answers.forEach(answer => {
		var button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('answer-button')
		answersButtons.appendChild(button)
		console.log('hi')
	})
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
