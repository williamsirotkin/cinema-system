import axios from 'axios';

async function createMovie(title, MPAA_rating, photo_link, trailer_link, isShowing, category, cast, director, producer, synopsis, reviews) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/movie/addMovie", 
        data: {
            "title": title,
            "MPAA_rating": MPAA_rating,
            "photo_link": photo_link,
            "trailer_link": trailer_link,
            "isShowing": isShowing,
            "category": category,
            "cast": cast,
            "director": director,
            "producer": producer,
            "synopsis": synopsis,
            "reviews": reviews
        },
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response => {
        alert("sucess")
    }))
    .catch((error) => {
        alert("Failed")
    });
}

export {createMovie}