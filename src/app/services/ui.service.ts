import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class UiService {
  private showAddTask: boolean = false;
  private showDialog: boolean = false;
  private subject = new Subject<any>();
  private subject2 = new Subject<any>();


  constructor() { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask)
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  openDialog(): void {
    this.showDialog = !this.showDialog;
    this.subject2.next(this.showDialog)
  }

  onOpenDialog(): Observable<any> {
    return this.subject2.asObservable();
  }

}
