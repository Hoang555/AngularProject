import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularProject';
  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService: FirebaseService) { }


  logout(){
    this.firebaseService.logout()
    this.isLogout.emit();
  }
}


  