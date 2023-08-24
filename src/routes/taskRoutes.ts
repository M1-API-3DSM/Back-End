// src/routes/userRoutes.ts
import express from 'express';
import task from '../models/task';
import { createTask } from '../controllers/taskController';
import { validateModel } from '../validators/modelValidator';

const router = express.Router();

const validateUserModel = validateModel(task);

router.post('/', validateUserModel, createTask);

export default router;