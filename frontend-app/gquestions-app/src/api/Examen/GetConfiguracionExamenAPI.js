import { BASE_DIR } from "../BaseDirURl";

export const GetConfiguracionExamenAPI = async(id_configuracion_examen) => {
    const response = await fetch(BASE_DIR + "api/generacion/configuracion-examen/get/" + id_configuracion_examen, {
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
