import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StudentService } from '../student.service';
import { LoginService } from '../login.service';

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
			providers: [ LoginService, StudentService ]
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
		expect(component.TeamRows[0][0]).toEqual({name: "Jing Wei Li", src: "ljw980105"});
		expect(component.TeamRows[1][4]).toEqual({name: "Erin Jordan", src: "erinjordan24"});
	});
});
