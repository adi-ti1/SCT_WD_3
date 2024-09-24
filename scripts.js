const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const modeBtn = document.getElementById('modeBtn');
const message = document.getElementById('message');
let isPlayerX = true;
let isGameActive = true;
let isComputerMode = false;
const board = Array(9).fill(null);
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
modeBtn.addEventListener('click', toggleMode);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] || !isGameActive) {
        return;
    }

    board[index] = isPlayerX ? 'X' : 'O';
    cell.classList.add(isPlayerX ? 'x' : 'o');
    cell.textContent = isPlayerX ? 'X' : 'O';

    if (checkWinner()) {
        isGameActive = false;
        message.textContent = `${isPlayerX ? 'X' : 'O'} Wins!`;
        return;
    }

    if (!board.includes(null)) {
        isGameActive = false;
        message.textContent = 'It\'s a Draw!';
        return;
    }

    isPlayerX = !isPlayerX;

    if (isComputerMode && !isPlayerX) {
        computerMove();
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function computerMove() {
    let availableCells = [];
    board.forEach((cell, index) => {
        if (!cell) {
            availableCells.push(index);
        }
    });

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = 'O';
    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    cell.classList.add('o');
    cell.textContent = 'O';

    if (checkWinner()) {
        isGameActive = false;
        message.textContent = 'O Wins!';
        return;
    }

    if (!board.includes(null)) {
        isGameActive = false;
        message.textContent = 'It\'s a Draw!';
        return;
    }

    isPlayerX = true;
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    isPlayerX = true;
    isGameActive = true;
    message.textContent = '';
}

function toggleMode() {
    isComputerMode = !isComputerMode;
    modeBtn.textContent = isComputerMode ? 'Play Against Human' : 'Play Against Computer';
    resetGame();
}