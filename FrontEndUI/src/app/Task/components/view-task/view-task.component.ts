import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Project } from '../../../Project/model/project';
import { Task } from '../../model/task';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  project     : Project;
  TasksList   : Task[];
  SortKey     : string;

  constructor(private taskservice   : TaskService, 
              private router      : Router,
              private route       : ActivatedRoute) { }

  ngOnInit() {
  }

  onProjectSelect(project: Project) {
    this.project = project;
    this.retrieveTasks();
  }

  //Retrieve all tasks for the selected project
  retrieveTasks() {
    this.taskservice.retrieveTasks(this.project.ProjectID, this.SortKey)
    .subscribe(response => {
      if (response.Success == true) {
        if (response.Data.length == 0) {
          alert(response.Message);
        }
        this.TasksList = response.Data;
        }
      else {
        alert(response.Message);
      }
    });
  }

  //Sort tasks based on the sort criteia passed
  sortTasks(sortKey: string) {
    this.SortKey = sortKey;
    this.taskservice.retrieveTasks(this.project.ProjectID, sortKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.TasksList = response.Data;
        }
        else {
          alert(response.Message);
        }
      });
  } 

  endTask(taskId: number) {
    this.taskservice.taskComplete(taskId)
      .subscribe(response => {
        if (response.Success == true) {
          this.retrieveTasks();
          alert('Task ended successfully!');
        }
        else {
          alert(response.Message);
        }
      });
  }

  updateTask(taskId: number) {
    this.taskservice.getTaskById(taskId)
      .subscribe(response => {
        if (response.Success == true) {
          this.router.navigate(['/addTask'], { queryParams: { taskId: taskId } });
        }
        else {
          alert(response.Message);
        }
      });
  }
}
