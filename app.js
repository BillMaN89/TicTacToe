function Gameboard(){
//board initialization
    const rows = 3;
    const columns = 3;
    const board = [];

    //creating a 2d array
    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i][j] = Cell();
        }
    }
    //Board return for UI
    const getBoard = () => board;

    //to print the board in the console
    function printBoard() {
        console.log(board.map(row => 
            row.map(cell => cell.getValue() || " ").join(" | ")
        ).join("\n"));
    }

    function placeMarker(row, col, marker) {
        //move validation
        if (board[row][col].getValue() !== null){
            console.log("Cell already taken \n Please choose another one");
            return false;
        }
        return board[row][col].setValue(marker);
    }

    return {getBoard, placeMarker, printBoard}
}

//cell population
function Cell(){
    let value = null;
    
    const getValue = () => value;

    const setValue = (newValue) => {
        if (value === null){
            value = newValue;
            return true;
        }
        return false;
    }

    return { getValue, setValue}
}


function CreatePlayer(name, marker){
    return {name, marker}
}

function GameController(PlayerOneName, PlayerTwoName){
    const PlayerOne = CreatePlayer(PlayerOneName, "X");
    const PlayerTwo = CreatePlayer(PlayerTwoName, "O");

    const boardFactory = Gameboard();

    let activePlayer = PlayerOne;

    const SwitchPlayerTurn = () =>{
        activePlayer = activePlayer === PlayerOne ? PlayerTwo : PlayerOne;
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () =>{
        boardFactory.printBoard();
        console.log(`${getActivePlayer().name} 's turn`);
    }

    const playRound = (row, col) => {
        //get active player's marker and place it on the board
        const marker = getActivePlayer().marker;
        const success = boardFactory.placeMarker(row, col, marker);

        if (!success){
            return;
        }
        //next Round
        console.log(`${getActivePlayer().name} placed their marker at (${row}, ${col})`);

        //winner validation
        if (CheckWinner(boardFactory.getBoard())){
            console.log(`${getActivePlayer().name} wins the game!`);
            return;
        }
        
        //tie check
        if (boardFactory.getBoard().flat().every(cell => cell.getValue() !== null)) { 
            console.log(`We have a tie!`);
            return;
        }

        //continue game
        SwitchPlayerTurn();
        printNewRound();
        
    };

    //Initial Round message
    printNewRound();
    
    return {playRound, getActivePlayer};
}

function CheckWinner(board){

    const winConditions = [
        //horizontal
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        //vertical
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        //diagonal
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
    ];

    if (winConditions.some(line => line.every(cell => cell.getValue() === "X")) ||
        winConditions.some(line => line.every(cell => cell.getValue() === "O"))){
        //console.log(`We have a winner! \n ${game.getActivePlayer().name} wins!`);
        return true;
    }
    return false;
}



const game = GameController("Alice", "Bill");