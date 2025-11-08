import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // ✅ Backend Render API
  private baseUrl = 'https://quiz-app-backend-sp9d.onrender.com/api/quizzes';

  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
