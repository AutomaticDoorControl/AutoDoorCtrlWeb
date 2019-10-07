import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StudentService } from './student.service';

describe('StudentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
	HttpClientTestingModule
      ],
      providers: [StudentService]
    });
  });

  it('should be created', inject([StudentService], (service: StudentService) => {
    expect(service).toBeTruthy();
  }));
});
