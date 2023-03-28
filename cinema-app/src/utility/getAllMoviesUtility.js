import axios from 'axios';

async function getAllMovies(isDetails) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/movie/getAllMovies", 
        params: {
            isDetails: isDetails
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

export {getAllMovies}