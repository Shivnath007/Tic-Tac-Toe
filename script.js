
let cells = document.querySelectorAll('.cell');
let heading = document.querySelector('.status');
let btn = document.querySelector('.restart-btn');

let arr = ['', '', '', '', '', '', '', '', ''];
let player = 'X';
let gameOver = false;


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


        // Check winner
        if (winner()) {
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

        heading.innerHTML = "Player " + player + " Turn";
    });
});


// Reset button logic
btn.addEventListener('click', () => {

    arr = ['', '', '', '', '', '', '', '', ''];

    player = 'X';
    gameOver = false;

    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = '';
    }

    heading.innerHTML = "Player X Turn";
});


// Winning condition
function winner() {

    // Horizontal
    if (
        arr[0] != '' &&
        arr[0] == arr[1] &&
        arr[1] == arr[2]
    ) {
        return true;
    }

    if (
        arr[3] != '' &&
        arr[3] == arr[4] &&
        arr[4] == arr[5]
    ) {
        return true;
    }

    if (
        arr[6] != '' &&
        arr[6] == arr[7] &&
        arr[7] == arr[8]
    ) {
        return true;
    }


    // Vertical
    if (
        arr[0] != '' &&
        arr[0] == arr[3] &&
        arr[3] == arr[6]
    ) {
        return true;
    }

    if (
        arr[1] != '' &&
        arr[1] == arr[4] &&
        arr[4] == arr[7]
    ) {
        return true;
    }

    if (
        arr[2] != '' &&
        arr[2] == arr[5] &&
        arr[5] == arr[8]
    ) {
        return true;
    }


    // Diagonal
    if (
        arr[0] != '' &&
        arr[0] == arr[4] &&
        arr[4] == arr[8]
    ) {
        return true;
    }

    if (
        arr[2] != '' &&
        arr[2] == arr[4] &&
        arr[4] == arr[6]
    ) {
        return true;
    }


    // No winner
    return false;
}
