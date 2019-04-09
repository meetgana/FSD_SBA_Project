import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';

declare var $ :any;

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})


export class UserSearchComponent implements OnInit {

  @Input()  name: string;
  @Output() userSelected = new EventEmitter<User>();

  UsersList       : User[];
  sortStr         : string;
  searchStr       : string;
  userIdSelected  : number;
  enableAddButton       : boolean;

  constructor(private _userSrvc: UserService) { }

  ngOnInit() {
    this.retrieveUsers();
  }

  retrieveUsers(){
    this._userSrvc.retrieveUsers(this.searchStr, this.sortStr)
      .subscribe(response => {
        if (response.Success == true) {
          this.UsersList = response.Data;
        }
      });
      this.enableAddButton = false;
  }

  searchUser(searchValue: string) {
    this.searchStr = searchValue;
    this.retrieveUsers();
  }
  
  selectUser(userID: number){
    this.userIdSelected = userID;
    this.enableAddButton = true;
  }

  addUser(){
    this._userSrvc.getUserByID(this.userIdSelected)
      .subscribe(response =>{
          if(response.Success==true)
          {
            this.userSelected.emit(response.Data);
            $('#userSearch').modal('toggle');
          }
      });
  }
}
