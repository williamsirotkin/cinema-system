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
        return 0
    }))
    .catch((error) => {
        if (error.response.status === 400) {
            return 1
          } else if (error.response.status === 405) {
            return 2
          }
        return false
    });
}

export {checkActive}