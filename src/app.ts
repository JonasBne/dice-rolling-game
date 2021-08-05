// import styling
import './css/custom.scss'

// class for user interface components
class UserInterfaceComponents {
    currentDiceRollContainer: HTMLDivElement;
    currentScorePlayer1: HTMLParagraphElement;
    currentScorePlayer2: HTMLParagraphElement;
    rollBtn: HTMLButtonElement;
    newBtn: HTMLButtonElement;

    constructor() {
        this.rollBtn = document.getElementById("roll-btn")! as HTMLButtonElement;
        this.currentDiceRollContainer = document.getElementById("current-dice-roll-score")! as HTMLDivElement;
        this.currentScorePlayer1 = document.getElementById("current--1")!  as HTMLParagraphElement;
        this.currentScorePlayer2 = document.getElementById("current--2")!  as HTMLParagraphElement;
        this.newBtn = document.getElementById("new-btn")! as HTMLButtonElement;
    }
}

// instantiate class to be used globally
const userInterface = new UserInterfaceComponents();

// class for score calculations
class ScoreCalculations {
    currentScore: number;

    constructor() {
        this.currentScore = 0;
    }

    // generate a random number between 1 and 6
    generateRandomNumber() {
        return Math.trunc(Math.random() * 6 + 1);
    }

    // add number to current score
    updateCurrentPlayerScore() {
        const dice = this.generateRandomNumber();

        // show dice in user interface
        userInterface.currentDiceRollContainer.innerHTML = dice.toString();

        // if number of eyes is 1 then player gets switched and score of current player reset
        if (dice === 1 && players.determineCurrentPlayer() === 'Player-1') {
            // change active state from player 1 to player 2
            players.player1.classList.remove('player--active');
            players.player2.classList.add('player--active');

            // reset score of active player 1
            userInterface.currentScorePlayer1.innerHTML = '0';
            this.currentScore = 0;


        } else if (dice === 1 && players.determineCurrentPlayer() === 'Player-2') {
            // change active state from player 1 to player 2
            players.player2.classList.remove('player--active');
            players.player1.classList.add('player--active');

            // reset score of active player 1
            userInterface.currentScorePlayer2.innerHTML = '0';
            this.currentScore = 0;

        } else {
            // else add number of eyes to score
            this.calculateCurrentScore(dice)
        }
    }

    // add score and insert in DOM
    calculateCurrentScore(dice: number) {
        this.currentScore = this.currentScore + dice;

        if (players.determineCurrentPlayer() === 'Player-1') {
            userInterface.currentScorePlayer1.innerHTML = this.currentScore.toString();
            // check if won
            this.checkIfWon(this.currentScore, 'Player-1');
    } else {
            userInterface.currentScorePlayer2.innerHTML = this.currentScore.toString();
            // check if won
            this.checkIfWon(this.currentScore, 'Player-2');
        }
    }

    checkIfWon(score: number, player: string) {
        if (score >= 10 && player === 'Player-1') {
            players.player1.classList.add('player--winner');
            userInterface.currentDiceRollContainer.classList.add('hidden')
            userInterface.rollBtn.classList.add('hidden');
            players.namePlayer1.innerHTML += ' has won!'

        } else if (score >= 10 && player === 'Player-2') {
            players.player2.classList.add('player--winner');
            userInterface.currentDiceRollContainer.classList.add('hidden')
            players.namePlayer2.innerHTML += ' has won!';
            userInterface.rollBtn.classList.add('hidden');

        }
    }
}

// class to determine which player is active
class Player {
    player1: HTMLElement;
    player2: HTMLElement;
    namePlayer1: HTMLTitleElement;
    namePlayer2: HTMLTitleElement;

    constructor() {
        this.player1 = document.getElementById("player--1")! as HTMLElement;
        this.player2 = document.getElementById("player--2")! as HTMLElement;
        this.namePlayer1 = document.getElementById("name--1")! as HTMLTitleElement;
        this.namePlayer2 = document.getElementById("name--2")! as HTMLTitleElement;
    }

    determineCurrentPlayer() {
        let currentPlayer: string;

        if (this.player1.classList.contains("player--active")) {
            currentPlayer = 'Player-1'
        } else {
            currentPlayer = 'Player-2'
        }
        return currentPlayer;
    }
}

// @ts-ignore
const players = new Player();

// @ts-ignore
const scoreCalculations = new ScoreCalculations();



// class with event listeners
class eventListeners {
    constructor() {
        // click event on roll dice button
        userInterface.rollBtn.addEventListener("click", () => {
            // on each click calculate the current score
            scoreCalculations.updateCurrentPlayerScore();
        })

        // click event on new game button
        userInterface.newBtn.addEventListener("click", () => {
            // reset scores
            userInterface.currentScorePlayer1.innerHTML = '0';
            userInterface.currentScorePlayer2.innerHTML = '0';
            scoreCalculations.currentScore = 0;

            // set player 1 as active player
            if(!players.player1.classList.contains('player--active')) {
                players.player1.classList.add('player--active');
                players.player2.classList.remove('player--active');
            }

            // reset dice
            userInterface.currentDiceRollContainer.innerHTML = '';
            userInterface.currentDiceRollContainer.classList.remove('hidden');

            // reset winner class
            players.player1.classList.remove('player--winner');
            players.player2.classList.remove('player--winner');

            // reset text
            players.namePlayer1.innerHTML = 'Player 1';
            players.namePlayer2.innerHTML = 'Player 2';

            // show roll dice button
            userInterface.rollBtn.classList.remove('hidden');
        })
    }
}

// @ts-ignore
const evListeners = new eventListeners()


