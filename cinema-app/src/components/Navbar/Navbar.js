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
import { getAllMovies } from '../../utility/getAllMoviesUtility';
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
async function handleGetAllMovies(setMovies, details) {
  let movies = await getAllMovies(details)
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
            Category
          </Dropdown.Toggle>
          &nbsp;

          <Dropdown.Menu>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Action"); nav('/selectMovie/filter/Action')}}> Action </Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Comedy"); nav('/selectMovie/filter/Comedy')}}> Comedy </Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Horror"); nav('/selectMovie/filter/Horror')}}> Horror </Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Drama"); nav('/selectMovie/filter/Drama')}}> Drama </Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Fantasy"); nav('/selectMovie/filter/Fantasy')}}>Fantasy</Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Mystery"); nav('/selectMovie/filter/Mystery')}}>Mystery</Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Romance"); nav('/selectMovie/filter/Romance')}}> Romance</Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Thriller"); nav('/selectMovie/filter/Thriller')}}> Thriller</Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Western"); nav('/selectMovie/filter/Western')}}> Western </Dropdown.Item>
            <Dropdown.Item onClick = {() => {handleFilter(props.setMovies, "Sci-fi"); nav('/selectMovie/filter/Sci-fi')}}> Sci-fi</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
          <div className="search-bar" >
            <div className="input-group" >
            <input type="search" className="form-control rounded" value = {searchBarInput} onChange = {handleInputChange} placeholder="Search"  />
            <Link to ={"/selectMovie/filter/" + "Results for " + "'" + searchBarInput + "'"}><button type="button"  onClick = {() => handleSearch(props.setMovies, searchBarInput)} className="btn btn-primary">
            <BsSearch/>
            </button>
            </Link>
            </div>
          </div>

            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/selectMovie/filter/Movies"> Booking </Nav.Link>
            <Nav.Link href="/orderSummary"> My Cart </Nav.Link>
            <NavDropdown title="Every Page" id="basic-nav-dropdown">
            <NavDropdown.Item href="/addPromotions"> Add Promotions </NavDropdown.Item>
              <NavDropdown.Item href="/admin"> Admin Page </NavDropdown.Item>
              <NavDropdown.Item href="/checkoutPage"> Checkout Page </NavDropdown.Item>
              <NavDropdown.Item href="/editProfile"> Edit Profile </NavDropdown.Item>
              <NavDropdown.Item href="/"> Homepage </NavDropdown.Item>
              <NavDropdown.Item href="/login"> Login </NavDropdown.Item>
              <Dropdown.Item onClick = {() => {handleGetAllMovies(props.setMovies, "true"); nav('/ManageMovies')}}>Manage Movies</Dropdown.Item>
              <NavDropdown.Item href="/orderConfirmation"> Order Confirmation </NavDropdown.Item>
              <NavDropdown.Item href="/orderSummary"> Order Summary </NavDropdown.Item>
              <NavDropdown.Item href="/registrationConfirmationPage"> Registration Confirmation </NavDropdown.Item>
              <NavDropdown.Item href="/selectAges"> Select Age </NavDropdown.Item>
              <Dropdown.Item onClick = {() => {handleGetAllMovies(props.setMovies, "true"); nav('/selectMovie/filter/Movies')}}>Select Movie</Dropdown.Item>
              <NavDropdown.Item href="/selectShowtime"> Select Showtime </NavDropdown.Item>
              <NavDropdown.Item href="/resetPassword"> Reset Password </NavDropdown.Item>
              <NavDropdown.Item href="/EditMovie"> Edit Movie</NavDropdown.Item>
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