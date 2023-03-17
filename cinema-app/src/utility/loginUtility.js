import axios from 'axios';

async function loginUtility(email, password) {
    let jwt = localStorage.getItem('jwt');
    if (!jwt) {
        jwt = ""
    }
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/login", 
        data: {
            "email": email,
            "password": password,
            "jwt": jwt
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
        if (error.response.status != 404) {
            console.log('JWT has expired');
            localStorage.removeItem('jwt');
          }
        return false
    });
}

export {loginUtility}
