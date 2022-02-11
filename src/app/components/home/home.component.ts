import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement/departement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(
    private router: Router,
    private loginService: LoginService,
    private departementService : DepartementService
  ) { }

  ngOnInit() {
    let token = localStorage.getItem("Authorization");

console.log(token)

  }


  isLogged() {
    return this.loginService.isLoggedIn();
  }

  isAdmin() {
    return this.loginService.isLoggedAdmin();
  }

  logout() {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

  getUser() {
    let user = localStorage.getItem("user");
    return user;
  }

 
  isActivated() {
    return this.loginService.isActivated();
  }


}
