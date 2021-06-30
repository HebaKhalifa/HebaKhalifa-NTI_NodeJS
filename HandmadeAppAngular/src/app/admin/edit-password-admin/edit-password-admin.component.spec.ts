import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPasswordAdminComponent } from './edit-password-admin.component';

describe('EditPasswordAdminComponent', () => {
  let component: EditPasswordAdminComponent;
  let fixture: ComponentFixture<EditPasswordAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPasswordAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPasswordAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
