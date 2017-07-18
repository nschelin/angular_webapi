import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Cat } from '../models/cats';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CatsService {
	private headers: Headers;
	constructor(private http: Http) {
		this.headers = new Headers();
		this.headers.set('Content-Type', 'application/json');
		this.headers.set('Accept', 'application/json');
	}

	getCats(): Promise<any> {
		return this.http.get('/api/cats')
				   .toPromise()
				   .then(response => {
				   		return response.json();
				   })
				   .catch((error: any) => {
				   		console.log(`Error: ${error}`);
				   		return Promise.reject(error.message || error);
				   });
	}

	getCat(id: number): Promise<any> {
		return this.http.get(`/api/cats/${id}`)
						.toPromise()
						.then(response => {
							return response.json();
						})
						.catch((error: any) => {
				   		console.log(`Error: ${error}`);
				   		return Promise.reject(error.message || error);
				   });
	}

	createCat(cat: Cat): Promise<any> {
		return this.http.post(`/api/cats/`, cat)
						.toPromise()
						.then(response => {
							return response.json();
						})
						.catch((error: any) => {
					   		console.log(`Error: ${error}`);
					   		return Promise.reject(error.message || error);
					   	});
	}
}