import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { apiServer } from './globals';

import { LoginService } from './login.service';

describe('LoginService', () => {
	let service: LoginService;
	let NavbarMock = jasmine.createSpyObj('Navbar', ['checkLoggedIn']);

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientTestingModule
			],
			providers: [LoginService]
		});
		service = TestBed.get(LoginService);
		spyOn(service, 'reload').and.stub();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('#logout should remove user from localStorage', () => {
		localStorage.setItem("user", "failure");
		service.logout();
		expect(localStorage.getItem("user")).toBe(null);
	});

	it('#canActivate should be false if not logged in', () => {
		localStorage.setItem("user", "failure");
		service.logout();
		expect(service.canActivate()).toBe(false);
	});

	it('#canActivate should be true if logged in', () => {
		localStorage.setItem("user", "loggedIn");
		expect(service.canActivate()).toBe(true);
	});

	it('#canActivate should always be equivalent to #loggedIn', () => {
		localStorage.setItem("user", "loggedIn");
		expect(service.canActivate()).toBe(true);
		expect(service.loggedIn()).toBe(true);
		service.logout();
		expect(service.canActivate()).toBe(false);
		expect(service.loggedIn()).toBe(false);
	});

	it('#login should set localStorage with good credentials', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.removeItem("user")
		service.login('test', 'test');
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.flush({SESSIONID:'testJWT'});
		expect(localStorage.getItem("user")).toEqual('testJWT');
		expect(req.request.method).toBe('POST');
		httpMock.verify();
	});

	it('#login should not set localStorage with bad credentials', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.setItem("user", "removeme");
    		service.login('test', 'test');
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.flush({SESSIONID:''});
		expect(localStorage.getItem("user")).toEqual(null);
		expect(req.request.method).toBe('POST');
		httpMock.verify();
	});

	it('successful login should set navbar login status', () => {
		let httpMock = TestBed.get(HttpTestingController);
		let router = TestBed.get(Router);
		service.login('test', 'testpass');
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.flush({SESSIONID:'jwtTest'});
		expect(req.request.method).toBe('POST');
    		expect(req.request.body).toBe('{"RCSid":"test","password":"testpass"}');
		httpMock.verify();
	});


	it('should send correct credentials to changePassword', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.changePassword('testRCS', 'testOld', 'testNew');
		let req = httpMock.expectOne(apiServer + '/api/change-password');
		req.flush([]);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toBe('{"RCSid":"testRCS","password":"testOld","newPassword":"testNew"}');
		expect(service.reload).toHaveBeenCalled();
		httpMock.verify();
	});

	it('should logout on failed changePassword', () => {
		spyOn(service, 'logout');
		let httpMock = TestBed.get(HttpTestingController);
		service.changePassword('testRCS', 'testOld', 'testNew');
		let req = httpMock.expectOne(apiServer + '/api/change-password');
		req.error("oh no");
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toBe('{"RCSid":"testRCS","password":"testOld","newPassword":"testNew"}');
		httpMock.verify();
		expect(service.logout).toHaveBeenCalled();
	});

	it('should logout on failed login', () => {
		spyOn(service, 'logout');
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.setItem("user", "removeme");
    		service.login('test', 'test');
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.error("oh no");
		expect(req.request.method).toBe('POST');
		httpMock.verify();
		expect(service.logout).toHaveBeenCalled();
	});

	it('should show message on failed login', () => {
		var mockFun = jasmine.createSpy('callback', mockFun).and.callThrough();
		let httpMock = TestBed.get(HttpTestingController);
		service.login('test', 'testpass', mockFun);
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.flush({SESSIONID:''});
		expect(req.request.method).toBe('POST');
		expect(mockFun).toHaveBeenCalled();
		httpMock.verify();
	});

	it('should not show message on succesful login', () => {
		var mockFun = jasmine.createSpy('callback', mockFun).and.callThrough();
		let httpMock = TestBed.get(HttpTestingController);
		service.login('test', 'testpass', mockFun);
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.flush({SESSIONID:'jwtTest'});
		expect(req.request.method).toBe('POST');
		expect(mockFun).not.toHaveBeenCalled();
		httpMock.verify();
	});
});
