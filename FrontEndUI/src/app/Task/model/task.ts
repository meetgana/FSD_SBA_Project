import { User } from "../../User/model/user";
import { Project } from "../../Project/model/project";

export interface Task {
    TaskID?     : number,
    Parent?     : ParentTask,
    Project?    : Project,
    Task        : string,
    StartDate?  : Date,
    EndDate?    : Date,
    Priority    : number,    
    User?       : User,
    status      : string
}

export interface ParentTask {
    ParentTaskID?   : number,
    ParentTask      : string,
    ProjectID?      : number
}