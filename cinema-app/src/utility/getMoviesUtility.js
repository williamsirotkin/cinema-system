import axios from 'axios';

async function getMoviesUtility(type) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/movie/get/" + type, 
        method: "get",
    })
    .then((response => {
        return response.data
    }))
    .catch((error) => {
        return null
    });
}

export {getMoviesUtility}