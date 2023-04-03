import React, { useEffect, useState } from 'react'
import { Carousel, Stack, Button, Nav} from "react-bootstrap";
import './Homepage.css';
import Cards from './Cards.js'
import {useNavigate} from 'react-router-dom'
import { BrowserRouter, useParams } from 'react-router-dom';


export default function Homepage(props) {
    let nav = useNavigate()

    function handleSeeAll(type) {
        nav('./selectMovie/' + type)
    }


    let numbers = randomNumbers(props.showingNow.length)
    let numbersSoon = randomNumbers(props.comingSoon.length)


    function getShowingNowCarouselItem(num) {
        let showNowCarouselItem = <Carousel.Item  width = {500} height = {5}>
        <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={3}>
            <Cards  title={props.showingNow[numbers[0 + num]].title} image={props.showingNow[numbers[0 + num]].photo_link} trailer={props.showingNow[numbers[0 + num]].trailer_link} loggedIn={props.loggedIn} handleSetMovie={props.setSingleMovie}></Cards>
            <Cards  title={props.showingNow[numbers[1 + num]].title} image={props.showingNow[numbers[1 + num]].photo_link} trailer={props.showingNow[numbers[1 + num]].trailer_link} loggedIn={props.loggedIn} handleSetMovie={props.setSingleMovie}></Cards>
            <Cards  title={props.showingNow[numbers[2 + num]].title} image={props.showingNow[numbers[2 + num]].photo_link} trailer={props.showingNow[numbers[2 + num]].trailer_link} loggedIn={props.loggedIn} handleSetMovie={props.setSingleMovie}></Cards>
            <Cards  title={props.showingNow[numbers[3 + num]].title} image={props.showingNow[numbers[3 + num]].photo_link} trailer={props.showingNow[numbers[3 + num]].trailer_link} loggedIn={props.loggedIn} handleSetMovie={props.setSingleMovie}></Cards>
            </Stack> 
        </Carousel.Item>
        return showNowCarouselItem
    }

    function getShowingNowCarouselItems(num) {
        return getShowingNowCarouselItem(num)
    }

    function getComingSoonCarouselItem(num) {
        let showNowCarouselItem = <Carousel.Item  width = {500} height = {5}>
        <Stack direction="horizontal" className="h-100 justify-content-center align-items-center" gap={3}>
            <Cards  title={props.comingSoon[numbersSoon[0 + num]].title} image={props.comingSoon[numbersSoon[0 + num]].photo_link} trailer={props.comingSoon[numbersSoon[0 + num]].trailer_link} loggedIn={props.loggedIn} handleSetMovie={props.setSingleMovie}></Cards>
            <Cards  title={props.comingSoon[numbersSoon[1 + num]].title} image={props.comingSoon[numbersSoon[1 + num]].photo_link} trailer={props.comingSoon[numbersSoon[1 + num]].trailer_link} loggedIn={props.loggedIn} handleSetMovie={props.setSingleMovie}></Cards>
            <Cards  title={props.comingSoon[numbersSoon[2 + num]].title} image={props.comingSoon[numbersSoon[2 + num]].photo_link} trailer={props.comingSoon[numbersSoon[2 + num]].trailer_link}loggedIn={props.loggedIn} handleSetMovie={props.setSingleMovie}></Cards>
            <Cards  title={props.comingSoon[numbersSoon[3 + num]].title} image={props.comingSoon[numbersSoon[3 + num]].photo_link} trailer={props.comingSoon[numbersSoon[3 + num]].trailer_link}loggedIn={props.loggedIn} handleSetMovie={props.setSingleMovie}></Cards>
        
            </Stack>
        </Carousel.Item>
        return showNowCarouselItem
    }

    function getComingSoonCarouselItems(num) {
       return getComingSoonCarouselItem(num)
    }

    // useEffect(() => {
    //     if (props.user.admin) {
    //         nav('/admin')
    //     }
    // })

  return (
    <div className = "homepage">
    <div className='homepageTitles'> 
    &nbsp; &nbsp; &nbsp; 
    <h1> Showing Now </h1> 
    &nbsp; &nbsp; 
    <Nav.Link onClick = {() => handleSeeAll("showingNow")}> 
    <p className = 'nav-link-'> See All -{'>'} </p> </Nav.Link> 
    </div>
    <div className = "carousel">
     <Carousel>
       {getShowingNowCarouselItems(0)}
       {getShowingNowCarouselItems(4)}
       {getShowingNowCarouselItems(8)}
    </Carousel>

</div>
    <div className='homepageTitles'> 
    &nbsp; &nbsp; &nbsp; 
    <h1>Coming Soon </h1> 
    &nbsp; &nbsp; 
    <Nav.Link onClick = {() => handleSeeAll("comingSoon")} > 
       <p className = 'nav-link-'> See All -{'>'} </p> </Nav.Link> 
    </div>
    <div className = "carousel">
     <Carousel>
        {getComingSoonCarouselItems(0)}
        {getComingSoonCarouselItems(4)}
</Carousel>
</div>
    </div>
  )
}

function randomNumbers(max) {
    let numbers = [];
  
    while (numbers.length < max) {
      let randomNumber = Math.floor(Math.random() * max);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
  
    return numbers;
  }

