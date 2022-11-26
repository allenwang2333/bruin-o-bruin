import axios from "axios";

async function handleSuccess(score) {
    const params = new URLSearchParams();
    params.append("score", score);
    params.append('author_name', sessionStorage.getItem("userName"));
    params.append('author_id', sessionStorage.getItem("userID"));
    const response = await axios.post('/success', params);
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