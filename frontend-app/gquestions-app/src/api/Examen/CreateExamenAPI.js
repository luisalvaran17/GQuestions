export const CreateExamenAPI = async (examenConfiguracion) => {
    const response = await fetch("http://127.0.0.1:8000/api/generacion/create/generacion-examen", {
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
