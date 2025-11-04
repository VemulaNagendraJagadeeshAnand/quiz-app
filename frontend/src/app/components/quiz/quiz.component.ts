import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizzes: any[] = [];
  selectedQuiz: any = null;
  questions: any[] = [];
  currentIndex: number = 0;
  selectedAnswer: string | null = null;
  score: number = 0;
  userAnswers: (string | null)[] = [];
  quizCompleted: boolean = false;
  showAnswers: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  /** 🔹 Load all quizzes from backend */
  loadQuizzes(): void {
    this.quizService.getQuizzes().subscribe({
      next: (data: any[]) => {
        if (Array.isArray(data)) {
          this.quizzes = data;
        } else {
          console.error('⚠️ Invalid quiz data format from backend:', data);
        }
      },
      error: (err) => {
        console.error('❌ Error fetching quizzes:', err);
      }
    });
  }

  /** 🔹 Start selected quiz */
  startQuiz(quiz: any): void {
    if (quiz && quiz.questions && quiz.questions.length > 0) {
      this.selectedQuiz = quiz;
      this.questions = quiz.questions;
      this.currentIndex = 0;
      this.score = 0;
      this.userAnswers = [];
      this.selectedAnswer = null;
      this.quizCompleted = false;
    } else {
      console.error('⚠️ Selected quiz has no questions:', quiz);
    }
  }

  /** 🔹 Submit current question answer */
  submitAnswer(): void {
    if (!this.questions || this.currentIndex >= this.questions.length) return;

    const currentQuestion = this.questions[this.currentIndex];
    this.userAnswers.push(this.selectedAnswer);

    // Ensure correctAnswer is either index or string
    const correctAnswer = Array.isArray(currentQuestion.options)
      ? currentQuestion.options[currentQuestion.correctAnswer] || currentQuestion.correctAnswer
      : currentQuestion.correctAnswer;

    if (this.selectedAnswer === correctAnswer) {
      this.score++;
    }

    this.selectedAnswer = null;
    this.currentIndex++;

    if (this.currentIndex >= this.questions.length) {
      this.quizCompleted = true;
    }
  }

  /** 🔹 Go back to quiz list */
  goHome(): void {
    this.selectedQuiz = null;
    this.quizCompleted = false;
    this.showAnswers = false;
  }

  /** 🔹 Restart current quiz */
  restartQuiz(): void {
    if (this.selectedQuiz) {
      this.startQuiz(this.selectedQuiz);
    }
  }

  /** 🔹 Toggle show/hide answers */
  toggleShowAnswers(): void {
    this.showAnswers = !this.showAnswers;
  }
}
