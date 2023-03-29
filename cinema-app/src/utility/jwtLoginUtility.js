import axios from 'axios';

async function jwtLoginUtility() {
    let jwt = localStorage.getItem('jwt');
    if (!jwt) {
        jwt = ""
    }
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/jwt/login", 
        data: {
            "jwt": jwt
        },
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response => {
        return response.data
    }))
    .catch((error) => {
        console.log('JWT has expiredd');
        if (localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt');
        }
        return false
    });
}

export {jwtLoginUtility}
