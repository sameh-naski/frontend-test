import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login/login.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  username: string = "";
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {}

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

  profile() {
    console.log("go to profile of " + this.getUser());
  }
  isActivated() {
    return this.loginService.isActivated();
  }
}
