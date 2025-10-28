import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalQuizzes = 5;
  totalUsers = 120;
  totalAttempts = 240;
  recentQuizzes = [
    { title: 'Angular Basics', date: '2025-10-25' },
    { title: 'Node.js Fundamentals', date: '2025-10-26' },
    { title: 'MongoDB Deep Dive', date: '2025-10-27' },
  ];

  ngOnInit(): void {
    console.log('✅ Dashboard loaded successfully!');
  }
}
