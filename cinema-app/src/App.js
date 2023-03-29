import logo from './logo.svg';
import './App.css';
import MainNavbar from './components/Navbar/Navbar'; 
import EmailConfirmationPage from './components/EmailConfirmationPage/EmailConfirmationPage';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import React,{useState, useEffect} from 'react';
import Login from './components/Login/Login';
import OrderSummary from './components/OrderSummary/OrderSummary';
import AdminHomePage from './components/AdminHomePage/AdminHomePage';
import EditProfile from './components/EditProfile/EditProfile';
import AddPromotions from './components/AddPromotions/AddPromotions';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import ManageMovies from './components/ManageMovies/ManageMovies';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import RegistrationConfirmationPage from './components/RegistrationConfirmationPage/RegistrationConfirmationPage';
import SelectAge from './components/SelectAge/SelectAge';
import SelectMovie from './components/SelectMovie/SelectMovie';
import SelectSeats from './components/SelectSeats/SelectSeats';
import SelectShowtime from './components/SelectShowtime/SelectShowtime';
import Homepage from './components/Homepage/Homepage';
import Signup from './components/Signup/Signup';
import EditMovie from './components/EditMovie/EditMovie';
import ResetPassword from './components/ResetPassword/ResetPassword';
import {getMoviesUtility} from './utility/getMoviesUtility.js';
import {jwtLoginUtility} from './utility/jwtLoginUtility.js';
import axios from 'axios';

function App() {
  const [user, setUser] = useState('');
  const [movies, setMovies] = useState('')
  const [showingNow, setShowingNow] = useState('');
  const [comingSoon, setComingSoon] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState('');

  function setUserData(firstName, lastName, email, role, birthday, card_info, active, billing_address, promos) {
    setUser({
      firstName, lastName, email, role, birthday, card_info, active, billing_address, promos
    })
  }

  function setMoviesFunc(movies) {
    setMovies(movies)
  }

  useEffect(() => {
    async function stuff() {
    if (!(window.location.pathname.substring(0,12)=== '/verifyEmail')) {
      let profile = await jwtLoginUtility()
      if (profile) {
        setUserData(
          profile.firstName, profile.lastName, profile.email, profile.role, profile.birthday, profile.active, profile.billing_address, profile.promos, profile.admin
        )
        setLoggedIn(true)
      } else {
        console.log('JWT has expired');
      }
      setIsLoading(false)
    
    } else {
      let token = window.location.pathname.substring(13)
      
      axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/verifyEmail/" + token, 
        method: "patch",
        headers: {
            "Content-Type": "application/json"
        }
      })
      .then((response => {
          setIsLoading(false)
          console.log(response);
      }))
      .catch((error) => {
        console.log(error)
      })
    }
  }
  stuff()
  }, []);
  
  useEffect(() => {
    async function jwtStuff() {
      let profile = await jwtLoginUtility()
      if (profile) {
        setUserData(
          profile.firstName, profile.lastName, profile.email, profile.role, profile.birthday, profile.active, profile.billing_address, profile.promos, profile.admin
        )
        setLoggedIn(true)
      } else {
        console.log('JWT has expired');
      }
      setIsLoading(false)
  }
  jwtStuff()
  }, []);

  useEffect(() => {
    async function setMovieStuff() {
      setShowingNow(await getMoviesUtility("Showing"))
      setComingSoon(await getMoviesUtility("Soon"))
    }
    setMovieStuff()
  } ,[])
  
  if (isLoading || !showingNow || !comingSoon) {
    return <div><h1>Loading Page</h1> </div>
  } else {
  return (
    <Router>
       <MainNavbar user={user} loggedIn={loggedIn} setMovies={setMoviesFunc}/>
    <Routes>

    <Route path = "/" element={
      <React.Fragment> 
        <Homepage user = {user} showingNow = {showingNow} comingSoon = {comingSoon} loggedIn={loggedIn}/>
      </React.Fragment>
    }></Route>

      <Route path = "/login" element={
          <React.Fragment>
            <Login/>
          </React.Fragment>
      }></Route>

      <Route path = "/orderSummary" element={
          <React.Fragment>
            <OrderSummary/>
          </React.Fragment>
      }></Route>

      <Route path ="/editProfile" element={
         <React.Fragment>
         <EditProfile user={user}/>
       </React.Fragment>

      }></Route>


      <Route path = "/admin" element={
          <React.Fragment>
            <AdminHomePage user = {user}/>
          </React.Fragment>
      }></Route>
      
      <Route path = "/addPromotions" element={
          <React.Fragment>
            <AddPromotions/>
          </React.Fragment>
      }></Route>

    <Route path = "/orderConfirmation" element={
          <React.Fragment>
            <OrderConfirmation/>
          </React.Fragment>
      }></Route>

      <Route path = "/manageMovies" element={
          <React.Fragment>
            <ManageMovies movies={movies} setMovies={setMoviesFunc}/>
          </React.Fragment>
      }></Route>

      <Route path = "/checkoutPage" element={
          <React.Fragment>
            <CheckoutPage/>
          </React.Fragment>
      }></Route>

        <Route path = "/registrationConfirmationPage" element={
          <React.Fragment>
            <RegistrationConfirmationPage firstName={user.firstName} lastName ={user.lastName} email={user.email}/>
          </React.Fragment>
      }></Route>

    <Route path = "/selectMovie/filter/:filter" element={
          <React.Fragment>
            <SelectMovie movies={movies} setMovies={setMoviesFunc} />
          </React.Fragment>
      }></Route>

<Route path = "/selectMovie/showingNow" element={
          <React.Fragment>
            <SelectMovie movies={showingNow} setMovies={setMoviesFunc} />
          </React.Fragment>
      }></Route>

<Route path = "/selectMovie/comingSoon" element={
          <React.Fragment>
            <SelectMovie movies={comingSoon} setMovies={setMoviesFunc} />
          </React.Fragment>
      }></Route>

      <Route path = "/selectShowtime" element={
          <React.Fragment>
            <SelectShowtime/>
          </React.Fragment>
      }></Route>

        <Route path = "/selectSeats" element={
          <React.Fragment>
            <SelectSeats/>
          </React.Fragment>
      }></Route>

        <Route path = "/selectAges" element={
          <React.Fragment>
            <SelectAge/>
          </React.Fragment>
      }></Route>
      <Route path = "/signup" element={
          <React.Fragment>
            <Signup setUserData={setUserData}/>
          </React.Fragment>
      }></Route>
      <Route path = "/editmovie" element={
          <React.Fragment>
            <EditMovie/>
          </React.Fragment>
      }></Route>

      <Route path = "/resetPassword/:token" element={
          <React.Fragment>
            <ResetPassword/>
          </React.Fragment>
      }></Route>

<Route path = "/verifyEmail/:token" element={
    <React.Fragment>
          <EmailConfirmationPage/>
    </React.Fragment>
      }></Route>

    </Routes>

    

    </Router>
  );
    }
}


export default App;
