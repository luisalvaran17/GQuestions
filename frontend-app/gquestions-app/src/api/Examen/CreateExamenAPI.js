import { BASE_DIR } from "../BaseDirURl";

export const CreateExamenAPI = async (examen) => {
    const response = await fetch(BASE_DIR + "api/generacion/create/examen", {
        method: "POST",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(examen),
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
