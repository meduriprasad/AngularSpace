import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User | null>;
  
  constructor(private auth: AngularFireAuth) { 
    this.getUserInfo();
  }

  login(){
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  logout(){
    this.auth.signOut();
  }

  getUserInfo(){
    
    this.user$=this.auth.authState;
  
  
  this.auth.authState.subscribe(info => {
    console.log('Authentication Status=',info);
  })
}
}
