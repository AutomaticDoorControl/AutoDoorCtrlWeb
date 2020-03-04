import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { StudentService } from '../student.service';
import { LoginService } from '../login.service';
import { apiServer } from '../globals';

import { SubmitComplaintComponent } from './submit-complaint.component';

describe('SubmitComplaintComponent', () => {
	let component: SubmitComplaintComponent;
	let fixture: ComponentFixture<SubmitComplaintComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientTestingModule
			],
			declarations: [
				SubmitComplaintComponent,
				Component({selector: 'app-navbar', template: ''})(class _ {})
			],
			providers: [
				StudentService,
				LoginService
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SubmitComplaintComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should redirect to /login while not logged in', () => {
		let httpMock = TestBed.get(HttpTestingController);
		let router = TestBed.get(Router);
		let navigateSpy = spyOn(router, 'navigate');
		component.submit("locationTest", "messageTest");
		let req = httpMock.expectOne(apiServer + '/api/submit_complaint');
		req.flush([]);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toBe('{"location":"locationTest","message":"messageTest"}');
		expect(navigateSpy).toHaveBeenCalledWith(['login']);
		httpMock.verify();
	});

	it('should redirect to /login while logged in', () => {
		let httpMock = TestBed.get(HttpTestingController);
		let router = TestBed.get(Router);
		let navigateSpy = spyOn(router, 'navigate');
		component.submit("locationTest", "messageTest");
		let req = httpMock.expectOne(apiServer + '/api/submit_complaint');
		req.flush([]);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toBe('{"location":"locationTest","message":"messageTest"}');
		expect(navigateSpy).toHaveBeenCalledWith(['login']);
		httpMock.verify();
	});

	it('information in textboxes should match request sent', () => {
		const hostElement = fixture.nativeElement;
		const locationInput: HTMLInputElement = hostElement.querySelector('input');
		const messageInput: HTMLInputElement = hostElement.querySelector('textarea');
		const submitButton: HTMLElement = hostElement.querySelector('button');
		let httpMock = TestBed.get(HttpTestingController);
		let router = TestBed.get(Router);
		let navigateSpy = spyOn(router, 'navigate');
		locationInput.value = "locationTest";
		messageInput.value = "messageTest";
		submitButton.click();
		let req = httpMock.expectOne(apiServer + '/api/submit_complaint');
		req.flush([]);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toBe('{"location":"locationTest","message":"messageTest"}');
		expect(navigateSpy).toHaveBeenCalledWith(['login']);
		httpMock.verify();
	});
});
