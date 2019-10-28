import Player from './Player';

describe('The created player', () => {
  const player = new Player('Fabien');

  test("'s name is", () => {
    expect(player.name).toBe('Fabien');
  });

  test('have attacks property', () => {
    expect(player.attacks).toBeDefined();
  });

  test('have gameboard property', () => {
    expect(player.gameboard).toBeDefined();
  });
});
