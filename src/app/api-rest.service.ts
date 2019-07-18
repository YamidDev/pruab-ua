import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './iniciarsesion/auth.service';
import swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService implements OnInit {
  public usuario: any;
  public url = 'http://localhost:5000/rest/v1';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  private httpHeaders2 = new HttpHeaders('multipart/*');

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  ngOnInit () {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  }

  public isNotAuthorized(e): boolean {
    if (e.status === 401) {
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status === 403) {
      swal.fire('Acceso Denegado', `Hola ${this.usuario.username}`, 'info');
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  public agregarAuthorizationHeader2() {
    let token = this.auth.token;
    if (token != null) {
      return this.httpHeaders2.append('Authorization', 'Bearer' + token);
    }
    return this.httpHeaders2;
  }

  public agregarAuthorizationHeader() {
    let token = this.auth.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer' + token);
    }
    return this.httpHeaders;
  }


  get(ruta: string) {
    return this.http.get<any>(this.url.concat(ruta), {headers: this.agregarAuthorizationHeader()});
  }

  post(ruta: string, body: any) {
    return this.http.post<any>(this.url.concat(ruta), body, {headers: this.agregarAuthorizationHeader()});
  }

  delete(ruta: string) {
    return this.http.delete<any>(this.url.concat(ruta), {headers: this.agregarAuthorizationHeader()});
  }

  put(ruta: string, body: any) {
    return this.http.put<any>(this.url.concat(ruta), body, {headers: this.agregarAuthorizationHeader()});
  }
}
