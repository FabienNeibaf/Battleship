import Ship from '../views/Ship';
import { el, mount } from '../utils';

const Cell = ({ coord, game }) => {
  const handleClick = () => game.draw(coord);

  const cell = <div className="cell" onClick={handleClick}></div>;
  cell.coord = coord;
  return cell;
};

const board = game =>
  new Array(10)
    .fill(null)
    .map((v, i) =>
      new Array(10)
        .fill(null)
        .map((v, j) => <Cell coord={[i, j]} game={game} />)
    );
export default class Drawer {
  constructor(game) {
    this.init();
    this.game = game;
    this.board = board(game);
  }

  init() {
    this.count = 0;
    this.start = null;
    this.board = board(this.game);
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
      let spec;
      const { player } = this.game;
      if (start[1] === coord[1]) {
        if (start[0] < coord[0]) {
          spec = {
            length: Math.min(coord[0] - start[0] + 1, 5),
            orientation: 'south',
          };
          ship = player.gameboard.placeShip(spec, start);
          if (ship) this.south(spec, start);
        } else {
          spec = {
            length: Math.min(start[0] - coord[0] + 1, 5),
            orientation: 'north',
          };
          ship = player.gameboard.placeShip(spec, start);
          if (ship) this.north(spec, start);
        }
      }
      if (start[0] === coord[0]) {
        if (start[1] < coord[1]) {
          spec = {
            length: Math.min(coord[1] - start[1] + 1, 5),
            orientation: 'east',
          };
          ship = player.gameboard.placeShip(spec, start);
          if (ship) this.east(spec, start);
        } else {
          spec = {
            length: Math.min(start[1] - coord[1] + 1, 5),
            orientation: 'west',
          };
          ship = player.gameboard.placeShip(spec, start);
          if (ship) this.west(spec, start);
        }
      }
    }

    this.cellAt(start).classList.remove('active');
    this.start = null;

    if (ship === null) throw new Error('Wrong draw path');

    this.count += 1;
    return ship;
  }

  north(spec, start) {
    mount(
      <Ship spec={spec} />,
      this.cellAt([start[0] - spec.length + 1, start[1]])
    );
  }

  south(spec, start) {
    mount(<Ship spec={spec} />, this.cellAt(start));
  }

  east(spec, start) {
    mount(<Ship spec={spec} />, this.cellAt(start));
  }

  west(spec, start) {
    mount(
      <Ship spec={spec} />,
      this.cellAt([start[0], start[1] - spec.length + 1])
    );
  }
}
