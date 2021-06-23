import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  isExisted = false;
  constructor(public firebaseService: FirebaseService,private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    })
  }


  get email() {return this.registerForm.get('email')}
  get password() {return this.registerForm.get('password')}

  async register(){
    console.log(this.email.value,this.password.value)
    await this.firebaseService.signup(this.email.value,this.password.value)
    if(this.firebaseService.isExisted){
      this.isExisted = true;
    }
  }
}
