import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSignedIn = false;
  isTrue = false;
  constructor(public firebaseService: FirebaseService,private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    })
    
  }

  get email() {return this.loginForm.get('email')}
  get password() {return this.loginForm.get('password')}
  async login(){
    console.log(this.email.value,this.password.value)
    await this.firebaseService.signin(this.email.value,this.password.value)
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn = true
    }
    if(this.firebaseService.isCorrected){
      this.isTrue = true
    }
  }
  handleLogout(){
    this.isSignedIn = false
  }
}
