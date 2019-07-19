import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'contacto-detail',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Output() titulo = new EventEmitter();
  public text = 'Detalle Contacto';
  public nombre: any;
  @Input() contacto: any;

  constructor() { }

  ngOnInit() {
    this.titulo.emit({titulo: this.text, nombre: this.contacto.nombres});
  }

}
