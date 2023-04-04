import axios from 'axios';

async function getMovieSchedule(movie_title) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/schedule/getMovieSchedule", 
        params: {
            movie_title: movie_title
        },
        method: "get",
    })
    .then((response => {
        return response.data
    }))
    .catch((error) => {
        return null
    });
}

export {getMovieSchedule}