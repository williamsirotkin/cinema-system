import axios from 'axios';

async function searchMoviesByCategoryUtility(category) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/movie/searchByCategory", 
        params: {
            category: category
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

export {searchMoviesByCategoryUtility}