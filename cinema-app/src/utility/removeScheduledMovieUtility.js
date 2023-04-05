import axios from 'axios';

async function removeScheduledMovieUtility(time, showRoom, movieTitle) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/schedule/deleteShowtime", 
        params: {
            room_name: showRoom,
            movie_title: movieTitle,
            showtime: time,
        },
        method: "delete",
    })
    .then((response => {
        return response.data
        // alert("success")
       
    }))
    .catch((error) => {
        alert(error)
       
    });
}

export {removeScheduledMovieUtility}