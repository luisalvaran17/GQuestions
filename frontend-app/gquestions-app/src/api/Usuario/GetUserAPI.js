import { BASE_DIR } from "../BaseDirURl";

export const GetUserAPI = async (id_user) => {
    const response = await fetch(BASE_DIR + "api/usuarios/" + id_user, {
        method: "GET",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((json) => {
            return json;
        }).catch(err => {
            console.log(err)
            return false;
        })
    return response;
}
