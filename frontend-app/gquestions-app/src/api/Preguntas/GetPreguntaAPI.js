import { BASE_DIR } from "../BaseDirURl";

export const GetPreguntaAPI = async(id_pregunta) => {
    const response = await fetch(BASE_DIR + "api/generacion/get/pregunta/" + id_pregunta, {
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
