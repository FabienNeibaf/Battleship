import Player from './Player';

describe('The created player', () => {
  const player = new Player('Fabien');

  test("'s name is", () => {
    expect(player.name).toBe('Fabien');
  });
});
