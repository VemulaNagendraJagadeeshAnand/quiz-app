// models/quiz.model.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true }
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [questionSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;