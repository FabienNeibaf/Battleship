import { el } from '../utils';

const Header = () => {
  return (
    <header id="header">
      <h1>BattleShip</h1>
      <nav>
        <button>
          <img
            src="https://img.icons8.com/cute-clipart/64/000000/menu.png"
            alt="Menu Icon"
          />
          <ul>
            <li>Restart</li>
            <li>Quit</li>
          </ul>
        </button>
      </nav>
    </header>
  );
};

export default Header;
