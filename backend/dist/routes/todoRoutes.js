"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
router.get('/', todoController.getTodos);
exports.default = router;
