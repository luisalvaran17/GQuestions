import { BASE_DIR } from "../BaseDirURl";

export const GetToken = (credentials) => {
    const response = fetch(BASE_DIR + "api/login", {
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
