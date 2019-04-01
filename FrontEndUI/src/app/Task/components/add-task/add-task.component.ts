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
  isDatesValid: boolean = true;

   task = <Task>{
    Task      : '',
    Priority  : 0,
    StartDate : new Date(),
    EndDate   : new Date(),
    status    : ''
  };

  sDate : any;
  eDate: any;

  constructor(private activateRoute : ActivatedRoute, private router : Router, 
              private taskservice : TaskService) { 
                var today = new Date();
                var today1 = new Date();
                const tomorrow =  new Date(today1.setDate(today1.getDate() + 1));
             /*   this.sDate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
                this.eDate = <NgbDateStruct>{ year: tomorrow.getFullYear(), month: tomorrow.getMonth() + 1, day: tomorrow.getDate() };
              */
             this.sDate = <NgbDateStruct>{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
             this.eDate = <NgbDateStruct>{ year: tomorrow.getFullYear(), month: tomorrow.getMonth() + 1, day: tomorrow.getDate() };
           
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
  }

  dateValidator() {
    var enddate: any = moment(this.eDate).add(-1, 'months').toDate();
    var startdate: any = moment(this.sDate).add(-1, 'months').toDate();
    if (startdate && enddate) {
      if (enddate < startdate) {
        alert('End date should be greater than start date');
        this.isDatesValid = false;
      }
      else {
        this.isDatesValid = true;
      }
    }
  }

  checkDates() {
    return this.isDatesValid;
  }

  //Calling from user search 
  onUserSelect(user: User) {
      this.task.User = user;
  }
  
  //Calling from Project search popup
  onProjectSelect(project: Project) {
      this.task.Project = project;
  } 

  //Calling from Parent Task search popup
  onParentTaskSelect(parent: ParentTask) {
      this.task.Parent = parent;
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
        this.task.StartDate = moment(this.sDate).add(-1, 'months').toDate();
        this.task.EndDate = moment(this.eDate).add(-1, 'months').toDate();

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
    this.task.StartDate = moment(this.sDate).add(-1, 'months').toDate();
    this.task.EndDate = moment(this.eDate).add(-1, 'months').toDate();
    
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
        StartDate : new Date(),
        EndDate   : new Date(),
        status    : ''
    };
  }
}
