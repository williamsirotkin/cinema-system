import axios from 'axios';

async function scheduleMovieAsAdminUtility(time, showRoom, movieTitle, movieID) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/schedule/scheduleMovie", 
        params: {
            collection: showRoom,
        },
        data: {
            showtime: time,
            movie_title: movieTitle,
            movie_id: movieID
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

/*
 'showtime': datetime.fromisoformat(request.json.get('showtime')),
            'movie_id': ObjectId(request.json.get('movie_id')),
            'movie_title': request.json.get('movie_title'),
            'seats_available': seats_available,
            "roomData": {"room_Id": "collection"}
*/

export {scheduleMovieAsAdminUtility}