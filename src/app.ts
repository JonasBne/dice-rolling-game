// import styling
import './css/custom.scss'

// class for user interface components
class UserInterfaceComponents {
    rollDiceBtn: HTMLButtonElement;
    currentDiceRollContainer: HTMLDivElement;
    currentScorePlayer1: HTMLParagraphElement;
    currentScorePlayer2: HTMLParagraphElement;
    newGameBtn: HTMLButtonElement;

    constructor() {
        this.rollDiceBtn = document.getElementById("roll-btn")! as HTMLButtonElement;
        this.currentDiceRollContainer = document.getElementById("current-dice-roll-score")! as HTMLDivElement;
        this.currentScorePlayer1 = document.getElementById("current--0")!  as HTMLParagraphElement;
        this.currentScorePlayer2 = document.getElementById("current--1")!  as HTMLParagraphElement;
        this.newGameBtn = document.getElementById("new-btn")! as HTMLButtonElement;
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
            this.addScoreToCurrentScore(dice)
        }
    }

    // add score and insert in DOM
    addScoreToCurrentScore(dice: number) {
        this.currentScore = this.currentScore + dice;

        if (players.determineCurrentPlayer() === 'Player-1') {
            userInterface.currentScorePlayer1.innerHTML = this.currentScore.toString();
    } else {
            userInterface.currentScorePlayer2.innerHTML = this.currentScore.toString();
        }
    }

    // determine winner
    determineWinner() {
        if (players.determineCurrentPlayer() === 'Player-1' && this.currentScore >= 100) {
            players.player1.classList.add('player--winner');
        } else if (players.determineCurrentPlayer() === 'Player-2' && this.currentScore >= 100) {
            players.player2.classList.add('player-winner');
        }
    }
}

// class to determine which player is active
class Player {
    player1: HTMLElement;
    player2: HTMLElement;

    constructor() {
        this.player1 = document.getElementById("player--0")! as HTMLElement;
        this.player2 = document.getElementById("player--1")! as HTMLElement;
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
        userInterface.rollDiceBtn.addEventListener("click", () => {
            // on each click calculate the current score
            scoreCalculations.updateCurrentPlayerScore();
        })

        // click event on new game button
        userInterface.newGameBtn.addEventListener("click", () => {
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
        })
    }
}

// @ts-ignore
const evListeners = new eventListeners()


