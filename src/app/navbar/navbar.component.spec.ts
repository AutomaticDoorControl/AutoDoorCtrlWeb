import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentService } from '../student.service';
import { LoginService } from '../login.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
	let component: NavbarComponent;
	let fixture: ComponentFixture<NavbarComponent>;
	let StudentMock = jasmine.createSpyObj('StudentService', ['register']);
	let LoginMock = jasmine.createSpyObj('LoginService', ['loggedIn', 'loggedInAdmin', 'login', 'logout', 'changePassword']);
	var dummyElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ NavbarComponent ],
			providers: [
				{provide:StudentService, useValue:StudentMock},
				{provide:LoginService, useValue:LoginMock}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		dummyElement = document.createElement('div');
		document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
	});

	afterEach(() => {
		LoginMock.logout.calls.reset();
		LoginMock.changePassword.calls.reset();
		AdminMock.login.calls.reset();
		LoginMock.login.calls.reset();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should logout when logged in as admin', () => {
		LoginMock.loggedInAdmin.and.returnValue(true);
		LoginMock.loggedIn.and.returnValue(false);
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.logout();
		expect(LoginMock.logout).toHaveBeenCalled();
	});

	it('should logout as student when logged in as student', () => {
		LoginMock.loggedInAdmin.and.returnValue(false);
		LoginMock.loggedIn.and.returnValue(true);
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.logout();
		expect(LoginMock.logout).toHaveBeenCalled();
	});

	it('should logout when not logged in', () => {
		LoginMock.loggedInAdmin.and.returnValue(false);
		LoginMock.loggedIn.and.returnValue(false);
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.logout();
		expect(LoginMock.logout).toHaveBeenCalled();
	});

	it('should change password when logged in as admin', () => {
		LoginMock.loggedInAdmin.and.returnValue(false);
		LoginMock.loggedIn.and.returnValue(false);
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.changePassword('testUser', 'testPass', 'testNewPass');
		expect(LoginMock.changePassword).toHaveBeenCalled();
	});

	it('should change password when logged in as student', () => {
		LoginMock.loggedInAdmin.and.returnValue(false);
		LoginMock.loggedIn.and.returnValue(true);
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.changePassword('testUser', 'testPass', 'testNewPass');
		expect(LoginMock.changePassword).toHaveBeenCalled();
	});

	it('should change password when not logged in', () => {
		LoginMock.loggedInAdmin.and.returnValue(false);
		LoginMock.loggedIn.and.returnValue(false);
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.changePassword('testUser', 'testPass', 'testNewPass');
		expect(LoginMock.changePassword).toHaveBeenCalled();
	});

	it('should call loginService with login credentials', () => {
		component.login('user', 'password');
		expect(LoginMock.login).toHaveBeenCalledWith('user', 'password', component.showFailedLogin, component);
	});
	
	it('should call studentService with request credentials', () => {
		component.studentRegister('newUser');
		expect(StudentMock.register).toHaveBeenCalledWith('newUser');
	});

	it('should disable message on student login', () => {
		component.login('student', 'password');
		expect(dummyElement.style.visibility).toBe('collapse');
	});

	it('should show message on failed login', () => {
		component.showFailedLogin();
		expect(dummyElement.style.visibility).toBe('visible');
	});
});
