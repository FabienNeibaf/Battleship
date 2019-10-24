import Header from './Header';
import Footer from './Footer';
import { el, Fragment } from '../utils';

const App = () => {
  return (
    <Fragment>
      <Header />
      <section id="main"></section>
      <Footer />
    </Fragment>
  );
};

export default App;
