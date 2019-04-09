import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Project } from '../../../model/project';
import { ProjectService } from '../../../service/project.service';


declare var $ :any;

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css']
})
export class ProjectSearchComponent implements OnInit {

  @Input()  name: string;
  @Output() projectSelected = new EventEmitter<Project>();

  ProjectList       : Project[];
  sortStr           : string;
  searchStr         : string;
  enableAddButton   : boolean; 
  ProjectIDSelected : number;  

  constructor(private projectservice: ProjectService) { }

  ngOnInit() {
    this.retrieveProjectList();
  }

  //Retrieve project list 
  retrieveProjectList(){
    this.projectservice.retrieveProjects(this.searchStr, this.sortStr)
    .subscribe(response => {
      if (response.Success == true) {
        this.ProjectList = response.Data;     
      }
    });   
  }

   //Search Projects
   searchProject(searchValue: string) {
    this.searchStr = searchValue;
    this.retrieveProjectList();
  }

  //Handle selected Project
  selectProject(projectID: number){
    this.ProjectIDSelected = projectID;
    this.enableAddButton = true;
  }

  addProject(){
    this.projectservice.getProjectById(this.ProjectIDSelected)
      .subscribe(response =>{
          if(response.Success==true)
          {
            this.projectSelected.emit(response.Data);
            $('#projectSearch').modal('toggle');
          }
      });
  }  
}
