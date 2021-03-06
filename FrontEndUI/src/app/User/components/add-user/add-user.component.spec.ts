import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { UserService } from '../../service/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Directive } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { ServerResponse } from '../../../Model/serverresponse';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';


describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserComponent ],
      imports:[ FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule ],
      providers: [FormBuilder, UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call addUser when a new User is added', () => {
    const spy = spyOn(service, 'addUser').and.returnValue(
      of({Success: true} )
    );
    
    component.AddOrEdit = 'Add';
    component.addOrEditUser()
    expect(spy).toHaveBeenCalled();
  });

  it('call updateUser when a existing User is updated', () => {
    const spy = spyOn(service, 'updateUser').and.returnValue(
      of({Success: true} )
    );
    
    component.AddOrEdit = 'Update';
    component.addOrEditUser()
    expect(spy).toHaveBeenCalled();
  });

  it ('retriveUserList component show user details', () => {
    const user = [{
      UserID: 1,
      FirstName: 'Abdul',
      LastName: 'Kalam',
      EmployeeID: 12345,
      ProjectID: 1,
      TaskID: 1
    }];
    
    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then( ()=> {
      const idelement: HTMLInputElement = fixture.debugElement.query(By.css('#employeeId')).nativeElement;
      const firstnameelement: HTMLInputElement = fixture.debugElement.query(By.css('#firstName')).nativeElement;
      const lastnameelement: HTMLInputElement = fixture.debugElement.query(By.css('#lastName')).nativeElement;
      component.UsersList = user;
      
      expect(firstnameelement.value).toContain(user[0].FirstName);
      expect(lastnameelement.value).toContain(user[0].LastName);
    })
  })

it('call deleteUser when an User is deleted', () => {
  const spy = spyOn(service, 'deleteUser').and.returnValue(
    of({Success: true} )
  );
  
  const userId=1;
  component.deleteUser(userId)
  expect(spy).toHaveBeenCalledWith(userId);
});

it ('call searchUser sortUser firstname', () => {
  const spy = spyOn(service, 'retrieveUsers').and.returnValue(
    of({Success: true})
  );
  const searchstr = 'Ganapathi';
  var sortstr = 'firstname';

  component.searchStr = searchstr;
  component.sortStr = sortstr;

  component.retrieveUserList();
  fixture.detectChanges();
  expect(spy).toHaveBeenCalledWith(searchstr, sortstr);

  component.searchUser(searchstr);
  expect(spy).toHaveBeenCalledWith(searchstr, sortstr);

  component.sortUsers(sortstr);
  expect(spy).toHaveBeenCalledWith(searchstr, sortstr);
});

it ('call sortUser lastname', () => {
    const spy = spyOn(service, 'retrieveUsers').and.returnValue(
      of({Success: true})
    );
    const searchstr = 'Ganapathi';
    const sortstr = 'lastname';
    component.searchStr = searchstr;
  
   component.sortUsers(sortstr);
    expect(spy).toHaveBeenCalledWith(searchstr, 'LastName');
});
  
it ('call sortUser employeeid', () => {
    const spy = spyOn(service, 'retrieveUsers').and.returnValue(
      of({Success: true})
    );
    const searchstr = 'Ganapathi';
    const sortstr = 'employeeId';
    component.searchStr = searchstr;
  
   component.sortUsers(sortstr);
    expect(spy).toHaveBeenCalledWith(searchstr, 'EmployeeID');
});

it('call resetUserForm',() => {
  component.resetUserForm();
  expect (component.searchStr).toBe(null);
  expect (component.sortStr).toBe(null);
  expect (component.AddOrEdit).toBe('Add');
})

});

