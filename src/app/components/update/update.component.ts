import { Component, Input, OnInit } from '@angular/core';
import { Toast } from 'ngx-toastr';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input()
  user ;
  departements = []
  constructor(private departementService:DepartementService , private userService : UserService) { }

  ngOnInit() {
    console.log('hedhaa luser lmnayek li chnbadlouh '+this.user)
    let token = localStorage.getItem("Authorization");
    this.departementService.dep(token).subscribe( (res)=>{console.log(res);this.departements=res;},
      error=>console.log(error) )
  }

  update(user,dep){
    user.departement= dep;let token = localStorage.getItem("Authorization");
    this.userService.update(user,token).subscribe(res=>console.log(res) , err =>console.log(err))
  }

}
