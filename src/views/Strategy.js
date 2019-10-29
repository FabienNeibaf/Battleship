import Vessels from './Vessels';
import { el, mount, Fragment } from '../utils';

const Board = ({ game, context, parentContext }) => {
  const handleClick = () => {
    const { error } = parentContext;
    error.classList.add('show');
    setTimeout(() => error.classList.remove('show'), 4000);
    mount(
      'All ships are positioned. Click reset if you want to set them again.',
      error
    );
  };

  game.on('drawEnd', () => {
    context.veil.classList.add('show');
  });

  game.on('reset', () => {
    const { board: host } = context;
    mount(
      <Fragment>
        {game.drawer.board.flat()}
        <div
          ref="veil"
          context={context}
          className="veil"
          onClick={handleClick}
        />
      </Fragment>,
      host
    );
  });

  game.on('randomize', () => {
    const { board: host } = context;
    mount(
      <Fragment>
        {game.drawer.board.flat()}
        <div
          ref="veil"
          context={context}
          className="veil"
          onClick={handleClick}
        />
      </Fragment>,
      host
    );
    context.veil.classList.add('show');
  });

  return (
    <div ref="board" context={context} className="board">
      {game.drawer.board.flat()}
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
    setTimeout(() => error.classList.remove('show'), 4000);
    mount(msg, error);
  });

  game.on('drawEnd', () => context.start.classList.add('show'));

  game.on('reset', () => context.start.classList.remove('show'));

  game.on('randomize', () => context.start.classList.add('show'));

  return (
    <div id="strategy">
      <Vessels />
      <div className="middle">
        <p ref="error" context={context} className="error" />
        <h2>Define positions</h2>
        <Board game={game} parentContext={context} />
        <div ref="action" context={context}>
          <p>
            <button onClick={() => game.randomize()}>Randomize</button>
            <button onClick={() => game.reset()}>Reset</button>
          </p>
          <button
            ref="start"
            className="start"
            context={context}
            onClick={() => game.play()}
          >
            Start
          </button>
        </div>
      </div>
      <div className="last">
        <h2>Tips</h2>
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
