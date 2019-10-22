const Ship = (length, orientation) => {
  let nbhit = 0;
  const pos = new Array(length);

  const hit = i => {
    if (!pos[i]) {
      nbhit += 1;
      pos[i] = 'X';
    }
  };

  const isSunk = () => {
    return nbhit === length;
  };

  function rotate() {
    orientation = orientation === 'horizontal' ? 'vertical' : 'horizontal';
    return orientation;
  }

  return {
    hit,
    isSunk,
    rotate,
    coord: null,
    get length() {
      return length;
    },
    get orientation() {
      return orientation;
    },
  };
};

export default Ship;
