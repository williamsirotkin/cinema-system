import axios from 'axios';

async function getDatesByTitle(title) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/schedule/getSortedShowtimes",
        params: {
            "movie_title": title
        },
        method: "get",
    })
    .then((response => {
        console.log(response.data)
        return response.data
    }))
    .catch((error) => {
        return null
    });
}

export {getDatesByTitle}