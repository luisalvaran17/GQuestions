import { BASE_DIR } from "../BaseDirURl";

export const UpdateTerminosUserAPI = async (id_user, terminos) => {
    const response = fetch(BASE_DIR + "api/update-terminos-user/" + id_user, {
        method: "PUT",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(terminos)
    }).then((res) => {
        if (res.ok) {
            return true;
        }   
        else {
            return false;
        }
    })
        .catch(err => {
            console.error(err)
            return false;
        })
    return response;
}
