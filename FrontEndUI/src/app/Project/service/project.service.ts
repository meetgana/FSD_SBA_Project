import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { ServerResponse } from '../../Model/ServerResponse';
import { Observable,of, from } from 'rxjs';
import { Project } from '../Model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = "http://localhost:4000";

  constructor(private http: HttpClient) { }

    //Add Projects
    addProject(newProject: Project): Observable<ServerResponse<Project>> {
      return this.http.post<ServerResponse<Project>>(`${this.url}/projects/add`, newProject);
    }
  
    //Retrieve projects
    retrieveProjects(searchKey?: string, sortKey?: string): Observable<ServerResponse<Project[]>> {
      let params = new HttpParams();  
      if (searchKey)
        params = params.append('searchKey', searchKey);
      if (sortKey)
        params = params.append('sortKey', sortKey);
  
      return this.http .get<ServerResponse<Project[]>>(`${this.url}/projects`, { params: params });
    }
  
    // Retrieve projet by project id
    getProjectByName(ProjectName: number): Observable<ServerResponse<Project>> {
      return this.http.get<ServerResponse<Project>>(`${this.url}/projects/${ProjectName}`);
    }
  
    //Update Project data 
    updateProject(ProjectData: Project): Observable<ServerResponse<Project>> {
      return this.http.post<ServerResponse<Project>>(`${this.url}/projects/edit/${ProjectData.ProjectName}`, ProjectData);
    }  
          
    //Delete Project 
    suspendProject(ProjectName: string): Observable<ServerResponse<Project>> {
      return this.http.get<ServerResponse<Project>>(`${this.url}/projects/delete/${ProjectName}`);
    }  
}
