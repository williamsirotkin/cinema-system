import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import './EditMovie.css'

const AddMovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
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

  const {rating} = movieRating;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${movieRating.rating}`);
  };
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

  
  

  return (
    <Container>
    
    <h1 className='register'>Add/Edit movie</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="releaseYear">
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Producer</Form.Label>
              <Form.Control
                type="text"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="releaseYear">
              <Form.Label>Cast</Form.Label>
              <Form.Control
                type="text"
                value={stars}
                placeholder= "add cast with comma in between"
                onChange={(e) => setStars(e.target.value)}
                
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
                
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="releaseYear">
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
                
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="releaseYear">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                value={genre}
                placeholder= "add cast with comma in between"
                onChange={(e) => setGenre(e.target.value)}
                
              />
            </Form.Group>
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
