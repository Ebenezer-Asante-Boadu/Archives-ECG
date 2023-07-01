import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { loginSignup, admin_editor } from '../library/library/library.module';

@Component({
  selector: 'app-login-signup-select',
  templateUrl: './login-signup-select.component.html',
  styleUrls: ['./login-signup-select.component.css']
})
export class LoginSignupSelectComponent implements OnInit{
  @Input() Login_signup?:loginSignup;
  @Input() Admin_editor?:admin_editor;
  title?:string;
  constructor(public activeModal:NgbActiveModal){}

  ngOnInit(): void {
      this.title = `${this.Login_signup} As An Admin or Editor`;
  }
}
