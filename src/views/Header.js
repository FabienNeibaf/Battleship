import { el, mount, Fragment } from '../utils';

const Header = ({ game, context }) => {
  game.on('start', () => {
    const { nav } = context;
    const node = (
      <Fragment>
        <span>{game.player.name}</span>
        <button>
          <img
            src="https://img.icons8.com/cute-clipart/64/000000/menu.png"
            alt="Menu Icon"
          />
          <ul>
            <li onClick={() => game.restart()}>Restart</li>
            <li onClick={() => game.quit()}>Quit</li>
          </ul>
        </button>
      </Fragment>
    );
    mount(node, nav);
  });
  return (
    <header id="header">
      <span className="offset"></span>
      <h1>BattleShip</h1>
      <nav ref="nav" context={context}></nav>
    </header>
  );
};

export default Header;
