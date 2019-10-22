import Ship from './Ship';

describe('The created ship', () => {
  const ship = Ship(4, 'horizontal');

  test('have length', () => {
    expect(ship.length).toBe(4);
  });

  test('is sunk?', () => {
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(false);

    ship.hit(4);
    expect(ship.isSunk()).toBe(true);
  });

  test('is oriented horizontally', () => {
    expect(ship.orientation).toBe('horizontal');
  });

  test('is oriented vertically', () => {
    expect(ship.rotate()).toBe('vertical');
  });
});
