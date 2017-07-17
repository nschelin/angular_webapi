import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Cat } from '../models/cats';
import { CatsService } from './cats.service';

@Component({
	selector: 'my-cat-details',
	template: `
		<div>
			<h3>{{ cat.name }}</h3>
			<div>Type: {{ cat.type }}</div>
			<div>Age: {{ cat.age }}</div>
			<a [routerLink]="['/']">Back</a>
		</div>
	`
})

export class CatsDetailsComponent implements OnInit {
	cat: Cat;
	constructor(private catService: CatsService, private route: ActivatedRoute) {
		this.cat = new Cat();
	}

	getCat(): void {
		this.catService.getCat(this.route.snapshot.params.id).then(catData => {
			this.cat = catData as Cat;
		});
	}

	ngOnInit(): void {
		this.getCat();
	}
}


