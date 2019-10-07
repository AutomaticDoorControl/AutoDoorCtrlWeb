import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      providers: [LoginService]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('#logout should remove user from localstorage', inject([LoginService], (service: LoginService) => {
    localStorage.setItem("user", "failure");
    service.logout();
    expect(localStorage.getItem("user")).toBe(null);
  }));

  it('#canActivate should be false if not logged in', inject([LoginService], (service: LoginService) => {
    localStorage.setItem("user", "failure");
    service.logout();
    expect(service.canActivate()).toBe(false);
  }));

  it('#canActivate should be true if logged in', inject([LoginService], (service: LoginService) => {
    localStorage.setItem("user", "loggedIn");
    expect(service.canActivate()).toBe(true);
  }));

  it('#canActivate should always be equivalent to #loggedIn', inject([LoginService], (service: LoginService) => {
    localStorage.setItem("user", "loggedIn");
    expect(service.canActivate()).toBe(true);
    expect(service.loggedIn()).toBe(true);
    service.logout();
    expect(service.canActivate()).toBe(false);
    expect(service.loggedIn()).toBe(false);
  }));
});
