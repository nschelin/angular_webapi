import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Cat } from '../models/cats';
import { CatsService } from './cats.service';

@Component({
	selector: 'cat-form',
	templateUrl: './app/cats/cats.input.component.html'
})

export class CatsInputComponent implements OnInit {
	model: Cat;
	constructor(private catService: CatsService, private router: Router) { 
		this.model = new Cat(); 
		// this.model.name = '';
		// this.model.id = 0;
		// this.model.type = '';
		// this.model.age = 0;
	}

	onSubmit(): void {
		this.catService.createCat(this.model).then(response => {
			this.router.navigate(['/']);
		});
	}

	ngOnInit(): void {

	}
}