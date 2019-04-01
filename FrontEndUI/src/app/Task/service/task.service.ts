import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerResponse } from '../../Model/ServerResponse';
import { Observable, of, from } from 'rxjs';
import { Task, ParentTask } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  // Insert Parent Task in Database
  addParentTask(newParentTask: ParentTask): Observable<ServerResponse<ParentTask>> {
    return this.http.post<ServerResponse<ParentTask>>(`${this.url}/parenttasks/add`, newParentTask);
  } 

  //Get all the parent tasks
  retrieveParentTasks(searchKey?: string, sortKey?: string): Observable<ServerResponse<ParentTask[]>> {
    let params = new HttpParams();  
    if (searchKey)
      params = params.append('searchKey', searchKey);
    if (sortKey)
      params = params.append('sortKey', sortKey);
  
    return this.http .get<ServerResponse<ParentTask[]>>(`${this.url}/parenttasks`, { params: params });
  }
  
  // Get Parent task by Id
  getParentTaskById(parentId: number): Observable<ServerResponse<ParentTask>> {
     return this.http.get<ServerResponse<ParentTask>>(`${this.url}/parenttasks/${parentId}`);
  }
  
  // Insert Task in database
  addTask(newTask: Task): Observable<ServerResponse<Task>> {
    return this.http.post<ServerResponse<Task>>(`${this.url}/tasks/add`, newTask);
  }

  //Update the task
  editTask(updateTask: Task): Observable<ServerResponse<Task>>
  {
     return this.http.post<ServerResponse<Task>>(`${this.url}/tasks/edit`, updateTask);
  }

  // Get all the tasks
  retrieveTasks(ProjectId?: number, sortKey?:string): Observable<ServerResponse<Task[]>> {
    let params = new HttpParams();

    if (ProjectId)
      params = params.append('ProjectId', ProjectId.toString());
    if (sortKey)
      params = params.append('sortKey', sortKey);

    return this.http.get<ServerResponse<Task[]>>(`${this.url}/tasks`, { params: params });
  }

  // Get task by ID
  getTaskById(taskId: number): Observable<ServerResponse<Task>> {
    return this.http.get<ServerResponse<Task>>(`${this.url}/tasks/${taskId}`);
  }

  //Update the task status to complete
  taskComplete(taskId: number): Observable<ServerResponse<Task>>
  {
    return this.http.get<ServerResponse<Task>>(`${this.url}/tasks/complete/${taskId}`);
  }  
}
