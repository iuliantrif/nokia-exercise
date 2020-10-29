import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly BASE_API_URL = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  // request pentru toata lista de todo-uri
  public getItemList(): Observable<any> {
    return this.http.get(this.BASE_API_URL + "todo/");
  }

  // request pentru crearea de todo item
  public createItem(todo: any): Observable<any> {
    return this.http.post(this.BASE_API_URL + "todo/", todo);
  }

  // // request pentru stergerea unui todo pe baza de ID
  public deleteItem(todoId: number): Observable<any> {
    return this.http.delete(this.BASE_API_URL + "todo/" + todoId);
  }

  // request pentru stergerea tuturor todo-urilor
  public deleteAll(): Observable<any> {
    return this.http.delete(this.BASE_API_URL + "todo/");
  }

  public editItem(todo: any): Observable<any>{
    return this.http.put(this.BASE_API_URL + "todo/" + todo.id, todo);
  }
}



// angular life cycles.