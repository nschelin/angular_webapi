import { Component, OnInit } from '@angular/core';
import { CatsService } from './cats.service';
import { Cat } from '../models/cats';

@Component({
	selector: 'my-cats',
	template: `
		<h3>Cats!</h3>
		<div *ngFor="let cat of cats">
			<a [routerLink]="[cat.id]">{{ cat.name }}: {{ cat.type}}, {{ cat.age }}</a>
		</div>
		<div>
			<a [routerLink]="['addCat']">Add Cat</a>
		</div>
	`
})

export class CatsComponent implements OnInit {
	public cats: Cat[]

	constructor(private catService: CatsService) {
		this.cats = new Array<Cat>();
	}

	getCats(): void {
		this.catService.getCats().then(catData => {
			this.cats = catData as Cat[];
		})
	}

	ngOnInit(): void {
		this.getCats();
	}
}

