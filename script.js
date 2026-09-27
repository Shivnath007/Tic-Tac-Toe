
let cells = document.querySelectorAll('.cell');
let heading = document.querySelector('.status');
let btn = document.querySelector('.restart-btn');

let xScoreDisplay = document.querySelector('#x-score');
let oScoreDisplay = document.querySelector('#o-score');

let arr = ['', '', '', '', '', '', '', '', ''];
let player = 'X';
let gameOver = false;

let xScore = 0;
let oScore = 0;

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Cell click logic
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {

        // If cell is already filled or game is over
        if (arr[index] != '' || gameOver) {
            return;
        }

        // Store player's move
        arr[index] = player;
        cell.innerHTML = player;

        cell.classList.add(player.toLowerCase());

        let winnigCells = winner();
        if (winnigCells) {

            winnigCells.forEach(index => {
                cells[index].classList.add('winner');
            })
            if(player == 'X') {
                xScore++;
                xScoreDisplay.innerHTML = xScore;
            } else {
                oScore++;
                oScoreDisplay.innerHTML = oScore;
            }

            heading.innerHTML = player + " Wins! Reset and Restart";
            gameOver = true;
            return;
        }
        // Check draw
        if (!arr.includes('')) {
            heading.innerHTML = "Game Tied! Reset and Restart";
            gameOver = true;
            return;
        }
        // Change player
        player = player == 'X' ? 'O' : 'X';

        updateTurnDisplay();
    });
});

// Reset button logic
btn.addEventListener('click', () => {

    arr = ['', '', '', '', '', '', '', '', ''];

    player = 'X';
    gameOver = false;

    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = '';
        cells[i].classList.remove('winner', 'x', 'o');
    }

    updateTurnDisplay();
});


// Winning condition
function winner() {

    for(let combination of winningCombinations) {
        let[a, b, c] = combination;

        if (
            arr[a] != '' &&
            arr[a] == arr[b] &&
            arr[b] == arr[c]
        ) {
            return combination;
        }
    }
    return null;
}

function updateTurnDisplay() {
    heading.innerHTML = "Player " + player + " Turn";

    heading.classList.remove('x-turn', 'o-turn');
    heading.classList.add(player.toLowerCase() + '-turn');
}