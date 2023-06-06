import { createBoard } from "./minesweeperLogic.js";
import {setupGame} from "./minesweeperUi.js";


const mineExplosion = new Audio('../images/explosion.mp3');
const mineMiss = new Audio('../images/miss.mp3');
let draggableElements = document.querySelectorAll(".mainPage_formEntry");
const DIFFICULTY_STATUS = {
    EASY: "3",
    NORMAL: "7",
    HARD: "13",
    INSANE: "99"
}

// let currentDifficulty = DIFFICULTY_STATUS.EASY;
export let currentDif = DIFFICULTY_STATUS.EASY;
let currentEntryNum = 0;

//open menu button

export function openMenu() {
    const mainPageOpen = document.querySelector(".mainPage_open");
    const mainPageMenu = document.querySelector(".mainPage_menu");
    // const mainPageClose = document.querySelector(".mainPage_close");

    mainPageOpen.addEventListener("click", () => {
        mainPageMenu.classList.add("mainPage--open");
        // mainPageClose.classList.add("mainPage--open");
        playBoomSound();
    });
}


// close menu button
export function closeMenuEtc() {
    const mainPageClose = document.querySelector(".mainPage_close");
    const mainPageMenu = document.querySelector(".mainPage");

    mainPageClose.addEventListener("click", () => {
        mainPageMenu.classList.remove("mainPage--open");
        playBoomSound();

    });
}


// changes the difficulty of the minesweeper game and generates a new minesweeper board according to the difficulty

export function changeGameDifficulty() {
    const mainPageOpenBtn = document.querySelector(".mainPage_difficulty");
    const difficultyStatus = document.getElementById("data-difficulty-status");

    mainPageOpenBtn.addEventListener("click", () => {
        let currentDifficulty = difficultyStatus.textContent;
        playBoomSound();
        if (currentDifficulty === "easy") {
            difficultyStatus.textContent = "medium";
            currentDifficulty = DIFFICULTY_STATUS.NORMAL;
        } else if (currentDifficulty === "medium") {
            difficultyStatus.textContent = "hard";
            currentDifficulty = DIFFICULTY_STATUS.HARD;
        } else if (currentDifficulty === "hard") {
            difficultyStatus.textContent = "insane";
            currentDifficulty = DIFFICULTY_STATUS.INSANE;
        } else if (currentDifficulty === "insane") {
            difficultyStatus.textContent = "easy";
            currentDifficulty = DIFFICULTY_STATUS.EASY;
        }
        console.log(currentDifficulty);
        console.log(currentDif);
        currentDif = currentDifficulty;
        console.log(currentDif);
        // setupGame();
    });
}


// starts the minesweeper game
export function start() {
    const mainPageStart = document.querySelector(".mainPage_start");
    const mainPageGame = document.querySelector(".mainPage_game");
    const mainPageBasic = document.querySelector(".mainPage_basic");
    const mainPage = document.querySelector(".mainPage");

    mainPageStart.addEventListener("click", () => {
        setupGame();
        mainPage.classList.remove("mainPage--open")
        mainPageBasic.classList.add("mainPage");
        mainPageGame.classList.add("mainPage--open");
        playBoomSound();
    });
}


//plays the boom sound
export function playBoomSound() {
    mineExplosion.pause();
    mineExplosion.currentTime = 0;
    mineExplosion.play()
        .then(() => {
            console.log('Sound played successfully');
        })
        .catch((error) => {
            console.error('Error occurred while playing sound:', error);
        });
}


// plays the miss sound
export function playMissSound() {
    mineMiss.pause();
    mineMiss.currentTime = 0;
    mineMiss.play()
        .then(() => {
            console.log('Sound played successfully');
        })
        .catch((error) => {
            console.error('Error occurred while playing sound:', error);
        });
}


//opens the form page
export function openForm() {
    const mainPageOpenBtn = document.querySelector(".mainPage_form");
    mainPageOpenBtn.classList.add("mainPage--open");
}


//sets the time for the PlayerTime field in the mainPage_screen
export function setPlayerTime() {
    const timeCountElement = document.querySelector('[data-time-count]');
    const playerTimeField = document.getElementById('playerTime');

    if (timeCountElement && playerTimeField) {
        playerTimeField.value = timeCountElement.innerText;
    }
}
// open the ruleset form menu upon clicking on the rulesetButton
export function openRuleset() {
    const mainPageOpenBtn = document.querySelector(".mainPage_openRuleset");
    const mainPageRuleset = document.querySelector(".mainPage_ruleset");
    const mainPageMenu = document.querySelector(".mainPage_menu");
    // const mainPageClose = document.querySelector(".mainPage_close");

    mainPageOpenBtn.addEventListener("click", () => {
        mainPageRuleset.classList.add("mainPage--open");
        mainPageMenu.classList.remove("mainPage--open")
        // mainPageClose.classList.add("mainPage--open")
        playBoomSound();
    });

}
//for the closeButton in the ruleset screen, closes the ruleset

export function closeRuleset() {
    const mainPageRuleClose = document.querySelector(".mainPage_rulesetClose");
    const mainPageMenu = document.querySelector(".mainPage_ruleset");

    mainPageRuleClose.addEventListener("click", () => {
        mainPageMenu.classList.remove("mainPage--open");
        playBoomSound();

    });
}

