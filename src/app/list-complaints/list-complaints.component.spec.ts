import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';
import { ListComplaintsComponent } from './list-complaints.component';

describe('ListComplaintsComponent', () => {
  let component: ListComplaintsComponent;
  let fixture: ComponentFixture<ListComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      declarations: [ ListComplaintsComponent ],
      providers: [ AdminService, StudentService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
