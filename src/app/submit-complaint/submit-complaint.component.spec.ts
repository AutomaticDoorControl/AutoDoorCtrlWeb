import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StudentService } from '../student.service';
import { LoginService } from '../login.service';

import { SubmitComplaintComponent } from './submit-complaint.component';

describe('SubmitComplaintComponent', () => {
  let component: SubmitComplaintComponent;
  let fixture: ComponentFixture<SubmitComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      declarations: [ SubmitComplaintComponent ],
      providers: [ StudentService, LoginService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
