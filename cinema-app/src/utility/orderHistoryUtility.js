import axios from 'axios'

 async function getOrderHistory(email) {
     return await axios({
        url: process.env.REACT_APP_BACKEND_URL + `/order/getInvoice/${email}`,
        data: {
           "email": email
        },
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response => {
            return response.data
        }))
        .catch((error) => {
            return false
        });
}

export {getOrderHistory}