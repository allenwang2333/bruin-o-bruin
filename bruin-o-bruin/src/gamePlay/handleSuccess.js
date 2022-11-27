import axios from "axios";

async function handleSuccess(score, time) {
    const params = new URLSearchParams();
    params.append("score", score);
<<<<<<< HEAD
    params.append('author_name', sessionStorage.getItem("userName"));
    params.append('author_id', sessionStorage.getItem("userID"));
    const response = await axios.post('/success', params);
=======
    params.append('time', time);
    params.append('user_name', sessionStorage.getItem("userName"));
    params.append('user_id', sessionStorage.getItem("userID"));
    const response = await axios.post('success', params);
>>>>>>> 59b1d27f345bfbce678f22fc5e93e2543bb80eb0
    if (response.data[0].valid) {
        alert("You won!")
        window.setTimeout(function () {
            window.location.href = "/home";
        }, 1500);
    } else {
        alert(response.data[1].message);
    }
}

export default handleSuccess