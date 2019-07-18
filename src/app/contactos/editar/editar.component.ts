import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
import { ApiRestService } from '../../api-rest.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tributo-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  @Output() titulo = new EventEmitter();
  @Output() estado = new EventEmitter();
  @Output() listarTributos = new EventEmitter();
  texto = 'tributos';
  text = 'Configurar Tributo';
  @Input() tributo: any;
  public parametro: any;
  public nombre: any;

  tipo = [
    { value: 'f', viewValue: 'Fijo' },
    { value: 'p', viewValue: 'Porcentaje' }
  ];

  constructor(private service: ApiRestService, private router: Router) { }

  ngOnInit() {
    this.parametro = JSON.parse(this.tributo.parametroTributo);
    this.titulo.emit({titulo: this.text, nombre: this.tributo.idtributo.nombre});
  }

  agregarParametro() {
    this.parametro.push({
      'mf': 0,
      'mi': 0,
      'type': '',
      'value': 0,
    });
  }

  quitarParametro(index) {
    this.parametro.splice(index, 1);
  }

  guardarCambios(data) {
    let datos = {
      'identidad': this.tributo.identidad.idEntidad,
      'idtributo': this.tributo.idtributo.idTributo,
      'idusuario': this.tributo.idusuario,
      'estado': 'A',
      'parametroTributo': JSON.stringify(data)
    }

    if (!this.validar(this.parametro, 'mi')) {
      swal.fire('Error', 'Los Montos iniciales no pueden ser iguales', 'error');
      return false;
    }

    if (!this.validar(this.parametro, 'mf')) {
      swal.fire('Error', 'Los montos finales no pueden ser iguales', 'error');
      return false;
    }

    this.service.put(`/entidadtributo/${this.tributo.idEntTributo}`, datos).subscribe(
      result => {
        swal.fire(
          'Genial!',
          `Tributo Configurado con éxito`,
          'success'
        );
        this.parametro = result;
        this.listarTributos.emit();
        this.titulo.emit('Listado de Tributos');
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

  validar(arreglo: any[], type: any ) {
    let elementos = [];
    switch (type) {
      case 'mi':
        arreglo.forEach(element => {
          elementos.push(element.mi);
        });
        break;
      case 'mf':
        arreglo.forEach(element => {
          elementos.push(element.mf);
        });
        break;
      default:
        break;
    }

    let repetidos = [];
    let temporal = [];

    elementos.forEach((value, index) => {
      temporal = Object.assign([], elementos);
      temporal.splice(index, 1);
      if (temporal.indexOf(value) !== -1 && repetidos.indexOf(value) === -1) {
        repetidos.push(value);
      }
    });

    if (repetidos.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
