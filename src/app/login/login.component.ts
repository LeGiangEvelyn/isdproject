import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //   user = {
  //   userName: '',
  //   password: '',
  // };
  // constructor(private auth: AuthService) {}
  // ngOnInit(): void {}

  // logIn() {
  //   this.auth.logIn(this.user);
  // }
  inError;
  upError;
  isSignedIn: boolean = false;
  isSignedUp: boolean = false;
  submited = false;
  constructor(public firebaseService : FirebaseService, private route: Router){}

  ngOnInit(){
    if(localStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
  }

  async onSignUp(email:string,password:string){
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn) {
      this.firebaseService.isLoggedIn = true
    } else this.upError = this.firebaseService.upError;
    await this.route.navigate(['login'])
  }

  async onSignIn(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn = true) {
          this.isSignedIn = true;
          await this.route.navigate(['menu'])
    } else this.inError = this.firebaseService.inError;
  }

  handleLogout(){
    this.isSignedIn = false

  }

  navigateSignUp() {
    this.isSignedUp = !this.isSignedUp;
  }
  back() {
    this.isSignedUp = !this.isSignedUp;
  }

 
}
