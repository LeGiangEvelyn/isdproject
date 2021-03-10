import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FirebaseService } from './services/firebase.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private fireBase: FirebaseService) {}
  canActivate(): boolean {
    if (!this.fireBase.isLoggedIn) {
      this.router.navigate(['./login']);
    }
    return true;
  }
}
