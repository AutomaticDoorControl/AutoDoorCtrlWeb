import { TestBed } from '@angular/core/testing';

import { DownloadCSVService } from './download-csv.service';

describe('DownloadCSVService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: DownloadCSVService = TestBed.get(DownloadCSVService);
		expect(service).toBeTruthy();
	});
});
