"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const openRouterController_1 = require("../controllers/openRouterController");
const router = (0, express_1.Router)();
router.get('/models', openRouterController_1.getModels); // Fetch available models
router.post('/', openRouterController_1.callOpenRouter); // Call OpenRouter with a specific model
exports.default = router;
