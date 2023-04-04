import axios from 'axios';

async function getMovieSchedule(movie_title, movie_id) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/schedule/getMovieSchedule", 
        params: {
            movie_title: movie_title,
            movie_id: movie_id
        },
        method: "get",
    })
    .then((response => {
        console.log(response.data.schedule)
        return response.data
    }))
    .catch((error) => {
        return null
    });
}

export {getMovieSchedule}