import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ApiRestService } from '../../api-rest.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'contacto-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  providers: [DatePipe]
})

export class CrearComponent implements OnInit {
  @Output() titulo = new EventEmitter();
  @Output() estado = new EventEmitter();
  @Output() listarContactos = new EventEmitter();
  texto = 'contactos';
  text = 'Crear nuevo contacto';
  public isChecked = false;
  pageNow = 1;
  edad: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  fechaNac =  new Date();
  telefono: string;
  direccion: string;
  fechaActual = new Date();
  constructor(private service: ApiRestService, private router: Router) {  }

  ngOnInit() {
    this.titulo.emit(this.text);
  }


  setEdad(fechaActual, fechaNac) {
    let milliseconds = fechaActual - fechaNac;
    let seconds = milliseconds / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let anios = days / 365;
    return Math.floor(anios);
  }

  guardarCambios() {
    const data = {
      'cedula': this.cedula,
      'nombres': this.nombres,
      'apellidos': this.apellidos,
      'fechaNac': this.fechaNac,
      'telefono': this.telefono,
      'edad': this.setEdad(this.fechaActual, this.fechaNac),
      'direccion': this.direccion
    }
    this.service.post(`/contacto/new`, data).subscribe(
      result => {
        swal.fire(
          'Genial!',
          `Contacto ${data.nombres} creado con éxito`,
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
    );
  }

}
