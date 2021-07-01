import { BASE_DIR } from "../BaseDirURl";

export const UpdateCalificacionAPI = async (id_calificacion, calificacionObj) => {
    const response = fetch(BASE_DIR + "api/generacion/update/calificacion/" + id_calificacion, {
        method: "PUT",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(calificacionObj)
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