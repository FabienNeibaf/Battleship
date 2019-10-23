import { el } from '../utils';

const Cell = () => {
  const drop = e => {
    const node = e.target;
    const move = {};
    if (move && move.classList.contains('grabbed')) {
      move.parentNode.removeChild(move);
      node.appendChild(move);
      move.classList.remove('grabbed');
    }
  };
  return <div className="cell" onClick={drop}></div>;
};

export default Cell;
