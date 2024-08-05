console.log("Hello World!");
import './style.css';

function returnHi () {
    return 'hi';
}

module.exports = {
    returnHi
}

const human = Player();
const computer = Player();
const gameController = GameController();

gameController.startGame();