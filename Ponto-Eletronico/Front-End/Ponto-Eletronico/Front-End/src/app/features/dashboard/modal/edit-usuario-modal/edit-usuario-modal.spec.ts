import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsuarioModal } from './edit-usuario-modal';

describe('EditUsuarioModal', () => {
  let component: EditUsuarioModal;
  let fixture: ComponentFixture<EditUsuarioModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUsuarioModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUsuarioModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
