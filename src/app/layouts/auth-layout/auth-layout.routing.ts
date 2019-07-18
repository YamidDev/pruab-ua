import { Routes } from '@angular/router';

import { IniciarsesionComponent } from 'app/iniciarsesion/iniciarsesion.component';

export const AuthLayoutRoutes: Routes = [
	{
		path: 'login',
		component: IniciarsesionComponent,
		data: { title: 'Login' }
	}
];
