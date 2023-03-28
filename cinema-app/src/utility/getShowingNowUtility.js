import axios from 'axios';

async function getShowingNow() {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/movie/get/Showing", 
        method: "get",
    })
    .then((response => {
        return response.data
    }))
    .catch((error) => {
        return null
    });
}

export {getShowingNow}