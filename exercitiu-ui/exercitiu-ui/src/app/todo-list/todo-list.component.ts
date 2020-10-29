import { Route } from '@angular/compiler/src/core';
import { Component, Input, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Input() public itemList = [];
  @Output() public deleteItem = new EventEmitter<number>();
  @Output() public deleteGlobal = new EventEmitter<any[]>();
  @Output() public editItem = new EventEmitter<{id : number, name : string}>();

  
  public newInput : string = "";

  constructor(private router: Router) {}

    public onClickDelete(itemId: number): void {
    console.log("onClickDelete", itemId);
    this.deleteItem.emit(itemId);
    console.log(this.deleteItem);
    }

    public onClickDeleteAll(): void {
      this.deleteGlobal.emit(this.itemList);
      console.log(this.deleteGlobal);
    }
    

    public onEditItem(itemId : number, newName : string): void {
      console.log(itemId, newName);
      this.editItem.emit({id : itemId, name : newName})
    }

   
}
