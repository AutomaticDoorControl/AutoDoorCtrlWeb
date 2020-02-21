import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';
import { LoginService } from '../login.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
	let component: NavbarComponent;
	let fixture: ComponentFixture<NavbarComponent>;
	let StudentMock = jasmine.createSpyObj('StudentService', ['register']);
	let LoginMock = jasmine.createSpyObj('LoginService', ['loggedIn', 'login', 'logout', 'changePassword']);
	let AdminMock = jasmine.createSpyObj('AdminService', ['loggedIn', 'login', 'logout', 'changePassword']);

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
		spyOn(component, 'showFailedAdminLogin').and.stub();
		spyOn(component, 'showFailedStudentLogin').and.stub();
		fixture.detectChanges();
	});

	afterEach(() => {
		AdminMock.logout.calls.reset();
		LoginMock.logout.calls.reset();
		AdminMock.changePassword.calls.reset();
		LoginMock.changePassword.calls.reset();
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

	it('should not logout when not logged in', () => {
		AdminMock.loggedIn.and.returnValue(false);
		LoginMock.loggedIn.and.returnValue(false);
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.logout();
		expect(AdminMock.logout).not.toHaveBeenCalled();
		expect(LoginMock.logout).not.toHaveBeenCalled();
	});

	it('should change admin password when logged in as admin', () => {
		AdminMock.loggedIn.and.returnValue(true);
		LoginMock.loggedIn.and.returnValue(false);
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.changePassword('testUser', 'testPass', 'testNewPass');
		expect(AdminMock.changePassword).toHaveBeenCalled();
		expect(LoginMock.changePassword).not.toHaveBeenCalled();
	});

	it('should change student password when logged in as student', () => {
		AdminMock.loggedIn.and.returnValue(false);
		LoginMock.loggedIn.and.returnValue(true);
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.changePassword('testUser', 'testPass', 'testNewPass');
		expect(AdminMock.changePassword).not.toHaveBeenCalled();
		expect(LoginMock.changePassword).toHaveBeenCalled();
	});

	it('should not change password when not logged in', () => {
		AdminMock.loggedIn.and.returnValue(false);
		LoginMock.loggedIn.and.returnValue(false);
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.changePassword('testUser', 'testPass', 'testNewPass');
		expect(AdminMock.changePassword).not.toHaveBeenCalled();
		expect(LoginMock.changePassword).not.toHaveBeenCalled();
	});

	it('should call loginService with login credentials', () => {
		component.studentLogin('user', 'password');
		expect(LoginMock.login).toHaveBeenCalledWith('user', 'password', component.showFailedStudentLogin);
	});
	
	it('should call adminService with login credentials', () => {
		component.adminLogin('admin', 'password');
		expect(AdminMock.login).toHaveBeenCalledWith('admin', 'password', component.showFailedAdminLogin);
	});

	it('should call studentService with request credentials', () => {
		component.studentRegister('newUser');
		expect(StudentMock.register).toHaveBeenCalledWith('newUser');
	});
});
