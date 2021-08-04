// import styling
import './css/custom.scss'

class UserInterfaceComponents {
    rollBtn: HTMLButtonElement;

    constructor() {
        this.rollBtn = document.getElementById("roll-btn")! as HTMLButtonElement;
    }
}

const userInterfaceComponents = new UserInterfaceComponents();


// class for game input
class PlayerInteractions {
    constructor() {
        // click event on roll dice button
        userInterfaceComponents.rollBtn.addEventListener("click", () => {
            scoreCalculations.insertCurrentDiceRollScore();
        })
    }

    // method to generate random number on click
    generateRandomNumber() {
        return Math.trunc(Math.random() * 6 + 1);
    }
}

// @ts-ignore
const playerInteraction = new PlayerInteractions()

// class for scores
class ScoreCalculations {
    currentDiceRollScoreContainer: HTMLDivElement;

    constructor() {
        this.currentDiceRollScoreContainer = document.getElementById("current-dice-roll-score")! as HTMLDivElement;
    }

    // method to insert number of eyes into DOM
    insertCurrentDiceRollScore() {
        const currentDiceRollScore = playerInteraction.generateRandomNumber();
        this.currentDiceRollScoreContainer.innerText = currentDiceRollScore.toString();
    }

}

// @ts-ignore
const scoreCalculations = new ScoreCalculations();
