//contains code for the login page and the functions used in the login html
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';
import {StudentService} from '../student.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	TeamRows: any[];
	TeamMembers: Array<object> = [
		{name: "Jing Wei Li", src: "ljw980105"},
		{name: "Alex Pinkowski", src: "pinkoa2"},
		{name: "Jelly Wang", src: "jellywang7"},
		{name: "Noah Kosobucki", src: "kosobn"},
		{name: "Brandon Sakai", src: "bsakai2000"},
		{name: "Mallory Gaspard", src: "malloryegaspard"},
		{name: "Mallory Gaspard", src: "mgaspard"},
		{name: "John Kongtcheu", src: "John42506176Linux"},
		{name: "John Hulton", src: "jchulton"},
		{name: "Erin Jordan", src: "erinjordan24"}
	];
	// constructors needed to use the different services 
	constructor() {
		this.TeamRows = [];
		var rowLength = 5;
		for(var i = 0; i < this.TeamMembers.length; i += rowLength)
		{
			var row = [];
			for(var j = i; j < i + rowLength && j < this.TeamMembers.length; ++j)
			{
				row.push(this.TeamMembers[j]);
			}
			this.TeamRows.push(row);
		}
	}

	/*On load function calls*/

	ngOnInit() {
	}
}
