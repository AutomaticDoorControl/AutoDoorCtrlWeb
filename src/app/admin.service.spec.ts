import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { apiServer } from './globals';

import { AdminService } from './admin.service';

describe('AdminService', () => {
	let service: AdminService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientTestingModule
			],
			providers: [AdminService]
		});
		service = TestBed.get(AdminService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('#logout should remove admin from localStorage', () => {
		localStorage.setItem("admin", "garbage");
		service.logout();
		expect(localStorage.getItem("admin")).toBe(null);
	});

	it('#canActivate should be false if not logged in', () => {
		service.logout();
		expect(service.canActivate()).toBe(false);
	});

	it('#canActivate should be true if logged in', () => {
		localStorage.setItem("admin", "loggedIn");
		expect(service.canActivate()).toBe(true);
	});

	it('#login should set localStorage with good credentials', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.removeItem("admin")
		service.login('test', 'test');
		let req = httpMock.expectOne(apiServer + '/api/admin/login');
		req.flush({SESSIONID:'JWTtest'});
		expect(req.request.method).toBe('POST');
		expect(localStorage.getItem("admin")).not.toEqual(null);
		expect(service.loggedIn()).toBeTruthy();
		httpMock.verify();
	});

	it('#login should not set localStorage with bad credentials', () => {
		let httpMock = TestBed.get(HttpTestingController);
		localStorage.setItem("admin", "removeme");
		service.login('test', 'test');
		let req = httpMock.expectOne(apiServer + '/api/admin/login');
		req.flush({SESSIONID:''});
		expect(req.request.method).toBe('POST');
		expect(localStorage.getItem("admin")).toEqual(null);
		expect(service.loggedIn()).not.toBeTruthy();
		httpMock.verify();
	});

	it('should send correct credentials to changePassword', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.changePassword('testUser', 'testOld', 'testNew');
		let req = httpMock.expectOne(apiServer + '/api/admin/change-password');
		req.flush([]);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toBe('{"username":"testUser","password":"testOld","newPassword":"testNew"}');
		httpMock.verify();
	});

	it('should force logouts on failed login', () => {
		spyOn(service, 'logout');
		let httpMock = TestBed.get(HttpTestingController);
		service.login('testUser', 'passwd');
		let req = httpMock.expectOne(apiServer + '/api/admin/login');
		req.error("oh no");
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toBe('{"username":"testUser","password":"passwd"}');
		httpMock.verify();
		expect(service.logout).toHaveBeenCalled();
	});

	it('should force logouts on failed changePassword', () => {
		spyOn(service, 'logout');
		let httpMock = TestBed.get(HttpTestingController);
		service.changePassword('testUser', 'testOld', 'testNew');
		let req = httpMock.expectOne(apiServer + '/api/admin/change-password');
		req.error("oh no");
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toBe('{"username":"testUser","password":"testOld","newPassword":"testNew"}');
		httpMock.verify();
		expect(service.logout).toHaveBeenCalled();
	});
});
