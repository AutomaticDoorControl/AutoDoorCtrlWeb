import { TestBed } from '@angular/core/testing';

import { DownloadCSVService } from './download-csv.service';

describe('DownloadCSVService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: DownloadCSVService = TestBed.get(DownloadCSVService);
		expect(service).toBeTruthy();
	});

	it('should generate the CSV', () => {
		//Thanks to https://stackoverflow.com/a/51852908
		let aSpy = jasmine.createSpyObj('a', ['click', 'setAttribute']);
		spyOn(document, 'createElement').and.returnValue(aSpy);
		spyOn(document.body, 'appendChild');
		spyOn(document.body, 'removeChild');
		let csv = [{rcsid:'one'},
			{rcsid:'two'}];
		DownloadCSVService.downloadCSV(csv, 'output.csv');
		expect(aSpy.href).toBe('data:text/csv;charset=utf-8,rcsid%0Aone%0Atwo%0A');
		expect(aSpy.download).toBe('output.csv');
		expect(aSpy.click).toHaveBeenCalled();
		expect(document.body.appendChild).toHaveBeenCalledWith(aSpy);
		expect(document.body.removeChild).toHaveBeenCalledWith(aSpy);
	});
});
