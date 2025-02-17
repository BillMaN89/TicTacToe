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

    const board = Gameboard();

    let activePlayer = PlayerOne;

    const SwitchPlayerTurn = () =>{
        activePlayer = activePlayer === PlayerOne ? PlayerTwo : PlayerOne;
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () =>{
        board.printBoard();
        console.log(`${getActivePlayer().name} 's turn`);
    }

    const playRound = (row, col) => {
        //get active player's marker and place it on the board
        const marker = getActivePlayer().marker;
        const success = board.placeMarker(row, col, marker);

        if (!success){
            return;
        }
        //next Round
        console.log(`${getActivePlayer().name} placed their marker at (${row}, ${col})`);

        //winner validation
        if (CheckWinner()){
            console.log(`${getActivePlayer().name} wins the game!`);
            return;
        }

        SwitchPlayerTurn();
        printNewRound();
    };

    //Initial Round message
    printNewRound();
    
    return {playRound, getActivePlayer};
}

const game = GameController("Alice", "Bill");