import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { ViewTaskComponent } from './view-task.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule, Router,  } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../service/task.service';
import { UserSearchComponent } from '../../../User/components/modal/user-search/user-search.component'
import { ProjectSearchComponent } from '../../../Project/components/modal/project-search/project-search.component'
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskSearchComponent } from '../modal/task-search/task-search.component';
import { AddUserComponent } from '../../../User/components/add-user/add-user.component';
import { AddProjectsComponent } from '../../../Project/components/add-projects/add-projects.component';

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
      { subscribe: () => {Success: true; Data: 1} }
    );
  
    component.updateTask(1);
    expect (spy).toHaveBeenCalledWith(1);
  }));


});
