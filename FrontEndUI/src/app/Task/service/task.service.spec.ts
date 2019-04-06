import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Task, ParentTask } from '../model/task';
import { ServerResponse } from '../../Model/ServerResponse';
import { of, Observable } from 'rxjs';
import * as moment from 'moment';
import { TaskService } from './task.service';

describe('TaskService', () => {

  let service: TaskService;
  let taskservice: TaskService;
  let taskpostservice: TaskService;
  let httpGetSpy: {get: jasmine.Spy};
  let httpPostSpy: {post: jasmine.Spy};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [TaskService]
  }));

  beforeEach(() => {
    service = TestBed.get(TaskService);
    httpGetSpy = jasmine.createSpyObj('Value', ['get']);
    httpPostSpy = jasmine.createSpyObj('Value', ['post']);
  
    taskservice = new TaskService(<any>httpGetSpy);
    taskpostservice = new TaskService(<any>httpPostSpy);
  });
  
  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it ('should return expected Parent Tasks', () => {
    const parenttasks: ParentTask[] = [{
      ParentTaskID: 1, ParentTask: 'Parent1', ProjectID: 1
  }];

    httpGetSpy.get.and.returnValue(of(parenttasks));
    taskservice.retrieveParentTasks().subscribe(
      data => {expect(parenttasks.length).toEqual(1)}
    )
  });

  it ('should return expected parenttask by Id', () => {
    const parenttasks: ParentTask = {
      ParentTaskID: 1, ParentTask: 'Parent1', ProjectID: 1
  };
    httpGetSpy.get.and.returnValue(of(parenttasks));
    taskservice.getParentTaskById(parenttasks.ParentTaskID).subscribe(
      data => {expect(parenttasks.ParentTask).toContain('Parent1')}
    )
  });

  it ('should add new ParentTask', () => {
    const parenttasks: ParentTask = {
      ParentTaskID: 1, ParentTask: 'Parent1', ProjectID: 1
  };

    httpPostSpy.post.and.returnValue(of(parenttasks));
    taskpostservice.addParentTask(parenttasks).subscribe(
      data => {expect(parenttasks.ParentTask).toContain('Parent1')
    });
  })

  it ('should return expected Tasks', () => {
    var today = new Date();
    var today30 = new Date();
    const tasks: Task[] = [{
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
  }];

    httpGetSpy.get.and.returnValue(of(tasks));
    taskservice.retrieveTasks().subscribe(
      data => {expect(tasks.length).toEqual(1)}
    )
  });

  it ('should return expected task by Id', () => {
    var today = new Date();
    var today30 = new Date();
    const tasks: Task = {
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

    httpGetSpy.get.and.returnValue(of(tasks));
    taskservice.getTaskById(tasks.TaskID).subscribe(
      data => {expect(tasks.Task).toContain('Task2')}
    )
  });

  it ('should add new Task', () => {
    var today = new Date();
    var today30 = new Date();
    const tasks: Task = {
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

    httpPostSpy.post.and.returnValue(of(tasks));
    taskpostservice.addTask(tasks).subscribe(
      data => {expect(tasks.Project.Project).toContain('Project1')
    });
  })

  it ('should update new Task', () => {
    var today = new Date();
    var today30 = new Date();
    const tasks: Task = {
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

    httpPostSpy.post.and.returnValue(of(tasks));
    taskpostservice.editTask(tasks).subscribe(
      data => {expect(tasks.Project.ProjectID).toEqual(1)
    });
  })
})
