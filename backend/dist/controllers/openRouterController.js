"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callOpenRouter = exports.getModels = void 0;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY || '', // Ensure the API key is loaded from environment variables
    defaultHeaders: {
        'X-Title': 'StellifyIt', // Replace with your site name
    },
});
// Fetch available models
const getModels = async (req, res) => {
    try {
        const models = await openai.models.list();
        res.status(200).json(models.data);
    }
    catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).json({
            message: 'Failed to fetch models',
            error: error.message,
        });
    }
};
exports.getModels = getModels;
// Call OpenRouter with a specific model
const callOpenRouter = async (req, res) => {
    const { prompt, model } = req.body;
    if (!prompt) {
        res.status(400).json({ message: 'Prompt is required' });
        return;
    }
    if (!model) {
        res.status(400).json({ message: 'Model is required' });
        return;
    }
    try {
        const completion = await openai.chat.completions.create({
            model,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });
        res.status(200).json(completion.choices[0].message);
    }
    catch (error) {
        console.error('Error calling OpenRouter:', error);
        res.status(500).json({
            message: 'Failed to call OpenRouter',
            error: error.message,
        });
    }
};
exports.callOpenRouter = callOpenRouter;
