import { Routes } from '@angular/router';
import { TextArea } from './text-area/text-area';
import { MedieCalculator } from './medie-calculator/medie-calculator';

export const routes: Routes = [
    { path: '', component: TextArea },
    { path: 'medie-calculator', component: MedieCalculator },
];