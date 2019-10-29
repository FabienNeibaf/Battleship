import Player from '../models/Player';
import { el, extract } from '../utils';

const Form = ({ game }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const { username } = extract(['username'], e.target);
    game.player = new Player(username);
    game.start();
  };
  return (
    <form id="form" onSubmit={handleSubmit}>
      <label htmlFor="username">Enter your name</label>
      <input type="text" name="username" id="username" />
      <button>GO</button>
    </form>
  );
};

export default Form;
