//contains code for the login page and the functions used in the login html
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login.service';
import {StudentService} from '../student.service';
import {AdminService} from '../admin.service';



@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	TeamRows: any[];
	TeamMembers: Array<object> = [
		{name: "Jing Wei Li", src: "https://avatars0.githubusercontent.com/u/10605755"},
		{name: "Alex Pinkowski", src: "https://avatars3.githubusercontent.com/u/48626981"},
		{name: "Jelly Wang", src: "https://avatars3.githubusercontent.com/u/30369722"},
		{name: "Noah Kosobucki", src: "https://avatars3.githubusercontent.com/u/60408939"},
		{name: "Brandon Sakai", src: "https://avatars0.githubusercontent.com/u/22205119"},
		{name: "Mallory Gaspard", src: "https://avatars2.githubusercontent.com/u/59492782"},
		{name: "John Kongtcheu", src: "https://avatars0.githubusercontent.com/u/20214982"},
		{name: "John Hulton", src: "https://avatars1.githubusercontent.com/u/11095297"},
		{name: "Erin Jordan", src: "https://avatars1.githubusercontent.com/u/9295940"}
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
