import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
import { ApiRestService } from '../../api-rest.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'contacto-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  @Input() contacto: any;
  @Output() titulo = new EventEmitter();
  @Output() estado = new EventEmitter();
  @Output() listarContactos = new EventEmitter();
  texto = 'contactos';
  text = 'Editar Contacto';
  fechaActual = new Date();
  fechaNac;
  constructor(private service: ApiRestService, private router: Router) { }

  ngOnInit() {
    this.titulo.emit({titulo: this.text, nombre: this.contacto.nombres});
  }


  setEdad(fechaActual, fechaNac) {
    let milliseconds = fechaActual - fechaNac;
    let seconds = milliseconds / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let anios = days / 365;
    console.log(Math.floor(anios));
    return Math.floor(anios);
  }


  guardarCambios() {
    this.fechaNac = new Date(this.contacto.fechaNac);
    let datos = {
      'cedula': this.contacto.cedula,
      'nombres': this.contacto.nombres,
      'apellidos': this.contacto.apellidos,
      'fechaNac': this.contacto.fechaNac,
      'telefono': this.contacto.telefono,
      'edad': this.setEdad(this.fechaActual, this.fechaNac),
      'direccion': this.contacto.direccion
    }
    this.service.put(`/contacto/${this.contacto.id}`, datos).subscribe(
      result => {
        swal.fire(
          'Genial!',
          `Contacto Actualizado con éxito`,
          'success'
        );
        this.listarContactos.emit();
        this.estado.emit(this.texto);
      },
      error => {
        if (error.status === 401) {
          swal.fire('Opps!', `debes iniciar sesión primero`, 'info');
          this.router.navigate(['/login']);
        }
        if (error.status === 403) {
          swal.fire('Opps!', `No tienes permiso para realizar esta acción`, 'warning');
          this.router.navigate(['/login']);
        }
      }
    )
  }

}
