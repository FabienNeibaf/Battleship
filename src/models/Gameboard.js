import Ship from './Ship';
import { range, random } from '../utils';

const Gameboard = () => {
  let sunk = 0;
  let due = { 2: 1, 3: 2, 4: 1, 5: 1 };
  let board = new Array(10).fill(null).map(() => new Array(10).fill(null));

  const names = [
    null,
    'Destroyer',
    'Submarine and Cruiser',
    'Battleship',
    'Carrier',
  ];

  const existError = length => {
    if (due[length] === 0)
      throw new Error(`${names[length - 1]} already drawn`);
  };

  const north = (spec, i, j) => {
    const { length } = spec;
    if (i - length < -1) return null;
    const array = range(i - length + 1, i);
    if (array.some(i => board[i][j])) return null;
    existError(length);
    const ship = new Ship(spec);
    ship.coord = [i - length + 1, j];
    array.forEach(i => {
      board[i][j] = ship;
    });
    return ship;
  };

  const south = (spec, i, j) => {
    const { length } = spec;
    if (i + length > 10) return null;
    const array = range(i, i + length - 1);
    if (array.some(i => board[i][j])) return null;
    existError(length);
    const ship = new Ship(spec);
    ship.coord = [i, j];
    array.forEach(i => {
      board[i][j] = ship;
    });
    return ship;
  };

  const east = (spec, i, j) => {
    const { length } = spec;
    if (j + length > 10) return null;
    const array = range(j, j + length - 1);
    if (array.some(j => board[i][j])) return null;
    existError(length);
    const ship = new Ship(spec);
    ship.coord = [i, j];
    array.forEach(j => {
      board[i][j] = ship;
    });
    return ship;
  };

  const west = (spec, i, j) => {
    const { length } = spec;
    if (j - length < -1) return null;
    const array = range(j - length + 1, j);
    if (array.some(j => board[i][j])) return null;
    existError(length);
    const ship = new Ship(spec);
    ship.coord = [i, j - length + 1];
    array.forEach(j => {
      board[i][j] = ship;
    });
    return ship;
  };

  const placeShip = (spec, coord) => {
    let ship = null;
    if (spec.orientation === 'east') ship = east(spec, ...coord);
    if (spec.orientation === 'west') ship = west(spec, ...coord);
    if (spec.orientation === 'north') ship = north(spec, ...coord);
    if (spec.orientation === 'south') ship = south(spec, ...coord);

    if (ship) due[ship.length] -= 1;
    return ship;
  };

  const receiveAttack = coord => {
    const [i, j] = coord;
    const ship = board[i][j];
    if (ship) {
      if (ship.isSunk()) return ship;
      ship.hit(coord);
      if (ship.isSunk()) sunk += 1;
      if (sunk === 5) return ['Game over', ship];
      return ship;
    }
    return null;
  };

  const validCoords = (spec, board) => {
    const coords = [];
    const { length, orientation } = spec;
    switch (orientation) {
      case 'north':
        for (let i = 0, l = board.length; i + length < l + 1; i += length - 1) {
          for (let j = 0, k = board[i].length; j < k; j += 1) {
            if (range(i, i + length - 1).every(i => !board[i][j]))
              coords.push([i + length - 1, j]);
          }
        }
        break;
      case 'south':
        for (let i = 0, l = board.length; i + length < l + 1; i += length - 1) {
          for (let j = 0, k = board[i].length; j < k; j += 1) {
            if (range(i, i + length - 1).every(i => !board[i][j]))
              coords.push([i, j]);
          }
        }
        break;
      case 'east':
        for (let i = 0, l = board.length; i < l; i += 1) {
          for (
            let j = 0, k = board[i].length;
            j + length < k + 1;
            j += length - 1
          ) {
            if (range(j, j + length - 1).every(j => !board[i][j]))
              coords.push([i, j]);
          }
        }
        break;
      case 'west':
        for (let i = 0, l = board.length; i < l; i += 1) {
          for (
            let j = 0, k = board[i].length;
            j + length < k + 1;
            j += length - 1
          ) {
            if (range(j, j + length - 1).every(j => !board[i][j]))
              coords.push([i, j + length - 1]);
          }
        }
        break;
      default:
        break;
    }
    return coords;
  };

  const reset = () => {
    sunk = 0;
    due = { 2: 1, 3: 2, 4: 1, 5: 1 };
    board = new Array(10).fill(null).map(() => new Array(10).fill(null));
  };

  const randomize = drawer => {
    reset();
    const sizes = [2, 3, 3, 4, 5];
    const orients = ['north', 'south', 'east', 'west'];
    if (drawer) drawer.init();
    while (sizes.length) {
      const i = random(sizes.length);
      const length = sizes[i];
      sizes.splice(i, 1);
      const orientation = orients[random(orients.length)];
      const spec = { length, orientation };
      const coords = validCoords(spec, board);
      const start = coords[random(coords.length)];
      placeShip(spec, start);
      if (drawer) {
        const { orientation } = spec;
        if (orientation === 'east') drawer.east(spec, start);
        if (orientation === 'west') drawer.west(spec, start);
        if (orientation === 'north') drawer.north(spec, start);
        if (orientation === 'south') drawer.south(spec, start);
      }
    }
  };

  return {
    get board() {
      return board;
    },
    placeShip,
    receiveAttack,
    randomize,
    reset,
  };
};

export default Gameboard;
