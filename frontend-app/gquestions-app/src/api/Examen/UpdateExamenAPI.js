import { BASE_DIR } from "../BaseDirURl";

export const UpdateExamenAPI = async (id_examen, assigned_to) => {
    const response = fetch(BASE_DIR + "api/generacion/update/examen/" + id_examen, {
        method: "PUT",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(assigned_to)
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