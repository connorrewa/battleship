const GameController = (humanBoard, computerBoard) => {
  let human = humanBoard;
  let computer = computerBoard;
  let currentPlayer = "human";

  const startGame = () => {
    human.getBoard().populateBoard();
    computer.getBoard().populateBoard();
    updateUI();
    nextTurn();
  };

  const nextTurn = () => {
    if (currentPlayer === "human") {
      humanTurn();
    } else {
      computerTurn();
    }
  };

  const updateUI = () => {
    const humanBoardElement = document.querySelector(".human");
    const computerBoardElement = document.querySelector(".computer");

    human.getBoard().render(humanBoardElement, true);
    computer.getBoard().render(computerBoardElement, true);
  };

  const humanTurn = () => {
    const computerBoardElement = document.querySelector(".computer");
    computerBoardElement.addEventListener(
      "click",
      (e) => {
        console.log("click");
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);
        if (!computer.getBoard().isValidAttack(x, y)) {
          humanTurn();
          return;
        }
        if (computer.getBoard().receiveAttack(x, y)) {
          e.target.classList.add("hit");
        } else {
          e.target.classList.add("miss");
        }
        console.log(computer.getBoard().allShipsSunk());
        if (computer.getBoard().allShipsSunk()) {
          h2 = document.querySelector(".player-text");
          console.log(h2);
          h2.classList.add('win');
          h2.textContent = "Player Wins!!";
          return;
        }

        currentPlayer = "computer";
        nextTurn();
      },
      { once: true }
    );
  };

  const computerTurn = () => {
    const { x, y } = getRandomCoordinates();
    const humanBoardElement = document.querySelector(".human");
    const cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
    if (human.getBoard().receiveAttack(x, y)) {
      cell.classList.add("hit");
    } else {
      cell.classList.add("miss");
    }

    if (human.getBoard().allShipsSunk()) {
      h2 = document.querySelector(".computer-text");
      console.log(h2);
      h2.classList.add('win');
      h2.textContent = "Computer Wins!!";
      return;
    }

    currentPlayer = "human";
    nextTurn();
  };

  const getRandomCoordinates = () => {
    let placed = false;
    let x, y;
    while (!placed) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      placed = human.getBoard().isValidAttack(x, y);
    }

    return { x, y };
  };

  return {
    startGame,
  };
};

export default GameController;
