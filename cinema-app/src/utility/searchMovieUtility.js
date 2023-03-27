import axios from 'axios';

async function searchMovieUtility(query) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/movie/searchMovie", 
        params: {
            query_name: query
        },
        method: "get",
    })
    .then((response => {
        return response
    }))
    .catch((error) => {
        return null
    });
}

export {searchMovieUtility}