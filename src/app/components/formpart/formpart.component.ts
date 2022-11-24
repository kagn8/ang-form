import { Component, OnInit,  Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';

@Component({
  selector: 'app-formpart',
  templateUrl: './formpart.component.html',
  styleUrls: ['./formpart.component.scss']
})
export class FormpartComponent implements OnInit {

  @HostBinding('class.disabled')
  @Input() disabled = false;
  
  @Input() required = false;
  @Input() label!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
