import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignupSelectComponent } from './login-signup-select/login-signup-select.component';
import { LibraryModule } from './library/library.module';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { LoginComponent } from './login/login.component';
import { DatabaseComponent } from './database/database.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginSignupSelectComponent,
    SignupComponent,
    VerifyEmailComponent,
    LoginComponent,
    DatabaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LibraryModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
