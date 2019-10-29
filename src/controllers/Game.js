import Drawer from './Drawer';
import Form from '../views/Form';
import Play from '../views/Play';
import Quit from '../views/Quit';
import Player from '../models/Player';
import Strategy from '../views/Strategy';
import { el, Observable, random } from '../utils';

const COORDS = new Array(10)
  .fill(null)
  .map((v1, i) => new Array(10).fill(null).map((v2, j) => [i, j]))
  .flat();

export default class Game extends Observable {
  constructor() {
    super();
    this.nextAttack = [];
    this.drawer = new Drawer(this);
    this.computer = new Player('Bot');
  }

  quit() {
    return <Quit game={this} />;
  }

  init() {
    return <Form game={this} />;
  }

  play() {
    this.computer.gameboard.randomize();
    return <Play game={this} />;
  }

  start() {
    this.reset();
    return <Strategy game={this} />;
  }

  restart() {
    this.reset();
    return <Strategy game={this} />;
  }

  reset() {
    this.drawer.init();
    this.player.gameboard.reset();
  }

  playerAttack(coord) {
    const { attacks } = this.player;
    const prevSize = attacks.length;
    const res = this.computer.gameboard.receiveAttack(coord);
    const [i, j] = coord;
    if (attacks.every(([a, b]) => a !== i || b !== j)) attacks.push(coord);
    const currSize = attacks.length;
    if (!Array.isArray(res) && currSize > prevSize)
      setTimeout(() => this.computerAttack(), 500);
    return res;
  }

  computerAttack() {
    let valids = [];
    let coord = null;
    const { attacks } = this.computer;
    const { gameboard } = this.player;
    if (this.nextAttack.length > 0) {
      coord = this.nextAttack.pop();
    } else {
      valids = COORDS.filter(([i, j]) =>
        attacks.every(([a, b]) => i !== a || j !== b)
      );
      coord = valids[random(valids.length)];
    }
    attacks.push(coord);
    const res = gameboard.receiveAttack(coord);
    if (Array.isArray(res)) return ['Game over', coord];
    if (res === null) return [null, coord];
    const [i, j] = coord;
    if (this.nextAttack.length === 0) {
      if (i - 2 >= 0) this.nextAttack.push([i - 2, j]);
      if (j - 2 >= 0) this.nextAttack.push([i, j - 2]);
      if (i + 2 < 10) this.nextAttack.push([i + 2, j]);
      if (j + 2 < 10) this.nextAttack.push([i, j + 2]);
      if (i - 1 >= 0) this.nextAttack.push([i - 1, j]);
      if (j - 1 >= 0) this.nextAttack.push([i, j - 1]);
      if (i + 1 < 10) this.nextAttack.push([i + 1, j]);
      if (j + 1 < 10) this.nextAttack.push([i, j + 1]);
      this.nextAttack = this.nextAttack.filter(([i, j]) =>
        attacks.every(([a, b]) => i !== a || j !== b)
      );
    }
    return [res, coord];
  }

  randomize() {
    this.player.gameboard.randomize(this.drawer);
  }

  drawError(msg) {
    this.error = msg;
    return msg;
  }

  drawEnd() {
    return this;
  }

  draw(coord) {
    try {
      this.drawer.draw(coord);
    } catch (err) {
      this.drawError(err.message);
    }
    if (this.drawer.count === 5) this.drawEnd();
  }

  botWin() {
    return this.computer;
  }
}
