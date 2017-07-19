import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { MDL } from './directives/mdl';

// import { MdToolbarModule } from '@angular/material'


import { CatsComponent } from './cats/cats.component';
import { CatsDetailsComponent } from './cats/cats.details.component';
import { CatsInputComponent } from './cats/cats.input.component';
import { CatsService } from './cats/cats.service';

const routes: Routes = [
	{ path: '', redirectTo:'cats', pathMatch: 'full' },
	{ path: 'cats', component: CatsComponent },
	{ path: 'cats/addCat', component: CatsInputComponent },
	{ path: 'cats/:id', component: CatsDetailsComponent }
]

@NgModule({
	imports: [ 
		BrowserModule, 
		HttpModule, 
		FormsModule, 
		// BrowserAnimationsModule,
		// MdToolbarModule,
		RouterModule.forRoot (routes, { useHash: true }) 
		],
	declarations: [ 
		AppComponent, 
		CatsComponent, 
		CatsDetailsComponent, 
		CatsInputComponent,
		MDL
	],
	bootstrap: [ AppComponent ],
	providers: [ CatsService ]
})

export class AppModule { }