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
        alert("Email is valid")
        return true
    }))
    .catch((error) => {
        alert("ERROR" + error);
        return false
    });
}

export {checkEmailInUse}