import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Output() change!: EventEmitter<MatSlideToggleChange>;
  @Input() checked!: boolean;

  isChecked = true;
  formGroup!: FormGroup;
  filteringSchedule!: boolean;
  toggle!: boolean;


  toggleLightTheme(): void {
      document.body.classList.toggle('light-mode');
  }

  constructor() { }

  ngOnInit(): void {
    this.filteringSchedule = JSON.parse(localStorage.getItem('toggleButtonState') as string);
    if (this.filteringSchedule == true) {
      document.body.classList.add('light-mode');
    }
  }

  onChange(ob: MatSlideToggleChange) {
    this.filteringSchedule = !this.filteringSchedule;
    localStorage.setItem('toggleButtonState', JSON.stringify(this.filteringSchedule));
  }

}
