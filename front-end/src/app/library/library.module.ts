import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignupSelectComponent } from 'src/app/login-signup-select/login-signup-select.component';
import { SignupComponent } from '../signup/signup.component';
import { VerifyEmailComponent } from '../verify-email/verify-email.component';
import { LoginComponent } from '../login/login.component';

export enum loginSignup{
  login = "Log In",
  signup = "Sign up"
};

export enum editorAdmin{
  editor = "Editor",
  admin = "Admin"
};

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

  openLoginSignupSelectModal(option:loginSignup){
    const instance = this.modal.open(LoginSignupSelectComponent, { size:"lg", windowClass:"login-signup-select", centered: true, backdrop:"static"});
    instance.componentInstance.Login_signup = option;
  }

  openSignupModal(option:editorAdmin){
    const instance = this.modal.open(SignupComponent, { size:"lg", windowClass:"editor-signup", centered: true, backdrop:"static"});
    instance.componentInstance.EditorAdmin = option;
  }
  
  openVerifyEmailModal(option:editorAdmin){
    const instance = this.modal.open(VerifyEmailComponent,{ size:"lg", windowClass:"verify-email", centered: true, backdrop:"static"});
    instance;
  }

  openLoginModal(option:editorAdmin){
    const instance = this.modal.open(LoginComponent, { size:"lg", windowClass:"login", centered: true, backdrop:"static"});
    instance.componentInstance.EditorAdmin = option;
  }
 }
