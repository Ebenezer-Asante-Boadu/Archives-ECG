import { Component } from '@angular/core';
import { loginSignup, admin_editor, LibraryModule } from '../library/library/library.module';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent {
   pressed:boolean = false;

   constructor(private library:LibraryModule){}
   
   openStatusModal(){
    this.library.openLoginSignupSelectModal(loginSignup.login, admin_editor.editor);
   }
}
