import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryModule, editorAdmin } from '../library/library.module';
// import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editor-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Input() EditorAdmin:any;
  phoneNumber?:any;
  firstName?:any;
  lastName?:any;
  email?:any;
  dob:any = "yyyy/mm/dd";
  password?:any;
  recoveryEmail?:any;
  passwordConfirmation?:any;
  nickName?:any;
  emergencyCode?:any;
  emergencyCodeConfirmation?:any;
  securityQuestion:any = "";
  securityAnswer?:any;
  showGroup1:boolean = true;
  showGroup2:boolean= false;
  showGroup3:boolean= false;
  tooltips ={
    recoveryEmail: "Add a recovery email for security",
    nickName : "This is a security question",
    emergencyCode : "A secret 16-digits code to recover your system when in danger"
  };

  constructor(public activeModal:NgbActiveModal, private lib:LibraryModule){ }
  
  groupShower(groupToShow:number):void{
    switch(groupToShow){
      case 1:
        this.showGroup2 = false;
        this.showGroup3 = false;
        this.showGroup1 = true;
        break;
      case 2:
        this.showGroup3 = false;
        this.showGroup1 = false;
        this.showGroup2 = true;
        break;
      case 3:
        this.showGroup1 = false;
        this.showGroup2 = false;
        this.showGroup3 = true;
        break;
    }
  }

  movePages(){
    if(this.showGroup1){
      this.groupShower(2);
    } else if(this.showGroup2){ 
      if(this.EditorAdmin == editorAdmin.editor){
        this.openEmail();
      }else if(this.EditorAdmin == editorAdmin.admin){
        this.groupShower(3);
      }
    } else if(this.showGroup3){
      this.openEmail();
    }

  }

  openEmail(){
    this.lib.openVerifyEmailModal(this.EditorAdmin);
  }

  getLength(item:number | string):number{ console.log(item)
    let results:number = 0;
    if(typeof item == "number"){
      results = (item.toString()).length;
    } else if(typeof item == "string"){
      results = item.length;
    }
    return results;
  }
}
