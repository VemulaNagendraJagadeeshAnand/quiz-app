import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // ✅ Use your Render backend URL
  private baseUrl = 'https://quiz-api.onrender.com/api/quizzes'; 

  constructor(private http: HttpClient) {}

  // ✅ Fetch all quizzes
  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
