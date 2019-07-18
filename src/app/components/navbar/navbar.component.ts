
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../../iniciarsesion/auth.service';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	@Input() public username: any;
	public titulo: string;
	private listTitles: any[];
	location: Location;
	mobile_menu_visible: any = 0;
	private toggleButton: any;
	private sidebarVisible: boolean;
	roles = [];

	constructor(location: Location, private element: ElementRef,
							private router: Router, public auth: AuthService,
							private activatedRoute: ActivatedRoute,
							private titleService: Title) {
		this.location = location;
		this.sidebarVisible = false;
		router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = this.getTitle(router.routerState, router.routerState.root).join('-');
				this.titulo = title;
        titleService.setTitle(title);
      }
    });
	}

	ngOnInit() {
		const navbar: HTMLElement = this.element.nativeElement;
		this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
		this.router.events.subscribe((event) => {
			this.sidebarClose();
			// tslint:disable-next-line: no-var-keyword
			var $layer: any = document.getElementsByClassName('close-layer')[0];
			if ($layer) {
				$layer.remove();
				this.mobile_menu_visible = 0;
			}
		});
		this.roles = this.username.roles[0];
	}

	sidebarOpen() {
		const toggleButton = this.toggleButton;
		const body = document.getElementsByTagName('body')[0];
		setTimeout(function () {
			toggleButton.classList.add('toggled');
		}, 500);

		body.classList.add('nav-open');

		this.sidebarVisible = true;
	};
	sidebarClose() {
		const body = document.getElementsByTagName('body')[0];
		this.toggleButton.classList.remove('toggled');
		this.sidebarVisible = false;
		body.classList.remove('nav-open');
	};
	sidebarToggle() {
		// const toggleButton = this.toggleButton;
		// const body = document.getElementsByTagName('body')[0];
		// tslint:disable-next-line: no-var-keyword
		var $toggle = document.getElementsByClassName('navbar-toggler')[0];

		if (this.sidebarVisible === false) {
			this.sidebarOpen();
		} else {
			this.sidebarClose();
		}
		const body = document.getElementsByTagName('body')[0];

		// tslint:disable-next-line: triple-equals
		if (this.mobile_menu_visible == 1) {
			// $('html').removeClass('nav-open');
			body.classList.remove('nav-open');
			// tslint:disable-next-line: no-use-before-declare
			if ($layer) {
				// tslint:disable-next-line: no-use-before-declare
				$layer.remove();
			}
			setTimeout(function () {
				$toggle.classList.remove('toggled');
			}, 400);

			this.mobile_menu_visible = 0;
		} else {
			setTimeout(function () {
				$toggle.classList.add('toggled');
			}, 430);

			// tslint:disable-next-line: no-var-keyword
			var $layer = document.createElement('div');
			$layer.setAttribute('class', 'close-layer');


			if (body.querySelectorAll('.main-panel')) {
				document.getElementsByClassName('main-panel')[0].appendChild($layer);
			} else if (body.classList.contains('off-canvas-sidebar')) {
				document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
			}

			setTimeout(function () {
				$layer.classList.add('visible');
			}, 100);

			$layer.onclick = function () { //asign a function
				body.classList.remove('nav-open');
				this.mobile_menu_visible = 0;
				$layer.classList.remove('visible');
				setTimeout(function () {
					$layer.remove();
					$toggle.classList.remove('toggled');
				}, 400);
			}.bind(this);

			body.classList.add('nav-open');
			this.mobile_menu_visible = 1;

		}
	};

	getTitle(state, parent) {
		// tslint:disable-next-line: no-var-keyword
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }


	logOut(): void {
		this.auth.logout();
		swal.fire('Adiós!', `${this.username.username}`, 'info');
		this.router.navigate(['/login']);
	}
}
