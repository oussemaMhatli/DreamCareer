import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentEventService {

  constructor() { }
  private refreshSubject = new Subject<void>();
  private closeSubject = new Subject<void>();

  refreshEvent$ = this.refreshSubject.asObservable();
  closeModal$=this.closeSubject.asObservable();
  emitRefreshEvent() {
    this.refreshSubject.next();
  }

  emitCloseEvent() {
    this.closeSubject.next();
  }

}
