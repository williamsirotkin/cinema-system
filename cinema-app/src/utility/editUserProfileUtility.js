import axios from 'axios'

 function editUserProfile(userJSON) {
   /* const userJSON = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        billing_address: billing_address,
        birthday: birthday,
        oldPassword: oldPassword,
        newPassword: newPassword
    };*/

     let dataJSON = {};
     for (const key in userJSON) {
         if (userJSON.hasOwnProperty(key) && userJSON[key]) {
             dataJSON[key] = userJSON[key];
         }
     }

     axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/editProfile",
<<<<<<< HEAD
        data: dataJSON,
=======
        data: {
            "first_name": firstName,
            "last_name": lastName,
            "billing_address": billing_address,
            "birthday": birthday,
            "email": email
        },
>>>>>>> resetPassword
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