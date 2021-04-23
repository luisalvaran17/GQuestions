export const getToken = (credentials) => {
    const response = fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    })
        .then((res) => res.json())
        .then((json) => {
            return json.token;
        }).catch(err => {
            console.log(err)
            return false;
        })
    return response;
}
