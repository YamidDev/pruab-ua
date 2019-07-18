import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, ViewChild } from '@angular/core';
import { ApiRestService } from 'app/api-rest.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../iniciarsesion/auth.service';
import { divipos } from '../imports/geDivipo.data';
import { MatSelect } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, AfterViewInit, AfterContentChecked {
  public ubicaciones: any;
  public usuario: any;
  public datosEmpresa: any;
  private id;
  public departamento: any = new Array();
  public municipios: any = new Array();
  public departamentos: any = new Array();
  public departamentoSelected: any = '';
  public departamentoSearch: any = '';
  public showSpinner = true;
  public estado: any = 'perfil';
  public titulo = 'Datos de la Entidad';
  @ViewChild('box') box: MatSelect;

  constructor(
    private Servicio: ApiRestService,
    private router: Router,
    public auth: AuthService,
    public spinner: NgxSpinnerService,
    public ngxSmartModalService: NgxSmartModalService) {
    this.ubicaciones = divipos;
  }

  ngAfterContentChecked() {
    this.spinner.show();
  }

  ngOnInit() {
    this.getDepartamentos();
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.id = this.usuario.entidad.idEntidad;
    this.getDataEmpresa();
  }

  ngAfterViewInit() {
    this.getGdivipo();
  }

  getGdivipo() {
    this.Servicio.get(`/entidad/${this.id}`).subscribe(
      result => {
        this.datosEmpresa = result;
        this.departamentos.forEach(element => {
          if (element.idGeDivipo === this.datosEmpresa.fkGedivipo.idGeDivipo) {
            this.box.value = element;
            this.departamentoSelected = element;
            return false;
          }
        });
      },
      error => {
        if (error.status === 401 || error.status === 403) {
          swal.fire('Opps!', `Parece que no has iniciado sesión`, 'info');
          this.router.navigate(['/login']);
        }
      }
    )
  }
  setTitulo(data: any) {
    this.titulo = data;
  }

  getDataEmpresa() {
    this.Servicio.get(`/entidad/${this.id}`).subscribe(
      result => {
        this.datosEmpresa = result;
        this.getGdivipo();
        this.showSpinner = false;
      },
      error => {
        if (error.status === 401 || error.status === 403) {
          swal.fire('Opps!', `Parece que no has iniciado sesión`, 'info');
          this.router.navigate(['/login']);
        }
      }
    )
  }

  getDepartamentos() {
    let last_departament: any = null;
    this.ubicaciones.forEach(e => {
      if (last_departament != null) {
        if (e.nombreDepartamentp !== last_departament.nombreDepartamentp) {
          last_departament = e;
          this.departamentos.push(e);
        }
      } else {
        last_departament = e;
        this.departamentos.push(e);
      }
    });
  }

  getMunicipiosByDepartamento(departamento: any) {
    this.municipios = new Array();
    let last_municipio: any = null;
    this.ubicaciones.forEach(e => {
      if (e.nombreDepartamentp === departamento.nombreDepartamentp) {
        if (last_municipio != null) {
          if (e.nombreMunicipio !== last_municipio.nombreMunicipio) {
            last_municipio = e;
            this.municipios.push(e);
          }
        } else {
          last_municipio = e;
          this.municipios.push(e);
        }
      }
    });
  }

  seleccionarDepartamento(data: any) {
    this.departamentoSelected = data;
  }

  cargarLogo() { }

  updateEntidad() {
    const datosEmpUpdt = {
      'contactoCargo': this.datosEmpresa.contactoCargo,
      'contactoEmail': this.datosEmpresa.contactoEmail,
      'contactoNombre': this.datosEmpresa.contactoNombre,
      'contactoTelefono': this.datosEmpresa.contactoTelefono,
      'direccion': this.datosEmpresa.direccion,
      'estado': this.datosEmpresa.estado,
      'funciones': this.datosEmpresa.funciones,
      'idEntidad': this.datosEmpresa.idEntidad,
      'licencia': this.datosEmpresa.licencia,
      'nit': this.datosEmpresa.nit,
      'nombre': this.datosEmpresa.nombre,
      'orden': this.datosEmpresa.orden,
      'sesionesconcurrentes': this.datosEmpresa.sesionesconcurrentes,
      'telefono': this.datosEmpresa.telefono,
      'fkGedivipo': this.departamentoSelected.idGeDivipo,
      'usuarios': this.datosEmpresa.usuarios,
      'logo': this.datosEmpresa.logo
    }

    if (this.usuario.roles[0] === 'ROLE_USER') {
      swal.fire('Acceso Denegado', `Hola ${this.usuario.username}, No tienes permisos suficientes para realizar esta acción`, 'warning');
    } else {
      this.Servicio.put(`/entidad/${this.id}`, datosEmpUpdt).subscribe(
        result => {
          swal.fire(
            'Genial!',
            `Los datos de la entidad ${result.Entidad.nombre} han sido actualizados`,
            'success'
          )
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

  cerrarModal() {
    this.ngxSmartModalService.getModal('myModal').close()
  }
}
