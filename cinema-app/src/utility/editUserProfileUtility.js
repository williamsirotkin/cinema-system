import axios from 'axios'

 function editUserProfile(firstName, lastName,password,billing_address,birthday, email) {
     axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/editProfile",
        data: {
            "first_name": firstName,
            "last_name": lastName,
            "password": password,
            "billing_address": billing_address,
            "birthday": birthday,
            "email": email
        },
        method: "PATCH",
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

export {editUserProfile}