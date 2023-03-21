import axios from 'axios';

async function loginUtility(email, password, rememberMe) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/login", 
        data: {
            "email": email,
            "password": password,
            "remember_me": rememberMe
        },
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response => {
        localStorage.setItem("jwt", response.data.token)
        console.log(localStorage.getItem("jwt"))
        return {
            "token": response.data.token,
            "admin": response.data.admin
        }
    }))
    .catch((error) => {
        return false
    });
}

export {loginUtility}
