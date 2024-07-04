# Tic Tac Toe Game

## Overview
This is a simple web-based Tic Tac Toe game that can be played by two players or a single player against the computer. The game is built using HTML, CSS, and JavaScript, with basic AI logic implemented for single-player mode.

## Features
- Two game modes: Single Player (against the computer) and Two Players.
- Score tracking for both players.
- Names can be customized for the two-player mode.
- The game board resets after each round, and the winning player starts the next game.
- Simple AI logic for the computer to make smarter moves.

## How to Play

### Single Player Mode
1. Click the "Play Against Computer" button on the start page.
2. You (Player 1) will play as "X", and the computer (Player 2) will play as "O".
3. Click on an empty cell to make your move. The computer will automatically make its move after you.

### Two Player Mode
1. Click the "Two Players" button on the start page.
2. Enter the names for Player 1 and Player 2.
3. Click the "Play" button to start the game.
4. Players take turns clicking on empty cells to make their moves. Player 1 plays as "X" and Player 2 plays as "O".

## Game Rules
- The game is played on a 3x3 grid.
- Players take turns to place their symbol (X or O) on an empty cell.
- The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins the game.
- If all cells are filled and no player has three in a row, the game ends in a draw.

## File Structure
```
tic-tac-toe/
│
├── index.html          # Main HTML file
├── styles.css          # CSS styles
└── script.js           # JavaScript file with game logic
```

## Code Explanation

### HTML (index.html)
- Contains the structure of the web page, including:
  - Start page with buttons to select game mode.
  - Setup page for entering player names in two-player mode.
  - Game page with the Tic Tac Toe board and score display.

### CSS (styles.css)
- Styles the various elements of the game, including buttons, input fields, game board, and score display.

### JavaScript (script.js)
- Manages the game logic, including:
  - Handling player moves.
  - Checking for a win or draw.
  - Updating the board and scores.
  - Implementing basic AI logic for the computer player.

## How to Run
1. Download or clone the repository.
2. Open the `index.html` file in a web browser.
3. Select a game mode and start playing!

## Future Enhancements
- Improve AI logic to make the computer more challenging.
- Add animations for a better user experience.
- Implement additional features such as resetting the score or saving game progress.
