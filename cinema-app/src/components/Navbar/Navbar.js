import { React, useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {useNavigate} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { searchMovieUtility } from '../../utility/searchMovieUtility';
import { searchMoviesByCategoryUtility } from '../../utility/searchMoviesByCategoryUtility';
import styled from "styled-components";
import {BsArrowLeftRight, BsSearch} from "react-icons/bs";


async function handleSearch(setMovies, searchBarInput) {
  let movies = await searchMovieUtility(searchBarInput)
  setMovies(movies)
}

async function handleFilter(setMovies, category) {
  let movies = await searchMoviesByCategoryUtility(category)
  setMovies(movies)
}


function MainNavbar(props) {
  let nav = useNavigate()
  const [searchBarInput, setSearchBarInput] = useState('')

  function handleInputChange(event) {
    setSearchBarInput(event.target.value);
  }
  
  let profileComponent;
  if (props.loggedIn) {
    profileComponent = <NavDropdown title= {props.user.firstName} id="basic-nav-dropdown">
    <NavDropdown.Item href="/editProfile">
      Edit Profile
    </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item href="/" onClick = {() => {localStorage.removeItem("jwt"); window.location.reload();}}>
      Logout
    </NavDropdown.Item>
  </NavDropdown>
  } else {
    profileComponent = <NavDropdown title="Register/Login" id="basic-nav-dropdown">
    <NavDropdown.Item href="/signup"> Register </NavDropdown.Item>
    <NavDropdown.Item href="/login"> Login </NavDropdown.Item>
    </NavDropdown>
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container className = "navbar">
        <img src = {require("../../assets/cinema-logo.png")} alt = "image" height = "60"></img>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Navbar.Brand href="/"> E-Booking Cinema System </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Dropdown>
          <Dropdown.Toggle>
            Filter
          </Dropdown.Toggle>
          &nbsp;

          <Dropdown.Menu>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Comedy"); nav('/selectMovie')}}> Comedy </Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Action"); nav('/selectMovie')}}> Action </Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Horror"); nav('/selectMovie')}}> Horror </Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Drama"); nav('/selectMovie')}}> Drama </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
          <div class="search-bar" >
            <div class="input-group" >
            <input type="search" class="form-control rounded" value = {searchBarInput} onChange = {handleInputChange} placeholder="Search"  />
            <Link to = "/selectMovie"><button type="button"  onClick = {() => handleSearch(props.setMovies, searchBarInput)} class="btn btn-primary">
            <BsSearch/>
            </button>
            </Link>
            </div>
          </div>

            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/selectMovie"> Booking </Nav.Link>
            <Nav.Link href="/orderSummary"> My Cart </Nav.Link>
            <NavDropdown title="Every Page" id="basic-nav-dropdown">
            <NavDropdown.Item href="/addPromotions"> Add Promotions </NavDropdown.Item>
              <NavDropdown.Item href="/admin"> Admin Page </NavDropdown.Item>
              <NavDropdown.Item href="/checkoutPage"> Checkout Page </NavDropdown.Item>
              <NavDropdown.Item href="/editProfile"> Edit Profile </NavDropdown.Item>
              <NavDropdown.Item href="/"> Homepage </NavDropdown.Item>
              <NavDropdown.Item href="/login"> Login </NavDropdown.Item>
              <NavDropdown.Item href="/manageMovies"> Manage Movies </NavDropdown.Item>
              <NavDropdown.Item href="/orderConfirmation"> Order Confirmation </NavDropdown.Item>
              <NavDropdown.Item href="/orderSummary"> Order Summary </NavDropdown.Item>
              <NavDropdown.Item href="/registrationConfirmationPage"> Registration Confirmation </NavDropdown.Item>
              <NavDropdown.Item href="/selectAges"> Select Age </NavDropdown.Item>
              <NavDropdown.Item href="/selectMovie"> Select Movie </NavDropdown.Item>
              <NavDropdown.Item href="/selectShowtime"> Select Showtime </NavDropdown.Item>
              <NavDropdown.Item href="/resetPassword"> Reset Password </NavDropdown.Item>
              <NavDropdown.Item href="/signup"> Register </NavDropdown.Item>
            </NavDropdown>
            {profileComponent}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNavbar;