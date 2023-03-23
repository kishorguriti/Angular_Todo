import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  constructor() { }


  // Observable string sources
  private TodoSource = new Subject<string>();


  // Observable string streams
  TodoAnnounced$ = this.TodoSource.asObservable();


  // Service message commands
  AnnounceTodo(mission: string) {
    this.TodoSource.next(mission);
  }


}
