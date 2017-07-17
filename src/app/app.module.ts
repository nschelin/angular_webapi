import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ValuesComponent } from './values/values.component';
import { ValuesService } from './values/values.service';

import { CatsComponent } from './cats/cats.component';
import { CatsDetailsComponent } from './cats/cats.details.component';
import { CatsService } from './cats/cats.service';

// will error due to weird file strucutre
// need to fix
const routes: Routes = [
	{ path: '', component: CatsComponent },
	{ path: ':id', component: CatsDetailsComponent }
]

@NgModule({
	imports: [ BrowserModule, HttpModule, RouterModule.forRoot (routes, { useHash: true }) ],
	declarations: [ AppComponent, CatsComponent, CatsDetailsComponent ],
	bootstrap: [ AppComponent ],
	providers: [ CatsService ]
})

export class AppModule { }