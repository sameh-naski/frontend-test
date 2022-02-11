import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement/departement.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  departements = [];

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private service:RegisterService,private userService:UserService,private toastr:ToastrService,private departementService  : DepartementService,private router:Router) {
    let registerFormControls = {

      username:new FormControl('',[
        Validators.required,
        Validators.pattern('[a-zA-z][a-zA-z]+')
      ]),
      email:new FormControl('',[
        Validators.email,
        Validators.required,
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[a-zA-z0-9]+'),
      ]),
      confirmpassword:new FormControl('',[
        Validators.required,
      ]),
      role:new FormControl('user',[
        Validators.required
      ]),
      departement:new FormControl('departement',[
        Validators.required
      ])
    };
    this.registerForm=formBuilder.group(registerFormControls);
  }

  ngOnInit() {
    this.loadDeps();
  }



  get username(){
    return this.registerForm.get('username');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }
  get confirmpassword(){
    return this.registerForm.get('confirmpassword')
  }
  get role(){
    return this.registerForm.get('role');
  }
  get departement(){
    return this.registerForm.get('departement')
  }

  loadDeps() {
    let token = localStorage.getItem("Authorization");
    this.departementService.dep(token).subscribe( (res)=>{console.log(res);this.departements=res;},
      error=>console.log(error) )
  }
  register(){
    let data = this.registerForm.value;
    data.role = [data.role];
    data.departement ={
    "id": this.registerForm.get('departement').value
}
    console.log(data);

    this.service.register(data).subscribe(
      res=>{

        console.log(res);
       this.toastr.success('User registred succesfully')

      }

    ,
      error=>{
       console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

}
