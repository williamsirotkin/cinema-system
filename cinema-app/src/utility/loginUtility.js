import axios from 'axios';

function login(email, password) {
    axios({
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
        if (response.status === 200) {
            alert("You can login");
        } else {
            alert("Wrong password")
        }
    }))
    .catch((error) => {
        alert("Wrong password")
        console.log("ERROR" + error);
    });
}

export {login}
