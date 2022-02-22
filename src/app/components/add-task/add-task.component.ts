import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Task} from "../../Task";
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";
import {FormBuilder, FormArray, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  addTaskForm= this.fb.group ({
    text: [''],
    day: [''],
    time:[''],
    reminder:['']
  })
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  time!: string;
  reminder: boolean = false;
  id!: number;
  showAddTask!: boolean;
  subscription: Subscription;


  constructor(private uiService: UiService,private fb: FormBuilder) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {
  }
  onSubmit() {
    if(!this.text) {
      alert('Please add a task!');
      return;
    }
    const newTask = {
      id:this.id,
      text: this.text,
      day: this.day,
      time: this.time,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);
    this.text='';
    this.day='';
    this.time='';
    this.reminder=false;


  }

}


/*
* <div class ="form-control">
    <label for ="day">Day & Time</label>
    <input type="text" name="day" id="day" [(ngModel)]="day" placeholder="Add Day & Time"/>
  </div>
* */
