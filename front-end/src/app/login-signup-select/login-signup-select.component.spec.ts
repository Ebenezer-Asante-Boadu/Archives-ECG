import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupSelectComponent } from './login-signup-select.component';

describe('LoginSignupSelectComponent', () => {
  let component: LoginSignupSelectComponent;
  let fixture: ComponentFixture<LoginSignupSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSignupSelectComponent]
    });
    fixture = TestBed.createComponent(LoginSignupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
