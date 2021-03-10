import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth' 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  upError: String;
  inError: string;
  constructor(public firebaseAuth : AngularFireAuth) { }

  async signin(email: string, password : string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    }).catch(err => {
      this.inError = err.message
    })
  }

  async signup(email: string, password : string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    }).catch(err => {
        this.upError = err.message
    })
  }

  logOut(){
    this.isLoggedIn = !this.isLoggedIn;
    localStorage.removeItem('user')
  }
}