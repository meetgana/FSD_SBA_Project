import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent} from './User/components/add-user/add-user.component';
import { AddProjectsComponent} from './Project/components/add-projects/add-projects.component';
import { AddTaskComponent} from './Task/components/add-task/add-task.component';
import { ViewTaskComponent} from './Task/components/view-task/view-task.component';


const routes: Routes = [
  { path: 'addUser', component: AddUserComponent },
  { path: 'addProject', component: AddProjectsComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'viewTask', component: ViewTaskComponent },
  { path: '', redirectTo: '/addUser',  pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
