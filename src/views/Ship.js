import { el } from '../utils';

const Ship = ({ spec }) => {
  const holes = [];
  const { length, orientation } = spec;

  for (let i = 0; i < length; i += 1) {
    holes.push(<span className="hole" />);
  }

  return (
    <div
      className={`ship ${orientation} s${length}`}
      onClick={e => e.stopPropagation()}
    >
      {holes}
    </div>
  );
};

export default Ship;
