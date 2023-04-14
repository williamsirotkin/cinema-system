import axios from 'axios'

async function getTakenSeatsUtility(room, showtime) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/movie/api/getSeatIndices", 
        data: {
            "room": room,
            "showtime": showtime
        },
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response => {
        console.log(response.data.false_indices)
        return response.data.false_indices
    }))
    .catch((error) => {
        console.log(error)
        return []
    });
}

export {getTakenSeatsUtility}