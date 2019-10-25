import Vessels from './Vessels';
import { el, mount } from '../utils';
import Drawer from '../controllers/Drawer';

const Cell = ({ coord, game }) => {
  const handleClick = () => game.draw(coord);

  const cell = <div className="cell" onClick={handleClick}></div>;
  cell.coord = coord;
  return cell;
};

const Board = ({ game, context, parentContext }) => {
  const handleClick = () => {
    const { error } = parentContext;
    error.classList.add('show');
    setTimeout(() => error.classList.remove('show'), 3000);
    mount(
      'All ships are positioned. Click reset if you want to set them again.',
      error
    );
  };
  const board = new Array(10)
    .fill(null)
    .map((v, i) =>
      new Array(10)
        .fill(null)
        .map((v, j) => <Cell coord={[i, j]} game={game} />)
    );

  game.drawer = new Drawer(game.player, board);

  game.on('drawEnd', () => {
    context.veil.classList.add('show');
  });

  return (
    <div className="board">
      {board.flat()}
      <div
        ref="veil"
        context={context}
        className="veil"
        onClick={handleClick}
      />
    </div>
  );
};

const Strategy = ({ game, context }) => {
  game.on('drawError', msg => {
    const { error } = context;
    error.classList.add('show');
    setTimeout(() => error.classList.remove('show'), 2000);
    mount(msg, error);
  });

  game.on('drawEnd', () => {
    context.action.appendChild(<button>Start</button>);
  });

  return (
    <div id="strategy">
      <Vessels />
      <div className="middle">
        <p ref="error" context={context} className="error">
          hey
        </p>
        <h2>Define positions</h2>
        <Board game={game} parentContext={context} />
        <div ref="action" context={context}>
          <p>
            <button>Randomize</button>
            <button>Reset</button>
          </p>
        </div>
      </div>
      <div className="last">
        <ul className="tips">
          <li>
            Click on two cells to draw ship (only horizontal or vertical line
            are allowed). The distance between the cells will determine the ship
            size.
          </li>
          <li>Click on randomize to get all the ship placed automatically</li>
          <li>Click on reset to clean up the board</li>
        </ul>
      </div>
    </div>
  );
};

export default Strategy;
