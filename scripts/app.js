const p1 = {
	name: 'Player 1',
	score: 0,
	matchesWon: 0,
	button: document.getElementById('button-p1'),
	scoreDisplay: document.querySelector('input[name=score-p1]'),
}

const p2 = {
	name: 'Player 2',
	score: 0,
	matchesWon: 0,
	button: document.getElementById('button-p2'),
	scoreDisplay: document.querySelector('input[name=score-p2]'),
}

// modals
const winnerModal = document.getElementById('winner-modal');
const matchModal = document.getElementById('match-modal');

// document buttons
const resetBtn = document.getElementById('reset');
const nextRoundBtn = document.getElementById('next-round');
const newGameBtn = document.getElementById('new-game');
const newSetBtn = document.getElementById('new-set');
const matchRoundDisplay = document.querySelector('input[name=match-game]');
const matchGameDisplay = document.querySelector('input[name=match-set]');
const winHistoryListElm = document.getElementById('ul-win-history');
const winHistoryList = [];
// const winHistoryList = ['davd','jake','mark', 'doug', 'jesse', 'mike', 'mark', 'frank', 'donald', 'joseph','jake','mark', 'doug', 'jesse'];
const winnerListLocalStor = window.localStorage;

const winningScore = 11;
let winningMatch = 3;
let isGameOver = false;

// setters
function setScore(player, value) {
	player.score = value;
}

function setDisplay(player, elm, value) {
	player[elm].value = value;
}

function setPlayerProp(player, prop, value) {
	player[prop] = value;
}


// updaters
function updatePlayerScores(player) {
	if (!isGameOver) {
		let currentScore = player.score;
		let newScore = player.score + 1;
		setScore(player, newScore);
		setDisplay(player, 'scoreDisplay', newScore);
	}
}

function updatePlayerMatchesWon() {
	if (p1.score > p2.score) {
		setPlayerProp(p1, 'matchesWon', p1.matchesWon + 1);
	} else {
		setPlayerProp(p2, 'matchesWon', p2.matchesWon + 1);
	}
}

function updateMatchDisplay() {
	matchRoundDisplay.value++;
	if (p1.matchesWon > p2.matchesWon) {
		matchRoundDisplay.style.color = 'red'
	} else if (p1.matchesWon < p2.matchesWon) {
		matchRoundDisplay.style.color = 'blue'
	} else {
		matchRoundDisplay.style.color = 'black'
	}
}

function updateModalContent(elm, heading, text) {
	elm.firstElementChild.childNodes[1].textContent = heading;
	elm.firstElementChild.childNodes[2].textContent = `Round ${text}`;
}











function winnerList(player) {
	addToWinnerListArray(winHistoryList, player);
	setWinnerLocalStor(winnerListLocalStor, winHistoryList);
	addToWinHistoryListElm(winHistoryListElm, winHistoryList)
}

function addToWinHistoryListElm(elm, array) {
	array.forEach((name) => {
		const li = document.createElement('li');
		li.textContent = name;
		elm.appendChild(li);
	})
}

function setWinnerLocalStor(store, array) {
	store.setItem('winnerList', JSON.stringify(array));
}

function addToWinnerListArray(array, player) {
	array.unshift(player);
}

function getWinnerLocalStor() {
	let storeArray = JSON.parse(winnerListLocalStor.getItem('winnerList'));
	if (storeArray) {
		winHistoryList.push(...storeArray);
		addToWinHistoryListElm(winHistoryListElm, winHistoryList);
	}
}













// new
function newGame() {
	setScore(p1, 0);
	setScore(p2, 0);
	setDisplay(p1, 'scoreDisplay', 0);
	setDisplay(p2, 'scoreDisplay', 0);
	isGameOver = false;
}

function newSet() {
	matchRoundDisplay.value = 1;
	matchRoundDisplay.style.color = 'black';
	p1.matchesWon = 0;
	p2.matchesWon = 0;
}


// modal
function toggleModalVisibility(elm, showBool) {
	if (showBool === true) {
		elm.style.display = 'unset';
	} else {
		elm.style.display = 'none';
	}
}


function gameOver(player1, player2, winScore) {
	let round = matchRoundDisplay.value
	if (player1.score >= winScore || player2.score >= winScore) {
		if (player1.score - player2.score >= 2 || player2.score - player1.score >= 2) {
			isGameOver = true;

			if (player1.score > player2.score) {
				updateModalContent(winnerModal, `${player1.name} wins!`, `round ${round}`)
			} else {
				updateModalContent(winnerModal, `${player2.name} wins!`, `round ${round}`)
			}

			if (player1.matchesWon === winningMatch - 1) {
				toggleModalVisibility(matchModal, true);
				winnerList(player1.name);
			} else if (player2.matchesWon === winningMatch - 1) {
				toggleModalVisibility(matchModal, true);
				winnerList(player2.name);
			} else {
				toggleModalVisibility(winnerModal, true);
			}
		}
	}
}

// event listners
window.addEventListener('load', getWinnerLocalStor);

p1.button.addEventListener('click', () => {
	updatePlayerScores(p1);
	gameOver(p1, p2, winningScore);
})

p2.button.addEventListener('click', () => {
	updatePlayerScores(p2);
	gameOver(p1, p2, winningScore);
})

resetBtn.addEventListener('click', () => {
	newSet()
	newGame();
	isGameOver = false;
})

newGameBtn.addEventListener('click', () => {
	newGame();
	toggleModalVisibility(winnerModal, false);
});

newSetBtn.addEventListener('click', () => {
	newSet()
	newGame();
	toggleModalVisibility(matchModal, false);
})

nextRoundBtn.addEventListener('click', () => {
	updatePlayerMatchesWon()
	updateMatchDisplay();
	newGame();
	toggleModalVisibility(winnerModal, false);
});