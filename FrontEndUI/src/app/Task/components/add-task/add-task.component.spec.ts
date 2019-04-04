import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, from } from 'rxjs';
import { ServerResponse } from '../../../Model/serverresponse';
import * as moment from 'moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchComponent } from '../../../User/components/modal/user-search/user-search.component'
import { ProjectSearchComponent } from '../../../Project/components/modal/project-search/project-search.component'
import { TaskSearchComponent } from '../../../Task/components/modal/task-search/task-search.component'
import { TaskService } from 'src/app/Task/service/task.service';
import { RouterModule } from '@angular/router';


describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let service: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskComponent, UserSearchComponent, ProjectSearchComponent, TaskSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule,
                HttpClientTestingModule, NgbModule.forRoot(), RouterModule.forRoot([]) ],
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
});
