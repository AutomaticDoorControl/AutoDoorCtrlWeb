import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidebarComponent } from './admin-sidebar.component';

describe('AdminSidebarComponent', () => {
  let component: AdminSidebarComponent;
  let fixture: ComponentFixture<AdminSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create one button for each input', () => {
    component.buttons = ["one", "two", "three"];
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    expect(hostElement.querySelectorAll('button').length).toBe(3);
  });

  it('should create buttons with the names of the inputs', () => {
    let buttonsArr = ["one", "two", "three"];
    component.buttons = buttonsArr;
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    let buttons = hostElement.querySelectorAll('button');
    for(var i = 0; i < 3; ++i)
      expect(buttons[i].innerHTML).toBe(buttonsArr[i]);
  });
 
  it('should create buttons with the names of the inputs', () => {
    let buttonsArr = ["one", "two", "three"];
    component.buttons = buttonsArr;
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    let buttons = hostElement.querySelectorAll('button');
    spyOn(component.clicker, 'emit');
    for(var i = 0; i < 3; ++i)
    {
      buttons[i].click();
      expect(component.clicker.emit).toHaveBeenCalledWith(buttonsArr[i]);
    }
  });
});
