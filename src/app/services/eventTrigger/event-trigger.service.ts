import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventTriggerService {

  private subject = new Subject<any>();

  sendClickEvent(){
    this.subject.next(this.subject);
  }

  getClickEvent():Observable<any>{
    return this.subject.asObservable();
  }

  

  constructor() { }
}
