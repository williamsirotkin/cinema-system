import axios from 'axios';

function createProfile(firstName, lastName, email, password) {
    axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/create", 
        data: {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password
        },
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response => {
        console.log("Hello")
        console.log(response);
    }))
    .catch((error) => {
        console.log("ERROR" + error);
    });
}

export {createProfile}
