export const CreateGeneracionConfigAPI = async (generacionConfiguracion) => {
    const response = await fetch("http://127.0.0.1:8000/api/generacion/configuracion/", {
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
