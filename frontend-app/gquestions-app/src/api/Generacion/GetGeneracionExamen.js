import { BASE_DIR } from "../BaseDirURl";

export const GetGeneracionExamen = async (cod_generacion) => {
    const response = await fetch(BASE_DIR + "api/generacion/get/" + cod_generacion, {
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
