export const UpdateExamenUsuarioAPI = async (id_examen, Resuelto) => {
    const response = fetch("http://127.0.0.1:8000/api/generacion/update/examen/" + id_examen, {
        method: "PUT",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Resuelto)
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