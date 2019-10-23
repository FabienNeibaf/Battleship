import { el } from '../utils';

const Ship = ({ ship }) => {
  const holes = [];

  for (let i = 0, l = ship.length; i < l; i += 1) {
    holes.push(<span className="hole" />);
  }

  const grab = e => {
    e.stopPropagation();
    const node = e.target;
    if (e.detail === 2) {
      const { angle } = node;
      node.angle = angle !== undefined && angle < 360 ? angle + 90 : 0;
      node.style.transform = `rotate(${node.angle}deg)`;
    } else {
      node.classList.add('grabbed');
    }
  };

  return (
    <div className="ship" onClick={grab}>
      {holes}
    </div>
  );
};

export default Ship;
