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
      if (!(window.location.pathname.substring(0,12)=== '/verifyEmail')) {
        let jwt = localStorage.getItem('jwt');
        //console.log(localStorage.getItem('jwt'));
        if (!jwt) {
          jwt = ""
        }
        
        axios({
          url: process.env.REACT_APP_BACKEND_URL + "/profile/jwt/login", 
          data: {
              "jwt": jwt
          },
          method: "post",
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then((response => {
        const firstName = response.data.firstName
        const lastName = response.data.lastName
        const email = response.data.email
        const role = response.data.role
        const birthday = response.data.birthday
        const active = response.data.active
        const billing_address = response.data.billing_address
        const promos = response.data.promos
    setUser({
      firstName, lastName, email, role, birthday, active, billing_address, promos
    })
        setLoggedIn(true)
        setIsLoading(false)
      }))
      .catch((error) => {
          console.log('JWT has expired');
          setIsLoading(false)
      });
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
        })
      }
    
    }
    , []);
  
  useEffect(() => {
    let jwt = localStorage.getItem('jwt');
    if (!jwt) {
      jwt = ""
    }
    axios({
      url: process.env.REACT_APP_BACKEND_URL + "/profile/jwt/login", 
      data: {
          "jwt": jwt
      },
      method: "post",
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then((response => {
    const firstName = response.data.firstName
    const lastName = response.data.lastName
    const email = response.data.email
    const role = response.data.role
    const birthday = response.data.birthday
    const active = response.data.active
    const billing_address = response.data.billing_address
    const promos = response.data.promos
    const admin = response.data.admin
    setUser({
      firstName, lastName, email, role, birthday, active, billing_address, promos, admin
    })
    setLoggedIn(true)
    setIsLoading(false)
  }))
  .catch((error) => {
      console.log('JWT has expired');
      setIsLoading(false)
  });
  }, []);

  useEffect(() => {
    axios({
      url: process.env.REACT_APP_BACKEND_URL + "/movie/get/" + "Showing", 
      method: "get",
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then((response => {
    setShowingNow(response.data)
    console.log("sucess showing")
  }))
  .catch((error) => {
    console.log("Failed showing")
  });
  axios({
    url: process.env.REACT_APP_BACKEND_URL + "/movie/get/" + "Soon", 
    method: "get",
    headers: {
        "Content-Type": "application/json"
    }
    })
    .then((response => {
      setComingSoon(response.data)
      console.log(response.data)
    }))
    .catch((error) => {
      console.log("Failed soon")
    });
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
        <Homepage user = {user} showingNow = {showingNow} comingSoon = {comingSoon}/>
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

    <Route path = "/selectMovie" element={
          <React.Fragment>
            <SelectMovie movies={movies} setMovies={setMoviesFunc}/>
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
