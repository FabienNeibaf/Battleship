const Ship = ({ length, orientation }) => {
  const hits = new Set();

  const isSunk = () => {
    return hits.size === length;
  };

  return {
    isSunk,
    coord: null,
    orientation,
    get length() {
      return length;
    },
    hit(pos) {
      const [a, b] = pos;
      const [i, j] = this.coord;
      if (orientation === 'east') {
        if (a !== i) return;
        if (b < j && b > j + length - 1) return;
      }
      if (orientation === 'west') {
        if (a !== i) return;
        if (b > j && b < j - length + 1) return;
      }
      if (orientation === 'north') {
        if (b !== j) return;
        if (a > i && a < i - length + 1) return;
      }
      if (orientation === 'south') {
        if (b !== j) return;
        if (a < i && a > j + length - 1) return;
      }
      hits.add(pos);
    },
  };
};

export default Ship;
