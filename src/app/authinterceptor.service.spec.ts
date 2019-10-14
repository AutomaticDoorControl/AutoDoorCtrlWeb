import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { apiServer } from './globals';

import { AuthInterceptorService } from './authinterceptor.service';

describe('AuthInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true } ]
    });
  });

  it('should intercept api call', (done) => {
    let httpMock = TestBed.get(HttpTestingController);
    let http: HttpClient = TestBed.get(HttpClient);
    let active_users = [{RCSid:"test", Status:"Active"}, {RCSid:"test2", Status:"Active"}];
    localStorage.setItem("admin", "testingToken123");
    http.get<any>(apiServer + "/api/active_user").subscribe(
      data =>{
        expect(data).toEqual(active_users);
	httpMock.verify();
	done();
      },
      err =>{
	done.fail();
    });
    let req = httpMock.expectOne(apiServer + "/api/active_user");
    expect(req.request.headers.has("Authorization")).toEqual(true);
    expect(req.request.headers.get("Authorization")).toEqual('Bearer testingToken123');
    expect(req.request.method).toBe('GET');
    req.flush(active_users);
    httpMock.verify();
  });

  it('should not intercept non-api calls', (done) => {
    let httpMock = TestBed.get(HttpTestingController);
    let http: HttpClient = TestBed.get(HttpClient);
    let active_users = [{RCSid:"test", Status:"Active"}, {RCSid:"test2", Status:"Active"}];
    localStorage.setItem("admin", "testingToken123");
    http.get<any>(apiServer + "/active_user/api/").subscribe(
      data =>{
        expect(data).toEqual(active_users);
	httpMock.verify();
	done();
      },
      err =>{
	done.fail();
    });
    let req = httpMock.expectOne(apiServer + "/active_user/api/");
    console.log(req.request.headers);
    expect(req.request.headers.has("Authorization")).toEqual(false);
    expect(req.request.method).toBe('GET');
    req.flush(active_users);
    httpMock.verify();
  });

  it('should not intercept external calls', (done) => {
    let httpMock = TestBed.get(HttpTestingController);
    let http: HttpClient = TestBed.get(HttpClient);
    let active_users = [{RCSid:"test", Status:"Active"}, {RCSid:"test2", Status:"Active"}];
    localStorage.setItem("admin", "testingToken123");
    http.get<any>(apiServer + ".blackhat.com/api/test").subscribe(
      data =>{
        expect(data).toEqual(active_users);
	httpMock.verify();
	done();
      },
      err =>{
	done.fail();
    });
    let req = httpMock.expectOne(apiServer + ".blackhat.com/api/test");
    console.log(req.request.headers);
    expect(req.request.headers.has("Authorization")).toEqual(false);
    expect(req.request.method).toBe('GET');
    req.flush(active_users);
    httpMock.verify();
  });

  it('should not intercept calls if not an admin', (done) => {
    let httpMock = TestBed.get(HttpTestingController);
    let http: HttpClient = TestBed.get(HttpClient);
    let active_users = [{RCSid:"test", Status:"Active"}, {RCSid:"test2", Status:"Active"}];
    localStorage.removeItem("admin");
    http.get<any>(apiServer + "/api/active_user").subscribe(
      data =>{
        expect(data).toEqual(active_users);
	httpMock.verify();
	done();
      },
      err =>{
	done.fail();
    });
    let req = httpMock.expectOne(apiServer + "/api/active_user");
    console.log(req.request.headers);
    expect(req.request.headers.has("Authorization")).toEqual(false);
    expect(req.request.method).toBe('GET');
    req.flush(active_users);
    httpMock.verify();
  });
});
