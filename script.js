
let cells = document.querySelectorAll('.cell');
let heading = document.querySelector('.status');
let btn = document.querySelector('.restart-btn');
let modeBtn = document.querySelector('.mode-btn');
let themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if(document.body.classList.contains('dark')) {
        themeBtn.innerHTML = "Light Mode";
    } else {
        themeBtn.innerHTML = "Dark Mode";
    }
});

modeBtn.addEventListener('click', () => {
    vsComputer = !vsComputer;

    if(vsComputer) {
        modeBtn.innerHTML = "Play vs Player";
    } else {
        modeBtn.innerHTML = "Play vs Computer"
    }
})
let xScoreDisplay = document.querySelector('#x-score');
let oScoreDisplay = document.querySelector('#o-score');


let arr = ['', '', '', '', '', '', '', '', ''];
let player = 'X';
let gameOver = false;

let xScore = 0;
let oScore = 0;

let vsComputer = false;

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

        if(vsComputer && player == 'O') {
            computerMove();
        }
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

function computerMove() {
    let move;

    // 1. Computer can win
    move = findWinningMove('O');

    // 2. Player can win, so block
    if (move === null) {
        move = findWinningMove('X');
    }

    // 3. Otherwise choose a random empty cell
    if (move === null) {
        let emptyCells = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '') {
                emptyCells.push(i);
            }
        }

        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        move = emptyCells[randomIndex];
    }

    arr[move] = 'O';
    cells[move].innerHTML = 'O';
    cells[move].classList.add('o');

    let winnigCells = winner();

    if (winnigCells) {

        winnigCells.forEach(index => {
            cells[index].classList.add('winner');
        });

        oScore++;
        oScoreDisplay.innerHTML = oScore;

        heading.innerHTML = "O Wins! Reset and Restart";
        gameOver = true;
        return;
    }

    if (!arr.includes('')) {
        heading.innerHTML = "Game Tied! Reset and Restart";
        gameOver = true;
        return;
    }

    player = 'X';
    updateTurnDisplay();
}
function findWinningMove(symbol) {

    for (let combination of winningCombinations) {

        let [a, b, c] = combination;

        let values = [arr[a], arr[b], arr[c]];

        if (
            values.filter(value => value == symbol).length == 2 &&
            values.includes('')
        ) {
            if (arr[a] == '') return a;
            if (arr[b] == '') return b;
            if (arr[c] == '') return c;
        }
    }

    return null;
}