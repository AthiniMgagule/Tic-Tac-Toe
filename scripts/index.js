document.addEventListener('DOMContentLoaded', () => {
    const startPage = document.getElementById('start-page');
    const twoPlayerSetup = document.getElementById('two-player-setup');
    const gamePage = document.getElementById('game-page');
    const singlePlayerButton = document.getElementById('single-player');
    const twoPlayersButton = document.getElementById('two-players');
    const startGameButton = document.getElementById('start-game');
    const player1NameInput = document.getElementById('player1-name');
    const player2NameInput = document.getElementById('player2-name');
    const gameBoard = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const gameTitle = document.getElementById('game-title');
    const player1ScoreDisplay = document.getElementById('player1-score');
    const player2ScoreDisplay = document.getElementById('player2-score');

    let player1Name = '';
    let player2Name = '';
    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = '';
    let gameActive = false;
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let singlePlayerMode = false;
    let nextStartingPlayer = 'X';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (boardState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        updateBoard(clickedCell, clickedCellIndex);
        checkResult();
        if (singlePlayerMode && gameActive) {
            setTimeout(computerMove, 500);
        }
    }

    function updateBoard(cell, index) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = currentPlayer === 'X' ? `${player1Name}'s turn` : `${player2Name}'s turn`;
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] === '' || boardState[a] !== boardState[b] || boardState[a] !== boardState[c]) {
                continue;
            }
            roundWon = true;
            break;
        }

        if (roundWon) {
            gameActive = false;
            statusDisplay.textContent = currentPlayer === 'O' ? `${player1Name} wins!` : `${player2Name} wins!`;
            if (currentPlayer === 'O') {
                player1Score++;
                player1ScoreDisplay.textContent = `${player1Name}: ${player1Score}`;
                nextStartingPlayer = 'X';
            } else {
                player2Score++;
                player2ScoreDisplay.textContent = `${player2Name}: ${player2Score}`;
                nextStartingPlayer = 'O';
            }
            setTimeout(resetBoard, 2000);
            return;
        }

        if (!boardState.includes('')) {
            gameActive = false;
            statusDisplay.textContent = `It's a draw!`;
            nextStartingPlayer = nextStartingPlayer === 'X' ? 'O' : 'X';
            setTimeout(resetBoard, 2000);
            return;
        }
    }

    function computerMove() {
        // Check if computer can win
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] === 'O' && boardState[a] === boardState[b] && boardState[c] === '') {
                updateBoard(cells[c], c);
                checkResult();
                return;
            } else if (boardState[a] === 'O' && boardState[a] === boardState[c] && boardState[b] === '') {
                updateBoard(cells[b], b);
                checkResult();
                return;
            } else if (boardState[b] === 'O' && boardState[b] === boardState[c] && boardState[a] === '') {
                updateBoard(cells[a], a);
                checkResult();
                return;
            }
        }

        // Block player from winning
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] === 'X' && boardState[a] === boardState[b] && boardState[c] === '') {
                updateBoard(cells[c], c);
                checkResult();
                return;
            } else if (boardState[a] === 'X' && boardState[a] === boardState[c] && boardState[b] === '') {
                updateBoard(cells[b], b);
                checkResult();
                return;
            } else if (boardState[b] === 'X' && boardState[b] === boardState[c] && boardState[a] === '') {
                updateBoard(cells[a], a);
                checkResult();
                return;
            }
        }

        // Make a random move
        let emptyCells = [];
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] === '') {
                emptyCells.push(i);
            }
        }

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = cells[randomIndex];
        updateBoard(cell, randomIndex);
        checkResult();
    }

    function resetBoard() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = nextStartingPlayer;
        gameActive = true;
        statusDisplay.textContent = currentPlayer === 'X' ? `${player1Name}'s turn` : `${player2Name}'s turn`;
    }

    function startGame() {
        player1Name = player1NameInput.value || 'Player 1';
        player2Name = player2NameInput.value || 'Player 2';
        currentPlayer = nextStartingPlayer;
        gameActive = true;
        boardState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        statusDisplay.textContent = currentPlayer === 'X' ? `${player1Name}'s turn` : `${player2Name}'s turn`;
        player1ScoreDisplay.textContent = `${player1Name}: ${player1Score}`;
        player2ScoreDisplay.textContent = `${player2Name}: ${player2Score}`;
        gameTitle.textContent = `${player1Name} (X) vs ${player2Name} (O)`;
        gamePage.classList.remove('hidden');
        twoPlayerSetup.classList.add('hidden');
    }

    singlePlayerButton.addEventListener('click', () => {
        singlePlayerMode = true;
        player1Name = 'Player';
        player2Name = 'Computer';
        currentPlayer = nextStartingPlayer;
        gameActive = true;
        boardState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        statusDisplay.textContent = `${player1Name}'s turn`;
        gameTitle.textContent = `${player1Name} (X) vs ${player2Name} (O)`;
        player1ScoreDisplay.textContent = `${player1Name}: ${player1Score}`;
        player2ScoreDisplay.textContent = `${player2Name}: ${player2Score}`;
        startPage.classList.add('hidden');
        gamePage.classList.remove('hidden');
    });

    twoPlayersButton.addEventListener('click', () => {
        singlePlayerMode = false;
        startPage.classList.add('hidden');
        twoPlayerSetup.classList.remove('hidden');
    });

    startGameButton.addEventListener('click', startGame);
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});





