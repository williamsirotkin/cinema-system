import axios from 'axios'

 function getOrderHistory(email) {
     axios({
        url: process.env.REACT_APP_BACKEND_URL + `/order/getInvoice/${email}`,
        data: {
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

export {getOrderHistory}