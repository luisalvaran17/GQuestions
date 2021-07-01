import { BASE_DIR } from "../BaseDirURl";

export const LoginAPI = (credentials) => {
    const response = fetch(BASE_DIR + "api/login", {
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