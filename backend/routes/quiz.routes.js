// routes/quiz.routes.js
import express from 'express';
import Quiz from '../models/quiz.model.js';

const router = express.Router();

// GET all quizzes
router.get('/', async(req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new quiz
router.post('/', async(req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;