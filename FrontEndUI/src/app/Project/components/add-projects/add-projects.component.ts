import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../model/project';
import { User } from '../../../User/model/user';
import { ProjectService } from '../../service/project.service';
import { UserService } from '../../../User/service/user.service';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css']
})
export class AddProjectsComponent implements OnInit {

  ProjectList         : Project[];
  ProjectAddEditForm  : FormGroup;
  UserAction          : string;
  setdate             : boolean;
  Manager             : User;
  sortStr             : string;
  searchStr           : string;

  constructor(private formbuilder : FormBuilder, private projectservice : ProjectService,
              private userservice : UserService) {
                this.initializeProjectForm();
              }

  ngOnInit() {
    this.retrieveProjectList();    
    this.dateValidation() ;
  }

  initializeProjectForm() {
    this.ProjectAddEditForm = this.formbuilder.group({
      project : ['', Validators.required],
      setdate     : false,
      startdate   : [{ value: '', disabled: true }],
      enddate     : [{ value: '', disabled: true }],
      priority    : 0,
      manager     : '',
      projectid   : ''
    });
  this.UserAction = 'Add';
  } 

  //Retrieve project list while loading Project Form
  retrieveProjectList(){
    this.projectservice.retrieveProjects(this.searchStr, this.sortStr)
    .subscribe(response => {
      if (response.Success == true) {
        this.ProjectList = response.Data;
      }
    });   
  }

  //Invoke Add Project or Update Project based on User choice in Project Form
  addOrEditProject() {
    if (this.UserAction == 'Add') {
      this.addProject();
    }
    else {
      this.updateProject();
    }
  }
  
  //Add a new project 
  addProject(){
    const newProject = <Project>{
      Project  : this.ProjectAddEditForm.controls['project'].value,
      Priority    : this.ProjectAddEditForm.controls['priority'].value
    };
    
    if (this.Manager) {
      newProject.ManagerID = this.Manager.UserID;
    }
    if (this.setdate) {
      newProject.StartDate = moment(this.ProjectAddEditForm.controls['startdate'].value).add(-1, 'months').toDate();
      newProject.EndDate = moment(this.ProjectAddEditForm.controls['enddate'].value).add(-1, 'months').toDate();
    }
    
    console.log (newProject);
    this.projectservice.addProject(newProject)
      .subscribe(response => {
        if (response.Success == true) {
          alert('Project added successfully!');
          this.retrieveProjectList();
          this.resetProjectForm();
        }
        else {
          alert(response.Message);
        }
      });    
 }
  
 //Initialize start date and end date
 dateValidation() {
   this.ProjectAddEditForm.get('setdate').valueChanges.subscribe(
     (setdate: boolean) => {
       this.setdate = setdate;
        if (setdate) {
          var today = new Date();
          var startdate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
          this.ProjectAddEditForm.get('startdate').setValidators([Validators.required]);
          this.ProjectAddEditForm.get('startdate').setValue(startdate);
          this.ProjectAddEditForm.get('startdate').enable({ emitEvent: true });
          var enddate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() + 1 };
          this.ProjectAddEditForm.get('enddate').setValidators([Validators.required]);
          this.ProjectAddEditForm.get('enddate').setValue(enddate);
          this.ProjectAddEditForm.get('enddate').enable({ emitEvent: true });
        }
        else {
          this.ProjectAddEditForm.get('startdate').clearValidators();
          this.ProjectAddEditForm.get('startdate').setValue('');
          this.ProjectAddEditForm.get('startdate').disable({ emitEvent: true });
          this.ProjectAddEditForm.get('enddate').clearValidators();
          this.ProjectAddEditForm.get('enddate').setValue('');
          this.ProjectAddEditForm.get('enddate').disable({ emitEvent: true });
        }
    });

    this.ProjectAddEditForm.get('enddate').valueChanges.subscribe(
      (enddateSelected: Date) => {
        var startdateSelected = this.ProjectAddEditForm.get('startdate').value;
        var enddate = moment(enddateSelected).add(-1, 'months').toDate();
        var startdate = moment(startdateSelected).add(-1, 'months').toDate();
        if (startdate && enddate) {
          if (enddate < startdate) {
            alert('End date should be greater than start date');
            this.ProjectAddEditForm.controls['enddate'].setErrors({ 'incorrect': true });
          }
        }
    });