// for the close button in the leaderboard screen, closes the leaderboard
export function closeLeaderboard() {
    const mainPageCloseLeaderboard = document.querySelector(".mainPage_closeLeaderboard");
    const mainPageLeaderboard = document.querySelector(".mainPage_leaderboard");
    const mainPageBasic = document.querySelector(".mainPage_basic");
    const mainPageGame = document.querySelector(".mainPage_game");

    mainPageCloseLeaderboard.addEventListener("click", () => {
        mainPageLeaderboard.classList.remove("mainPage--open");
        mainPageGame.classList.remove("mainPage--open");
        mainPageBasic.classList.add("mainPage--open");
        playBoomSound();

    });
}

// transfers the data from form to the leaderboard as leaderboardEntry

function handleSubmit() {
    // event.preventDefault();
    currentEntryNum++;

    const form = document.querySelector('.mainPage_form');
    const leaderboard = document.querySelector('.mainPage_leaderboard');
    const lBoard = document.querySelector('.leaderboard');
    const placeHolder = document.querySelector('.no-place');
    const playerName = document.getElementById('playerName').value;
    const playerEmail = document.getElementById('playerEmail').value;
    const playerSafetyWord = document.getElementById('playerSafetyWord').value;
    const playerTime = document.getElementById('playerTime').value;

    const formEntry = document.createElement('div');
    formEntry.classList.add('mainPage_formEntry');
    // formEntry.setAttribute("id", "myDraggableElement");
    formEntry.setAttribute('draggable', 'true');
    formEntry.setAttribute("data-element-id", currentEntryNum);

    const playerNameDiv = document.createElement('div');
    playerNameDiv.textContent = `Player Name: ${playerName}`;
    formEntry.appendChild(playerNameDiv);

    const playerEmailDiv = document.createElement('div');
    playerEmailDiv.textContent = `Player Email: ${playerEmail}`;
    formEntry.appendChild(playerEmailDiv);

    const playerSafetyWordDiv = document.createElement('div');
    playerSafetyWordDiv.textContent = `Player Safety Word: ${playerSafetyWord}`;
    formEntry.appendChild(playerSafetyWordDiv);

    const playerTimeDiv = document.createElement('div');
    playerTimeDiv.textContent = `Player Time: ${playerTime}`;
    formEntry.appendChild(playerTimeDiv);

    placeHolder.appendChild(formEntry);
    draggableElements = document.querySelectorAll(".mainPage_formEntry");
    dragAndDrop();

    form.reset();
}
// Sets up eventListener on the submitButton, checks the validity of the form and if it is correct opens the
// leaderboard page
export function submitButton() {
    const mainPageSubmitButton = document.querySelector('.mainPage_submit');
    const mainPageForm = document.querySelector('.mainPage_form');
    const mainPageLeaderboard = document.querySelector('.mainPage_leaderboard');

    mainPageSubmitButton.addEventListener("click", e => {
        e.preventDefault();

        if (mainPageForm.checkValidity()) {
            handleSubmit();
            mainPageForm.classList.remove("mainPage--open");
            mainPageLeaderboard.classList.add("mainPage--open");
            playBoomSound();
        } else {
            mainPageForm.reportValidity();
        }
    });
}
// enables the drag and drop feature in the leaderboard
export function dragAndDrop() {

    for (const draggableElement of draggableElements) {
        draggableElement.addEventListener("dragstart", e => {
            const elementId = e.target.dataset.elementId;
            e.dataTransfer.setData("text/plain", elementId);
        });
    }

    for (const dropZone of document.querySelectorAll(".drop-zone")) {
        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("drop-zone--over");
        });

        dropZone.addEventListener("dragleave", e => {
            dropZone.classList.remove("drop-zone--over");
        });

        dropZone.addEventListener("drop", e => {
            console.log(draggableElements);
            e.preventDefault();
            const droppedElementId = e.dataTransfer.getData("text/plain");
            const droppedElement = document.querySelector(`[data-element-id="${droppedElementId}"]`);
            // console.log(droppedElementId)
            // console.log(droppedElement)
            if (droppedElement) {
                dropZone.appendChild(droppedElement);
            }
            dropZone.classList.remove("drop-zone--over");
        });
    }
}


// initilizes the svg animation upon player loss
export function initSvg () {
    const boomElements = document.querySelectorAll(".select");
    const mainPageLoose = document.querySelector(".mainPage_LooseScreen");
    mainPageLoose.classList.add("mainPage--open");
    for (const boomElement of boomElements) {
        boomElement.classList.add("boom");
    }
}


//adds the eventListener to teh closeLooseScreen button, upon clicking the button the basicManuScreen is displayed
export function closeLooseScreen() {
    const mainPageLooseScreenClose = document.querySelector(".mainPage_LooseScreenClose");
    const mainPageLooseScreen = document.querySelector(".mainPage_LooseScreen");
    const mainPageBasic = document.querySelector(".mainPage_basic");
    const mainPageGame = document.querySelector(".mainPage_game");

    mainPageLooseScreenClose.addEventListener("click", () => {
        mainPageLooseScreen.classList.remove("mainPage--open");
        mainPageGame.classList.remove("mainPage--open");
        mainPageBasic.classList.add("mainPage--open");
        playBoomSound();

    });

    const boomElements = document.querySelectorAll(".boom");
    for (const boomElement of boomElements) {
        boomElement.classList.remove("boom");
    }
}



