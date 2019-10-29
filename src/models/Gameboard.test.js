import Gameboard from './Gameboard';

describe('The created gameboard', () => {
  test('should place ship correctly', () => {
    const gameboard = Gameboard();
    let spec = { length: 4, orientation: 'north' };
    expect(gameboard.placeShip(spec, [6, 6])).not.toBeNull();
    expect(gameboard.placeShip(spec, [7, 6])).toBeNull();
    spec = { length: 5, orientation: 'east' };
    expect(gameboard.placeShip(spec, [0, 5])).not.toBeNull();
    expect(gameboard.placeShip(spec, [0, 6])).toBeNull();
  });

  test('receives attack', () => {
    const gameboard = Gameboard();
    const spec = { length: 4, orientation: 'east' };
    const ship = gameboard.placeShip(spec, [6, 5]);
    expect(gameboard.receiveAttack([5, 5])).toBeNull();
    expect(gameboard.receiveAttack([6, 4])).toBeNull();
    expect(gameboard.receiveAttack([6, 5])).toBe(ship);
    expect(gameboard.receiveAttack([6, 6])).toBe(ship);
    expect(gameboard.receiveAttack([6, 7])).toBe(ship);
    expect(gameboard.receiveAttack([6, 8]).isSunk()).toBe(true);
  });
});
