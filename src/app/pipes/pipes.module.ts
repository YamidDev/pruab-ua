import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentoSearchPipe } from './departamento-search.pipe';
import { MunicipioSearchPipe } from './municipio-search.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DepartamentoSearchPipe,
    MunicipioSearchPipe
  ],
  exports: [
    DepartamentoSearchPipe,
    MunicipioSearchPipe
  ]
})
export class PipesModule { }
