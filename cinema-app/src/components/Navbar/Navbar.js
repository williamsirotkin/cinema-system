import { Link } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
  return (
    <div className='navbar'>
     <Link to  = "/login"><button type="button">Login</button></Link>
     <Link to  = "/ordersummary"><button type="button">OrderSummary</button></Link>
     <Link to  = "/admin"><button type="button">Admin Homepage</button></Link>
     <Link to  = "/editprofile"><button type="button">Edit Profile</button></Link>
     <Link to  = "/addPromotions"><button type="button">Add Promotions</button></Link>
     <Link to  = "/editprofile"><button type="button">edit profile</button></Link>
    </div>
  );
}

export default Navbar;