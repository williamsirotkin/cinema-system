import axios from 'axios'

 function completeOrderUtility(total, movie, seats, promos) {
     axios({
        url: process.env.REACT_APP_BACKEND_URL + "/orders/setOrder",
        data: {
            "total": total, 
            "movie": movie,
            "seats": seats,
            "promos": promos
        },
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response => {
            return true
        }))
        .catch((error) => {
            return false
        });
}

export {completeOrderUtility}