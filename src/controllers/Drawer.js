import Ship from '../views/Ship';
import { el, mount } from '../utils';

export default class Drawer {
  constructor(player, board) {
    this.count = 0;
    this.start = null;
    this.board = board;
    this.player = player;
  }

  cellAt([i, j]) {
    return this.board[i][j];
  }

  draw(coord) {
    let ship = null;
    const { start } = this;

    if (!start) {
      this.start = coord;
      this.cellAt(coord).classList.add('active');
      return null;
    }

    if (start !== coord) {
      if (start[1] === coord[1]) {
        ship = start[0] < coord[0] ? this.south(coord) : this.north(coord);
      }
      if (start[0] === coord[0]) {
        ship = start[1] < coord[1] ? this.east(coord) : this.west(coord);
      }
    }

    this.cellAt(start).classList.remove('active');
    this.start = null;

    if (ship === null) throw new Error('Wrong draw path');

    this.count += 1;
    return ship;
  }

  north(end) {
    const { start, player } = this;
    let length = start[0] - end[0];
    length = length > 4 ? 5 : length + 1;
    const spec = { length, orientation: 'north' };
    const ship = player.gameboard.placeShip(spec, start);
    if (ship)
      mount(
        <Ship spec={spec} />,
        this.cellAt([start[0] - length + 1, start[1]])
      );
    return ship;
  }

  south(end) {
    const { start, player } = this;
    let length = end[0] - start[0];
    length = length > 4 ? 5 : length + 1;
    const spec = { length, orientation: 'south' };
    const ship = player.gameboard.placeShip(spec, start);
    if (ship) mount(<Ship spec={spec} />, this.cellAt(start));
    return ship;
  }

  east(end) {
    const { start, player } = this;
    let length = end[1] - start[1];
    length = length > 4 ? 5 : length + 1;
    const spec = { length, orientation: 'east' };
    const ship = player.gameboard.placeShip(spec, start);
    if (ship) mount(<Ship spec={spec} />, this.cellAt(start));
    return ship;
  }

  west(end) {
    const { start, player } = this;
    let length = start[1] - end[1];
    length = length > 4 ? 5 : length + 1;
    const spec = { length, orientation: 'west' };
    const ship = player.gameboard.placeShip(spec, start);
    if (ship)
      mount(
        <Ship spec={spec} />,
        this.cellAt([start[0], start[1] - length + 1])
      );
    return ship;
  }
}
