import axios from 'axios';

async function login(email, password) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/login", 
        data: {
            "email": email,
            "password": password
        },
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response => {
        console.log("Correct login")
        return true
    }))
    .catch((error) => {
        console.log("ERROR" + error);
        return false
    });
}

export {login}
