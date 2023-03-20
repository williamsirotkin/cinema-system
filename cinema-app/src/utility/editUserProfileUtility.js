import axios from 'axios'

async function editUserProfile(firstName, lastName, email) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/editProfile",
        data: {
            "email": email,
            "first_name": firstName,
            "last_name": lastName
        },
        method: "POST",
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