import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter, Directive } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../login.service';
import { StudentService } from '../student.service';
import { DownloadCSVService } from '../download-csv.service';
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
	let LoginMock = jasmine.createSpyObj('LoginService', ['logout']);

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
			providers: [ {provide: LoginService, useValue: LoginMock}, {provide: StudentService, useValue: StudentMock} ]
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
			})
		);
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ListComplaintsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		let CSVSpy = spyOn(DownloadCSVService, 'downloadCSV');
		CSVSpy.calls.reset();
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

	it('should logout on failed request', () => {
		let router = TestBed.get(Router);
		let routerSpy = spyOn(router, 'navigate')
		StudentMock.listComplaints.and.returnValue(
			new Observable( (observer) => {
				observer.error("Oh no");
			})
		);
		component.getComplaints();
		expect(LoginMock.logout).toHaveBeenCalled();
	});

	it('should trigger download when button is clicked', () => {
		component.buttonClick("Download");
		expect(DownloadCSVService.downloadCSV).toHaveBeenCalledWith([
			{"location":"locOne","message":"messOne"},
			{"location":"locTwo","message":"messTwo"},
			{"location":"locThree","message":"messThree"},
			{"location":"locFour","message":"messFour"}],
			'Complaints.csv');
	});

	it('should not trigger download when bad button is clicked', () => {
		component.buttonClick("no such button");
		expect(DownloadCSVService.downloadCSV).not.toHaveBeenCalled();
	});
});
