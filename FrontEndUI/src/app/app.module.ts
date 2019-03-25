import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './User/components/add-user/add-user.component';
import { AddProjectsComponent } from './Project/components/add-projects/add-projects.component';
import { AddTaskComponent } from './Task/components/add-task/add-task.component';
import { ViewTaskComponent } from './Task/components/view-task/view-task.component';

import { UserService } from './User/service/user.service';


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddProjectsComponent,
    AddTaskComponent,
    ViewTaskComponent,
    AddProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }