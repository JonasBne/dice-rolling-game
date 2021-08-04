// import styling
import './css/custom.scss'

// class for user interface components
class UserInterfaceComponents {
    rollDiceBtn: HTMLButtonElement;
    currentDiceRollContainer: HTMLDivElement;
    currentScorePlayer1: HTMLParagraphElement;
    currentScorePlayer2: HTMLParagraphElement;

    constructor() {
        this.rollDiceBtn = document.getElementById("roll-btn")! as HTMLButtonElement;
        this.currentDiceRollContainer = document.getElementById("current-dice-roll-score")! as HTMLDivElement;
        this.currentScorePlayer1 = document.getElementById("current--0")!  as HTMLParagraphElement;
        this.currentScorePlayer2 = document.getElementById("current--1")!  as HTMLParagraphElement;
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

        // if number of eyes is 1 then player gets switched
        if (dice === 1) {
            console.log("Switch player!")
        } else {
            // else add number of eyes to score
            this.addScoreToCurrentScore(dice)
        }
    }

    // add score and insert in DOM
    addScoreToCurrentScore(dice: number) {
        this.currentScore = this.currentScore + dice;

        userInterface.currentScorePlayer1.innerHTML = this.currentScore.toString();
    }

}

// class to determine which player is active

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
    }
}

// @ts-ignore
const evListeners = new eventListeners()


