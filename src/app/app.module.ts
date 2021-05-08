import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordModule } from './dashbord/dashbord.module';
import { StudentModule } from './student/student.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    DashbordModule,
    StudentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
