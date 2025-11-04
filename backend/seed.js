import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Quiz from "./models/quiz.model.js";

dotenv.config();
connectDB();

const quizzes = [{
        title: "HTML & CSS",
        questions: [
            { questionText: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Transfer Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correctAnswer: 0 },
            { questionText: "Which tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<hyper>"], correctAnswer: 1 },
            { questionText: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], correctAnswer: 2 },
            { questionText: "What does the <br> tag do?", options: ["Adds space", "Makes text bold", "Breaks a line", "Adds paragraph"], correctAnswer: 2 },
            { questionText: "Which property sets background color in CSS?", options: ["bgcolor", "background-color", "color", "back-color"], correctAnswer: 1 },
            { questionText: "Which tag is used for inserting an image?", options: ["<img>", "<image>", "<pic>", "<src>"], correctAnswer: 0 },
        ],
    },
    {
        title: "JavaScript",
        questions: [
            { questionText: "Which company developed JavaScript?", options: ["Netscape", "Microsoft", "Google", "Apple"], correctAnswer: 0 },
            { questionText: "Which keyword declares a variable?", options: ["int", "let", "declare", "dim"], correctAnswer: 1 },
            { questionText: "Which symbol is used for comments?", options: ["//", "#", "<!--", "/* */"], correctAnswer: 0 },
            { questionText: "Which method converts JSON string to object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "parse.JSON()"], correctAnswer: 0 },
            { questionText: "Which function displays output in console?", options: ["alert()", "console.log()", "display()", "prompt()"], correctAnswer: 1 },
            { questionText: "Which operator is used to compare both value and type?", options: ["==", "=", "===", "!="], correctAnswer: 2 },
        ],
    },
    {
        title: "Python",
        questions: [
            { questionText: "Who developed Python?", options: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Tim Berners-Lee"], correctAnswer: 0 },
            { questionText: "Which keyword defines a function?", options: ["define", "def", "func", "lambda"], correctAnswer: 1 },
            { questionText: "Which data type is immutable?", options: ["List", "Set", "Tuple", "Dictionary"], correctAnswer: 2 },
            { questionText: "What is the output of len('Python')?", options: ["5", "6", "7", "Error"], correctAnswer: 1 },
            { questionText: "Which operator is used for exponentiation?", options: ["^", "**", "//", "exp()"], correctAnswer: 1 },
            { questionText: "Which function returns object type?", options: ["typeof()", "type()", "instance()", "objtype()"], correctAnswer: 1 },
        ],
    },
    {
        title: "Database (SQL)",
        questions: [
            { questionText: "Which command removes all rows but not structure?", options: ["DELETE", "DROP", "TRUNCATE", "REMOVE"], correctAnswer: 2 },
            { questionText: "Which keyword sorts the result-set?", options: ["SORT", "ORDER", "ORDER BY", "GROUP BY"], correctAnswer: 2 },
            { questionText: "Which constraint ensures unique values?", options: ["PRIMARY KEY", "UNIQUE", "NOT NULL", "CHECK"], correctAnswer: 1 },
            { questionText: "Which SQL statement retrieves data?", options: ["GET", "SELECT", "READ", "VIEW"], correctAnswer: 1 },
            { questionText: "Which clause filters rows?", options: ["WHERE", "HAVING", "ORDER BY", "GROUP"], correctAnswer: 0 },
            { questionText: "Which keyword groups rows with same values?", options: ["ORDER", "UNION", "GROUP BY", "JOIN"], correctAnswer: 2 },
        ],
    },
    {
        title: "Computer Networks",
        questions: [
            { questionText: "What does IP stand for?", options: ["Internet Protocol", "Internal Process", "Interconnected Program", "Internet Package"], correctAnswer: 0 },
            { questionText: "Which layer performs routing?", options: ["Data Link", "Network", "Transport", "Session"], correctAnswer: 1 },
            { questionText: "Which device connects different networks?", options: ["Switch", "Hub", "Router", "Bridge"], correctAnswer: 2 },
            { questionText: "Which protocol sends emails?", options: ["SMTP", "HTTP", "FTP", "IMAP"], correctAnswer: 0 },
            { questionText: "Port number for HTTPS?", options: ["21", "25", "443", "80"], correctAnswer: 2 },
            { questionText: "What is MAC address?", options: ["Hardware address", "Software address", "IP Address", "Network Name"], correctAnswer: 0 },
        ],
    },
    {
        title: "Artificial Intelligence",
        questions: [
            { questionText: "Who is the father of AI?", options: ["John McCarthy", "Alan Turing", "Geoffrey Hinton", "Andrew Ng"], correctAnswer: 0 },
            { questionText: "Which language is best for AI?", options: ["C", "Python", "Java", "Ruby"], correctAnswer: 1 },
            { questionText: "Which is not a type of AI?", options: ["Weak AI", "Strong AI", "Reactive AI", "Emotional AI"], correctAnswer: 3 },
            { questionText: "Which algorithm is used for decision making?", options: ["Decision Tree", "Sorting", "Encryption", "Searching"], correctAnswer: 0 },
            { questionText: "Which is an example of AI?", options: ["Chatbots", "Self-driving cars", "Face Recognition", "All of these"], correctAnswer: 3 },
            { questionText: "Which search is uninformed?", options: ["DFS", "BFS", "A*", "Best First"], correctAnswer: 0 },
        ],
    },
    {
        title: "Aptitude",
        questions: [
            { questionText: "What is 25% of 200?", options: ["25", "50", "75", "100"], correctAnswer: 1 },
            { questionText: "Train 180m crosses a pole in 9s. Speed?", options: ["60 km/hr", "72 km/hr", "80 km/hr", "90 km/hr"], correctAnswer: 1 },
            { questionText: "If 3x = 81, find x.", options: ["9", "27", "3", "81"], correctAnswer: 0 },
            { questionText: "Average of 10, 20, 30, 40?", options: ["20", "25", "30", "35"], correctAnswer: 2 },
            { questionText: "Find simple interest on ₹5000 at 8% for 2 years.", options: ["₹400", "₹600", "₹800", "₹1000"], correctAnswer: 2 },
            { questionText: "If ratio of boys to girls is 3:2, % of boys?", options: ["40%", "50%", "60%", "70%"], correctAnswer: 2 },
        ],
    },
];

async function seedData() {
    try {
        await Quiz.deleteMany();
        await Quiz.insertMany(quizzes);
        console.log("✅ 7 quiz topics with 6 questions each inserted successfully!");
        process.exit();
    } catch (error) {
        console.error("❌ Error inserting quizzes:", error);
        process.exit(1);
    }
}

seedData();