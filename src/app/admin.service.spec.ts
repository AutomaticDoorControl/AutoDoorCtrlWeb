import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MessageService } from './message.service';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      providers: [AdminService]
    });
  });

  it('should be created', inject([AdminService], (service: AdminService) => {
    expect(service).toBeTruthy();
  }));
});
