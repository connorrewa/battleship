import GameBoard from "../src/modules/Gameboard";
import Ship from "../src/modules/Ship";

test ('isValidPlacement', () => {
    let ship = Ship(5);
    let gameboard = GameBoard();
    expect(gameboard.isValidPlacement(ship, 0, 0, 'x')).toBe(true);
    expect(gameboard.isValidPlacement(ship, 4, 7, 'x')).toBe(true);
    expect(gameboard.isValidPlacement(ship, -3, -1, "x")).toBe(false);
    expect(gameboard.isValidPlacement(ship, 5, 0, "x")).toBe(false);
    expect(gameboard.isValidPlacement(ship, 0, 5, "y")).toBe(false);
})

test ('placeShips', () => {
    let ship2 = Ship(2);
    let ship3 = Ship(3);
    let gameboard = GameBoard();

    expect(gameboard.placeShips(ship2, 0, 0, 'y')).toEqual([[0,0], [0,1]]);
    expect(gameboard.placeShips(ship3, 1, 1, 'x')).toEqual([[1,1], [2,1], [3,1]]);
})

test('receive attack', () => {
    let ship3 = Ship(3);
    let gameboard = GameBoard();

    gameboard.placeShips(ship3, 0, 0, 'y');

    expect(gameboard.receiveAttack(0,0)).toBe(true);
    expect(gameboard.receiveAttack(0,0)).toBe(false);
})

test('all ships sunk', () => {
    let gameboard = GameBoard();
    let ship2 = Ship(2);
    let ship3 = Ship(3);

    gameboard.placeShips(ship2, 0, 0, 'x');
    gameboard.placeShips(ship3, 2, 2, 'y');
    gameboard.receiveAttack(0,0);
    gameboard.receiveAttack(1,0);

    expect(gameboard.allShipsSunk()).toBe(false);

    gameboard.receiveAttack(2,2);
    gameboard.receiveAttack(2,3);
    gameboard.receiveAttack(2,4);

    expect(gameboard.allShipsSunk()).toBe(true);



})