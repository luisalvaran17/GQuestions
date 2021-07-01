import { BASE_DIR } from "../BaseDirURl";

export const CreateConfiguracionExamenAPI = async (examenConfiguracion) => {
    const response = await fetch(BASE_DIR + "api/generacion/create/configuracion-examen", {
        method: "POST",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(examenConfiguracion),
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
