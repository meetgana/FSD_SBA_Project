import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../service/task.service';
import { ParentTask } from '../../../model/task';

declare var $ :any;

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {

  @Input()  name: string;
  @Output() parentTaskSelected = new EventEmitter<ParentTask>();

  ParentTasksList       : ParentTask[];
  SortKey               : string;
  SearchKey             : string;
  EnableAddButton       : boolean; 
  SelectedParentTaskID  : number;  

  constructor(private parenttaskservice: TaskService) { }

  ngOnInit() {
    this.retrieveParentTasks();
  }

  retrieveParentTasks(){
    this.parenttaskservice.retrieveParentTasks(this.SearchKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.ParentTasksList = response.Data;
        }
      });
      this.EnableAddButton = false;
  }
  
  searchParentTask(searchValue: string) {
    this.SearchKey = searchValue;
    this.retrieveParentTasks();
  }

  selectParentTask(parentID: number){
    this.SelectedParentTaskID = parentID;
    this.EnableAddButton = true;
  }

  addParentTask(){
    this.parenttaskservice.getParentTaskById(this.SelectedParentTaskID)
      .subscribe(response =>{
          if(response.Success==true)
          {
            this.parentTaskSelected.emit(response.Data);
            $('#parentTaskSearch').modal('toggle');
          }
      });
  }

}
