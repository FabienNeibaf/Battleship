import Form from '../views/Form';
import Gameboard from '../views/Gameboard';
import Player from '../models/Player';
import { el, Observable } from '../utils';

export default class Game extends Observable {
  constructor() {
    super();
    this.computer = new Player();
  }

  init() {
    return <Form game={this} />;
  }

  start() {
    return <Gameboard game={this} />;
  }

  restart() {
    this.player.gameboard.reset();
    this.computer.gameboard.randomize();
  }
}
