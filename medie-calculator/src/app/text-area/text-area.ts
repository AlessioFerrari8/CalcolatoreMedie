import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './text-area.html',
  styleUrls: ['./text-area.css']
})
export class TextArea {
  name: string = '';
  marks: string = '';
  jsonOutput: string = '';

  generateJSON() {
    const testo = this.marks;

    // Divide il testo in blocchi per mese
    const blocchi = testo
      .split(/Valutazioni giornaliere/g)
      .map(b => b.trim())
      .filter(b => b.length > 0);

    const annoCompleto: any = {};

    blocchi.forEach(blocco => {
      const righe = blocco
        .split('\n')
        .map(r => r.trim())
        .filter(r => r.length > 0);

      if (righe.length < 2) return;

      const meseRiga = righe[0];

      // Regex per riconoscere i blocchi dei voti
      const pattern =
        /([\d.,]+)\s*\n(\w{3}),\s*(\d{2}\/\d{2})\s*\n([A-ZÀ-Ú\s]+)\n(\w+)\n([\w+.,]+)/gmu;

      const valutazioni: any[] = [];
      let match;

      while ((match = pattern.exec(blocco)) !== null) {
        const [_, votoNumStr, , data, materia, tipologia, votoTestuale] = match;
        const votoNum = parseFloat(votoNumStr.replace(',', '.'));

        const [giorno, meseNum] = data.split('/').map(x => parseInt(x, 10));
        const dataIso = new Date(2025, meseNum - 1, giorno)
          .toISOString()
          .split('T')[0];

        valutazioni.push({
          data: dataIso,
          materia: materia
            .toLowerCase()
            .replace(/\b\w/g, l => l.toUpperCase())
            .trim(),
          tipologia: tipologia.toLowerCase().trim(),
          voto_num: votoNum,
          voto_testuale: votoTestuale.trim(),
        });
      }

      annoCompleto[meseRiga] = valutazioni;
    });

    // Converti tutto in JSON leggibile
    this.jsonOutput = JSON.stringify(annoCompleto, null, 2);
    console.log('✅ JSON generato:', this.jsonOutput);
  }
}
