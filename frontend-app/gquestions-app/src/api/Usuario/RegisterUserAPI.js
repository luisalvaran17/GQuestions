import { BASE_DIR } from "../BaseDirURl";

export const RegisterUserAPI = (usuario) => {
    const response = fetch(BASE_DIR + 'api/register', {
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
