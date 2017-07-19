import { Component, OnInit } from '@angular/core';
import { CatsService } from './cats.service';
import { Cat } from '../models/cats';

@Component({
	selector: 'my-cats',
	template: `
		<div class="mdl-grid">
			<div *ngFor="let cat of cats" class="mdl-cell mdl-cell--4-col">
				<div class="demo-card-square mdl-card mdl-shadow--2dp">
				  <div class="mdl-card__title mdl-card--expand">
				    <h2 class="mdl-card__title-text">{{ cat.name }}</h2>
				  </div>
				  <div class="mdl-card__supporting-text">
				    {{ cat.type }}, {{ cat.age }} 
				  </div>
				  <div class="mdl-card__actions mdl-card--border">
				    <a [routerLink]="[cat.id]" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
				      View Details
				    </a>
				  </div>
				</div>
			</div>
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

