import { el } from '../utils';

const Vessels = () => {
  return (
    <div id="vessels">
      <h2>Your vessels</h2>
      <table>
        <tr>
          <th>Type</th>
          <th>Size</th>
          <th>Number</th>
        </tr>
        <tr className="item">
          <td>Carrier</td>
          <td>5</td>
          <td>1</td>
        </tr>
        <tr className="item">
          <td>Battleship</td>
          <td>4</td>
          <td>1</td>
        </tr>
        <tr className="item">
          <td>Cruiser</td>
          <td>3</td>
          <td>1</td>
        </tr>
        <tr className="item">
          <td>Submarine</td>
          <td>3</td>
          <td>1</td>
        </tr>
        <tr className="item">
          <td>Destroyer</td>
          <td>2</td>
          <td>1</td>
        </tr>
      </table>
    </div>
  );
};

export default Vessels;
