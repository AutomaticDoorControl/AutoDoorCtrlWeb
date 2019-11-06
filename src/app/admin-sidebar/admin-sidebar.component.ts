import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  @Input() buttons: string[];
  @Output() clicker = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  buttonClicked(func):void {
    this.clicker.emit(func);
  }

}
