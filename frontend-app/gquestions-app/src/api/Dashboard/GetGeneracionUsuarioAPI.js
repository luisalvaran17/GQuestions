export const GetGeneracionUsuarioAPI = async(cod_generacion) => {
    const response = await fetch("http://127.0.0.1:8000/api/generacion/get/" + cod_generacion, {
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
