import Header from './Header';
import Footer from './Footer';
import { el, mount, Fragment } from '../utils';

const App = ({ game, context }) => {
  game.on('init', view => {
    const { main } = context;
    mount(view, main);
  });

  game.on('start', view => {
    const { main } = context;
    mount(view, main);
  });

  game.on('play', view => {
    const { main } = context;
    mount(view, main);
  });

  game.on('restart', view => {
    const { main } = context;
    mount(view, main);
  });

  game.on('quit', view => {
    const { main } = context;
    view.classList.add('show');
    main.appendChild(view);
  });

  return (
    <Fragment>
      <Header game={game} />
      <section ref="main" context={context} id="main">
        <button id="start-btn" onClick={() => game.init()}>
          Start Game
        </button>
      </section>
      <Footer />
    </Fragment>
  );
};

export default App;
