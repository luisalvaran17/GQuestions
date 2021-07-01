import { BASE_DIR } from "../BaseDirURl";

export const UpdateExamenUsuarioAPI = async (id_examen, Resuelto) => {
    const response = fetch(BASE_DIR + "api/generacion/update/examen/" + id_examen, {
        method: "PUT",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Resuelto)
    }).then((res) => {
        if (res.ok) {
            return true;
        }
    })
    .catch(err => {
        console.error(err)
        return false;
    })
    return response;
}