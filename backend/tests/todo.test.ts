import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import { Express } from 'express';
import app from '../src/app';

describe('GET /todos', () => {
  it('should return all todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});