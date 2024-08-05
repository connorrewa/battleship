import GameBoard from './Gameboard'

const Player = () => {
    let gameboard = GameBoard();

    const getBoard = () => {
        return gameboard;
    }

    return {
        getBoard
    };
}

export default Player;