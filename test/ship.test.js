import ship from '../src/modules/Ship';

test('ship instantiates', () => {
    let ship = Ship(3);
    expect(typeof Ship).toBe('function');

})

test('ship is still alive after some hits', () => {
    let ship = Ship(4);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
})


test('length 4 ship is sunk after 4 hits', () => {
    let ship = Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
})

