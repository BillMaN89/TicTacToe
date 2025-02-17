function gameBoard(){
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
