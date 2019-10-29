import './index.scss';
import App from './views/App';
import { el, mount } from './utils';
import Game from './controllers/Game';

const game = new Game();

mount(<App game={game} />, document.getElementById('root'));
