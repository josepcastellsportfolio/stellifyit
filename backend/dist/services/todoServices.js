"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Todo = require('../models/Todo');
const TodoService = {
    async getAllTodos() {
        return await Todo.findAll();
    },
};
module.exports = TodoService;
