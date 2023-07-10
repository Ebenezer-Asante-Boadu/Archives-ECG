import { Component,Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryModule, editorAdmin } from '../library/library.module';

enum verifyText{
  true = "Email Verified",
  false = "Verify Email"
};

enum isDoneText{
  true = "Continue to Login",
  false = "Verify Email"
};

enum doneSubtext{
  true = "Your email has been verified",
  false = "Please enter the verification code that has been sent to you"
};

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  constructor(public activeModal: NgbActiveModal, private modal:NgbModal, private lib:LibraryModule) { }
  @Input() EditorAdmin:any;
  inputs: string[] = ['', '', '', '', ''];
  emailVerified:boolean = false;
  VerificationText:verifyText = verifyText.false;
  DoneText:isDoneText = isDoneText.false;
  SubtextDone:doneSubtext = doneSubtext.false;
  
  changeText(){
    if(this.emailVerified == true){
        this.modal.dismissAll();
        this.openLogin();
    }
    else{
      this.emailVerified = true;
      this.VerificationText = (this.VerificationText == verifyText.true)? verifyText.false : verifyText.true;
    this.DoneText = (this.DoneText == isDoneText.true)? isDoneText.false : isDoneText.true;
    this.SubtextDone = (this.SubtextDone == doneSubtext.true)? doneSubtext.false : doneSubtext.true;
    }
  }

  openLogin(){
    this.lib.openLoginModal(this.EditorAdmin);
  }

}
