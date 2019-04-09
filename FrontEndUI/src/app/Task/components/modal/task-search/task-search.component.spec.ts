import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSearchComponent } from './task-search.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from '../../../service/task.service';
import { Observable, of } from 'rxjs';


describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;
  let service: TaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSearchComponent ],
      imports: [ HttpClientModule, HttpClientTestingModule,RouterModule.forRoot([]) ],
      providers: [ TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('call retrieveParentTasks with search', () => {
    const spy = spyOn(service, 'retrieveParentTasks').and.returnValue(
      of({success: true} )
    );
    const searchstr = 'ParentTask';
  
    component.searchStr = searchstr;
  
    component.searchParentTask(searchstr);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(searchstr);
  });

  it ('call addParentTask to return the selected ParentTask', () => {
    component.selectedParentTaskID = 1;    
    const spy = spyOn(service, 'getParentTaskById').and.returnValue(
      of({success: true} )
    );

    component.addParentTask();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(component.selectedParentTaskID);
   });

   it('call selectParentTask', () => {
     component.selectParentTask(1)
     expect (component.selectedParentTaskID).toEqual(1);
     expect (component.EnableAddButton).toBe(true);
   })

});
