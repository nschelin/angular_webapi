import { Component, OnInit } from '@angular/core';
import { ValuesService } from './values.service';

@Component({
	selector: 'my-values',
	templateUrl: './app/values/values.component.html'
})

export class ValuesComponent implements OnInit {
	values: any[];
	constructor(private valuesService: ValuesService) {
		this.values = new Array<any>();
	}

	getValues(): void {
		this.valuesService.getValues().then(valueData => {
			this.values = valueData;
		})
	}

	ngOnInit(): void {
		this.getValues();
	}
}