import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService, Subject } from '../services/data.service';

@Component({
  selector: 'app-medie-calculator',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './medie-calculator.html',
  styleUrl: './medie-calculator.css',
})
export class MedieCalculator implements OnInit {
  subjects: Subject[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Leggi i dati dal servizio
    this.subjects = this.dataService.getData();
    console.log('📊 Dati caricati:', this.subjects);
  }

  calculateAverage(marks: number[]): number {
    if (marks.length === 0) return 0;
    const sum = marks.reduce((a, b) => a + b, 0);
    return sum / marks.length;
  }

  getAverageForSubject(subject: Subject): string {
    return this.calculateAverage(subject.marks).toFixed(2);
  }

  getTotalAverage(): string {
    if (this.subjects.length === 0) return '0.00';
    const allMarks = this.subjects.flatMap(s => s.marks);
    return this.calculateAverage(allMarks).toFixed(2);
  }
}
