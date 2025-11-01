import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService, Subject } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './text-area.html',
  styleUrls: ['./text-area.css']
})
export class TextArea {
  rawData: string = '';
  jsonOutput: string = '';
  subjects: Subject[] = [];

  constructor(private dataService: DataService, private router: Router) {
    this.subjects = this.dataService.getData();
  }

  generateJSON() {
    if (!this.rawData.trim()) {
      alert('Per favore incolla i dati');
      return;
    }

    try {
      // Parsa i dati grezzi
      this.parseRawData(this.rawData);

      // Mostra il JSON
      this.jsonOutput = JSON.stringify(this.subjects, null, 2);

      // Salva nel servizio
      this.dataService.setData(this.subjects);

      console.log('✅ JSON generato:', this.subjects);
    } catch (error) {
      alert('Errore nel parsing dei dati: ' + error);
      console.error(error);
    }
  }

  parseRawData(data: string) {
    this.subjects = [];
    const subjectsMap: { [key: string]: number[] } = {};

    // Regex pattern dal file Python: estrae voto, data, materia, tipologia, voto testuale
    const pattern = /([\d.,]+)\s+\n(\w{3}),\s*(\d{2}\/\d{2})\s*\n([A-ZÀ-Ú\s]+)\n(\w+)\n([\w+.,]+)/gm;

    let match;
    while ((match = pattern.exec(data)) !== null) {
      const votoNumStr = match[1];      // es: "8.25"
      const giorno = match[3];          // es: "28/10"
      const materia = match[4];         // es: "STORIA"
      const tipologia = match[5];       // es: "orale"
      const votoTestuale = match[6];    // es: "otto+"

      // Converti il voto a numero (sostituisci la virgola con il punto)
      const votoNum = parseFloat(votoNumStr.replace(',', '.'));

      // Normalizza il nome della materia (title case)
      const materiaNormalizzata = materia
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .trim();

      // Aggiungi il voto alla materia
      if (!subjectsMap[materiaNormalizzata]) {
        subjectsMap[materiaNormalizzata] = [];
      }
      subjectsMap[materiaNormalizzata].push(votoNum);

      console.log(`✅ ${votoNum} - ${materiaNormalizzata} (${tipologia})`);
    }

    // Converti la map in array di Subject
    for (const [name, marks] of Object.entries(subjectsMap)) {
      this.subjects.push({
        name: name.trim(),
        marks: marks
      });
    }

    console.log('📊 Materie elaborate:', this.subjects);
  }

  viewResults() {
    if (this.subjects.length === 0) {
      alert('Genera prima il JSON!');
      return;
    }
    this.router.navigate(['/medie-calculator']);
  }
}
