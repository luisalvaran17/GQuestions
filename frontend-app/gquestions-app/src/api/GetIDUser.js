export const GetIDUser = (email) => {
    fetch(
        "http://127.0.0.1:8000/api/id-user/" +
        email,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    ).then((res) => res.json())
        .then((json) => {
            localStorage.setItem("id_user", json[0].id)
        });
}
