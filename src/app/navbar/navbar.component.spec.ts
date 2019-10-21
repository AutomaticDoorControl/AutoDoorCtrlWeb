import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';
import { LoginService } from '../login.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let StudentMock = jasmine.createSpyObj('StudentService', ['login', 'logout']);
  let LoginMock = jasmine.createSpyObj('LoginService', ['loggedIn', 'login']);
  let AdminMock = jasmine.createSpyObj('AdminService', ['login']);

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
