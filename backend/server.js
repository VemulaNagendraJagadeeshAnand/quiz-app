import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import quizRoutes from './routes/quiz.routes.js';

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Initialize express
const app = express();

// ✅ Middleware
app.use(cors({
    origin: [
        'https://quiz-delta-steel.vercel.app', // your Vercel frontend URL
        'http://localhost:4200' // for local testing
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// ✅ Default route for testing
app.get('/', (req, res) => {
    res.send('✅ Quiz API is running successfully...');
});

// ✅ Quiz routes
app.use('/api/quizzes', quizRoutes);

// ✅ Server Port
const PORT = process.env.PORT || 5000;

// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});