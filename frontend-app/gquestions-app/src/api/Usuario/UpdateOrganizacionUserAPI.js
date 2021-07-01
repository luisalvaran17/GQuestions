import { BASE_DIR } from "../BaseDirURl";

export const UpdateOrganizacionUserAPI = async (id_user, informacionAdicional) => {
    const response = fetch(BASE_DIR + "api/update-organizacion-user/" + id_user, {
        method: "PUT",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(informacionAdicional)
    }).then((res) => {
        if (res.ok) {
            return true;
        }
        else {
            return false;
        }
    })
        .catch(err => {
            console.error(err)
            return false;
        })
    return response;
}
