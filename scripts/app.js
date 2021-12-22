const p1 = {
	playerName: 'Player 1',
	score: 0,
	matches: 0,
	button: document.querySelector('#button-p1'),
	scoreDisplay: document.querySelector('input[name=score-p1]'),
	matchDisplay: document.querySelector('input[name=match-p1]')
}

const p2 = {
	playerName: 'Player 2',
	score: 0,
	matches: 0,
	button: document.querySelector('#button-p2'),
	scoreDisplay: document.querySelector('input[name=score-p2]'),
	matchDisplay: document.querySelector('input[name=match-p2]')
}

const winnerModal = document.querySelector('#winner-modal');

// document buttons
const resetButton = document.querySelector('#reset');
const nextRound = document.querySelector('#next-round');
const newGame = document.querySelector('#new-game');

const winningScore = 11;

let isGameOver = false;
let round = 1;

// setters
function setScore(player, value) {
	player.score = value;
}

function setDisplay(player, elm, value) {
	player[elm].value = value;
	player[elm].value = value;
}

function updateScores(player) {
	if (!isGameOver) {
		let currentScore = player.score;
		let newScore = player.score + 1;
		setScore(player, newScore);
		setDisplay(player, 'scoreDisplay', newScore);
	}
}

function setGameOver(player1, player2, winScore) {
	if (player1.score >= winScore || player2.score >= winScore) {
		if (player1.score - player2.score >= 2 || player2.score - player1.score >= 2) {
			isGameOver = true;
			if (player1.score > player2.score) {
				updateModal(winnerModal, player1.playerName, round)
			} else {
				updateModal(winnerModal, player2.playerName, round)
			}
			toggleModal(winnerModal, true);
		}
	}
}

function updateModal(elm, heading, text) {
	elm.firstElementChild.childNodes[1].textContent = `${heading} wins!`;
	elm.firstElementChild.childNodes[2].textContent = `Round ${text}`;
}

function toggleModal(elm, showBool) {
	if (showBool === true) {
		elm.style.display = 'unset';
	} else {
		elm.style.display = 'none';
	}
}


// event listners
p1.button.addEventListener('click', () => {
	updateScores(p1);
	setGameOver(p1, p2, winningScore);
})

p2.button.addEventListener('click', () => {
	updateScores(p2);
	setGameOver(p1, p2, winningScore);
})

resetButton.addEventListener('click', () => {
	setScore(p1, 0);
	setScore(p2, 0);
	setDisplay(p1, 'scoreDisplay', 0);
	setDisplay(p2, 'scoreDisplay', 0);
	isGameOver = false;
})

newGame.addEventListener('click', () => {
	setScore(p1, 0);
	setScore(p2, 0);
	setDisplay(p1, 'scoreDisplay', 0);
	setDisplay(p2, 'scoreDisplay', 0);
	isGameOver = false;
	toggleModal(winnerModal, false);
});