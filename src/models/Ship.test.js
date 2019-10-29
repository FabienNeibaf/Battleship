import Ship from './Ship';

describe('The created ship', () => {
  const ship = Ship({ length: 4, orientation: 'east' });
  ship.coord = [5, 5];

  test('have length', () => {
    expect(ship.length).toBe(4);
  });

  test('is sunk?', () => {
    ship.hit([5, 5]);
    ship.hit([5, 6]);
    ship.hit([5, 7]);
    expect(ship.isSunk()).toBe(false);

    ship.hit([5, 8]);
    expect(ship.isSunk()).toBe(true);
  });

  test('is oriented eastward', () => {
    expect(ship.orientation).toBe('east');
  });

  test('is oriented vertically', () => {
    ship.orientation = 'south';
    expect(ship.orientation).toBe('south');
  });
});
