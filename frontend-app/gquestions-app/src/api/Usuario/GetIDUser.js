export const GetIDUser = async (email) => {
    const response = await fetch(
        "http://127.0.0.1:8000/api/id-user/" +
        email,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    ).then((res) => res.json())
        .then((json) => {
            return json[0].id
        }).catch((err) => {
            return false;
        })
    return response;
}       
