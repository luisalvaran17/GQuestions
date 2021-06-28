export const CreateTextoAPI = async (TextoObject) => {
    const response = await fetch("http://127.0.0.1:8000/api/generacion/create/texto", {
        method: "POST",
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(TextoObject),
    }).then((res) => {
            if (res.ok) {
                return true;
            }else{
                return false;
            }
        }).catch(err => {
            console.error(err)
            return false;
        })
    return response
}
