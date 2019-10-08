import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { apiServer } from './globals';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      providers: [LoginService]
    });
    service = TestBed.get(LoginService);
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
    service.login('test');
    let req = httpMock.expectOne(apiServer + '/api/login');
    req.flush([{RCSid: 'test', Status: 'Active'}]);
    expect(localStorage.getItem("user")).not.toEqual(null);
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('#login should not set localStorage with bad credentials', () => {
    let httpMock = TestBed.get(HttpTestingController);
    localStorage.setItem("user", "removeme");
    service.login('test');
    let req = httpMock.expectOne(apiServer + '/api/login');
    req.flush([]);
    expect(localStorage.getItem("user")).toEqual(null);
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });
});
