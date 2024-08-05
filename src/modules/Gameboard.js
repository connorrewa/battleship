import { Ship } from "./Ship"

export default GameBoard = () => {
    let size = 10;
    let ships = [];
    let shotsTaken = [];

    const isValidPlacement = (ship, x, y, orientation) => {
        if (x < 0 || x > size-1 || y < 0 || y > size-1) {
            return false;
        }

        for (let { coordinates } of ships) {
            for (let [cx, cy] of coordinates) {
                if (cx === x && cy ===y) {
                    return false;
                }
            }
        }

        if (orientation === 'x') {
            if (x + ship.getLength() > size - 1)
                return false;

            for (let i = 0; i < ship.getLength(); i++) {
                if (ships.some( ({ coordinates }) => { coordinates.some( ([cx, cy]) => cx === x + i && cy === y )})) {
                    return false;
                }
            }

            return true;
        }

        else if (orientation === 'y') {
            if (y + ship.getLength() > size-1) {
                return false;
            }

            for(let i = 0; i < ship.getLength(); i++) {
                if (ships.some(({ coordinates }) => coordinates.some(([cx, cy])=> cx === x && cy === y))) {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    const placeShips = (ship, x, y, orientation) => {
        if (!isValidPlacement(ship, x, y, orientation)) {
            throw new Error('Invalid placement');
        }

        const coordinates = [];

        if (orientation === 'x') {
            for (let i = 0; i < ship.getLength(); i++) {
                coordinates.push([x+i, y]);
            }
        }
        else if (orientation === 'y') {
            for (let i = 0; i < ship.getLength(); i++) {
                coordinates.push([x, y+i]);
            }
        }

        ships.push({ship, coordinates});

        return coordinates;
    }

    const receiveAttack = (x, y) => {
        // did attack hit a ship?
        if (shotsTaken.some( ([sx, sy]) => sx === x && sy === y)) {
            return false;
        };

        shotsTaken.push([x,y]);

        for (let { ship, coordinates } of ships) {
            for (let [cx, cy] of coordinates) {
                if (cx === x && cy === y) {
                    ship.hit();
                    return true;
                }
            }
        }
    }

    const allShipsSunk = () => {
        return ships.every(shipObject => shipObject.ship.isSunk());
    }

    const populateBoard = () => {
        const shipArray = [Ship(1), Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];

        shipArray.forEach((ship) => {
            let placed = false;
            while (!placed) {
                let randomX = Math.floor(Math.random() * 10);
                let randomY = Math.floor(Math.random() * 10);
                let randomOrientation = Math.random() < 0.5 ? 'x' : 'y';

                if (isValidPlacement(ship, randomX, randomY, randomOrientation)) {
                    placeShips(ship, randomX, randomY, randomOrientation);
                    placed = true;
                }
            }
        })
    }

    const render = (boardElement, showShips = false) => {
        
    }

    return {
        isValidPlacement,
        placeShips,
        receiveAttack,
        allShipsSunk,
        populateBoard,
        render
    }

}