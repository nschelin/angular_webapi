import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ValuesService {
	private headers: Headers;
	constructor(private http: Http) {
		this.headers = new Headers();
		this.headers.set('Content-Type', 'application/json');
		this.headers.set('Accept', 'application/json');
	}

	getValues(): Promise<any> {
		return this.http.get('/api/values')
						.toPromise()
						.then(response => {
							return response.json();
						})
						.catch((error:any) => {
							console.log(`Error: ${error}`);
							return Promise.reject(error.message || error);
						});
	}
}
