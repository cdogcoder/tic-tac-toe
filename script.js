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


const gameBoard = (function() {
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
    const board = {};
    for (let spaceCount = 1; spaceCount < numberOfSpacesOnBoard+1; spaceCount++) {
        board['space-'+spaceCount] = '';
    }
    const writeMark = function(space) {
        if (board[space] == "") {
            if (turnToggle) {
                board[space] = "X";
                turnToggle = 0;
            }
            else {
                board[space] = "O";
                turnToggle = 1;
            }
        }

        
    }
    const checkStatus = function() {
        if (waysToWin['straight']("X") || waysToWin['diagonal']("X")) {
            console.log("X");
            return true;
        } 
        else if (waysToWin['straight']("O") || waysToWin['diagonal']("O")) {
            console.log("O");
            return true;
        }
        return false;
    }

    return { writeMark, checkStatus };
})()