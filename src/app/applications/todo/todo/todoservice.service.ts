import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiURL = 'https://yse1hh41i7.execute-api.ap-northeast-1.amazonaws.com/prod';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/items`);
  }

  addTodo(itemValue: string) {
    const payload = {
        itemId: Math.floor(Math.random() * 10000).toString(),
        itemValue: itemValue,
        isComplete: 0
    };
    return this.http.post(`${this.apiURL}/item`, payload);
  }
    completeTodo(itemId: string, key: string, value: any) {
        const body = {
          itemId: itemId,
          updateKey: key,
          updateValue: value
        };
        
        return this.http.put(`${this.apiURL}/item`, body);
      } 
  
  deleteTodo(itemId: string): Observable<any> {
    const url = `${this.apiURL}/item`; // Assuming DELETE expects the whole URL
    return this.http.delete(url, { body: { itemId } });
  }

  updateTodo(itemId: string, key: string, value: any): Observable<any> {
    
    const body = {
      itemId: itemId,
      updateKey: key,
      updateValue: value
    };
    
    //const url = `${this.apiURL}/item`;
    //const body = { itemId, ...updateValue };
    return this.http.put(`${this.apiURL}/item`, body);
  }
}
