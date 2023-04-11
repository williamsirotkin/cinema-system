import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import {createMovie} from '../../utility/createMovieUtility.js'
import './EditMovie.css'
import {useNavigate} from 'react-router-dom'

const AddMovieForm = (props) => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('')
  const [stars, setStars] = useState('')
  const [movieRating, setRating] = useState({rating: " "})
  const [trailer, setTrailer] = useState('')
  const [reviews, setReviews] = useState('')
  const [producer, setProducer] = useState('')
  const [isShowing, setIsShowing] = useState(false)
  const [switchState, setSwitchState] = useState(false);
  const [genres, setGenres] = useState([]);
  const [castArray, setCastArray] = useState([]);
  const [producerArray, setProducerArray] = useState([]);
  const [message, setMessage] = useState("");
  
  const {rating} = movieRating;
  let nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("")
    handleCreateMovie();
    setTimeout(()=>{
      nav('/ManageMovies', {replace: true})
    },2000)

  };
  async function handleCreateMovie(){
    await createMovie(title, rating, image, trailer, isShowing, genres, castArray, director, producerArray, description, reviews)
    setMessage("Movie was successfully added")
  }

 useEffect(() =>{
    setCastArray(stars.split(","));
 },[stars])
 
 useEffect(() =>{
    setProducerArray(producer.split(","));
 },[producer])
 
  const handleChange=(e)=>{
    setSwitchState(!switchState)
    setIsShowing(e.target.checked)
  }
  const handleChangeRating = e => {
    e.persist();
    console.log(e.target.value);

    setRating(prevState => ({
      ...prevState,
      rating: e.target.value
    }));
};


const handleCheckboxChange = (event) => {
  const value = event.target.value;
  if (event.target.checked) {
    setGenres([...genres, value]);
  } else {
    setGenres(genres.filter((item) => item !== value));
  }
};

if (!props.user.admin) {
  return <h1> You are not authorized to view this page </h1>
}

  return (
    <Container>
    <h1 className='register'>Add/Edit movie</h1>
    <p className="error">{message}</p>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
                
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Producer</Form.Label>
              <Form.Control
                type="text"
                placeholder= "add cast with comma in between"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                required
                
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Cast</Form.Label>
              <Form.Control
                type="text"
                value={stars}
                placeholder= "add cast with comma in between"
                onChange={(e) => setStars(e.target.value)}
                required
                
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
          <Form.Group
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea" rows={3} 
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
            <Form.Check
                inline
                value="PG"
                label="PG"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                onChange={handleChangeRating}
                checked={rating === "PG"}
                
            />
            <Form.Check
                inline
                value="PG-13"
                label="PG-13"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
                onChange={handleChangeRating}
                checked={rating === "PG-13"}

            />
            <Form.Check
                inline
                value="Restricted/R"
                label="Restricted/R"
                name="group1"
                type={type}
                id={`inline-${type}-3`}
                onChange={handleChangeRating}
                checked={rating === "Restricted/R"}

            />
            <Form.Check
                inline
                value="NC-17"
                label="NC-17"
                name="group1"
                type={type}
                id={`inline-${type}-4`}
                onChange={handleChangeRating}
                checked={rating === "NC-17"}

            />
        </div>
      ))}
              
        </Form.Group>
    </Col>
    </Row>
    <Row>
          <Col>
          <Form.Group
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Reviews</Form.Label>
              <Form.Control
                as="textarea" rows={3} 
                type="text"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                required
                
              />
            </Form.Group>
          </Col>
          <Col>
            
              <Form.Label>Genre</Form.Label>
              <div className='checkBoxes'>
              <Form.Check
                type="checkbox"
                label="Action"
                value="Action"
                onChange={handleCheckboxChange}
                />
                <Form.Check
                type="checkbox"
                label="Comedy"
                value="Comedy"
                onChange={handleCheckboxChange}
                />
                <Form.Check
                type="checkbox"
                label="Drama"
                value="Drama"
                onChange={handleCheckboxChange}
                />
                <Form.Check
                type="checkbox"
                label="Fantasy"
                value="Fantasy"
                onChange={handleCheckboxChange}
                />
                <Form.Check
                type="checkbox"
                label="Horror"
                value="Horror"
                onChange={handleCheckboxChange}
                />
                
                <Form.Check
                type="checkbox"
                label="Mystery"
                value="Mystery"
                onChange={handleCheckboxChange}
                />
                <Form.Check
                type="checkbox"
                label="Romance"
                value="Romance"
                onChange={handleCheckboxChange}
                />
                 <Form.Check
                type="checkbox"
                label="Thriller"
                value="Thriller"
                onChange={handleCheckboxChange}
                />
                 <Form.Check
                type="checkbox"
                label="Western"
                value="Western"
                onChange={handleCheckboxChange}
                />
                 <Form.Check
                type="checkbox"
                label="Sci-fi"
                value="Sci-fi"
                onChange={handleCheckboxChange}
                />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
          <Form.Group>
               <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                placeholder= "Place an image URL"
                onChange={(e) => setImage(e.target.value)}
                required
                
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Trailer</Form.Label>
              <Form.Control
                type="text"
                value={trailer}
                placeholder= "Place a URL"
                onChange={(e) => setTrailer(e.target.value)}
                required
                
              />
            </Form.Group>
          </Col>
        </Row>
        <Col>
        <div className='isShowing'>
        {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-2">
                <Form.Check 
                type={type}
                id={`default-${type}`}
                label="Movie showing status"
                defaultChecked={switchState}
                onChange={handleChange}
            />
            
            </div>
        ))}
        </div>
        </Col>
        <div className='text-center'>

          <hr></hr>
        <Button variant="btn btn-danger" type="submit">
          Confirm 
        </Button>
        </div>
    </Form>
    </Container>
    );
};

export default AddMovieForm;
