import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { ApiRestService } from 'app/api-rest.service';
import { trigger, transition, style, animate } from '@angular/animations';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('300ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class ContactosComponent implements OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked {
  titulo: any;
  nombre: any;
  usuario: any;
  dataContactos: any;
  contactos: any;
  dataContact: any;
  showSpinner = true;
  estado: any = 'contactos';
  nombreContacto: any;
  pageNow = 1;
  constructor(private servicio: ApiRestService, private spinner: NgxSpinnerService) { }
  ngAfterViewInit() { }
  ngAfterContentChecked() {
    this.spinner.show();
  }
  ngAfterViewChecked() { }
  ngOnInit() {
    this.titulo = 'Listado de Contactos';
    this.nombre = '';
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.listarContactos();
  }

  cambiarEstado(arg) {
    this.estado = arg;
    this.titulo = 'Listado de Contactos';
  }

  setDataContacto(data: any) {
    this.dataContact = data;
  }

  setTitulo(data: any) {
    this.titulo = data.titulo;
    this.nombre = data.nombre;
  }

  cambiarTitulo(data: any) {
    this.titulo = data;
    this.nombre = '';
  }

  listarContactos() {
    this.servicio.get(`/contactos/list`).subscribe(
      result => {
        console.log(result);
        this.dataContactos = result;
        this.spinner.hide();
        this.showSpinner = false;
      },
      error => {
        console.error(error.message);
      }
    )
  }

  eliminarContacto(id) {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })
    swal.fire({
      title: 'Estás Seguro?',
      text: 'Esto no se puede deshacer!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.delete(`/contacto/${id}`).subscribe(
          (reponse) => {
            swalWithBootstrapButtons.fire('Eliminado!', 'Contacto eliminado con éxito', 'success');
            this.listarContactos();
          },
          err => {
            if (err.status === 500) {
              swalWithBootstrapButtons.fire('Error', 'Algo no anda bien', 'error');
            }
          }
        )
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire('Operancion Cancelada', 'Acción cancelada por el usuario', 'error')
      }
    });
  }
}
