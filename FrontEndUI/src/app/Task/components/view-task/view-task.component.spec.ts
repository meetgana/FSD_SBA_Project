import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { ViewTaskComponent } from './view-task.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule, Router,  } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../service/task.service';
import { UserSearchComponent } from '../../../User/components/modal/user-search/user-search.component'
import { ProjectSearchComponent } from '../../../Project/components/modal/project-search/project-search.component'
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskSearchComponent } from '../modal/task-search/task-search.component';
import { AddUserComponent } from '../../../User/components/add-user/add-user.component';
import { AddProjectsComponent } from '../../../Project/components/add-projects/add-projects.component';
import { Task } from '../../model/task';
import { Project } from '../../../Project/model/project';
import { User } from '../../../User/model/user';


describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let service: TaskService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponent, AddUserComponent, UserSearchComponent, 
                      AddProjectsComponent, ProjectSearchComponent, 
                      AddTaskComponent, TaskSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule,
                HttpClientTestingModule, NgbModule.forRoot(), RouterTestingModule ],
      providers: [FormBuilder, TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('call updateTask with taskId', fakeAsync(() => {
    const spy = spyOn(service, 'getTaskById').and.returnValue(
      of({Success: false})
    );
  
    component.updateTask(1);
    expect (spy).toHaveBeenCalledWith(1);
  }));

  it ('call completeTask with taskId', fakeAsync(() => {
      const spy = spyOn(service, 'taskComplete').and.returnValue(
      of({Success: false})
    );
  
    component.completeTask(1);
    expect (spy).toHaveBeenCalledWith(1);
  }));

  it ('call completeTask with taskId', () => {
    const spy = spyOn(service, 'taskComplete').and.returnValue(
    of({Success: true})
  );
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

    var project: Project  = {
      ProjectID: 1, 
      Project  : 'Project1', 
      Priority : 10,
      StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
      EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
      ManagerID: 1
    }

    const spyTasks = spyOn(service, 'retrieveTasks').and.returnValue(
      of({Success: true, Data: task })
    );

    component.project = project;
    component.sortStr = 'Priority';
    fixture.detectChanges();
    component.completeTask(1);
    expect (spyTasks).toHaveBeenCalledWith(1, 'Priority');

  });

  it ('call sortTasks with sortStr', fakeAsync(() => {
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

    var project: Project  = {
      ProjectID: 1, 
      Project  : 'Project1', 
      Priority : 10,
      StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
      EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
      ManagerID: 1
    }

    const spy = spyOn(service, 'retrieveTasks').and.returnValue(
      of({Success: true, Data: task })
    );
  
    component.project = project;
    var sortstr = 'Priority'
    component.sortTasks(sortstr);
    expect (spy).toHaveBeenCalledWith(1, 'Priority');
  }));

  it ('call retrieveTasks', fakeAsync(() => {
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

    var project: Project  = {
      ProjectID: 1, 
      Project  : 'Project1', 
      Priority : 10,
      StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
      EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
      ManagerID: 1
    }

    const spy = spyOn(service, 'retrieveTasks').and.returnValue(
      of({Success: true, Data: task })
    );
  
    component.project = project;
    var sortstr = 'Priority'
    component.sortStr = sortstr;
    component.retrieveTasks();
    expect (spy).toHaveBeenCalledWith(1, 'Priority');
  }));

  it ('call selectedProject', () => {
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

    var project: Project  = {
      ProjectID: 1, 
      Project  : 'Project1', 
      Priority : 10,
      StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
      EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
      ManagerID: 1
    }

    const spy = spyOn(service, 'retrieveTasks').and.returnValue(
      of({Success: true, Data: task })
    );
  
    component.sortStr = 'Priority';
    component.selectedProject(project);
    expect (spy).toHaveBeenCalledWith(1, 'Priority');
  });
});
