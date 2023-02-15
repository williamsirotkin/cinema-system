import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Navbar() {
  return (
    <div>
     <Link to  = "/login"><Button type="button" class = "btn">Login</Button></Link>
     <Link to  = "/ordersummary"><button type="button">OrderSummary</button></Link>
     <Link to  = "/admin"><button type="button">Admin Homepage</button></Link>
     <Link to  = "/editprofile"><button type="button">Edit Profile</button></Link>
     <Link to  = "/addPromotions"><button type="button">Add Promotions</button></Link>
    </div>
  );
}

export default Navbar;