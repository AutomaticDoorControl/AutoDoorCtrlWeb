import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { apiServer } from './globals';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		//checks for the existence of SESSIONID in localStorage
		if (req.url.indexOf(apiServer + "/api/") == 0 && localStorage.getItem("admin") !== null) {
			//retrieve token from localStorage
			var idToken = localStorage.getItem("admin");
			//add the token to request headers and let the request go through
			const cloned = req.clone({
				headers: req.headers.set("Authorization",
				"Bearer " + idToken)
			});

			return next.handle(cloned);
		}
		else {
			return next.handle(req);
		}
	}
}
