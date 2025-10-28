import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  // ✅ Correct API URL
  private apiUrl = 'http://localhost:5000/api/quizzes';

  constructor(private http: HttpClient) {}

  async getQuizzes() {
    return await firstValueFrom(this.http.get<any[]>(this.apiUrl));
  }
}
