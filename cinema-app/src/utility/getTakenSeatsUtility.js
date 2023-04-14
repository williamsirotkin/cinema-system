import axios from 'axios'

async function getTakenSeatsUtility(room, showtime) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/seats/getTaken", 
        data: {
            "room": room,
            "showtime": showtime
        },
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response => {
        console.log(response)
        return true
    }))
    .catch((error) => {
        return false
    });
}

export {getTakenSeatsUtility}