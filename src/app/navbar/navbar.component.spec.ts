import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';
import { LoginService } from '../login.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let StudentMock = jasmine.createSpyObj('StudentService', ['register']);
  let LoginMock = jasmine.createSpyObj('LoginService', ['loggedIn', 'login', 'logout']);
  let AdminMock = jasmine.createSpyObj('AdminService', ['loggedIn', 'login', 'logout']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        {provide:StudentService, useValue:StudentMock},
        {provide:LoginService, useValue:LoginMock},
        {provide:AdminService, useValue:AdminMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    AdminMock.logout.calls.reset();
    LoginMock.logout.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout as admin when logged in as admin', () => {
    AdminMock.loggedIn.and.returnValue(true);
    LoginMock.loggedIn.and.returnValue(false);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.logout();
    expect(AdminMock.logout).toHaveBeenCalled();
    expect(LoginMock.logout).not.toHaveBeenCalled();
  });

  it('should logout as student when logged in as student', () => {
    AdminMock.loggedIn.and.returnValue(false);
    LoginMock.loggedIn.and.returnValue(true);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.logout();
    expect(AdminMock.logout).not.toHaveBeenCalled();
    expect(LoginMock.logout).toHaveBeenCalled();
  });
});
