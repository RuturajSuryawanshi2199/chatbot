// File: server.js

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/api/company-insights/:companyName', async (req, res) => {
    const companyName = req.params.companyName;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

        const prompt = `
            Analyze "${companyName}" for a student preparing for job placements in India. Provide the following information in a structured JSON object. Do not include any text, markdown, or comments before or after the JSON object.

            The JSON object must contain these exact keys: "companyTrends", "faq", "vacancyData", "aptitudeOverview".

            - "companyTrends": A list of 3 recent, significant trends about the company. Each item must be an object with a "trend" (a short title) and a "description" (a 1-2 sentence explanation).
            - "faq": A list of 5 frequently asked interview questions for software engineering roles at this company. Each item must be an object with a "question" and a concise "answer".
            - "vacancyData": A short, insightful paragraph analyzing the common types of job roles (e.g., "Frontend Development," "Cloud Infrastructure," "Machine Learning") this company is actively hiring for.
            - "aptitudeOverview": A short, helpful paragraph describing the typical aptitude tests or online assessment rounds the company uses in its hiring process (e.g., "cognitive tests on platforms like AMCAT," "coding challenges on HackerRank," "system design problems").
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // This is the new, corrected part that cleans the response from the AI
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const jsonResponse = JSON.parse(cleanedText);

        res.json(jsonResponse);

    } catch (error) {
        console.error('Error processing data from Gemini API:', error);
        res.status(500).json({ error: 'Failed to process AI-powered insights.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});