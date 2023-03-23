var startButton = document.querySelector('.start-button')
var displayTimer = document.querySelector('#timer')
var timeLeft = 60

function startQuiz() {
	startTimer()
}

startButton.addEventListener('click', startQuiz)

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
