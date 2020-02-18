import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginService } from '../login.service';
import { StudentService } from '../student.service';
import { AdminService } from '../admin.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientTestingModule
			],
			declarations: [
				LoginComponent,
				Component({selector: 'app-navbar', template: ''})(class _ {})
			],
			providers: [ LoginService, StudentService, AdminService ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should build the TeamRows array', () => {
		expect(component.TeamRows[0][0]).toEqual({name: "Jing Wei Li", src: "https://avatars0.githubusercontent.com/u/10605755"});
		expect(component.TeamRows[1][3]).toEqual({name: "Erin Jordan", src: "https://avatars1.githubusercontent.com/u/9295940"});
	});
});
