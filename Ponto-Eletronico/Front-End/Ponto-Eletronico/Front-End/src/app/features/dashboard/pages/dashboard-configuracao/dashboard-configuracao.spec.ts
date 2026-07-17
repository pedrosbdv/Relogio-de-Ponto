import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConfiguracao } from './dashboard-configuracao';

describe('DashboardConfiguracao', () => {
  let component: DashboardConfiguracao;
  let fixture: ComponentFixture<DashboardConfiguracao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardConfiguracao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardConfiguracao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
