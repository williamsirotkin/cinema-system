import axios from 'axios';

async function getTimesByRoomNumberUtility(roomNumberCollection) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/schedule/getAllRoomSchedule",
        params: {
            collection: roomNumberCollection
        }, 
        method: "get",
    })
    .then((response => {
        return response.data.showtimes
    }))
    .catch((error) => {
        return null
    });
}

export {getTimesByRoomNumberUtility}