const Ship = ({ length, orientation }) => {
  const hits = new Set();

  const hit = pos => {
    hits.add(pos);
  };

  const isSunk = () => {
    return hits.size === length;
  };

  return {
    hit,
    isSunk,
    coord: null,
    orientation,
    get length() {
      return length;
    },
  };
};

export default Ship;
