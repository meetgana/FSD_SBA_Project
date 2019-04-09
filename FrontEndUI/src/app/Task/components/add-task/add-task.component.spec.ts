import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { ServerResponse } from '../../../Model/serverresponse';
import * as moment from 'moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchComponent } from '../../../User/components/modal/user-search/user-search.component'
import { ProjectSearchComponent } from '../../../Project/components/modal/project-search/project-search.component'
import { TaskSearchComponent } from '../../../Task/components/modal/task-search/task-search.component'
import { AddUserComponent} from '../../../User/components/add-user/add-user.component';
import { AddProjectsComponent} from '../../..//Project/components/add-projects/add-projects.component';
import { ViewTaskComponent} from '../../../Task/components/view-task/view-task.component';
import { TaskService } from 'src/app/Task/service/task.service';
import { Routes, RouterModule, Router } from '@angular/router';
import {RouterTestingModule} from "@angular/router/testing";
import { Project } from '../../../Project/model/project';
import { User } from '../../../User/model/user';
import { ParentTask, Task} from '../../model/task';


describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let service: TaskService;

  const routes: Routes = [
    { path: 'addUser', component: AddUserComponent },
    { path: 'addProject', component: AddProjectsComponent },
    { path: 'addTask', component: AddTaskComponent },
    { path: 'viewTask', component: ViewTaskComponent },
    { path: '', redirectTo: '/addUser',  pathMatch: 'full' },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserComponent, AddProjectsComponent, AddTaskComponent, ViewTaskComponent,
                      UserSearchComponent, ProjectSearchComponent, TaskSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule,
                HttpClientTestingModule, NgbModule.forRoot(), 
                RouterModule.forRoot([]) ],
      providers: [FormBuilder, TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('call addParentTask when a new Parent Task is added', () => {
  const spy = spyOn(service, 'addParentTask').and.returnValue(
    of( {success: true} )
  );
  
  var today = new Date();
  var today30 = new Date();
  var project : Project = {
                  ProjectID: 1, Project  : 'Project1', Priority : 10,
                  StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
                  EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
                  ManagerID: 1
                };
   var task = 'Task2';

  component.isParentTask = true;
  component.task.Task = task;
  component.task.Project = project;
  component.addTask()
  expect(spy).toHaveBeenCalled();
});

it('call addTask when a new Task is added', () => {
  const spy = spyOn(service, 'addTask').and.returnValue(
    of( {success: true} )
  );
  
  component.isParentTask = false;
  var today = new Date();
  var today30 = new Date();
  const task: Task = {
    TaskID     : 2,
    Parent     : {ParentTaskID: 1, ParentTask: 'Parent1', ProjectID: 1},
    Project    : {ProjectID: 1, Project  : 'Project1', Priority : 10,
                  StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
                  EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
                  ManagerID: 1},
    Task        : 'Task2',
    StartDate  : moment(today.getDate()).add(-1, 'months').toDate(),
    EndDate    : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
    Priority    : 5,    
    User       : {UserID: 1, FirstName: 'Abdul', LastName: 'Kalam', EmployeeID: 12345,
                  ProjectID: 1, TaskID: 1},
    status      : "0"
  };
  component.task = task;
  component.addTask()
  expect(spy).toHaveBeenCalled();
});

it('call updateTask when a Task is updated', () => {
  const spy = spyOn(service, 'editTask').and.returnValue(
    of( {success: true} )
  );
  
  component.isParentTask = false;
  var today = new Date();
  var today30 = new Date();
  const task: Task = {
    TaskID     : 2,
    Parent     : {ParentTaskID: 1, ParentTask: 'Parent1', ProjectID: 1},
    Project    : {ProjectID: 1, Project  : 'Project1', Priority : 10,
                  StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
                  EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
                  ManagerID: 1},
    Task        : 'Task2',
    StartDate  : moment(today.getDate()).add(-1, 'months').toDate(),
    EndDate    : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
    Priority    : 5,    
    User       : {UserID: 1, FirstName: 'Abdul', LastName: 'Kalam', EmployeeID: 12345,
                  ProjectID: 1, TaskID: 1},
    status      : "0"
  };
  component.task = task;
  component.updateTask()
  expect(spy).toHaveBeenCalled();
});

it ('call selectedUser', () => {
  const user : User = {UserID: 1, FirstName: 'Abdul', LastName: 'Kalam', EmployeeID: 12345,
                      ProjectID: 1, TaskID: 1}
  component.selectedUser(user);
  expect (component.task.User.FirstName).toContain('Abdul');
})

it ('call selectedProject', () => {
  var today = new Date();
  var today30 = new Date();
  const  project:  Project  = {
          ProjectID: 1, Project  : 'Project1', Priority : 10,
          StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
          EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
          ManagerID: 1}
  
  component.selectedProject(project);
  expect (component.task.Project.Project).toBe('Project1');
})

it('call selectedParentTask', () => {
   const  parent: ParentTask = {ParentTaskID: 1, ParentTask: 'Parent1', ProjectID: 1};
  component.selectedParentTask(parent);
  expect (component.task.Parent.ParentTask).toContain('Parent1');
});

it('call dateValidator with valid dates', ()=>{
  var today = new Date();
  var today30 = new Date();
  component.sDate = moment(today.getDate()).add(-1, 'months').toDate();
  component.eDate = moment(today30.getDate() + 30).add(-1, 'months').toDate()

  component.dateValidator();
  expect (component.isDatesValid).toBe(true);
});

it('call dateValidator with invalid dates', ()=>{
  var today = new Date();
  var today30 = new Date();
  component.eDate = moment(today.getDate()).add(-1, 'months').toDate();
  component.sDate = moment(today30.getDate() + 30).add(-1, 'months').toDate()

  component.dateValidator();
  expect (component.isDatesValid).toBe(false);
});


it ('call resetTaskForm', () => {

  component.resetTaskForm();
  expect (component.taskId).toEqual(0);
  expect (component.isParentTask).toBe('');
  expect (component.task.Task).toBe('');
})


});
