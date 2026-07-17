import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConsultarPontos } from './dashboard-consultar-pontos';

describe('DashboardConsultarPontos', () => {
  let component: DashboardConsultarPontos;
  let fixture: ComponentFixture<DashboardConsultarPontos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardConsultarPontos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardConsultarPontos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
