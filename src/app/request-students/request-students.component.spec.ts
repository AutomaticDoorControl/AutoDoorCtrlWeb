import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStudentsComponent } from './request-students.component';

describe('RequestStudentsComponent', () => {
  let component: RequestStudentsComponent;
  let fixture: ComponentFixture<RequestStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
