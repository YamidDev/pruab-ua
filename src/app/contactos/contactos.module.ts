import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatRippleModule, MatFormFieldModule, MatTooltipModule,
  MatSelectModule, MatIconModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ContactosComponent } from './contactos.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { DetalleComponent } from './detalle/detalle.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

  declarations: [
    ContactosComponent,
    EditarComponent,
    CrearComponent,
    DetalleComponent
  ],
  exports: [
    ContactosComponent,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    CrearComponent,
    EditarComponent
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class TributoModule { }
