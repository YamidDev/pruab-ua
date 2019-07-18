import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Usuario } from './usuario';


@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {

  title = 'Iniciar Sesión';

  usuario: Usuario;

  constructor(private auth: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  login(): void {
    if (this.usuario.username === undefined || this.usuario.password === undefined) {
      swal.fire('Login', 'Por favor diligencie todos los campos', 'warning');
    } else {
      this.auth.login(this.usuario).subscribe(
        response => {
          this.auth.guardarUsuario(response.access_token);
          this.auth.guardarToken(response.access_token);
          const usuario = this.auth.usuario;
          this.router.navigate(['/contactos']);
          swal.fire('Login', `Hola ${usuario.username}, has iniciado con éxtio`, 'success');
        },
        err => {
          if (err.status === 400) {
            swal.fire('Login', `Usuario o Clave Incorrecta`, 'error');
          }
        }
      );
    }
  }
}
