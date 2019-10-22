import Ship from './Ship';
import Gameboard from './Gameboard';

describe('The created gameboard', () => {
  test('should place ship', () => {
    const gameboard = Gameboard();
    const ship = Ship(4, 'vertical');
    expect(gameboard.placeShip(ship, [5, 5])).toBe(true);
    expect(gameboard.placeShip(ship, [5, 6])).toBe(false);
  });

  test('receives attack', () => {
    const gameboard = Gameboard();
    const ship = Ship(4, 'vertical');
    gameboard.placeShip(ship, [8, 5]);
    expect(gameboard.receiveAttack([5, 5])).toBe(false);
    expect(gameboard.receiveAttack([8, 6])).toBe(true);
  });
});
