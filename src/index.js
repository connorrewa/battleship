import './style.css';
import Player from './modules/Player';
import GameController from './modules/GameController';
const human = Player();
const computer = Player();
const game = GameController(human, computer);

game.startGame();