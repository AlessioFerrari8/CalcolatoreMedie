import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedieCalculator } from './medie-calculator';

describe('MedieCalculator', () => {
  let component: MedieCalculator;
  let fixture: ComponentFixture<MedieCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedieCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedieCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
