import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  currentIndex = 0;
  selectedAnswer = '';
  score = 0;
  quizCompleted = false;

  ngOnInit(): void {
    fetch('http://localhost:5000/api/quizzes')
      .then(res => res.json())
      .then(data => {
        console.log('✅ Quizzes fetched:', data);
        this.quizzes = data;
      })
      .catch(err => console.error('❌ Error loading quizzes:', err));
  }

  startQuiz(quiz: any): void {
    console.log('🎯 Starting quiz:', quiz);

    this.selectedQuiz = quiz;
    this.questions = quiz.questions || quiz.quiz?.questions || [];

    console.log('🧠 Loaded questions:', this.questions);

    if (!this.questions.length) {
      alert('No questions found for this quiz!');
      return;
    }

    this.currentIndex = 0;
    this.selectedAnswer = '';
    this.score = 0;
    this.quizCompleted = false;
  }

  submitAnswer(): void {
    if (!this.questions.length) return;

    const current = this.questions[this.currentIndex];
    const correct = current.options[current.correctAnswer];

    if (this.selectedAnswer === correct) {
      this.score++;
    }

    this.selectedAnswer = '';
    this.currentIndex++;

    if (this.currentIndex >= this.questions.length) {
      this.quizCompleted = true;
    }
  }

  restartQuiz(): void {
    this.currentIndex = 0;
    this.score = 0;
    this.quizCompleted = false;
    this.selectedAnswer = '';
  }

  goHome(): void {
    this.selectedQuiz = null;
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.quizCompleted = false;
  }
}
