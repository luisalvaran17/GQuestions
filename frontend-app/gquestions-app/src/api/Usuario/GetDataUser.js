import { BASE_DIR } from "../BaseDirURl";

export const GetDataUser = async (email) => {
    const response = await fetch(
        BASE_DIR + "api/id-user/" +
        email,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    ).then((res) => res.json())
        .then((json) => {
            return json[0]
        }).catch((err) => {
            return false;
        })
    return response;
}       
