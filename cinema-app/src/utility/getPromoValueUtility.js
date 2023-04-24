import axios from 'axios';

async function getPromoValueUtility(promoName) {
    console.log(promoName)
    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/promotions/get-promo-value", 
        method: "post",
        data: {
            "promoName": promoName
        },
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response => {
        return response.data
    }))
    .catch((error) => {
        alert("Promo code is invalid")
        return null
    });
}

export {getPromoValueUtility}