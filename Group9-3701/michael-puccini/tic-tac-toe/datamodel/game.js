class Game {

    // winning positions Source: Daniel Jacobson used with Permission
    winningPositions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6]             // diagonal
    ];

    // board = ["O", "", "O", "X", "X", "O", "X", "", "O"]; 
    board = Array(9).fill("");
    // Marks positions on the board that the winning moves are on.
    highlightedBoard = Array(9).fill(false);
    currentPlayer = "X";
    allMoves = [];
    redoStack = [];
    // Is the game currently being played? As in, not over.
    isPlaying = true;

    // Gamestate:
    // The current Game State
    gameState = "X to Play";
    // Injected by Home.js - Setting these triggers a redraw of appropriate parts of the board. If it's not injected, the game will break.
    setSteps;
    setIsPlaying;
    setGameState;
    // Not currently used.
    turnNumber = 1;
    
    // Save Data
    gameTime = "TimePlaceholder";
    gameDate = "DatePlaceholder";
    steps = 0;
    id = 0;

    constructor(setSteps=null) {
        board = Array(9).fill("");
        currentPlayer = "X";
        // TODO Don't think this is needed.
        this.setSteps = setSteps;
    }

    get getBoard() {
        return this.board;
    }

    setSaveData(id=0) {
        this.gameTime = new Date().toLocaleTimeString();
        this.gameDate = new Date().toLocaleDateString();
        this.steps = this.allMoves.length;
        this.id = id;
    }

    newBoard = () => {
        console.log("Resetting board");
        this.currentPlayer = "X";
        this.allMoves = Array(0);
        this.redoStack = Array(0);
        this.board = Array(9).fill("");
        // this.board = ["O", "", "O", "X", "X", "O", "X", "", "O"];
        this.turnNumber = 1;
        this.highlightedBoard = Array(9).fill(false);
        this.consoleLogGameState();
        this.setNewGameState('X to Play');
        this.setSteps([...this.board]);

        // this.setIsPlaying(true);
        // this.isPlaying = true;
        // this.setGameState('X to Play');
        // this.gameState = 'X to Play';
    }

    canUndo = () => {
        return this.board.filter((x) => x === "").length >= 9;
    }

    undo = () => {
        // You cannot undo if no turns have been made.
        if (!this.canUndo) return;

        // Remove Element from board
        console.log("Removing last Element from board");

        let index = this.allMoves.pop();
        this.redoStack.push(index);

        this.board[index] = "";
        this.turnNumber -= 1;
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

        this.checkState(this.board);
        this.setSteps([...this.board]);
    }

    canRedo = () => {
        return this.redoStack.length > 0;
    }

    redo = () => {
        // If the stack is empty, you cannot redo.
        if (!this.canRedo) return;

        // Put back removed element to the board
        console.log("Putting back last Element to the board");
        let index = this.redoStack.pop();
        this.allMoves.push(index);

        this.board[index] = this.currentPlayer;
        this.turnNumber += 1;
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

        this.checkState(this.board);
        this.setSteps([...this.board]);
    }

    consoleLogGameState = () => {
        console.log(`TurnNo: ${this.turnNumber} isPlaying: ${this.isPlaying} gameState: ${this.gameState} board: ${this.board} length ${this.board.length} allMoves: ${this.allMoves} highlighted: ${this.highlightedBoard}`);
    }

    makeMove = (index) => {
        if (!this.isPlaying) {
            console.log(`Cannot make move. Game is over.`);
            return;
        }
        if (this.board[index] !== "") {
            console.log(`Cannot make move at index: ${index}`);
            return;
        }

        this.board[index] = this.currentPlayer;
        this.allMoves.push(index);

        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.turnNumber += 1;

        // Clear the undo stack
        if (this.canRedo) 
            this.redoStack = Array(0);

        this.checkState(this.board)
        this.setSteps([...this.board]);
        this.consoleLogGameState();
    }

    checkState(board) {
        // console.log("Checking state");
        // If all elements are '', return 'X to play'.
        if (board.filter(cell => cell === '').length == 9) {
            console.log("Setting X to Play");
            this.setNewGameState('X to play');
            console.log("Returning X to Play");
            return 'X to play';
        }

        // Checking for Win Conditions:
        for (let i = 0; i < this.winningPositions.length; i++) {
            this.didSomeoneWin(this.winningPositions[i]);
        }
        
        // If the game is over, don't check for anymore game states.
        if (!this.isPlaying) {
            return this.gameState;
        }
        
        // console.log("Checking for tie");
        // Check for tie
        if (board.filter(cell => cell === '').length == 0) {
            this.setNewGameState('It is a tie');
            return 'It is a tie';
        }

        //  If there is one more 'X' than 'O', return 'O to play'.
        // this.isGameOver = false;
        res = board.filter(cell => cell === '').length % 2 == 0 ? 'O to play' : 'X to play';
        this.setNewGameState(res);
        return res;
    }

    didSomeoneWin(threeCells) {
        // console.log("Checking if someone won " + threeCells + threeCells[0], threeCells[1], threeCells[2] + threeCells.length);
        // if (threeCells.every(cell => cell === 'X')) {
        if (this.board[threeCells[0]] === this.board[threeCells[1]] && 
            this.board[threeCells[1]] === this.board[threeCells[2]] && 
            this.board[threeCells[0]] !== "") {
            // this.isGameOver = true;
            result = `${this.board[threeCells[0]]} wins`;
            // console.log(result);
            
            // Highlight the winning cells.
            this.highlightedBoard[threeCells[0]] = true;
            this.highlightedBoard[threeCells[1]] = true;
            this.highlightedBoard[threeCells[2]] = true;
            
            this.setNewGameState(result);
            return result;
        }
        // if (threeCells.every(cell => cell === 'O')) {
        //     this.setNewGameState('O wins');
        //     console.log("O wins");
        // }
        // return false;
    }

    // Returns true if the cell is highlighted (red).
    isHighlighted(index) {
        return this.highlightedBoard[index];
    }

    setNewGameState(newState) {
        // If there is no change, return.
        if (newState == this.gameState) {
            return;
        }

        if (newState == 'X wins' || newState == 'O wins' || newState == 'It is a tie') {
            newIsPlaying = false;
        } else {
            newIsPlaying = true;
        }
    
        // Update if there is a change.
        if (newState != this.gameState) {
            this.gameState = newState;
            this.setGameState(newState);
        }

        // Update isPlaying if there is a change.
        if (newIsPlaying != this.isPlaying) {
            this.isPlaying = newIsPlaying;
            this.setIsPlaying(newIsPlaying);
        }
    }
}

export default Game;
