import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
      // tslint:disable-next-line: prefer-const
      let role = next.data['role'] as string;
      console.log(role);
      if (this.auth.hasRole(role)) {
        return true;
      }

    swal.fire('Acceso denegado', `Hola ${this.auth._usuario.username} no tienes acceso a este recurso`, 'warning');
    this.router.navigate(['/login']);
    return true;
  }
}
