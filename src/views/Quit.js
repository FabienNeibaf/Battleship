import { el } from '../utils';

const Quit = ({ game, context }) => {
  const clear = () => {
    const { quit } = context;
    quit.classList.remove('show');
  };
  return (
    <div ref="quit" id="quit" context={context}>
      <h2>Quit Game</h2>
      <p>Are you sure?</p>
      <p>
        <button onClick={() => game.init()}>YES</button>
        <button onClick={clear}>NO</button>
      </p>
    </div>
  );
};

export default Quit;
