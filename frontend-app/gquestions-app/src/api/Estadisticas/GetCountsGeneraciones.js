import { BASE_DIR } from "../BaseDirURl";

export const GetCountsGeneraciones = async (account) => {
    const response = await fetch(BASE_DIR + "api/generacion/get/count/generaciones/" + account, {
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
