import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter, Directive } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { AdminService } from '../admin.service';
import { StudentService } from '../student.service';
import { ListComplaintsComponent } from './list-complaints.component';

describe('ListComplaintsComponent', () => {
  @Directive({
    selector: 'app-admin-sidebar'
  })
  class SidebarMock {
    @Input('buttons')
    @Output('clicker')
    public clickEmitter = new EventEmitter<void>();
  }

  let component: ListComplaintsComponent;
  let fixture: ComponentFixture<ListComplaintsComponent>;
  let StudentMock = jasmine.createSpyObj('StudentService', ['listComplaints']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      declarations: [
        ListComplaintsComponent,
	Component({selector: 'app-navbar', template: ''})(class _ {}),
	SidebarMock
      ],
      providers: [ AdminService, {provide: StudentService, useValue: StudentMock} ]
    })
    .compileComponents();
    StudentMock.listComplaints.and.returnValue(
      new Observable( (observer) => {
        observer.next(
	  [{"location":"locOne","message":"messOne"},
	  {"location":"locTwo","message":"messTwo"},
	  {"location":"locThree","message":"messThree"},
	  {"location":"locFour","message":"messFour"}]
	)
    }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate table with values', () => {
    const hostElement = fixture.nativeElement;
    let table: HTMLElement = hostElement.querySelector('table');
    let nums = ["One", "Two", "Three", "Four"];
    for(var i = 1; i < 4; ++i) {
      expect(table.children[i].children[0].innerHTML).toBe('loc' + nums[i - 1]);
      expect(table.children[i].children[1].innerHTML).toBe('mess' + nums[i - 1]);
    }
  });
});
