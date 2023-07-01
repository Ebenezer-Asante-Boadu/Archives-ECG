import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignupSelectComponent } from 'src/app/login-signup-select/login-signup-select.component';

export enum loginSignup{
  login = "Log In",
  signup = "Sign up"
};

export enum admin_editor{
  admin = "admin",
  editor = "editor"
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    NgbModal
  ]
})
export class LibraryModule {
  constructor( private modal:NgbModal){}

  openLoginSignupSelectModal(Login_signup:loginSignup, Admin_editor:admin_editor){
    const instance = this.modal.open(LoginSignupSelectComponent, { size:"lg", windowClass:"login-signup-select", centered: true});
    instance.componentInstance.Login_signup = Login_signup;
    instance.componentInstance.Admin_editor = Admin_editor;
  }

 }
