import { Router } from 'express';
import { getModels, callOpenRouter } from '../controllers/openRouterController';

const router = Router();

router.get('/models', getModels); // Fetch available models
router.post('/', callOpenRouter); // Call OpenRouter with a specific model

export default router;