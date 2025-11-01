import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Subject {
    name: string;
    marks: number[];
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private dataSubject = new BehaviorSubject<Subject[]>([]);
    data$ = this.dataSubject.asObservable();

    constructor() {
        this.loadFromLocalStorage();
    }

    setData(data: Subject[]) {
        this.dataSubject.next(data);
        localStorage.setItem('marksData', JSON.stringify(data));
    }

    getData(): Subject[] {
        return this.dataSubject.value;
    }

    private loadFromLocalStorage() {
        const saved = localStorage.getItem('marksData');
        if (saved) {
            this.dataSubject.next(JSON.parse(saved));
        }
    }

    clearData() {
        this.dataSubject.next([]);
        localStorage.removeItem('marksData');
    }
}
