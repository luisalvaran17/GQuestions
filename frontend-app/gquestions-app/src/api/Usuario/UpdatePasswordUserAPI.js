import { BASE_DIR } from "../BaseDirURl";

export const UpdatePasswordUserAPI = async (id_user, Contraseñas) => {
    const response = fetch(BASE_DIR + "api/change-password/" + id_user, {
        method: "PUT",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Contraseñas)
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
