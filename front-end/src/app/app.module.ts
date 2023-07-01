import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginSignupSelectComponent } from './login-signup-select/login-signup-select.component';
import { LibraryModule } from './library/library/library.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginSignupSelectComponent
  ],
  imports: [
    BrowserModule,
    LibraryModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
