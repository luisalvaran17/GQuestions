export const CreateTextoAPI = async (TextoObject) => {
    await fetch("http://127.0.0.1:8000/api/generacion/create/texto", {
        method: "POST",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(TextoObject),
    }).catch(err => console.error(err))
}
