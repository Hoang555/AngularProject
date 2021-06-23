import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  isCorrected = false
  isExisted = false;
  constructor(public firebaseAuth: AngularFireAuth,private router: Router) { }

  // login method
  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true;
      this.router.navigate(['todo']);
      localStorage.setItem('user', JSON.stringify(res.user))
    })
    .catch(error => {
      console.log(error.code)
      this.isCorrected = true;
    })
  }

  // register method
  async signup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true;
      alert("Đăng ký thành công!")
      this.router.navigate(['']);
      //localStorage.setItem('user', JSON.stringify(res.user))
    })
    .catch(error =>{
      console.log(error.code)
      this.isExisted = true;
    })
  }

  // logout method
  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user')
    this.router.navigate(['']);
  }
}
