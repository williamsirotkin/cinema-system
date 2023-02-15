import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {Navbar as BootNav} from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Navbar() {
  return (
    <div>
     <nav class="navbar navbar-expand-lg bg-body-tertiary">
   <div class="container-fluid">
     <a class="navbar-brand" href="#">Navbar</a>
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
       <div class="navbar-nav">
        <Link to = '/'><a class="nav-link active" aria-current="page" href="#">Home</a></Link>
         <Link to = '/login'><a class="nav-link" href="#">Login</a></Link>
         <Link to = '/orderSummary'><a class="nav-link" href="#">Order Summary</a></Link>
         <Link to = '/editProfile'><a class="nav-link disabled">Edit Profile</a></Link>
       </div>
     </div>
   </div>
    </nav> 
 </div>
  );
}

export default Navbar;