import Cell from './Cell';
import Ship from './Ship';
import { el } from '../utils';
import ShipModel from '../models/Ship';

const Gameboard = () => {
  const ship = ShipModel(4, 'horizontal');
  const cells = new Array(100).fill(null).map(() => <Cell />);
  return (
    <div id="board">
      {cells}
      <Ship ship={ship} />
    </div>
  );
};

export default Gameboard;
