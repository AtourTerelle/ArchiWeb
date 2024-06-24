import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPopUpComponent } from './request-pop-up.component';

describe('RequestPopUpComponent', () => {
  let component: RequestPopUpComponent;
  let fixture: ComponentFixture<RequestPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
