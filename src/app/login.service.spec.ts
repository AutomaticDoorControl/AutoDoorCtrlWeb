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
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.setItem("user", "failure");
		service.logout();
		let req = httpMock.expectOne(apiServer + '/api/logout');
		req.flush({});
		expect(localStorage.getItem("user")).toBe(null);
		httpMock.verify
	});

	it('#canActivate should be false if not logged in', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.setItem("user", "failure");
		service.logout();
		let req = httpMock.expectOne(apiServer + '/api/logout');
		req.flush({});
		expect(service.canActivate()).toBe(false);
		httpMock.verify
	});

	it('#canActivate should be true if logged in as admin', () => {
		localStorage.setItem("user", "loggedIn");
		localStorage.setItem("isAdmin", "1");
		expect(service.canActivate()).toBe(true);
	});

	it('#canActivate should always be equivalent to #loggedInAdmin', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.setItem("user", "loggedIn");
		localStorage.setItem("isAdmin", "1");
		expect(service.canActivate()).toBe(true);
		expect(service.loggedInAdmin()).toBe(true);
		service.logout();
		let req = httpMock.expectOne(apiServer + '/api/logout');
		req.flush({});
		expect(service.canActivate()).toBe(false);
		expect(service.loggedInAdmin()).toBe(false);
		httpMock.verify
	});

	it('#login should set localStorage with good credentials', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.removeItem("user");
		localStorage.removeItem("isAdmin");
		service.login('test', 'test');
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.flush({SESSIONID:'testJWT', admin:0});
		expect(localStorage.getItem("user")).toEqual('testJWT');
		expect(localStorage.getItem("isAdmin")).toEqual('0');
		expect(req.request.method).toBe('POST');
		httpMock.verify();
	});

	it('#login should set localStorage with admin credentials', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.removeItem("user")
		service.login('test', 'test');
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.flush({SESSIONID:'testJWT', admin:1});
		expect(localStorage.getItem("user")).toEqual('testJWT');
		expect(localStorage.getItem("isAdmin")).toEqual('1');
		expect(req.request.method).toBe('POST');
		httpMock.verify();
	});

	it('#login should not set localStorage with bad credentials', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.setItem("user", "removeme");
    		service.login('test', 'test');
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.flush({SESSIONID:'',admin:-1});
		expect(localStorage.getItem("user")).toEqual(null);
		expect(req.request.method).toBe('POST');
		httpMock.verify();
	});

	it('successful login should redirect to /active-students', () => {
		let router = TestBed.get(Router);
		let navigateSpy = spyOn(router, 'navigate');
		let httpMock = TestBed.get(HttpTestingController);
		service.login('test', 'testpass');
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.flush({SESSIONID:'jwtTest', admin:1});
		expect(req.request.method).toBe('POST');
    		expect(req.request.body).toBe('{"rcsid":"test","password":"testpass"}');
		expect(navigateSpy).toHaveBeenCalledWith(['active-students']);
		httpMock.verify();
	});


	it('should send correct credentials to changePassword', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.changePassword('testRCS', 'testOld', 'testNew');
		let req = httpMock.expectOne(apiServer + '/api/change_password');
		req.flush([]);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toBe('{"rcsid":"testRCS","password":"testOld","newpass":"testNew"}');
		expect(service.reload).toHaveBeenCalled();
		httpMock.verify();
	});

//	it('should logout on failed changePassword', () => {
//		spyOn(service, 'logout');
//		let httpMock = TestBed.get(HttpTestingController);
//		service.changePassword('testRCS', 'testOld', 'testNew');
//		let req = httpMock.expectOne(apiServer + '/api/change_password');
//		req.error("oh no");
//		expect(req.request.method).toBe('POST');
//		expect(req.request.body).toBe('{"rcsid":"testRCS","password":"testOld","newpass":"testNew"}');
//		httpMock.verify();
//		expect(service.logout).toHaveBeenCalled();
//	});

	it('should clear localStorage on failed login', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.setItem("user", "removeme");
		localStorage.setItem("isAdmin", "removeme2");
    		service.login('test', 'test');
		let req = httpMock.expectOne(apiServer + '/api/login');
		req.error("oh no");
		expect(req.request.method).toBe('POST');
		httpMock.verify();
		expect(localStorage.getItem("user")).toBe(null);
		expect(localStorage.getItem("isAdmin")).toBe(null);
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

	it('should send a logout to the API on logout', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.setItem("user", "fakeToken");
		service.logout();
		let req = httpMock.expectOne(apiServer + '/api/logout');
		req.flush([]);
		expect(req.request.method).toBe('GET');
		httpMock.verify();
	});
		
});
