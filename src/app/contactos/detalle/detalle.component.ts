import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tributo-detail',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Output() titulo = new EventEmitter();
  public text = 'Detalle Tributo';
  public nombre: any;
  @Input() tributo: any;
  public parametro: any;
  tipo = [
    { value: 'f', viewValue: 'Fijo' },
    { value: 'p', viewValue: 'Porcentaje' }
  ];

  constructor() { }

  ngOnInit() {

    this.parametro = JSON.parse(this.tributo.parametroTributo);
    this.titulo.emit({
      titulo: this.text,
      nombre: this.tributo.idtributo.nombre
    });
  }

}
