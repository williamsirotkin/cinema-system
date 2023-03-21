import axios from 'axios'
import {useNavigate} from "react-router-dom"

async function checkActive(email) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/checkActive", 
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

export {checkActive}