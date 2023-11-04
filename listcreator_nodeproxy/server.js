const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors({
    origin: 'http://localhost:8080',  // replace with your application's URL
    credentials: true,
    methods: 'POST',
}));

const port = process.env.PROXY_PORT || 3000;

app.use(express.json());

app.post('/process-expressions', async (req, res) => {
    checkOpenAIKey(res);

    try {
        const prompt =
            `Ich gebe dir eine Liste an Fachbegriffen. Du erstellst für jeden Begriff eine Erklärung in einem Satz, ohne dabei den Fachbegriff zu nutzen. Außerdem vergibst du ein Komplexitäts-Rating, das bewertet, wie schwer es ist, eine Defintion des Begriffs aus dem Stegreif vorzutragen (1-10). Der Wert 1 soll hier etwa "Pixel" entsprechen, während 10 für Begriffe wie "Quantenverschränkung" gedacht ist. Die Ausgabe erfolgt als JSON mit der folgenden Struktur:
    [{
      "expression": <String>,
      "description_short": <String>,
      "complexity": <int>
    }, ...]
    Hier die Liste:
    ${req.body.prompt}
    
    Deine Ausgabe ist ausschließlich die JSON, nichts anderes.`;
        // console.log(`prompt: ${prompt}`);
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: prompt,
            temperature: 0.2,
            top_p: 1.0,
            max_tokens: 3000,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });
        console.log(`answer from chatGPT: ${response.data.choices[0].text}`);
        res.status(200).json({ result: response.data.choices[0].text });
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
});

app.post('/get-easy-expressions', async (req, res) => {
    checkOpenAIKey(res);
    try {
        const listOfTerms = req.body.terms;

        const prompt = `Sie bekommen eine Liste von Begriffen, die es zu erklären gilt. Ihre Aufgabe ist es, diese Liste um einen weiteren Begriff zu erweitern, der thematisch zu den anderen Begriffen passt. Der Begriff, den Sie hinzufügen, muss einfacher zu erklären sein als all diejenigen, die auf der Liste stehen. Machen Sie eine Liste mit 5 Vorschlägen, ohne die Begriffe zu erklären und antworten Sie mit nichts als einer JSON, die diese 5 Begriffe auf folgende Art beinhaltet:
    [{„expressions“: [<String>, <String>,…]}]
    Hier ist die Liste an Begriffen:
    ${req.body.prompt}`;

        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: prompt,
            temperature: 0.2,
            max_tokens: 1000,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        console.log(`answer from chatGPT: ${response.data.choices[0].text}`);
        res.status(200).json({ result: response.data.choices[0].text });

    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
});

app.post('/get-complex-expressions', async (req, res) => {
    checkOpenAIKey(res);

    try {
        const listOfTerms = req.body.terms;

        const prompt = `Sie bekommen eine Liste von Begriffen, die es zu erklären gilt. Ihre Aufgabe ist es, diese Liste um einen weiteren Begriff zu erweitern, der thematisch zu den anderen Begriffen passt. Der Begriff, den Sie hinzufügen, muss einfacher zu erklären sein als all diejenigen, die auf der Liste stehen. Machen Sie eine Liste mit 5 Vorschlägen, ohne die Begriffe zu erklären und antworten Sie mit nichts als einer JSON, die diese 5 Begriffe auf folgende Art beinhaltet:
    [{„expressions“: [<String>, <String>,…]}]
    Hier ist die Liste an Begriffen:
    ${req.body.prompt}`;

        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: prompt,
            temperature: 0.2,
            max_tokens: 1000,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        console.log(`answer from chatGPT: ${response.data.choices[0].text}`);
        res.status(200).json({ result: response.data.choices[0].text });

    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
});

function checkOpenAIKey(res) {
    if (!process.env.OPENAI_API_KEY) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured.",
            }
        });
        return;
    }
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});