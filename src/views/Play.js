import Ship from './Ship';
import { el, mount } from '../utils';

const PlayerBoard = ({ game, playContext }) => {
  const { board } = game.player.gameboard;

  const cells = new Array(10)
    .fill(null)
    .map(() =>
      new Array(10).fill(null).map(() => <div className="cell"></div>)
    );

  board.forEach(v =>
    v.forEach(ship => {
      if (ship) {
        const [i, j] = ship.coord;
        if (!cells[i][j].firstChild) {
          const { length, orientation } = ship;
          const spec = { length, orientation };
          if (orientation === 'east') mount(<Ship spec={spec} />, cells[i][j]);
          if (orientation === 'west') mount(<Ship spec={spec} />, cells[i][j]);
          if (orientation === 'north') mount(<Ship spec={spec} />, cells[i][j]);
          if (orientation === 'south') mount(<Ship spec={spec} />, cells[i][j]);
        }
      }
    })
  );

  game.on('computerAttack', res => {
    if (res[0] === null) {
      const [i, j] = res[1];
      cells[i][j].classList.add('blue');
    } else {
      if (res[0] === 'Game over') {
        game.botWin();
        mount('Bot win!', playContext.status);
      }
      const [i, j] = res[1];
      cells[i][j].classList.add('red');
    }
  });

  return <div className="board">{cells.flat()}</div>;
};

const ComputerBoard = ({ game, playContext, context }) => {
  const cells = new Array(10).fill(null);

  const handleClick = coord => e => {
    const cell = e.target;
    let res = game.playerAttack(coord);
    if (res === null) {
      cell.classList.add('blue');
    } else {
      if (Array.isArray(res)) {
        mount('You win!', playContext.status);
        context.veil.classList.add('show');
        [, res] = res;
      }
      cell.classList.add('red');
      if (res.isSunk()) {
        const [i, j] = res.coord;
        const { length, orientation } = res;
        const spec = { length, orientation };
        if (orientation === 'east') mount(<Ship spec={spec} />, cells[i][j]);
        if (orientation === 'west') mount(<Ship spec={spec} />, cells[i][j]);
        if (orientation === 'north') mount(<Ship spec={spec} />, cells[i][j]);
        if (orientation === 'south') mount(<Ship spec={spec} />, cells[i][j]);
      }
    }
  };

  cells.forEach((v, i) => {
    cells[i] = new Array(10)
      .fill(null)
      .map((v2, j) => (
        <div className="cell" onClick={handleClick([i, j])}></div>
      ));
  });

  game.on('botWin', () => {
    context.veil.classList.add('show');
  });

  return (
    <div className="board">
      {cells.flat()}
      <div ref="veil" className="veil" context={context} />
    </div>
  );
};

const Play = ({ game, context }) => {
  return (
    <div id="play">
      <h2 ref="status" context={context} className="status"></h2>
      <section>
        <h2>Your grid</h2>
        <PlayerBoard game={game} playContext={context} />
      </section>
      <section>
        <h2>Opponent grid</h2>
        <ComputerBoard game={game} playContext={context} />
      </section>
    </div>
  );
};

export default Play;
