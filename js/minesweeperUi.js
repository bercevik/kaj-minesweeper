import { createBoard, markTile, TILE_STATUS, revealTile, checkWin, checkLoose } from "./minesweeperLogic.js";
import {
    openMenu,
    closeMenuEtc,
    changeGameDifficulty,
    currentDif,
    start,
    playBoomSound,
    playMissSound,
    openForm,
    setPlayerTime,
    openRuleset,
    closeRuleset,
    dragAndDrop,
    closeLeaderboard,
    submitButton,
    initSvg,
    closeLooseScreen
} from "./mainPage.js";

const BOARD_SIZE = 10;
console.log(currentDif);
let NUMBER_OF_MINES = null;

let interval;
openMenu();
closeMenuEtc();
changeGameDifficulty();
start();
openRuleset();
closeRuleset();
submitButton();
dragAndDrop();
closeLeaderboard();
closeLooseScreen();
let board;
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector("[data-mine-count]");
const currentTimeText = document.querySelector("[data-time-count]");
const messageText = document.querySelector(".subtext");
let currentTime = 0;
const connectionStatus = document.getElementById("mainPage_connectionStatus");

if (navigator.onLine) {
    connectionStatus.textContent = "We are online!";
    connectionStatus.classList.add("connectionOnline");
}

window.addEventListener("online", function () {
    connectionStatus.textContent = "We are online!";
    connectionStatus.classList.remove("connectionOffline");
    connectionStatus.classList.add("connectionOnline");
    connectionStatus.classList.remove("mainPage--open");
});

window.addEventListener("offline", function () {
    connectionStatus.textContent = "We are offline!";
    connectionStatus.classList.remove("connectionOnline");
    connectionStatus.classList.add("connectionOffline");
    connectionStatus.classList.add("mainPage--open");
});

export function setupGame() {
    NUMBER_OF_MINES = currentDif;
    // board = null;
    board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
    messageText.classList.remove("invisible");
    minesLeftText.textContent = "";
    boardElement.innerHTML = "";
    boardElement.style.setProperty("--size", BOARD_SIZE);
    // messageText.textContent = "Mines Left:"
    minesLeftText.textContent = NUMBER_OF_MINES;
    currentTimeText.textContent = "00:00";

    board.forEach((row) => {
        row.forEach((tile) => {
            boardElement.append(tile.element);

            tile.element.addEventListener("click", () => {
                revealTile(board, tile);
                checkGameEnd();
            });

            tile.element.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                markTile(tile);
                listMinesLeft();
            });

            boardElement.removeEventListener("click", stopProp, { capture : true})
            boardElement.removeEventListener("contextmenu", stopProp, { capture : true})
        });
    });
}
minesLeftText.textContent = NUMBER_OF_MINES
function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUS.MARKED).length
    }, 0)

    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

function checkGameEnd() {
    const win = checkWin(board);
    const loose = checkLoose(board);
    if ( win || loose) {
        stopTimer();
        boardElement.addEventListener("click", stopProp, { capture : true})
        boardElement.addEventListener("contextmenu", stopProp, { capture : true})
    }

    if (win) {
        openForm();
        setPlayerTime();
        messageText.classList.add("invisible");
        minesLeftText.textContent = "You win";
    }
    if (loose) {
        initSvg();
        messageText.classList.add("invisible");
        minesLeftText.textContent = "You loose";
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUS.MARKED) {
                    markTile(tile)
                }
                if (tile.mine) {
                    revealTile(board, tile)
                }
            })
        })
    }
}

let minutes = 0;
let seconds = 0;
function updateTimer(){
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    currentTimeText.textContent = formattedMinutes + ":" + formattedSeconds;
}


function stopProp(e) {
    e.stopImmediatePropagation()
}

export function startTimer() {
    interval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(interval);
}


