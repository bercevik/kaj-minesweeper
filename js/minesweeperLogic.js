
import { startTimer } from "./minesweeperUi.js";
import { playBoomSound, playMissSound } from "./mainPage.js";
// let interval;
const mineExplosion = new Audio('../images/explosion.mp3');
const emptyTile = new Audio('../images/miss.mp3');
let firstClick = 0;
export const TILE_STATUS = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked"
}

// creates minesweeper board according to the current difficulty settings
export function createBoard(boardSize, numberOfMines) {
    const board = [];
    const minePositions = getMinePositions(boardSize, numberOfMines);
    console.log(minePositions);
    for(let x  = 0; x < boardSize; x++){
        const row = [];
        for(let y  = 0; y < boardSize; y++) {
            const element = document.createElement('div');
            element.dataset.status = TILE_STATUS.HIDDEN;
            const tile = {
                element,
                x,
                y,
                mine : minePositions.some(p => positionMatch(p, {x, y})),
                get status() {
                    return this.element.dataset.status
                },
                set status(value) {
                    this.element.dataset.status = value
                }
            }
            row.push(tile);
        }
        board.push(row);
    }
    return board;
}


// returns the positions of all the mines in game
function getMinePositions(boardSize, numberOfMines) {
    const positions = [];

    while(positions.length < numberOfMines) {
        const position = {
            x : randomNumber(boardSize),
            y : randomNumber(boardSize)
        }

        if(!positions.some(p => positionMatch(p, position))) {
            positions.push(position);
        }

    }

    return positions;
}

//generates random number
function randomNumber(size) {
    return Math.floor(Math.random() * size);
}


// matches positions
function positionMatch(a, b){
    return a.x === b.x && a.y === b.y;
}
// marks tile with a flag
export function markTile(tile) {
    if (tile.status !== TILE_STATUS.HIDDEN && tile.status !== TILE_STATUS.MARKED) {
        return;
    }

    if (tile.status === TILE_STATUS.MARKED) {
        tile.status = TILE_STATUS.HIDDEN;
    } else {
        tile.status = TILE_STATUS.MARKED;
    }
}


// reveals tile upon leftclick
export function revealTile(board, tile){
    //console.log(tile)
    /*TODO reveal all adjacent unrevealed tiles upon click on an already revealed number*/
    // if (tile.status === TILE_STATUSES.NUMBER && tile.element.className === "revealed_number") {
    //     const adjacentTiles = nearbyTiles(board, tile)
    //     const nonMineTiles = []
    //     for (tile in adjacentTiles) {
    //         if (tile.mine || tile.status === TILE_STATUSES.NUMBER) {
    //             continue
    //         } else {
    //             nonMineTiles.push(tile)
    //         }
    //     }
    //     nonMineTiles.forEach(revealTile.bind(null, board))
    //     return;
    // }
    if (firstClick === 0) {
        firstClick = 1;
        startTimer();
    }


    if (tile.status !== TILE_STATUS.HIDDEN) {
        // playMissSound();
        return
    }

    if (tile.mine) {
        tile.status = TILE_STATUS.MINE;
        playBoomSound();
        return;
    }

    tile.status = TILE_STATUS.NUMBER;
    const adjacentTiles = nearbyTiles(board, tile);
    const mines = adjacentTiles.filter(tile => tile.mine);
    if(mines.length === 0) {
        adjacentTiles.forEach(revealTile.bind(null, board));
    } else {
        const minesLength = mines.length;
        tile.element.className = "number" + minesLength + " revealed_number";
    }
}
// reveals all tiles not containing mines adjacent to the clicked tile
function nearbyTiles(board, {x, y}) {
    const tiles = [];

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            const tile = board[x + xOffset]?.[y + yOffset]
            if (tile) {
                tiles.push(tile);
            }
        }
    }

    return tiles;
}

// checks if the player won the game

export function checkWin(board) {
    return board.every(row => {
        return row.every(tile => {
            return tile.status === TILE_STATUS.NUMBER || (tile.mine && (tile.status === TILE_STATUS.HIDDEN || tile.status === TILE_STATUS.MARKED));
        })
    })
}

// checks if the player lost the game
export function checkLoose(board) {
    return board.some(row => {
        return row.some(tile => {
            return tile.status === TILE_STATUS.MINE;
        })
    })
}



