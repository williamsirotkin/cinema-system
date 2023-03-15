import axios from 'axios'
import { isRouteErrorResponse } from 'react-router-dom';

async function checkEmailInUse(email) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/checkEmailInUse", 
        data: {
            "email": email
        },
        method: "post",
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

export {checkEmailInUse}