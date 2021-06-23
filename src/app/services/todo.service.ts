import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  toDoList: AngularFireList<any>;
  tmp: string;
  constructor(private firebaseDatabase: AngularFireDatabase) { }

  getToDoList(){
    this.toDoList = this.firebaseDatabase.list('titles');
    return this.toDoList;
  }

  addTitle(titlebox: string){
    this.toDoList.push({
      title: titlebox,
      isChecked: false
    });
  }

  checkOrUnCheckTitle($key: string, flag: boolean){
    this.toDoList.update($key, {isChecked: flag});
  }

  removeTitle($key: string){
    this.toDoList.remove($key);
  }

  updateTitle($key, titlebox: string){
    this.toDoList.update($key, {title: titlebox});
  }
}
