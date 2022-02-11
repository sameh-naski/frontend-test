import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<any>();
  users=[];

  constructor(
    private userService:UserService,
    private toastr:ToastrService,
    private router:Router,
    ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    let token = localStorage.getItem("Authorization");
    this.userService.getAll(token).subscribe(
      res=>this.users=res,
      error=>console.log(error)
    );
  }

  delete(id,user){
    let index = this.users.indexOf(user);
    this.users.splice(index,1);

    let token = localStorage.getItem("Authorization");
    this.userService.delete(id,token).subscribe(
      res=>{
        this.toastr.success('User deleted!')
      },
      error=>this.toastr.error('Error!')
    );
  }
  update(user){
    this.messageEvent.emit(user)
    this.router.navigate(['update'],user)
  }



}
