const express = require("express");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const app = express();

app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.static("public"));

app.post("/ask", async (req, res) => {

    try{

    const question = req.body.question;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Answer the question clearly and concisely.
                   Use sentences when a short answer is enough.
                   Use a short paragraph when an explanation is needed.
                   Use bullet points or steps when they make the answer easier to understand.
                   Do not give unnecessary details.
                   Do not use Markdown formatting or special symbols such as *, #, -, _, or backticks.
                   Return only clean plain text.

Question: ${question}`
    });

    res.json({
        answer: response.text
    });


}catch (error){

    console.log("GEMINI ERROR:");
    console.log(error.message);

    res.status(500).json({
        answer: "Something went wrong. Please try again."
    });

}

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});