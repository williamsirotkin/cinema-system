import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="App">
     <Link to  = "/login"><button type="button">Login</button></Link>
     <Link to  = "/ordersummary"><button type="button">OrderSummary</button></Link>
    </div>
  );
}

export default Navbar;