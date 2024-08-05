import Ship from "./Ship";

const GameBoard = () => {
  let size = 10;
  let ships = [];
  let shotsTaken = [];

  const isValidPlacement = (ship, x, y, orientation) => {
    if (x < 0 || x > size - 1 || y < 0 || y > size - 1) {
      return false;
    }

    for (let { coordinates } of ships) {
      for (let [cx, cy] of coordinates) {
        if (cx === x && cy === y) {
          return false;
        }
      }
    }

    if (orientation === "x") {
      if (x + ship.getLength() > size - 1) return false;

      for (let i = 0; i < ship.getLength(); i++) {
        if (
          ships.some(({ coordinates }) => {
            coordinates.some(([cx, cy]) => cx === x + i && cy === y);
          })
        ) {
          return false;
        }
      }

      return true;
    } else if (orientation === "y") {
      if (y + ship.getLength() > size - 1) {
        return false;
      }

      for (let i = 0; i < ship.getLength(); i++) {
        if (
          ships.some(({ coordinates }) =>
            coordinates.some(([cx, cy]) => cx === x && cy === y)
          )
        ) {
          return false;
        }
      }

      return true;
    }

    return false;
  };

  const isValidAttack = (x, y) => {
    if (
      shotsTaken.some(([sx, sy]) => {
        return sx === x && sy === y;
      })
    ) {
      return false;
    }

    return true;
  };

  const placeShips = (ship, x, y, orientation) => {
    if (!isValidPlacement(ship, x, y, orientation)) {
      throw new Error("Invalid placement");
    }

    const coordinates = [];

    if (orientation === "x") {
      for (let i = 0; i < ship.getLength(); i++) {
        coordinates.push([x + i, y]);
      }
    } else if (orientation === "y") {
      for (let i = 0; i < ship.getLength(); i++) {
        coordinates.push([x, y + i]);
      }
    }

    ships.push({ ship, coordinates });

    return coordinates;
  };

  const receiveAttack = (x, y) => {
    if (shotsTaken.some(([sx, sy]) => sx === x && sy === y)) {
      return false;
    }

    shotsTaken.push([x, y]);

    for (let { ship, coordinates } of ships) {
      for (let [cx, cy] of coordinates) {
        if (cx === x && cy === y) {
          ship.hit();
          return true;
        }
      }
    }
  };

  const allShipsSunk = () => {
    console.log('new check')
    return ships.every((shipObject) => {
        console.log(shipObject.ship, shipObject.ship.isSunk())
        return shipObject.ship.isSunk()
  }
);
  };

  const populateBoard = () => {
    const shipArray = [Ship(1), Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];

    shipArray.forEach((ship) => {
      let placed = false;
      while (!placed) {
        let randomX = Math.floor(Math.random() * 10);
        let randomY = Math.floor(Math.random() * 10);
        let randomOrientation = Math.random() < 0.5 ? "x" : "y";

        if (isValidPlacement(ship, randomX, randomY, randomOrientation)) {
          placeShips(ship, randomX, randomY, randomOrientation);
          placed = true;
        }
      }
    });
  };

  const render = (boardElement, showShips = false) => {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = x;
        cell.dataset.y = y;
        if (
          showShips &&
          ships.some(({ coordinates }) =>
            coordinates.some(([cx, cy]) => cx === x && cy === y)
          )
        ) {
          cell.classList.add("ship");
        }
        boardElement.appendChild(cell);
      }
    }
  };

  return {
    isValidPlacement,
    placeShips,
    receiveAttack,
    allShipsSunk,
    populateBoard,
    render,
    isValidAttack,
  };
};

export default GameBoard;
