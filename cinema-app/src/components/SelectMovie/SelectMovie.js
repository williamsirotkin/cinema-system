import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import './SelectMovie.css'
import Collapse from 'react-bootstrap/Collapse';
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';


export default function SelectMovie() {

  const [open, setOpen] = useState(false);
  return (
  <div>
  <div class = "movie-row">

  <Card style={{ width: '20rem' }}>
  <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg"/>
  <Card.Body>
    <Card.Title> The Batman </Card.Title>
    <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>
    <Accordion className='accordion'>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
        When a sadistic serial killer begins murdering key political figures in Gotham, 
        Batman is forced to investigate the city's hidden corruption and question his family's involvement.
        <hr />
        Director: Matt Reeves
        <hr />
        Writers: Matt Reeves, Peter Craig, Bob Kane
        <hr />
        Stars: Robert Pattinson, Zoë Kravitz, Jeffrey Wright
        <br></br>
        <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  </Card.Body>
</Card>
  
<Card style={{ width: '20rem' }}>
  <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" 
  />
  <Card.Body>
    <Card.Title> Intersteller </Card.Title>
    <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>
    <Accordion className='accordion'>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
        A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.
        <hr />
        Director: Christopher Nolan
        <hr />
        Writers: Jonathan Nolan, Christopher Nolan
        <hr />
        Stars: Matthew McConaughey, Anne Hathaway, Jessica Chastain
        <br></br>
        <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  </Card.Body>
</Card>


<Card style={{ width: '20rem' }}>
<Card.Img variant="top" src="https://broadbandforum.co/attachments/oppenheimer-webp.6209/" />
  <Card.Body>
    <Card.Title> Oppenheimer </Card.Title>
    <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>
    <Accordion className='accordion'>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
        The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.
        <hr />
        Director: Christopher Nolan
        <hr />
        Writers: Jonathan Nolan, Kai Bird, Martin Sherwin
        <hr />
        Stars: Cillian Murphy, Emily Blunt, Matt Damon
        <br></br>
        <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>

  </Card.Body>
</Card>
<Card style={{ width: '20rem' }}>
  <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" />
  <Card.Body>
    <Card.Title> Guardians of The Galaxy vol.3 </Card.Title>
    <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>

    <Accordion className='accordion'>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
        Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own 
        - a mission that could mean the end of the Guardians if not successful.
        <hr />
        Director: James Gunn
        <hr />
        Writers: James Gunn, Dan Abnett, Andy Lanning
        <hr />
        Stars: Chris Pratt, Zoe Saldana, Dave Bautista
        <br></br>
        <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  </Card.Body>
</Card>
<Card style={{ width: '20rem' }}>
  <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg" />
  <Card.Body>
    <Card.Title> The Batman </Card.Title>
    <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>
    <Accordion className='accordion'>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
        The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.
        <hr />
        Director: Christopher Nolan
        <hr />
        Writers: Jonathan Nolan, Kai Bird, Martin Sherwin
        <hr />
        Stars: Cillian Murphy, Emily Blunt, Matt Damon
        <br></br>
        <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  </Card.Body>
</Card>
</div>

<div class = "movie-row">
    <Card style={{ width: '20rem' }}>
  <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg" />
  <Card.Body>
    <Card.Title> The Batman </Card.Title>
    <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>
    <Accordion className='accordion'>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
        When a sadistic serial killer begins murdering key political figures in Gotham, 
        Batman is forced to investigate the city's hidden corruption and question his family's involvement.
        <hr />
        Director: Matt Reeves
        <hr />
        Writers: Matt Reeves, Peter Craig, Bob Kane
        <hr />
        Stars: Robert Pattinson, Zoë Kravitz, Jeffrey Wright
        <br></br>
        <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  </Card.Body>
</Card>
<Card style={{ width: '20rem' }}>
  <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" />
  <Card.Body>
  <Card.Title> Intersteller </Card.Title>
  <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>
  <Accordion className='accordion'>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
        A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.
        <hr />
        Director: Christopher Nolan
        <hr />
        Writers: Jonathan Nolan, Christopher Nolan
        <hr />
        Stars: Matthew McConaughey, Anne Hathaway, Jessica Chastain
        <br></br>
        <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  </Card.Body>
</Card>

<Card style={{ width: '20rem' }}>
<Card.Img variant="top" src="https://broadbandforum.co/attachments/oppenheimer-webp.6209/" />
  <Card.Body>
  <Card.Title> Oppenheimer </Card.Title>
    <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>
    <Accordion className='accordion'>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
        The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.
        <hr />
        Director: Christopher Nolan
        <hr />
        Writers: Jonathan Nolan, Kai Bird, Martin Sherwin
        <hr />
        Stars: Cillian Murphy, Emily Blunt, Matt Damon
        <br></br>
        <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  </Card.Body>
</Card>
<Card style={{ width: '20rem' }}>
  <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg" />
  <Card.Body>
  <Card.Title> Guardians of The Galaxy vol.3 </Card.Title>
    <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>

    <Accordion className='accordion'>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
        Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own 
        - a mission that could mean the end of the Guardians if not successful.
        <hr />
        Director: James Gunn
        <hr />
        Writers: James Gunn, Dan Abnett, Andy Lanning
        <hr />
        Stars: Chris Pratt, Zoe Saldana, Dave Bautista
        <br></br>
        <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  </Card.Body>
</Card>
<Card style={{ width: '20rem' }}>
  <Card.Img variant="top" src="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg" />
  <Card.Body>
  <Card.Title> The Batman </Card.Title>
    <Link to  = "/selectshowtime"><Button variant="btn btn-dark"> Select showtime</Button></Link>
    <Accordion className='accordion'>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
        The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.
        <hr />
        Director: Christopher Nolan
        <hr />
        Writers: Jonathan Nolan, Kai Bird, Martin Sherwin
        <hr />
        Stars: Cillian Murphy, Emily Blunt, Matt Damon
        <br></br>
        <a href="https://www.youtube.com/watch?v=zSWdZVtXT7E" target="_blank"><Button variant="dark" size="md" className='trailerBtn'>Watch trailer</Button></a>
        </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  </Card.Body>
</Card>


</div>
</div>
)
}
