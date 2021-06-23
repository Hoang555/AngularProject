import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoComponent]
})
export class TodoComponent implements OnInit {

  toDoListArray: any[];
  @Output() isLogout = new EventEmitter<void>()
  todoForm: FormGroup
  constructor(private todoService: TodoService,public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      titlebox: new FormControl('', [Validators.required]),
    })
    this.todoService.getToDoList().snapshotChanges()
    .subscribe(item =>{
      this.toDoListArray = [];
      item.forEach(element =>{
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })
      // Sort array isChecked false -> true
      this.toDoListArray.sort((a,b) =>{
        return a.isChecked - b.isChecked;
      })
    })
  }

  get titlebox(){return this.todoForm.get('titlebox')}


  onAdd(){
    console.log(this.titlebox.value)
    this.todoService.addTitle(this.titlebox.value);
    this.todoForm.reset();
  }
  
  alterCheck($key: string, isChecked){
    this.todoService.checkOrUnCheckTitle($key,!isChecked);
  }

  onDelete($key: string){
    this.todoService.removeTitle($key);
  }

  onUpdate($key, titlebox: string){
    if (!this.todoForm.valid){
      alert("Vui lòng nhập nội dung cần thay thế vào textbox");
    }
    else{
      this.todoService.updateTitle($key, titlebox);
      this.todoForm.reset();
    }
  }

  logout(){
    this.firebaseService.logout()
    this.isLogout.emit();
  }
}
