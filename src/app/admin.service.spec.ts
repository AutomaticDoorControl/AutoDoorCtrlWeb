import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MessageService } from './message.service';
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
    req.flush([{username: 'test', password: 'thisShouldBeAHash'}]);
    expect(req.request.method).toBe('POST');
    expect(localStorage.getItem("admin")).not.toEqual(null);
    httpMock.verify();
  });

  it('#login should not set localStorage with bad credentials', () => {
    let httpMock = TestBed.get(HttpTestingController);
    localStorage.setItem("admin", "removeme");
    service.login('test', 'test');
    let req = httpMock.expectOne(apiServer + '/api/admin/login');
    req.flush([]);
    expect(req.request.method).toBe('POST');
    expect(localStorage.getItem("admin")).toEqual(null);
    httpMock.verify();
  });
});
