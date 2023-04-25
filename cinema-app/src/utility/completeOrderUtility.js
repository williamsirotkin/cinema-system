import axios from 'axios'

 function completeOrderUtility(total, movie, seats, promo, promoValue, email) {
    if (!promo) {
        promo = ""
    }
     axios({
        url: process.env.REACT_APP_BACKEND_URL + "/order/reserveTickets",
        data: {
            "total": total, 
            "movie": movie,
            "seats": seats,
            "promoApplied": promo,
            "promoValue": promoValue,
            "email": email
        },
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response => {
            console.log(response.data)
            return true
        }))
        .catch((error) => {
            return false
        });
}

export {completeOrderUtility}