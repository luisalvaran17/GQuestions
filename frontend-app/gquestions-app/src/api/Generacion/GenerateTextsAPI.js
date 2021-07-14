
export const GenerateTextsAPI = async (sentence, max_length) => {
    const response_text = await fetch("https://api-inference.huggingface.co/models/gpt2", {
        method: "POST",
        headers: {
            Authorization: "Bearer api_SKaXQfwcGKkADMccvESvSTuyQZwWOrhDYi",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "inputs": sentence, "parameters": { "max_length": max_length, "num_return_sequences": 1 } }),
    })
    .then((res) => res.json())
    .then((json) => {
        return json;
    }).catch(err => {
        console.log(err)
        return false;
    })
    return response_text;
}
