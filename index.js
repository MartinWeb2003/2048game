let playerScore = 0;

const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
// const board = [
//     [0, 2, 4, 8],
//     [16, 32, 64, 128],
//     [256, 512, 1024, 0],
//     [0, 0, 0, 0]
// ]
const boardContainer = document.querySelector(".board");
document.addEventListener('swiped-up', function(e) {
console.log(e.target); // the element that was swiped
});

function display() {
    const score = calculateScore();

    // Update the player score variable
    playerScore = score;
updateScoreDisplay();
let elem = 0;
let emptyTiles=0;
for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) {
            emptyTiles++;
            boardContainer.children[elem].style.color = "";
            boardContainer.children[elem].innerText = "";
            boardContainer.children[elem].style.backgroundColor = "";
            elem++
        } else {
            if (board[row][col] >= 128) {
                boardContainer.children[elem].style.color = "white";
            }
            boardContainer.children[elem].innerText = board[row][col];
            boardContainer.children[elem].style.backgroundColor = changeColor(row, col);
            elem++
        }
    }
}
if (emptyTiles === 0) {
    endGame();
}
}

function endGame() {

    const score = calculateScore();

    playerScore = score;
;

    // Show a pop-up window with the user's score
    alert(`End of game. Your score: ${score}`);
    // Reset the board
    resetBoard();
}

function updateScoreDisplay() {
    // Update the HTML content of the element with class "score"
    const scoreElement = document.querySelector('.score');
    if (scoreElement) {
        scoreElement.innerHTML = `Score: ${playerScore}`;
    }
}

function resetBoard() {
    // Reset the board to an initial state
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            board[row][col] = 0;
        }
    }

    // Add initial tiles
    assignRandom();
    assignRandom();

    // Update the display
    display();
}

function calculateScore() {
    // Sum up all the values in the tiles
    let score = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            score += board[row][col];
        }
    }
    return score;
}

function assignRandom() {
let row = Math.floor(Math.random() * 4)
let col = Math.floor(Math.random() * 4)
if (board[row][col] == 0) {
    let chance = Math.random();
    if (chance > 0.9)
        board[row][col] = 4;
    else board[row][col] = 2;
} else {
    try {
        assignRandom();
    } catch {
        console.log("game over");
    }
}
}
window.addEventListener('keyup', (e) => {
switch (e.key) {
    case "ArrowUp":
        moveUp();
        console.log('Key pressed:', e.key);
        break;
    case "ArrowDown":
        moveDown();
        console.log('Key pressed:', e.key);
        break;
    case "ArrowLeft":
        moveLeft();
        break;
    case "ArrowRight":
        moveRight();
        break;
    default:
        return
}
display()
assignRandom()
display()
})

function changeColor(row, col) {
let value = board[row][col];
return `hsla(220, ${(100/12)*(Math.log2(value))}%, ${100-Math.log2(value)*12}%,${100-Math.log2(value)/12}%)`;
}
function moveUp() {
    for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow > 0 && board[currentRow - 1][col] === 0) {
                    // Move tile up as long as the cell above is empty
                    board[currentRow - 1][col] = board[currentRow][col];
                    board[currentRow][col] = 0;
                    currentRow--;
                }
                if (currentRow > 0 && board[currentRow - 1][col] === board[currentRow][col]) {
                    // Merge tiles if the values are equal
                    board[currentRow - 1][col] *= 2;
                    board[currentRow][col] = 0;
                }
            }
        }
    }
}
function moveDown() {
    for (let col = 0; col < 4; col++) {
        for (let row = 2; row >= 0; row--) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow < 3 && board[currentRow + 1][col] === 0) {
                    board[currentRow + 1][col] = board[currentRow][col];
                    board[currentRow][col] = 0;
                    currentRow++;
                }
                if (currentRow < 3 && board[currentRow + 1][col] === board[currentRow][col]) {
                    board[currentRow + 1][col] *= 2;
                    board[currentRow][col] = 0;
                }
            }
        }
    }
}

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol > 0 && board[row][currentCol - 1] === 0) {
                    board[row][currentCol - 1] = board[row][currentCol];
                    board[row][currentCol] = 0;
                    currentCol--;
                }
                if (currentCol > 0 && board[row][currentCol - 1] === board[row][currentCol]) {
                    board[row][currentCol - 1] *= 2;
                    board[row][currentCol] = 0;
                }
            }
        }
    }
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        for (let col = 2; col >= 0; col--) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol < 3 && board[row][currentCol + 1] === 0) {
                    board[row][currentCol + 1] = board[row][currentCol];
                    board[row][currentCol] = 0;
                    currentCol++;
                }
                if (currentCol < 3 && board[row][currentCol + 1] === board[row][currentCol]) {
                    board[row][currentCol + 1] *= 2;
                    board[row][currentCol] = 0;
                }
            }
        }
    }
}
assignRandom()
assignRandom()
display()