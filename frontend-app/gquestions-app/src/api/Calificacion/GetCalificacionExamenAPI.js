import { BASE_DIR } from "../BaseDirURl";

export const GetCalificacionExamenAPI = async(id_examen) => {
    const response = await fetch(BASE_DIR + "api/calificacion/get/" + id_examen, {
        method: "GET",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify()
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
