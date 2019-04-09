import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProjectsComponent } from './add-projects.component';
import { ProjectService } from '../../service/project.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../../Model/serverresponse';
import * as moment from 'moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchComponent } from '../../../User/components/modal/user-search/user-search.component'
import { User } from 'src/app/User/model/user';
import { Project } from 'src/app/Project/model/project';


describe('AddProjectsComponent', () => {
  let component: AddProjectsComponent;
  let fixture: ComponentFixture<AddProjectsComponent>;
  let service: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectsComponent, UserSearchComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule.forRoot() ],
      providers: [FormBuilder, ProjectService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call addProject when a new Project is added', () => {
    const spy = spyOn(service, 'addProject').and.returnValue(
      { subscribe: () => {success: true} }
    );

    var today = new Date();
    var today30 = new Date();
    var startdate = moment(today.getDate()).add(-1, 'months').toDate();
    var enddate = moment(today30.getDate() + 30).add(-1, 'months').toDate();

    component.UserAction = 'Add';
    component.addOrEditProject()
    expect(spy).toHaveBeenCalled();
  });

  it ('call dateValidator with setDate', () => {
    component.setdate = true;
    var today = new Date();
    var today30 = new Date();
    var startdate = moment(today.getDate()).add(-1, 'months').toDate();
    var enddate = moment(today30.getDate() + 30).add(-1, 'months').toDate();
    var result = component.dateValidation();
    component.ProjectAddEditForm.controls['setdate'].setValue(component.setdate);

    expect(component.ProjectAddEditForm.controls["startdate"].value==startdate)
    expect(component.ProjectAddEditForm.controls["enddate"].value==enddate) 
    expect(component.setdate).toEqual(true);    

/*    component.setdate = false;
    fixture.detectChanges();
    result = component.dateValidation();
    expect(component.ProjectAddEditForm.controls["startdate"].value=="")
    expect(component.ProjectAddEditForm.controls["enddate"].value=="")
    expect(component.setdate).toEqual(false); 
    */
  })

  it ('call dateValidator without setDate', () => {
    component.setdate = false;
    var today = new Date();
    var today30 = new Date();
    var startdate;
    var enddate;

    component.ProjectAddEditForm.controls['setdate'].setValue(component.setdate);
    var result = component.dateValidation();

    fixture.detectChanges();
    result = component.dateValidation();
    expect(component.ProjectAddEditForm.controls["startdate"].value=="")
    expect(component.ProjectAddEditForm.controls["enddate"].value=="")
    expect(component.setdate).toEqual(false); 
  })

  it('call updateProject when a existing Project is updated', () => {
    const spy = spyOn(service, 'updateProject').and.returnValue(
      { subscribe: () => {success: true} }
    );
    var today = new Date();
    var today30 = new Date();
    var startdate = moment(today.getDate()).add(-1, 'months').toDate();
    var enddate = moment(today30.getDate() + 30).add(-1, 'months').toDate();
    
    component.UserAction = 'Update';
    component.updateProject()
    expect(spy).toHaveBeenCalled();
  });

  
  it ('call retriveProjectList to show Projects', async(() => {
    async(()=> {
      var today= new Date();
      var today30 = new Date();
      const project = [{
      ProjectID: 1,
      Project  : 'Project1',
      Priority : 10,
      StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
      EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
      ManagerID: 1
    }];
    
    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then( ()=> {
      const projname: HTMLInputElement = fixture.debugElement.query(By.css('#dispproject')).nativeElement;
      const projstartdate: HTMLInputElement = fixture.debugElement.query(By.css('#dispstartdate')).nativeElement;
      const projenddate: HTMLInputElement = fixture.debugElement.query(By.css('#dispenddate')).nativeElement;
      component.ProjectList = project;
      
      expect(project.length).toEqual(1);
      expect (projname).toContain('Project1');
    });
  })
})
);

it ('call LoadProjectDetails to show for update', async(() => {

  async(()=> {
    var today= new Date();
    var today30 = new Date();
    const project = [{
    ProjectID: 1,
    Project  : 'Project1',
    Priority : 10,
    StartDate: moment(today.getDate()).add(-1, 'months').toDate(),
    EndDate  : moment(today30.getDate() + 30).add(-1, 'months').toDate(),
    ManagerID: 1
  }]

  const spy = spyOn(service, 'getProjectById').and.returnValue(
    { subscribe: () => {Success: true; Data: project[1]} }
  );
  component.ProjectList = project;

  component.LoadProjectDetails(project);
  expect(spy).toHaveBeenCalled();
})
})
);

it('call onManagerSelect', () => {
  var user: User = {
    UserID: 1,
    FirstName: 'Abdul',
    LastName: 'Kalam',
    EmployeeID: 12345,
    ProjectID: 1,
    TaskID: 1
  }

 component.onManagerSelect(user);
 fixture.detectChanges();
 const manager = component.ProjectAddEditForm.controls["manager"].value;

 expect (manager).toContain('Abdul');
});

it ('call searchProject', () => {
  const spy = spyOn(service, 'retrieveProjects').and.returnValue(
    { subscribe: () => {success: true} }
  );
  const searchstr = 'Project1';
  component.SearchKey = searchstr;

 // component.retrieveProjectList();
 component.searchProject(searchstr);
  fixture.detectChanges();
  expect (component.SearchKey).toContain('Project1');
  expect(spy).toHaveBeenCalled();
  });

  it ('call sortProject', () => {
    const spy = spyOn(service, 'retrieveProjects').and.returnValue(
      { subscribe: () => {success: true} }
    );
  
  const sortstr = 'StartDate';
  component.SortKey = sortstr;
  component.sortProjects(sortstr);
  expect (component.SortKey).toContain('StartDate');
  expect(spy).toHaveBeenCalled();
});

it ('call suspendProject for suspendProject', () => {
  const spy = spyOn(service, 'suspendProject').and.returnValue(
    { subscribe: () => {Success: true} }
  );

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
component.suspendProject(project);
expect(spy).toHaveBeenCalled();
});

/*it ('call suspendProject for retrieveProject', () => {
  const spyProjects = spyOn(service, 'retrieveProjects').and.returnValue(
    { subscribe: () => {Success: true} }
  );

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
component.suspendProject(project);
expect(spyProjects).toHaveBeenCalled();

});
*/

it ('call resetProjectForm', () => {
component.resetProjectForm();
expect(component.UserAction).toContain('Add');
expect(component.Manager).toBe(null);
expect(component.setdate).toBe(false);
});

});
