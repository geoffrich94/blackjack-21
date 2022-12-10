// Select and store UI elements that are interacted with or manipulated
const pl0ScoreEl = document.getElementById('score--0');
const pl1ScoreEl = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnStand = document.querySelector('.btn--stand');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const round0El = document.getElementById('round--0');
const round1El = document.getElementById('round--1');
const pl0NameEl = document.getElementById('name--0');
const pl1NameEl = document.getElementById('name--1');


// Game Management System
const gameManagementSystem = {
  rollDice: function () {
    return this.dice = Math.trunc(Math.random() * 6) + 1;
  },
  currentScore: 0,
  currentPlayer: 0,
  scores: [0, 0],
  roundScore: [0, 0],
  switchPlayer: function () {
    if (this.currentPlayer === 0) {
      this.currentPlayer = 1;
      player0El.classList.remove('player--active');
      player1El.classList.add('player--active');
    } else {
      this.currentPlayer = 0;
      player1El.classList.remove('player--active');
      player0El.classList.add('player--active');
    };
  },
  setStartConditions: function () {
    pl0ScoreEl.innerHTML = 0;
    pl1ScoreEl.innerHTML = 0;
    round0El.innerHTML = 0;
    round1El.innerHTML = 0;
    diceEl.classList.add('hidden');
  }
};


// Set starting conditions for game
gameManagementSystem.setStartConditions();


// Roll dice mechanism
btnRoll.addEventListener('click', function () {
  // 1. Generate a random number between 1-6 to represent virtual dice roll
  gameManagementSystem.rollDice();
  console.log(`Roll Value: ${gameManagementSystem.dice}`);

  // 2. Display dice roll
  diceEl.classList.remove('hidden');
  diceEl.innerHTML = gameManagementSystem.dice;

  // 3. Add dice roll to current score
  gameManagementSystem.currentScore = gameManagementSystem.currentScore + gameManagementSystem.dice;
  // Log dice roll details
  console.log(`Current Score: ${gameManagementSystem.currentScore}`);
  console.log(`Current Player: ${gameManagementSystem.currentPlayer}`);
  console.log(`Scores: ${gameManagementSystem.scores}`);

  // 4. Set game conditions
  if (gameManagementSystem.currentScore < 21) {
    // Set score dynamically based on current player
    document.getElementById(`score--${gameManagementSystem.currentPlayer}`).innerHTML = gameManagementSystem.currentScore;
  } else if (gameManagementSystem.currentScore > 21 && gameManagementSystem.currentPlayer === 0) {
    // Reset current score in UI to 0
    document.getElementById(`score--${gameManagementSystem.currentPlayer}`).innerHTML = 0;
    // Set actual score to 0
    gameManagementSystem.currentScore = 0;
    // Check to see which player wins game
    if (gameManagementSystem.roundScore[1] === 3) {
      console.log('Player 2 Wins!')
      player1El.classList.add('player--winner');
      pl1NameEl.innerHTML = 'Player 2 Wins!';
    };
    // Switch Player
    gameManagementSystem.switchPlayer();
  } else if (gameManagementSystem.currentScore > 21 && gameManagementSystem.currentPlayer === 1) {
    // Reset current score in UI to 0
    document.getElementById(`score--${gameManagementSystem.currentPlayer}`).innerHTML = 0;
    // Set actual score to 0
    gameManagementSystem.currentScore = 0;
    // Rest scores array to 0
    gameManagementSystem.scores[0] = 0;
    gameManagementSystem.scores[1] = 0;
    // Update round score
    gameManagementSystem.roundScore[0] = gameManagementSystem.roundScore[0] + 1;
    round0El.innerHTML = gameManagementSystem.roundScore[0];
    console.log(`Round Score: ${gameManagementSystem.roundScore}`);
    // Check to see which player wins game
    if (gameManagementSystem.roundScore[0] === 3) {
      console.log('Player 1 Wins!')
      player0El.classList.add('player--winner');
      pl0NameEl.innerHTML = 'Player 1 Wins!';
    };
    // Switch Player
    gameManagementSystem.switchPlayer();
  } else {
    // Set score dynamically based on current player
    document.getElementById(`score--${gameManagementSystem.currentPlayer}`).innerHTML = gameManagementSystem.currentScore;
    console.log(`Current Score: ${gameManagementSystem.currentScore}`);
    console.log(`Current Player: ${gameManagementSystem.currentPlayer}`);
  }
});


// Stand mechanism
btnStand.addEventListener('click', function () {
  // 1. Store score
  gameManagementSystem.scores[gameManagementSystem.currentPlayer] = gameManagementSystem.currentScore;
  console.log(`Scores: ${gameManagementSystem.scores}`);
  // Set actual score to 0
  gameManagementSystem.currentScore = 0;

  // 2. Check to see which score is higher once round has ended
  if (gameManagementSystem.currentPlayer === 1) {
    // Update round score and round score UI
    if (gameManagementSystem.scores[0] > gameManagementSystem.scores[1]) {
      // Player 0 wins round 
      gameManagementSystem.roundScore[0] = gameManagementSystem.roundScore[0] + 1;
      round0El.innerHTML = gameManagementSystem.roundScore[0];
    } else if (gameManagementSystem.scores[0] < gameManagementSystem.scores[1]) {
      // Player 1 wins round 
      gameManagementSystem.roundScore[1] = gameManagementSystem.roundScore[1] + 1;
      round1El.innerHTML = gameManagementSystem.roundScore[1];
    };
    // Reset scores array to 0
    gameManagementSystem.scores[0] = 0;
    gameManagementSystem.scores[1] = 0;
  };
  console.log(`Round Score: ${gameManagementSystem.roundScore}`);

  // 3. Switch Player
  gameManagementSystem.switchPlayer();

  // 4. Check to see which player wins game
  if (gameManagementSystem.roundScore[0] === 3) {
    console.log('Player 1 Wins!')
    player0El.classList.add('player--winner');
    pl0NameEl.innerHTML = 'Player 1 Wins!';
  } else if (gameManagementSystem.roundScore[1] === 3) {
    console.log('Player 2 Wins!')
    player1El.classList.add('player--winner');
    pl1NameEl.innerHTML = 'Player 2 Wins!';
  };
});