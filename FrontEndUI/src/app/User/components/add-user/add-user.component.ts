import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  UsersList       : User[];
  UserAddEditForm : FormGroup;
  SortKey         : string;
  SearchKey       : string;  
  UserAction      : String ;

  constructor(private formbuilder : FormBuilder,
              private userservice   : UserService) {
    this.initializeForm();
  }

  ngOnInit() {
    this.retrieveUserList();
  }

  initializeForm(){
    this.UserAddEditForm = this.formbuilder.group({
      firstname :['', Validators.required],
      lastname :['', Validators.required],
      employeeId :['', Validators.required],
      userid:''
    });
    this.UserAction ="Add";
  }

  addOrEditUser() {
    if (this.UserAction == 'Add') {
      this.addUser();
    }
    else if (this.UserAction == 'Update') {
       this.updateUser();
    }
  }

  addUser() {
    console.log ("In addUser");

    const newUser = <User>{
      FirstName: this.UserAddEditForm.controls['firstname'].value,
      LastName: this.UserAddEditForm.controls['lastname'].value,
      EmployeeID: this.UserAddEditForm.controls['employeeId'].value
    };

    console.log (newUser);
    this.userservice.addUser(newUser)
      .subscribe(response => {
        if (response.Success == true) {
          alert('User added successfully!');
          this.retrieveUserList();
          this.resetUserForm();
        }
        else
          alert (response.Message);
      });
  }

  resetUserForm() {
    this.UserAddEditForm.reset();
    this.SearchKey = null;
    this.SortKey = null;    
    this.UserAction ='Add';  
  }

  retrieveUserList(){
    this.userservice.retrieveUsers(this.SearchKey, this.SortKey)
    .subscribe(response => {
      if (response.Success == true) {
        this.UsersList = response.Data;
      }
    });   
  }

  editUser(userID) {
     this.userservice.getUserByID(userID)
      .subscribe(response => {
        if (response.Success == true) {
          this.UserAddEditForm = this.formbuilder.group({
            firstname: [response.Data.FirstName, Validators.required],
            lastname: [response.Data.LastName, Validators.required],
            employeeId: [response.Data.EmployeeID,Validators.required],
            userid: response.Data.UserID
          });
          this.UserAction = 'Update';
        }
        else {
          alert(response.Message);
        }
      });
  }

  updateUser() {
    const UserData = <User>{
      UserID: this.UserAddEditForm.controls['userid'].value,
      FirstName: this.UserAddEditForm.controls['firstname'].value,
      LastName: this.UserAddEditForm.controls['lastname'].value,
      EmployeeID: this.UserAddEditForm.controls['employeeId'].value
    };

    this.userservice.updateUser(UserData)
      .subscribe(response => {
        if (response.Success == true) {
          alert('User Data updated successfully!');
          this.retrieveUserList();
          this.resetUserForm();
        }
        else
          alert(response.Message);
      });
  }

  deleteUser(userID){
    this.userservice.deleteUser(userID)
    .subscribe(response => {
      if (response.Success == true) {
        alert('User is deleted successfully!');
        this.retrieveUserList();
      }
      else {
        alert(response.Message);
      }
    });
  }

  searchUser(searchValue: string) {
    debugger;
    this.SearchKey = searchValue;
    this.retrieveUserList();
  }

  sortUsers(sortKey: string){
    if(sortKey=='firstname')
    this.SortKey = 'FirstName';
    else if(sortKey=='lastname')
    this.SortKey = 'LastName';
    else if(sortKey=='employeeId')
    this.SortKey = 'EmployeeID';
    this.retrieveUserList();
  }

}
