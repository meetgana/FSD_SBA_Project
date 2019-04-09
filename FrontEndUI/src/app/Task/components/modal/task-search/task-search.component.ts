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

  ParentTaskList       : ParentTask[];
  SortKey               : string;
  searchStr             : string;
  EnableAddButton       : boolean; 
  selectedParentTaskID  : number;  

  constructor(private parenttaskservice: TaskService) { }

  ngOnInit() {
    this.retrieveParentTasks();
  }

  retrieveParentTasks(){
    this.parenttaskservice.retrieveParentTasks(this.searchStr)
      .subscribe(response => {
        if (response.Success == true) {
          this.ParentTaskList = response.Data;
        }
      });
      this.EnableAddButton = false;
  }
  
  searchParentTask(searchValue: string) {
    this.searchStr = searchValue;
    this.retrieveParentTasks();
  }

  selectParentTask(parentID: number){
    this.selectedParentTaskID = parentID;
    this.EnableAddButton = true;
  }

  addParentTask(){
    this.parenttaskservice.getParentTaskById(this.selectedParentTaskID)
      .subscribe(response =>{
          if(response.Success==true)
          {
            this.parentTaskSelected.emit(response.Data);
            $('#parentTaskSearch').modal('toggle');
          }
      });
  }

}
