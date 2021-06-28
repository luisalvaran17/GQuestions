export const CreateRespuestaPreguntaAPI = async (RespuestaPregunta) => {
    const response = await fetch("http://127.0.0.1:8000/api/calificacion/respuesta_usuario/create", {
        method: "POST",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(RespuestaPregunta),
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
