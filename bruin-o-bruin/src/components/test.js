import React from "react";
const test = () => {
    async function get() {
        const params = new URLSearchParams();
        const response = await fetch('http://localhost:8080/test', { method: 'POST', body: params });
        axios.get('/weather').then((res) => {
            console.log(res);
        });
    }
    get();
    return (
        <div>
            <h1>Test</h1>
        </div>
    );
};
export default test;