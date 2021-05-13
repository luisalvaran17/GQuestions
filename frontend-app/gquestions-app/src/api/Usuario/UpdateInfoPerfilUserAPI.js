export const UpdateInfoPerfilUserAPI = async (id_user, informacionPerfil) => {
    const response = fetch("http://127.0.0.1:8000/api/update-info-user/" + id_user, {
        method: "PUT",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(informacionPerfil)
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
