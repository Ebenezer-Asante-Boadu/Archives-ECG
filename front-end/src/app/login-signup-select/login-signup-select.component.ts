import { Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { loginSignup, editorAdmin, LibraryModule} from '../library/library.module';

@Component({
  selector: 'app-login-signup-select',
  templateUrl: './login-signup-select.component.html',
  styleUrls: ['./login-signup-select.component.css']
})
export class LoginSignupSelectComponent implements OnInit{
  @Input() Login_signup?:loginSignup;
  option:editorAdmin = editorAdmin.editor;
  title?:string;
  AdminInput?:HTMLInputElement;
  EditorInput?:HTMLInputElement;

  constructor(public activeModal:NgbActiveModal, private lib:LibraryModule){}

  ngOnInit(): void {
      this.title = `${this.Login_signup} As An Admin or Editor`; 
      this.setExceptInput();
      
  }
  
  setExceptInput(){
    this.AdminInput = (document.getElementById("admin-input") as HTMLInputElement);
    this.EditorInput = (document.getElementById("editor-input") as HTMLInputElement);

    if(this.AdminInput?.checked){
      this.option = editorAdmin.admin;
    } else if(this.EditorInput?.checked){
      this.option = editorAdmin.editor;
    }
  }

  openStatusModal(){
    // this.library.openLoginSignupSelectModal(loginSignup.login);
    this.lib.openSignupModal(this.option);
   }
}
