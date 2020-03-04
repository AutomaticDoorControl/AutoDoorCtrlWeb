import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { apiServer } from './globals';
import { LoginService } from './login.service';

import { StudentService } from './student.service';

describe('StudentService', () => {
	let service: StudentService;
	let LoginMock = jasmine.createSpyObj('LoginService', ['logout']);
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HttpClientTestingModule
			],
			providers: [
				StudentService,
				{ provide: LoginService, useValue: LoginMock }
			]
		});
		service = TestBed.get(StudentService);
		spyOn(service, 'reload').and.stub();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return a list of active users', (done) => {
		let httpMock = TestBed.get(HttpTestingController);
		let active_users = [{rcsid:"test"}, {rcsid:"test2"}];
		service.getActive().subscribe(
			data => {
				expect(data).toBe(active_users);
				httpMock.verify();
				done();
			}
		);
		let req = httpMock.expectOne(apiServer + '/api/active_user');
		req.flush(active_users);
		expect(req.request.method).toBe('GET');
	});

	it('should return a list of requested users', (done) => {
		let httpMock = TestBed.get(HttpTestingController);
		let request_users = [{rcsid:"test"}, {rcsid:"test2"}];
		service.getRequest().subscribe(
			data => {
				expect(data).toBe(request_users);
				httpMock.verify();
				done();
			}
		);	
		let req = httpMock.expectOne(apiServer + '/api/inactive_user');
		req.flush(request_users);
		expect(req.request.method).toBe('GET');
	});

	it('should post a single RCSid to addtoActive', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.addOne('testing');
		let req = httpMock.expectOne(apiServer + '/api/add_to_active');
		req.flush("good work!");
		let expectedRequest = '{"rcsid":"testing"}';
		expect(req.request.body).toBe(expectedRequest);
		expect(req.request.method).toBe('POST');
		httpMock.verify();
	});

	it('should logout on failed add', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.addOne('testing');
		let req = httpMock.expectOne(apiServer + '/api/add_to_active');
		req.error("oh no");
		let expectedRequest = '{"rcsid":"testing"}';
		expect(req.request.body).toBe(expectedRequest);
		expect(req.request.method).toBe('POST');
		httpMock.verify();
		expect(LoginMock.logout).toHaveBeenCalled();
	}); 

	it('should get addAll', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.addAll();
		let req = httpMock.expectOne(apiServer + '/api/add_all');
		req.flush("");
		expect(req.request.method).toBe('GET')
		httpMock.verify();
	}); 

	it('should logout on failed addAll', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.addAll();
		let req = httpMock.expectOne(apiServer + '/api/add_all');
		req.error("oh no");
		expect(req.request.method).toBe('GET');
		httpMock.verify();
		expect(LoginMock.logout).toHaveBeenCalled();
	}); 

	it('should post a single RCSid to remove', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.remove('testing');
		let req = httpMock.expectOne(apiServer + '/api/remove');
		req.flush("good work!");
		let expectedRequest = '{"rcsid":"testing"}';
		expect(req.request.body).toBe(expectedRequest);
		expect(req.request.method).toBe('POST');
		httpMock.verify();
	});

	it('should logout on failed remove', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.remove('testing');
		let req = httpMock.expectOne(apiServer + '/api/remove');
		req.error("oh no");
		let expectedRequest = '{"rcsid":"testing"}';
		expect(req.request.body).toBe(expectedRequest);
		expect(req.request.method).toBe('POST');
		httpMock.verify();
		expect(LoginMock.logout).toHaveBeenCalled();
	}); 

	it('should return a list of complaints', (done) => {
		let httpMock = TestBed.get(HttpTestingController);
		let complaints = [{location:"test", message:"Request"}, {location:"test2", message:"testing"}];
		service.listComplaints().subscribe(
			data => {
				expect(data).toBe(complaints);
				httpMock.verify();
				done();
			}
		);	
		let req = httpMock.expectOne(apiServer + '/api/get_complaints');
		req.flush(complaints);
		expect(req.request.method).toBe('GET');
	});

	it('should post a single complaint', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.submitComplaint('locationTest', 'messageTest');
		let req = httpMock.expectOne(apiServer + '/api/submit_complaint');
		req.flush("good work!");
		let expectedRequest = '{"location":"locationTest","message":"messageTest"}';
		expect(req.request.body).toBe(expectedRequest);
		expect(req.request.method).toBe('POST');
		httpMock.verify();
	});

	it('should send the reset password', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.resetStudentPassword('test', 'testPass');
		let req = httpMock.expectOne(apiServer + '/api/reset_password');
		req.flush("good work!");
		let expectedRequest = '{"rcsid":"test","newpass":"testPass"}';
		expect(req.request.body).toBe(expectedRequest);
		expect(req.request.method).toBe('POST');
		httpMock.verify();
	});

	it('should logout on failed password reset', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.resetStudentPassword('test', 'testPass');
		let req = httpMock.expectOne(apiServer + '/api/reset_password');
		req.error("oh no");
		let expectedRequest = '{"rcsid":"test","newpass":"testPass"}';
		expect(req.request.body).toBe(expectedRequest);
		expect(req.request.method).toBe('POST');
		httpMock.verify();
		expect(LoginMock.logout).toHaveBeenCalled();
	});
	
	it('should send the request RCSid', () => {
		let httpMock = TestBed.get(HttpTestingController);
		service.register('testReg');
		let req = httpMock.expectOne(apiServer + '/api/request_access');
		req.flush("good work!");
		let expectedRequest = '{"rcsid":"testReg"}';
		expect(req.request.body).toBe(expectedRequest);
		expect(req.request.method).toBe('POST');
		httpMock.verify();
	});
});
