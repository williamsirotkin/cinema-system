import axios from 'axios';

async function resetUtility(newPassword) {
    console.log(window.location.pathname.substring(79))
    let email = window.location.pathname.substring(79)

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/resetPassword/" + email, 
        data: {
            "newPassword": newPassword,
        },
        method: "patch",
    })
    .then((response => {
        return true
    }))
    .catch((error) => {
        return false
    });
}

export {resetUtility}