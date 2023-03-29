import axios from 'axios';

async function scheduleMovieAsAdminUtility(day, month, time, showRoom, movieTitle) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/movie/scheduleAsAdmin", 
        params: {
            movieTitle: movieTitle,
            day: day,
            month: month,
            time: time,
            showRoom: showRoom
        },
        method: "post",
    })
    .then((response => {
        return response.data
        // alert("success")
       
    }))
    .catch((error) => {
        alert(error)
       
    });
}

export {scheduleMovieAsAdminUtility}