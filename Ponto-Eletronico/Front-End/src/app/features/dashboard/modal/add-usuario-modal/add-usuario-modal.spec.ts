import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsuarioModal } from './add-usuario-modal';

describe('AddUsuarioModal', () => {
  let component: AddUsuarioModal;
  let fixture: ComponentFixture<AddUsuarioModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsuarioModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUsuarioModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
