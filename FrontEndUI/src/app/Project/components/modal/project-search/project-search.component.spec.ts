import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectSearchComponent } from './project-search.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../../service/project.service';
import { Project } from '../../../model/project';
import * as moment from 'moment';

describe('ProjectSearchComponent', () => {
  let component: ProjectSearchComponent;
  let fixture: ComponentFixture<ProjectSearchComponent>;
  let service: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule ],
      providers: [ProjectService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSearchComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('call retrieveProjectList, searchUser sortUser', () => {
    const spy = spyOn(service, 'retrieveProjects').and.returnValue(
      { subscribe: () => {success: true} }
    );
    const searchstr = 'Ganapathi';
    const sortstr = 'FirstName';
  
    component.SearchKey = searchstr;
    component.SortKey = sortstr;
  
    component.retrieveProjectList();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(searchstr, sortstr);
  });

  it ('call addProject to return the selected Project', () => {
    var today = new Date();
    var today30 = new Date();
    const project: Project = {
      ProjectID: 1,
      Project  : 'Project1',
      Priority : 10,
      StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
      EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
      ManagerID: 1
    };
    
    const spy = spyOn(service, 'getProjectById').and.returnValue(
      { subscribe: () => {success: true} }
    );

    component.ProjectIDSelected = project.ProjectID;
    component.addProject();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(project.ProjectID);
   });
});


