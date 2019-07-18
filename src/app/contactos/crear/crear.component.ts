import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiRestService } from '../../api-rest.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'tributo-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  @Output() titulo = new EventEmitter();
  @Output() estado = new EventEmitter();
  @Output() listarTributos = new EventEmitter();
  public usuario: any;
  public dataTributos: any;
  public idEntidad;
  texto = 'tributos';
  text = 'Agregar nuevo tributo';
  public isChecked = false;
  pageNow = 1;

  constructor(private service: ApiRestService, private router: Router) { }

  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.idEntidad = this.usuario.entidad.idEntidad;
    this.listarTributosOk();
    this.titulo.emit(this.text);
  }

  listarTributosOk() {
    this.service.get(`/tributos/disponibles/${this.idEntidad}`).subscribe(
      result => {
        this.dataTributos = result;
      },
      error => {
        console.error(error.message);
      }
    )
  }

  agregarTributo(datos) {
    const data = {
      'identidad': this.idEntidad,
      'idtributo': datos.idTributo,
      'idusuario': this.usuario.id,
      'estado': 'A',
      'parametroTributo': '[{"mi": 0, "mf": 0, "type": "f", "value": 0}]'
    }

    this.service.post(`/entidadtributo/entidad/save`, data).subscribe(
      result => {
        swal.fire(
          'Genial!',
          `Tributo ${datos.nombre} agregado`,
          'success'
        );
        this.listarTributos.emit();
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
