import axios from 'axios';

async function createProfile(firstName, lastName, email, password, billingAddress, promos, cardInfo, birthday) {
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/profile/create", 
        data: {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password,
            "billing_address": billingAddress,
            "promos": promos,
            "card_info": cardInfo,
            "birthday": birthday
        },
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response => {
        return (response.data.email_token)
    }))
    .catch((error) => {
    });
}

export {createProfile}
