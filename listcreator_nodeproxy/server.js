const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const prompts = require('./prompts');

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
        const prompt = `${prompts.processExpressions.prompt}${req.body.prompt}`;
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: prompt,
            temperature: prompts.processExpressions.temperature,
            top_p: 1.0,
            max_tokens: prompts.processExpressions.maxTokens,
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
        const prompt = `${prompts.getEasyExpressions.prompt}${req.body.prompt}`;
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: prompt,
            temperature: prompts.getEasyExpressions.temperature,
            max_tokens: prompts.getEasyExpressions.maxTokens,
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
        const prompt = `${prompts.getComplexExpressions.prompt}${req.body.prompt}`;
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: prompt,
            temperature: prompts.getComplexExpressions.temperature,
            max_tokens: prompts.getComplexExpressions.maxTokens,
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