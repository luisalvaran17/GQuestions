import { BASE_DIR } from "../BaseDirURl";

export const CreateGeneracionConfiguracionAPI = async(generacionConfiguracion) => {
    const response = await fetch(BASE_DIR + "api/generacion/create/generacion", {
        method: "POST",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(generacionConfiguracion),
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
