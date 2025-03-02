// My pseudocode

// 1. Define a factory function that creates the
//    game board. The function should have properties
//    to look up what mark is placed in which spaces,
//    as well as methods to check the status of the game
//    (as in, has a game been won and if so, provide an
//    appropriate message) and update the data structure
//    that holds all the marks on the board with new marks
//    as the players progress through the game.
// 2. Write a function that starts the game and assign it
//    so that upon clicking the 'Start' button, a mark ('X'
//    or 'O') should be assigned to players 1 and 2.
// 3. Write a function that places marks on the game board
//    and assign it so that upon clicking any of the OPEN
//    cells, a mark will be written in its place. Once the
//    mark for one player has been written for a specific
//    turn, the function should realize that the next mark
//    that is placed should be the one of the other player.


const gameBoard = function(playerOneName, playerTwoName) {
    const playerOne = playerOneName;
    const playerTwo = playerTwoName;
    let turnToggle = 1;
    const waysToWin = {
        'straight': function(mark) {
            for (let i = 1; i <= 3; i++) {
                let firstSpace = "space-" + i;
                let secondSpace = "space-" + (i+1);
                let thirdSpace = "space-" + (i+2);
                let topSpace = "space-" + i;
                let middleSpace = "space-" + (i+3);
                let bottomSpace = "space-" + (i+6);
                let straightAcross = board[firstSpace] == mark && board[secondSpace] == mark && board[thirdSpace] == mark;
                let straightDown = board[topSpace] == mark && board[middleSpace] == mark && board[bottomSpace] == mark
                if (straightAcross || straightDown) {
                    return true;
                }
            }
            return false;
        },
        'diagonal': function(mark) {
            if ((board["space-1"] == mark && board["space-5"] == mark && board["space-9"] == mark) || 
            (board["space-3"] == mark && board["space-5"] == mark && board["space-7"] == mark)) {
                return true;
            }
            return false;
        }
    }
    const numberOfSpacesOnBoard = document.querySelectorAll(".game-board > *").length;
    const outputContainer = document.querySelector(".output");
    const board = {};
    for (let spaceCount = 1; spaceCount < numberOfSpacesOnBoard+1; spaceCount++) {
        board['space-'+spaceCount] = '';
    }
    const writeMark = function(space, spaceName) {
        if (board[spaceName] == "") {
            if (turnToggle) {
                space.textContent = "X";
                board[spaceName] = "X";
                turnToggle = 0;
            }
            else {
                space.textContent = "O";
                board[spaceName] = "O";
                turnToggle = 1;
            }
            console.log(board);
        }

        
    }
    const checkStatus = function() {
        let isBoardFull = true;
        for (space in board) {
            if (board[space] == "") {
                isBoardFull = false;
                break;
            }
        }
        console.log(isBoardFull)
        if (waysToWin['straight']("X") || waysToWin['diagonal']("X")) {
            outputContainer.textContent = `${playerOneName} wins!`;
            return true;
        } 
        else if (waysToWin['straight']("O") || waysToWin['diagonal']("O")) {
            outputContainer.textContent = `${playerTwoName} wins!`;
            return true;
        }
        else if (isBoardFull) {
            outputContainer.textContent = "DAMN! None of y'all won...";
            return true;
        }
        outputContainer.textContent = "Nothing yet...";
        return false;
    }

    return { writeMark, checkStatus };
}

const startGameButton = document.querySelector(".start-game-button");
const startGame = () => {
    startGameButton.removeEventListener("click", startGame);
    const gameBoardSpaces = document.querySelectorAll("[class^='space']");
    const playerOne = prompt("Who is the first player? This person will be X:");
    const playerTwo = prompt("Who is the second player? This person will be O:")
    const board = gameBoard(playerOne, playerTwo);
    const placeMark = (event) => {
        board.writeMark(event.target, event.target.className);
        if (board.checkStatus()) {
            gameBoardSpaces.forEach((space) => space.removeEventListener("click", placeMark));
        }
    };
    gameBoardSpaces.forEach((space) => {
        space.addEventListener("click", placeMark);
    });

    const resetGameButton = document.querySelector(".reset-game-button");
    const resetGame = () => {
        gameBoardSpaces.forEach((space) => {
            space.textContent = "";
            space.removeEventListener("click", placeMark);
        });
        const outputContainer = document.querySelector(".output");
        outputContainer.textContent = "";
        startGameButton.addEventListener("click", startGame);
    }
    resetGameButton.addEventListener("click", resetGame);
}
startGameButton.addEventListener("click", startGame);