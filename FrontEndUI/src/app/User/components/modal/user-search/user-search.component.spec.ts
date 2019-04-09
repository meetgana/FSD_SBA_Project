import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSearchComponent } from './user-search.component';
import { UserService } from '../../../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { ServerResponse } from '../../../../Model/serverresponse';
import { User } from 'src/app/User/model/user';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule],
      providers: [UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('call retrieveUsers, searchUser sortUser', () => {
    const spy = spyOn(service, 'retrieveUsers').and.returnValue(
      of( {success: true} )
    );
    const searchstr = 'Ganapathi';
    const sortstr = 'FirstName';
  
    component.searchStr = searchstr;
    component.sortStr = sortstr;
  
    component.retrieveUsers();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();

    component.searchUser(searchstr);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(searchstr, sortstr);
  });

  it ('call addUser to return the selected user', () => {
    const user: User = {
      UserID: 1,
      FirstName: 'Abdul',
      LastName: 'Kalam',
      EmployeeID: 12345,
      ProjectID: 1,
      TaskID: 1
    };
    
    component.userIdSelected = user.UserID;
    const spy = spyOn(service, 'getUserByID').and.returnValue(
      of({success: true, Data: user})
    );

    component.addUser();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(user.UserID);
  });

  it('call selectUser', () => {
      component.selectUser (1);
      expect (component.userIdSelected).toEqual(1);
      expect (component.enableAddButton).toBe(true);
  })

});
