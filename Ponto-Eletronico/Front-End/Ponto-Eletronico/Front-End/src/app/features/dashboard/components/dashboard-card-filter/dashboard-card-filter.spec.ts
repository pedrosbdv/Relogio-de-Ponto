import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCardFilter } from './dashboard-card-filter';

describe('DashboardCardFilter', () => {
  let component: DashboardCardFilter;
  let fixture: ComponentFixture<DashboardCardFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCardFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCardFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
