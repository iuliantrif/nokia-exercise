import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'exerciutiuAC';
  public items: any = []; // aici tinem lista de items care vor fi afisate in todo list

  public constructor(private todoService: TodoService) {
    // am injectat TodoService
    // nimic altceva de facut in constructor
  }

  public ngOnInit(): void {
    this.todoService.getItemList().subscribe((response) => {
      this.items = response; // raspunsul contine lista de items
                             // fiecare item are forma { id: number, name: string } 
    });
  }
  
  public onCreateItem(newItemName: string): void {
    this.todoService.createItem({todo: newItemName}).subscribe((response: any) => {
      this.items.push({name: newItemName, id: response.id}); // cand requestul a fost facut cu succes si am primit raspunsul, push-uim itemul in lista impreuna cu id-ul din raspuns
                                                             // o alta varianta ar fi sa facem refresh la toata lista cu getItemList(). 
    });
  }

   public onDeleteItem(itemId: number): void {
     console.log("onDeleteItem", itemId);
     this.todoService.deleteItem(itemId).subscribe(() => {
       this.items = this.items.filter((item) => item.id != itemId);
     });
   }

   public deleteGlobal(items: any[]): void {
     //console.log("Am ajuns pana aici.");
    //this.todoService.getItemList().subscribe((response) => {
      items.forEach(itemToBeDeleted => {
        this.todoService.deleteItem(itemToBeDeleted.id).subscribe(() => {
          this.items = this.items.filter((item) => item.id != itemToBeDeleted.id);
        });
      });
    };

    public editItem(newItem : any): void{
      console.log("app.component : ", newItem);
      this.todoService.editItem(newItem).subscribe(() => {
        this.items.forEach((item, i) => {
          if(item.id === newItem.id) {
            this.items[i].name = newItem.name;
          }
        });
      }
      )
    }

  }
