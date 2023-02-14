import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
     <Link to  = "/login"><button type="button">Login</button></Link>
     <Link to  = "/ordersummary"><button type="button">OrderSummary</button></Link>
     <Link to  = "/admin"><button type="button">Admin Homepage</button></Link>
    </div>
  );
}

export default Navbar;