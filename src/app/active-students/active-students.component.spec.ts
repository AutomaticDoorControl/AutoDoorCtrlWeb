import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';
import { ActiveStudentsComponent } from './active-students.component';

describe('ActiveStudentsComponent', () => {
  let component: ActiveStudentsComponent;
  let fixture: ComponentFixture<ActiveStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      declarations: [ ActiveStudentsComponent ],
      providers: [ AdminService, StudentService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
