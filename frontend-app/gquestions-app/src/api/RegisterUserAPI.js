export const RegisterUserAPI = (usuario) => {
    const response = fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(usuario),
    })
        .then(data => {
            if (data.ok === true) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => console.error(error));
    return response;
}
