import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute  } from '@angular/router';
import { Project } from '../../../Project/model/project';
import { User } from '../../../User/model/user';
import { Task, ParentTask } from '../../model/task';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {

  taskId: number = 0;
  isParentTask: any;
  TaskAddEditForm  : FormGroup;

   task = <Task>{
    Task      : '',
    Priority  : 0,
    StartDate : '',
    EndDate   : '',
    status    : ''
  };

  control: FormControl = new FormControl('startdate', Validators.minLength(4));
  smodel = {year: 2000, month: 1, day: 1};

  constructor(private activateRoute : ActivatedRoute, private router : Router, 
              private taskservice : TaskService) { 
              }

  ngOnInit() {
    this.activateRoute.queryParams
      .subscribe(params => {
        this.taskId = params['taskId']
      });

    if (this.taskId) {
      this.taskservice.getTaskById(this.taskId)
        .subscribe(response => {
          this.task = response.Data;
        });
    }
    else {
      this.taskId = 0;
    }
    console.log ("Task Id:", this.taskId);
  }

  dateValidator(startdate, enddate) {
    // console.log ("startdate: ", startdate);
    // console.log ("enddate: ", enddate);
    console.log (startdate._elRef.nativeElement.value);
    console.log (enddate._elRef.nativeElement.value);
      }

/*     this.TaskAddEditForm.get('enddate').valueChanges.subscribe(
       (enddateSelected: Date) => {
         var startdateSelected = this.TaskAddEditForm.get('startdate').value;
         var enddate = moment(enddateSelected).add(-1, 'months').toDate();
         var startdate = moment(startdateSelected).add(-1, 'months').toDate();
         if (startdate && enddate) {
           if (enddate < startdate) {
             alert('End date should be greater than start date');
             this.TaskAddEditForm.controls['enddate'].setErrors({ 'incorrect': true });
           }
         }
     });
 
     this.TaskAddEditForm.get('startdate').valueChanges.subscribe(
       (startdateSelected: Date) => {
         var enddateSelected = this.TaskAddEditForm.get('enddate').value;
         var enddate = moment(enddateSelected).add(-1, 'months').toDate();
         var startdate = moment(startdateSelected).add(-1, 'months').toDate();
         if (enddate && startdate) {
           if (startdate > enddate) {
             alert('Start date should be less than end date');            
             this.TaskAddEditForm.controls['startdate'].setErrors({ 'incorrect': true });
           }
         }
     }); */


  //Calling from user search 
  onUserSelect(user: User) {
      this.task.User = user;
  }
  
  //Calling from Project search popup
  onProjectSelect(project: Project) {
      this.task.Project = project;
      console.log (project);
  } 

  //Calling from Parent Task search popup
  onParentTaskSelect(parent: ParentTask) {
      this.task.Parent = parent;
      console.log ("parent", parent);
  } 

  addTask() {
    if (this.isParentTask) {
       const newParent = <ParentTask>{
          ParentTask  : this.task.Task,
          ProjectID   : this.task.Project.ProjectID
        };
        
        this.taskservice.addParentTask(newParent)
          .subscribe(response => {
            if (response.Success == true) {
              alert ('Parent Task added successfully!');
              this.reset();
            }
            else {
              alert (response.Message);
            }
          });
      }
      else {
        this.taskservice.addTask(this.task)
          .subscribe(response => {
            if (response.Success == true) {
              alert('Task has been added successfuly!');
              this.reset();
            }
            else {
              alert(response.Message);
            }
          });
      }
    } 

  updateTask() {
    this.taskservice.editTask(this.task)
       .subscribe(response => {
         if (response.Success == true) {
            alert ('Task has been updated successfuly!');
         }
         else {
           alert(response.Message);
         }
      });
  } 
  
  reset()
  {
    this.taskId = 0;
    this.isParentTask = '';

    this.task = <Task>{
        Task      : '',
        Priority  : 0,
        StartDate : '',
        EndDate   : '',
        status    : ''
    };
  }
}
