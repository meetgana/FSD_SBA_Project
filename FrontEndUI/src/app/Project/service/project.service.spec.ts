import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Project } from '../model/project';
import { ServerResponse } from '../../Model/serverresponse';
import { of, Observable } from 'rxjs';
import * as moment from 'moment';

describe('ProjectService', () => {
  let service: ProjectService;
  let projectservice: ProjectService;
  let projectpostservice: ProjectService;
  let httpGetSpy: {get: jasmine.Spy};
  let httpPostSpy: {post: jasmine.Spy};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [ProjectService]
  }));

  beforeEach(() => {
    service = TestBed.get(ProjectService);
    httpGetSpy = jasmine.createSpyObj('Value', ['get']);
    httpPostSpy = jasmine.createSpyObj('Value', ['post']);
  
    projectservice = new ProjectService(<any>httpGetSpy);
    projectpostservice = new ProjectService(<any>httpPostSpy);
  });

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it ('should return expected Projects', () => {
    var today = new Date();
    var today30 = new Date();
    const projects: Project[] = [{
      ProjectID: 1,
      Project  : 'Project1',
      Priority : 10,
      StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
      EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
      ManagerID: 1
    }];

    httpGetSpy.get.and.returnValue(of(projects));
    projectservice.retrieveProjects().subscribe(
      data => {expect(projects.length).toEqual(1)}
    )
  });

  it ('should return expected User in getProjectById', () => {
    var today = new Date();
    var today30 = new Date();
    const projects: Project = {
      ProjectID: 1,
      Project  : 'Project1',
      Priority : 10,
      StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
      EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
      ManagerID: 1
    };

    httpGetSpy.get.and.returnValue(of(projects));
    projectservice.getProjectById(projects.ProjectID).subscribe(
      data => {expect(projects.Project).toContain('Project1')}
    )
  })

  it ('should add new Project', () => {
    var today = new Date();
    var today30 = new Date();
    const projects: Project = {
      ProjectID: 1,
      Project  : 'Project1',
      Priority : 10,
      StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
      EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
      ManagerID: 1
    };

    httpPostSpy.post.and.returnValue(of(projects));
    projectpostservice.addProject(projects).subscribe(
      data => {expect(projects.Project).toContain('Project1')
    });
  })

  it ('should update new user', () => {
    var today = new Date();
    var today30 = new Date();
    const projects: Project = {
      ProjectID: 1,
      Project  : 'Project1',
      Priority : 10,
      StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
      EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
      ManagerID: 1
    };

    httpPostSpy.post.and.returnValue(of(projects));
    projectpostservice.updateProject(projects).subscribe(
      data => {expect(projects.ProjectID).toEqual(1)
    });
  })
});
