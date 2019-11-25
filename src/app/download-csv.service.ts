import { Injectable } from '@angular/core';

import { convertArrayToCSV } from 'convert-array-to-csv';

@Injectable({
	providedIn: 'root'
})

export class DownloadCSVService {
	//download list of complaints to csv
	static downloadCSV(outputArr, fileName):void {
		let csv = convertArrayToCSV(outputArr);
		let blob = new Blob([csv], {type: 'text/csv;charset=utf8;'});
		let uri = 'data:attachment/csv;charset=utf-8,' + encodeURI(csv);
		let link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.setAttribute('visibility', 'hidden');
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}
