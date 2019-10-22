const Gameboard = () => {
  const board = [
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
    new Array(10),
  ];
  const placeShip = (ship, coord) => {
    const [x, y] = coord;
    const l = ship.length;
    if (ship.orientation === 'horizontal') {
      if (y > 9) return false;
      if (x + l > 9) return false;
      for (let i = 0; i < l; i += 1) board[x + i][y] = ship;
    } else {
      if (x > 9) return false;
      if (y + l > 9) return false;
      for (let i = 0; i < l; i += 1) board[x][y + 1] = ship;
    }
    ship.coord = coord;
    return true;
  };
  const receiveAttack = coord => {
    const [x1, y1] = coord;
    const ship = board[x1][y1];
    if (ship) {
      const [x2, y2] = ship.coord;
      const pos = Math.max(x2 - x1, y2 - y1);
      ship.hit(pos);
      return true;
    }
    return false;
  };
  return { placeShip, receiveAttack };
};

export default Gameboard;