    this.ProjectAddEditForm.get('startdate').valueChanges.subscribe(
      (startdateSelected: Date) => {
        var enddateSelected = this.ProjectAddEditForm.get('enddate').value;
        var enddate = moment(enddateSelected).add(-1, 'months').toDate();
        var startdate = moment(startdateSelected).add(-1, 'months').toDate();
        if (enddate && startdate) {
          if (startdate > enddate) {
            alert('Start date should be less than end date');            
            this.ProjectAddEditForm.controls['startdate'].setErrors({ 'incorrect': true });
          }
        }
    });
  }

  //Calling from manager search 
  selectedManager(manager: User) {
    this.Manager = manager;
    this.ProjectAddEditForm.get('manager').setValue(`${this.Manager.FirstName} ${this.Manager.LastName}`);
  }
  
  //Search Project with Project name from Project form
  searchProject(searchValue: string) {
    this.searchStr = searchValue;
    this.retrieveProjectList();
  } 

  //Sort Projects based on input criteria from Project form
  sortProjects(sortStr: string){
    if(sortStr=='StartDate') this.sortStr = 'StartDate';
    else if(sortStr=='EndDate')this.sortStr = 'EndDate';
    else if(sortStr=='Priority')this.sortStr = 'Priority';
    else if(sortStr=='CompletedTasks')this.sortStr = 'CompletedTasks';    
    this.retrieveProjectList();
  }

  //Update the Project details in database.
  updateProject() {
    const ProjectDetails = <Project>{
      ProjectID     : this.ProjectAddEditForm.controls['projectid'].value,
      Project       : this.ProjectAddEditForm.controls['project'].value,
      Priority      : this.ProjectAddEditForm.controls['priority'].value

    };
    if (this.Manager) {
      ProjectDetails.ManagerID = this.Manager.UserID;
    }
    if (this.setdate) {
      ProjectDetails.StartDate = moment(this.ProjectAddEditForm.controls['startdate'].value).add(-1, 'months').toDate();
      ProjectDetails.EndDate   = moment(this.ProjectAddEditForm.controls['enddate'].value).add(-1, 'months').toDate();
    }
    this.projectservice.updateProject(ProjectDetails)
      .subscribe(response => {
        if (response.Success == true) {
          alert('Project details are updated successfully!');
          this.resetProjectForm();
          this.retrieveProjectList();
        }
        else
          alert(response.Message);
    });
  }
  
  //Upload the project details selected for update in the top section of the Project form
  loadProjectDetails(project) {
    this.resetProjectForm();
    this.projectservice.getProjectById(project)
      .subscribe(response => {
        if (response.Success == true) {

          this.ProjectAddEditForm.controls["project"].setValue(response.Data.Project);
          this.ProjectAddEditForm.controls["projectid"].setValue(response.Data.ProjectID);          
          this.ProjectAddEditForm.controls["priority"].setValue(response.Data.Priority);
          this.ProjectAddEditForm.controls["project"].setValidators(Validators.required);       
          var ProjstartDate, ProjendDate;
          
          if (response.Data.StartDate || response.Data.EndDate) {
            this.ProjectAddEditForm.controls["setdate"].setValue(true);
            let newStarDate = new Date(response.Data.StartDate)
            let newEndDate  = new Date(response.Data.EndDate)

            ProjstartDate = <NgbDateStruct>{ year  : newStarDate.getFullYear(), month : newStarDate.getMonth() + 1,day   : newStarDate.getDate()  };

            ProjendDate = <NgbDateStruct>{year  : newEndDate.getFullYear(), month : newEndDate.getMonth() + 1, day   : newEndDate.getDate()};
            this.ProjectAddEditForm.controls["startdate"].setValue(ProjstartDate);
            this.ProjectAddEditForm.controls["enddate"].setValue(ProjendDate);
          }
          else {
            this.ProjectAddEditForm.controls["setdate"].setValue(false);
          }
          if (response.Data.ManagerID) {
            this.userservice.getUserByID(response.Data.ManagerID)
              .subscribe(response => {
                this.Manager = response.Data;
                if (response.Data) {this.ProjectAddEditForm.controls["manager"].setValue(`${this.Manager.FirstName} ${this.Manager.LastName}`);}
              });
          }
          this.UserAction = 'Update';
        }
        else {
          alert(response.Message);
        }
      });
  }

  //To suspend the project 
  suspendProject(project) {
    this.projectservice.suspendProject(project)
      .subscribe(response => {
        if (response.Success == true) {
          alert('Project is suspended!');
          this.retrieveProjectList();
        }
        else {
          alert(response.Message);
        }
    });
  }

  //Reset the add project form
  resetProjectForm() {
    this.ProjectAddEditForm.reset();
    this.UserAction = 'Add';
    this.ProjectAddEditForm.get('priority').setValue(0);    
    this.Manager = null;  
    this.setdate = false;      
  }
  
}
