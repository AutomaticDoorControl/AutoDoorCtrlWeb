import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { apiServer } from './globals';

import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      providers: [StudentService]
      });
    service = TestBed.get(StudentService);
    spyOn(service, 'reload').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of active users', (done) => {
    let httpMock = TestBed.get(HttpTestingController);
    let active_users = [{RCSid:"test", Status:"Active"}, {RCSid:"test2", Status:"Active"}];
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
    let request_users = [{RCSid:"test", Status:"Request"}, {RCSid:"test2", Status:"Request"}];
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
    let req = httpMock.expectOne(apiServer + '/api/addtoActive');
    req.flush("good work!");
    let expectedRequest = '{"RCSid":"testing"}';
    expect(req.request.body).toBe(expectedRequest);
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('should get addAll', () => {
    let httpMock = TestBed.get(HttpTestingController);
    service.addAll();
    let req = httpMock.expectOne(apiServer + '/api/addAll');
    req.flush("");
    expect(req.request.method).toBe('GET');
    httpMock.verify();
  }); 

  it('should post a single RCSid to remove', () => {
    let httpMock = TestBed.get(HttpTestingController);
    service.remove('testing');
    let req = httpMock.expectOne(apiServer + '/api/remove');
    req.flush("good work!");
    let expectedRequest = '{"RCSid":"testing"}';
    expect(req.request.body).toBe(expectedRequest);
    expect(req.request.method).toBe('POST');
    httpMock.verify();
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
    let req = httpMock.expectOne(apiServer + '/api/get-complaints');
    req.flush(complaints);
    expect(req.request.method).toBe('GET');
  });

  it('should post a single complaint', () => {
    let httpMock = TestBed.get(HttpTestingController);
    service.submitComplaint('locationTest', 'messageTest', true);
    let req = httpMock.expectOne(apiServer + '/api/submit-complaint');
    req.flush("good work!");
    let expectedRequest = '{"Location":"locationTest","Message":"messageTest"}';
    expect(req.request.body).toBe(expectedRequest);
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });
});
