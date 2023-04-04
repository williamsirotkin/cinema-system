import axios from 'axios';

async function getMovieByTitle(title) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/movie/getMovieByTitle",
        params: {
            "title": title
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

export {getMovieByTitle}