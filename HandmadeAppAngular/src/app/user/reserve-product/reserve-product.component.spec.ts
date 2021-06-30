import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveProductComponent } from './reserve-product.component';

describe('ReserveProductComponent', () => {
  let component: ReserveProductComponent;
  let fixture: ComponentFixture<ReserveProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
