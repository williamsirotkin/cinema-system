import axios from 'axios';

async function removeMovie(title) {

    return await axios({
        url: process.env.REACT_APP_BACKEND_URL + "/movie/removeMovie", 
        params: {
            title: title
        },
        method: "delete",
    })
    .then((response => {
        return response.data
        // alert("success")
       
    }))
    .catch((error) => {
        alert(error)
       
    });
}

export {removeMovie}