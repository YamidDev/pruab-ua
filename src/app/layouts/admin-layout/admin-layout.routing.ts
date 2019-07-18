import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ContactosComponent } from '../../contactos/contactos.component';


export const AdminLayoutRoutes: Routes = [
	{
		path: 'contactos',
		component: ContactosComponent,
		data: { title: 'Contactos'}
	},
	{
		path: 'empresa-perfil',
		component: UserProfileComponent,
		data: { title: 'Perfil usuario' }
	}
];
