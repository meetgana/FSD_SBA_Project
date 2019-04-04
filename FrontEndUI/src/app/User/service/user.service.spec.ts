import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServerResponse } from '../../Model/ServerResponse';
import { User } from '../model/user';
import { of, Observable } from 'rxjs';

describe('UserService', () => {

  let service: UserService;
  let userservice: UserService;
  let userpostservice: UserService;
  let httpGetSpy: {get: jasmine.Spy};
  let httpPostSpy: {post: jasmine.Spy};


  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [UserService]
  }).compileComponents();
});

beforeEach(() => {
  service = TestBed.get(UserService);
  httpGetSpy = jasmine.createSpyObj('Value', ['get']);
  httpPostSpy = jasmine.createSpyObj('Value', ['post']);

  userservice = new UserService(<any>httpGetSpy);
  userpostservice = new UserService(<any>httpPostSpy);
});

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it ('should return expected Users', () => {
    const users: User[] = [{
        UserID: 1,
        FirstName: 'Abdul',
        LastName: 'Kalam',
        EmployeeID: 12345,
        ProjectID: 1,
        TaskID: 1
    }];

    httpGetSpy.get.and.returnValue(of(users));
    userservice.retrieveUsers().subscribe(
      data => {expect(users.length).toEqual(1)}
    )
  })

  it ('should return expected User in getUserById', () => {
    const users: User = {
        UserID: 1,
        FirstName: 'Abdul',
        LastName: 'Kalam',
        EmployeeID: 12345,
        ProjectID: 1,
        TaskID: 1
    };

    httpGetSpy.get.and.returnValue(of(users));
    userservice.getUserByID(users.UserID).subscribe(
      data => {expect(users.FirstName).toBe('Abdul')}
    )
  })

  it ('should add new User', () => {
    const users: User = {
        UserID: 1,
        FirstName: 'Abdul',
        LastName: 'Kalam',
        EmployeeID: 12345,
        ProjectID: 1,
        TaskID: 1
    };

    httpPostSpy.post.and.returnValue(of(users));
    userpostservice.addUser(users).subscribe(
      data => {expect(users.FirstName).toBe('Abdul')
    });
  })

  it ('should update new user', () => {
    const users: User = {
        UserID: 1,
        FirstName: 'Abdul',
        LastName: 'Kalam',
        EmployeeID: 12345,
        ProjectID: 1,
        TaskID: 1
    };

    httpPostSpy.post.and.returnValue(of(users));
    userpostservice.updateUser(users).subscribe(
      data => {expect(users.UserID).toEqual(1)
    });
  })

});
