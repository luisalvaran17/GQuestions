import { BASE_DIR } from "../BaseDirURl";

export const CreatePreguntaAPI = async (pregunta) => {
    const response = await fetch(BASE_DIR + "api/generacion/create/pregunta", {
        method: "POST",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pregunta),
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
