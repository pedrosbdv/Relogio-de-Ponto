import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inputs } from './input';

describe('Inputs', () => {
  let component: Inputs;
  let fixture: ComponentFixture<Inputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inputs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inputs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
