import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  // constructors needed to use the different services 
  /* note* log in service here is public called directly in the login html file
  I'm pretty sure this is bad practice in terms of security, so please be
  sure to change this once you are able to connect to the hardware (or earlier too)
  
  */
  constructor(public loginService:LoginService, public router:Router) { }

  /*On load function calls*/  
  ngOnInit() {
  }

// code to be added once hardware has made progress



}
