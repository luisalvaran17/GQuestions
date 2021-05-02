export const LoginAPI = (credentials) => {
    const response = fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    }).then(response => {
        if (response.ok) {
            return true;
        }
        else{
            return false;
        }
    }).catch(err => {
        console.log(err)
        return false;
    })

    return response;
}