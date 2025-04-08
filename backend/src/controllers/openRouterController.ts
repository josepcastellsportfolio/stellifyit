import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '', // Ensure the API key is loaded from environment variables
  defaultHeaders: {
    'X-Title': 'StellifyIt', // Replace with your site name
  },
});

// Fetch available models
const getModels = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching models from OpenRouter...'); // Debugging log
    const models = await openai.models.list();
    console.log('Models fetched:', models); // Debugging log
    res.status(200).json(models.data);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({
      message: 'Failed to fetch models',
      error: (error as any).message,
    });
  }
};

// Enhanced error handling for specific HTTP status codes
const callOpenRouter = async (req: Request, res: Response): Promise<void> => {
  const { prompt, model } = req.body;
console.log('Received request to call OpenRouter:', { prompt, model }); // Debugging log
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
  } catch (error: any) {
    console.error('Error calling OpenRouter:', error);

    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          res.status(400).json({ message: 'Bad Request: Invalid or missing parameters, or CORS issue' });
          break;
        case 401:
          res.status(401).json({ message: 'Invalid credentials: OAuth session expired or invalid API key' });
          break;
        case 402:
          res.status(402).json({ message: 'Insufficient credits: Add more credits and retry the request' });
          break;
        case 403:
          res.status(403).json({ message: 'Moderation required: Your input was flagged' });
          break;
        case 408:
          res.status(408).json({ message: 'Request timed out' });
          break;
        case 429:
          res.status(429).json({ message: 'Rate limited: Too many requests' });
          break;
        case 502:
          res.status(502).json({ message: 'Model is down or invalid response received' });
          break;
        case 503:
          res.status(503).json({ message: 'No available model provider meets routing requirements' });
          break;
        default:
          res.status(status).json({ message: `Unexpected error: ${error.response.statusText}` });
      }
    } else {
      res.status(500).json({
        message: 'Failed to call OpenRouter',
        error: error.message,
      });
    }
  }
};

export { getModels, callOpenRouter };