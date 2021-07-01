import { BASE_DIR } from "../BaseDirURl";

export const CreateCalificacionAPI = async (Calificacion) => {
    const response = await fetch(BASE_DIR + "api/calificacion/create", {
        method: "POST",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Calificacion),
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
