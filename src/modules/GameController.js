export default GameController = (humanBoard, computerBoard) => {
    let human = humanBoard;
    let computer = computerBoard;
    let currentPlayer = 'human';

    const startGame = () => {
        human.gameboard.populateBoard();
        computer.gameboard.populateBoard();
        updateUI();
        nextTurn();

    }

    const nextTurn = () => {
        if (currentPlayer === 'human') {
            humanTurn();

        } else {
            computerTurn();
        }
    }

    const updateUI = () => {
        
    }

    const humanTurn = () => {

    }

    const computerTurn = () => {

    }

    const handleHumanAttack = () => {
        
    }


    return {
        startGame
    }


}