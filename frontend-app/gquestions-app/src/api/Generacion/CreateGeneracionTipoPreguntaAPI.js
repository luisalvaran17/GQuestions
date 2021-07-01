import { BASE_DIR } from "../BaseDirURl";

export const CreateGeneracionTipoPreguntaAPI = async (generacionTipoPregunta) => {
    const response = await fetch(BASE_DIR + "api/generacion/create/tipo-pregunta", {
        method: "POST",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(generacionTipoPregunta),
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
