import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationPopUpComponent } from './validation-pop-up.component';

describe('ValidationPopUpComponent', () => {
  let component: ValidationPopUpComponent;
  let fixture: ComponentFixture<ValidationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
