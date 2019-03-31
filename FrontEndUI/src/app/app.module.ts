import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './User/components/add-user/add-user.component';
import { UserSearchComponent } from './User/components/modal/user-search/user-search.component';
import { AddProjectsComponent } from './Project/components/add-projects/add-projects.component';
import { AddTaskComponent } from './Task/components/add-task/add-task.component';
import { ViewTaskComponent } from './Task/components/view-task/view-task.component';

import { UserService } from './User/service/user.service';
import { ProjectService } from './Project/service/project.service';
import { ProjectSearchComponent } from './Project/components/modal/project-search/project-search.component';
import { TaskSearchComponent } from './Task/components/modal/task-search/task-search.component';


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserSearchComponent,
    AddProjectsComponent,
    AddTaskComponent,
    ViewTaskComponent,
    AddProjectsComponent,
    ProjectSearchComponent,
    TaskSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [UserService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
