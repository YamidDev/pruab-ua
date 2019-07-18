import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../iniciarsesion/auth.service';
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() public username: any;
  usuario: any;
  menuItems: any[];
  id;
  roles = [];

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.roles = this.username.roles[0];
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logOut(): void {
    this.auth.logout();
    swal.fire({title: 'Adiós!', text: `${this.username.username}`, type: 'info'});
    this.router.navigate(['/login']);
  }
}
