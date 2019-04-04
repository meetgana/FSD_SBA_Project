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
  AddOrEdit      : String ;
  newUser         : User;

  constructor(private formbuilder : FormBuilder,
              private userservice   : UserService) {
    this.initializeUserForm();
  };

  ngOnInit() {
    this.retrieveUserList();
  }

  // Initialize User form
  initializeUserForm(){
    this.UserAddEditForm = this.formbuilder.group({
      firstname :['', Validators.required],
      lastname :['', Validators.required],
      employeeId :['', Validators.required],
      userid:''
    });
    this.AddOrEdit ="Add";
  }

  //Retrieve Users list when loading Add User Form
  retrieveUserList(){
    this.userservice.retrieveUsers(this.SearchKey, this.SortKey)
    .subscribe(response => {
      if (response.Success == true) {
        this.UsersList = response.Data;
      }
    });   
  }

  // Load User Form based on Users choice
  addOrEditUser() {
    if (this.AddOrEdit == 'Add') {
      this.addUserHandler();
    }    else if (this.AddOrEdit == 'Update') {
       this.updateUser();
    }
  }

  // Add User in database
  addUserHandler() {
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

  // Edit User details in User form
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
          this.AddOrEdit = 'Update';
        }
        else {
          alert(response.Message);
        }
      });
  }

  //Update User data
  updateUser() {
    const UserData = <User>{
      UserID: this.UserAddEditForm.controls['userid'].value,
      FirstName: this.UserAddEditForm.controls['firstname'].value,
      LastName: this.UserAddEditForm.controls['lastname'].value,
      EmployeeID: this.UserAddEditForm.controls['employeeId'].value
    };

    console.log (UserData);
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

  // Delete User from database
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

  // Search the User data using User input in User form
  searchUser(searchValue: string) {
    this.SearchKey = searchValue;
    this.retrieveUserList();
  }

  //Sort data using the choice from User form
  sortUsers(sortKey: string){
    if(sortKey=='firstname')
    this.SortKey = 'FirstName';
    else if(sortKey=='lastname')
    this.SortKey = 'LastName';
    else if(sortKey=='employeeId')
    this.SortKey = 'EmployeeID';
    this.retrieveUserList();
  }

  // Reset the User Form
  resetUserForm() {
    this.UserAddEditForm.reset();
    this.SearchKey = null;
    this.SortKey = null;    
    this.AddOrEdit ='Add';  
  }

}
