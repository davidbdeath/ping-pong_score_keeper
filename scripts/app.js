const p1 = {
	playerName: 'Player 1',
	score: 0,
	matchesWon: 0,
	button: document.querySelector('#button-p1'),
	scoreDisplay: document.querySelector('input[name=score-p1]'),
}

const p2 = {
	playerName: 'Player 2',
	score: 0,
	matchesWon: 0,
	button: document.querySelector('#button-p2'),
	scoreDisplay: document.querySelector('input[name=score-p2]'),
}

const winnerModal = document.querySelector('#winner-modal');

// document buttons
const resetBtn = document.querySelector('#reset');
const nextRoundBtn = document.querySelector('#next-round');
const newGameBtn = document.querySelector('#new-game');
const matchRoundDisplay = document.querySelector('input[name=match-round]')
const matchGameDisplay = document.querySelector('input[name=match-game]')

const winningScore = 11;
let winningMatch = 5;
let isGameOver = false;

// setters
function setScore(player, value) {
	player.score = value;
}

function setDisplay(player, elm, value) {
	player[elm].value = value;
}

function setPlayerProp(player, prop, value) {
	player[prop].value = value;
}


function updateScores(player) {
	if (!isGameOver) {
		let currentScore = player.score;
		let newScore = player.score + 1;
		setScore(player, newScore);
		setDisplay(player, 'scoreDisplay', newScore);
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

function setGameOver(player1, player2, winScore) {
	round = matchRoundDisplay.value
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

function newGame() {
	setScore(p1, 0);
	setScore(p2, 0);
	setDisplay(p1, 'scoreDisplay', 0);
	setDisplay(p2, 'scoreDisplay', 0);
	isGameOver = false;
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

resetBtn.addEventListener('click', () => {
	matchRoundDisplay.value = 1;
	matchRoundDisplay.style.color = 'black';
	newGame();
	isGameOver = false;
})

newGameBtn.addEventListener('click', () => {
	newGame();
	toggleModal(winnerModal, false);
});

nextRoundBtn.addEventListener('click', () => {
	round = matchRoundDisplay.value++;
	if (p1.score > p2.score) {
		setPlayerProp(p1, 'matchesWon', p1.matchesWon++)
	} else {
		setPlayerProp(p2, 'matchesWon', p2.matchesWon++)
	}
	match()
	newGame();
	toggleModal(winnerModal, false);
});

function match() {
	if (p1.matchesWon > p2.matchesWon) {
		matchRoundDisplay.style.color = 'red'
	} else if (p1.matchesWon < p2.matchesWon) {
		matchRoundDisplay.style.color = 'blue'
	} else {
		matchRoundDisplay.style.color = 'black'
	}
}

function updateMatch(player, num) {
	if (player.matchesWon = num) {
	}
}