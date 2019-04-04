import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTaskComponent } from './view-task.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { UserSearchComponent } from '../../../User/components/modal/user-search/user-search.component'
import { ProjectSearchComponent } from '../../../Project/components/modal/project-search/project-search.component'

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let service: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponent, UserSearchComponent, ProjectSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule,
                HttpClientTestingModule, RouterModule.forRoot([]) ],
      providers: [FormBuilder, TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
